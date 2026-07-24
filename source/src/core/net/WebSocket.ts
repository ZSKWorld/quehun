interface IWaitRpcInfo {
	service: EServiceType;
	method: string;
	reqData: IRequest;
	callback: (res: IResponse) => void;
}

const enum ESocketState {
	/** 连接中 */
	Connecting = "SocketState_Connecting",
	/** 重连中 */
	Reconnecting = "SocketState_Reconnecting",
	/** 已连接 */
	Connected = "SocketState_Connected",
	/** 未连接 */
	Disconnect = "SocketState_Disconnect",
}

export const enum ESocketEvent {
	/** 开始链接时触发 */
	OnConnecting = "SocketEvent_OnConnecting",
	/** 开始重连时触发 */
	OnReconnecting = "SocketEvent_OnReconnecting",
	/** 连接成功时触发 */
	OnConnect = "SocketEvent_OnConnect",
	/** 连接关闭时触发 */
	OnClosed = "SocketEvent_OnClosed",
	/** 有网络回报时触发 */
	OnResponse = "SocketEvent_OnResponse",
	/** 有网络通知时触发 */
	OnNotify = "SocketEvent_OnNotify",
}

/** 状态转换触发的事件映射 */
const StateTranslateMap: { [key in ESocketState]: { [key in ESocketState]?: ESocketEvent[] } } = {
	[ESocketState.Disconnect]: {
		[ESocketState.Connecting]: [ESocketEvent.OnConnecting],
	},
	[ESocketState.Connecting]: {
		[ESocketState.Connected]: [ESocketEvent.OnConnect],
		[ESocketState.Disconnect]: [ESocketEvent.OnClosed],
	},
	[ESocketState.Reconnecting]: {
		[ESocketState.Connected]: [ESocketEvent.OnConnect],
		[ESocketState.Disconnect]: [ESocketEvent.OnClosed],
	},
	[ESocketState.Connected]: {
		[ESocketState.Reconnecting]: [ESocketEvent.OnReconnecting],
		[ESocketState.Disconnect]: [ESocketEvent.OnClosed],
	},
};

export class WebSocket extends Laya.EventDispatcher {
	private _socket: Laya.Socket;
	private _routeInfo: IRouteInfo;
	private _tail: string;
	private _reqIndex = 0;
	private _state: ESocketState = ESocketState.Disconnect;
	private _waitList = new Map<number, IWaitRpcInfo>();
	private _reqMap = new Map<string, Promise<IResponse>>();
	private _reconnectIndex = 0;
	private _reconnectTime = [1000, 2000, 3000];

	get url() {
		const protocol = this._routeInfo.ssl ? "wss://" : "ws://";
		return `${ protocol }${ this._routeInfo.domain }/${ this._tail }`;
	}
	get state() { return this._state; }
	private set state(v) {
		const lastState = this._state;
		if (v == lastState) return;
		this._state = v;

		const events = StateTranslateMap[lastState][v];
		if (events) events.forEach(v => this.event(v));
	}
	get connected() { return this.state == ESocketState.Connected; }

	constructor(routeInfo: IRouteInfo, tail: string) {
		super();
		this._routeInfo = routeInfo;
		this._tail = tail;

		this._socket = new Laya.Socket();
		this._socket.endian = Laya.Byte.LITTLE_ENDIAN;
		this._socket.on(Laya.Event.OPEN, this, this.onOpen);
		this._socket.on(Laya.Event.MESSAGE, this, this.onMessage);
		// this._socket.on(Laya.Event.ERROR, this, this.onError);
		this._socket.on(Laya.Event.CLOSE, this, this.onClose);
	}

	connect() {
		if (this.state != ESocketState.Disconnect) return;
		this._reconnectIndex = 0;
		this.state = ESocketState.Connecting;
		this._socket.connectByUrl(this.url);
	}

	close() {
		if (this.state == ESocketState.Disconnect) return;
		this.state = ESocketState.Disconnect;
		Laya.timer.clear(this, this.reconnect);
		this._socket.close();
	}

	send(methodName: ENetMessage, data: IRequest) {
		const rpcMap = this._reqMap;
		const rpcKey = methodName + ":" + JSON.stringify(data);
		if (rpcMap.has(rpcKey))
			return rpcMap.get(rpcKey);

		const { promise, resolve } = Promise.withResolvers<IResponse>();

		if (!this.connected) {
			this.eventMessage(ESocketEvent.OnResponse, methodName, { error: { code: -1 } }, data, resolve);
			return promise;
		}

		rpcMap.set(rpcKey, promise);

		const rpcID = this._reqIndex = (this._reqIndex + 1) % 60007;
		const method = $pbMgr.methodMap[methodName];

		this._waitList.set(rpcID, {
			service: method.parent.fullName as EServiceType,
			method: methodName,
			reqData: data,
			callback: res => {
				rpcMap.delete(rpcKey);
				resolve(res);
			}
		});

		const header = new Uint8Array([EHeaderType.Request, rpcID & 0xff, rpcID >> 8]);
		const packet = $pbMgr.encodeRpc(method.fullName, method.resolvedRequestType.encode(data).finish());

		const byte = new Laya.Byte();
		byte.writeArrayBuffer(header.buffer);
		byte.writeArrayBuffer(packet.buffer);
		this._socket.send(byte.buffer);

		return promise;
	}

	private onOpen(e: Event) {
		this._reconnectIndex = 0;
		this.state = ESocketState.Connected;
	}

	private onMessage(msg: Uint8Array) {
		const data = new Uint8Array(msg);
		const type = data[0];
		switch (type) {
			case EHeaderType.Response:
				const rpcID = data[1] + (data[2] << 8);
				const rpcInfo = this._waitList.get(rpcID);
				if (!rpcInfo) return;

				this._waitList.delete(rpcID);
				const wrapper = $pbMgr.decodeRpc(data.slice(3));
				const res = $pbMgr.methodMap[rpcInfo.method].resolvedResponseType.decode(wrapper.data);
				this.eventMessage(ESocketEvent.OnResponse, rpcInfo.method, res, rpcInfo.reqData, rpcInfo.callback);
				break;
			case EHeaderType.Notify:
				const msg = $pbMgr.decodeMessage(data.slice(1));
				const msgName = msg.$type.name;
				this.eventMessage(ESocketEvent.OnNotify, msgName, msg);
				break;
		}
	}

	private onClose(e: Event) {
		if (this.state == ESocketState.Disconnect) return;
		for (const [, req] of this._waitList) {
			this.eventMessage(ESocketEvent.OnResponse, req.method, { error: { code: -1 } }, req.reqData, req.callback);
		}
		this._waitList.clear();
		this._reqMap.clear();

		const delay = this._reconnectTime[this._reconnectIndex];
		if (delay) {
			this._reconnectIndex++;
			this.state = ESocketState.Reconnecting;
			Laya.timer.once(delay, this, this.reconnect);
		} else {
			this.state = ESocketState.Disconnect;
		}
	}

	private reconnect() {
		this._socket.connectByUrl(this.url);
	}

	private eventMessage(type: ESocketEvent.OnResponse | ESocketEvent.OnNotify, name: string, res: IResponse, req?: IRequest, callback?: Function) {
		this.event(type, [name, res, req]);
		callback && callback(res);
	}
}