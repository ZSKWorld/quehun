import { EHeaderType, EServiceType } from "./NetDefine";

interface IWaitRpcInfo {
	service: EServiceType;
	method: string;
	reqData: any;
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
	/** 连接中 */
	Connecting = "SocketEvent_Connecting",
	/** 重连中 */
	Reconnecting = "SocketEvent_Reconnecting",
	/** 连接成功 */
	Connected = "SocketEvent_Connected",
	/** 连接关闭 */
	Closed = "SocketEvent_Closed",
	/** 网络回报 */
	Response = "SocketEvent_Response",
	/** 网络通知 */
	Notify = "SocketEvent_Notify",
}

export class WebSocket extends Laya.EventDispatcher {
	private _socket: Laya.Socket;
	private _routeInfo: IRouteInfo;
	private _tail: string;
	private _rpcIndex = 0;
	private _state: ESocketState = ESocketState.Disconnect;
	private _waitList: { [key: number]: IWaitRpcInfo } = {};
	private _rpcRepeatMap: KeyMap<[string[], Promise<PartialAll<IResponse>>]> = {};
	private _reconnectIndex: number = 0;
	private _reconnectTime = [1000, 2000, 3000];

	private _stateTranslateMap: { [key in ESocketState]: { [key in ESocketState]?: ESocketEvent[] } } = {
		[ESocketState.Disconnect]: {
			[ESocketState.Connecting]: [ESocketEvent.Connecting],
		},
		[ESocketState.Connecting]: {
			[ESocketState.Connected]: [ESocketEvent.Connected],
			[ESocketState.Disconnect]: [ESocketEvent.Closed],
		},
		[ESocketState.Reconnecting]: {
			[ESocketState.Connected]: [ESocketEvent.Connected],
			[ESocketState.Disconnect]: [ESocketEvent.Closed],
		},
		[ESocketState.Connected]: {
			[ESocketState.Reconnecting]: [ESocketEvent.Reconnecting],
			[ESocketState.Disconnect]: [ESocketEvent.Closed],
		},
	};
	get url() { return `${ this._routeInfo.ssl ? "wss://" : "ws://" }${ this._routeInfo.domain }/${ this._tail }`; }
	get state() { return this._state; }
	private set state(v) {
		const lastState = this._state;
		if (v == lastState) return;
		this._state = v;
		const events = this._stateTranslateMap[lastState][v];
		if (events)
			events.forEach(v => this.event(v));
	}
	get connected() { return this.state == ESocketState.Connected; }

	constructor(routeInfo: IRouteInfo, tail: string) {
		super();
		this._socket = new Laya.Socket();
		this._socket.endian = Laya.Byte.LITTLE_ENDIAN;
		this._socket.on(Laya.Event.OPEN, this, this.onOpen);
		this._socket.on(Laya.Event.MESSAGE, this, this.onMessage);
		// this._socket.on(Laya.Event.ERROR, this, this.onError);
		this._socket.on(Laya.Event.CLOSE, this, this.onClose);

		this._routeInfo = routeInfo;
		this._tail = tail;
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

	send(methodName: EMessageID, data: any) {
		const dataStr = JSON.stringify(data);
		const rpcRepeatMap = this._rpcRepeatMap;
		if (rpcRepeatMap[methodName] && rpcRepeatMap[methodName][0].includes(dataStr))
			return rpcRepeatMap[methodName][1];

		const promise = new Promise<PartialAll<IResponse>>(resolve => {
			if (!this.connected) {
				this.eventMessage(ESocketEvent.Response, methodName, { error: { code: -1 } }, data, resolve);
				return;
			}
			this._rpcIndex = (this._rpcIndex + 1) % 60007;
			const rpcID = this._rpcIndex;
			const method = $pbMgr.methodMap[methodName];
			const header = new Uint8Array([EHeaderType.Request, rpcID & 0xff, rpcID >> 8]);
			const packet = $pbMgr.encodeRpc(method.fullName, method.resolvedRequestType.encode(data).finish());
			this._waitList[rpcID] = {
				service: method.parent.fullName as EServiceType,
				method: methodName,
				reqData: data,
				callback: resolve
			};
			const byte = new Laya.Byte();
			byte.writeArrayBuffer(header.buffer);
			byte.writeArrayBuffer(packet.buffer);
			this._socket.send(byte.buffer);
		});

		if (!rpcRepeatMap[methodName]) rpcRepeatMap[methodName] = [[dataStr], promise];
		else rpcRepeatMap[methodName][0].push(dataStr);

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
				const requestID = data[1] + (data[2] << 8);
				const request = this._waitList[requestID];
				if (!request) return;
				delete this._waitList[requestID];
				delete this._rpcRepeatMap[request.method];
				const wrapper = $pbMgr.decodeRpc(data.slice(3));
				const res = $pbMgr.methodMap[request.method].resolvedResponseType.decode(wrapper.data);
				this.eventMessage(ESocketEvent.Response, request.method, res, request.reqData, request.callback);
				break;
			case EHeaderType.Notify:
				const msg = $pbMgr.decodeMessage(data.slice(1));
				const msgName = msg.$type.name;
				this.eventMessage(ESocketEvent.Notify, msgName, msg);
				break;
		}
	}

	private onClose(e: Event) {
		if (this.state == ESocketState.Disconnect) return;
		for (const key in this._waitList) {
			const request = this._waitList[key];
			this.eventMessage(ESocketEvent.Response, request.method, { error: { code: -1 } }, request.reqData, request.callback);
		}
		this._waitList = {};
		this._rpcRepeatMap = {};

		if (this._reconnectTime[this._reconnectIndex]) {
			this.state = ESocketState.Reconnecting;
			Laya.timer.once(this._reconnectTime[this._reconnectIndex++], this, this.reconnect);
		} else {
			this.state = ESocketState.Disconnect;
		}
	}

	private reconnect() {
		this._socket.connectByUrl(this.url);
	}

	private eventMessage(type: ESocketEvent.Response | ESocketEvent.Notify, name: string, res: PartialAll<IResponse>, req?: any, callback?: Function) {
		this.event(type, [name, res, req]);
		callback && callback(res);
	}
}