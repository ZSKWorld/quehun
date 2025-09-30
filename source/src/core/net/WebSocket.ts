import { EHeaderType, EServiceType } from "./NetDefine";

interface IWaitRpcInfo {
    service: EServiceType;
    method: string;
    callback: (res: IResponse) => void;
}

const enum ESocketState {
    /** 未连接 */
    Disconnect = "SocketState_Disconnect",
    /** 连接中 */
    Connecting = "SocketState_Connecting",
    /** 重连中 */
    Reconnecting = "SocketState_Reconnecting",
    /** 已连接 */
    Connected = "SocketState_Connected",
}

export const enum ESocketEvent {
    /** 连接中 */
    Connecting = "SocketEvent_Connecting",
    /** 连接成功 */
    ConnectSuccess = "SocketEvent_ConnectSuccess",
    /** 连接失败 */
    ConnectFail = "SocketEvent_ConnectFail",
    /** 重连中 */
    Reconnecting = "SocketEvent_Reconnecting",
    /** 重连成功 */
    ReconnectSuccess = "SocketEvent_ReconnectSuccess",
    /** 重连失败 */
    ReconnectFail = "SocketEvent_ReconnectFail",
    /** 连接关闭 */
    Close = "SocketEvent_Close",
    Response = "SocketEvent_Response",
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

    private _stateTranslateMap: { [key in ESocketState]: { [key in ESocketState]?: ESocketEvent[] } } = {
        [ESocketState.Disconnect]: {
            [ESocketState.Connecting]: [ESocketEvent.Connecting],
            [ESocketState.Reconnecting]: [ESocketEvent.Reconnecting],
        },
        [ESocketState.Connecting]: {
            [ESocketState.Disconnect]: [ESocketEvent.ConnectFail, ESocketEvent.Close],
            [ESocketState.Connected]: [ESocketEvent.ConnectSuccess],
        },
        [ESocketState.Reconnecting]: {
            [ESocketState.Disconnect]: [ESocketEvent.ReconnectFail, ESocketEvent.Close],
            [ESocketState.Connected]: [ESocketEvent.ReconnectSuccess],
        },
        [ESocketState.Connected]: {
            [ESocketState.Disconnect]: [ESocketEvent.Close],
        },
    };
    get url() { return `${ this._routeInfo.ssl ? "wss://" : "ws://" }${ this._routeInfo.domain }/${ this._tail }`; }
    get state() { return this._state; }
    private set state(v) {
        const lastState = this._state;
        if (v == lastState) return;
        this._state = v;
        const events = this._stateTranslateMap[lastState][v];
        if (!events) Logger.error(`状态错误 ${ lastState } => ${ v }`);
        else events.forEach(v => this.event(v));
    }
    get connected() { return this.state == ESocketState.Connected; }

    constructor(routeInfo: IRouteInfo, tail: string) {
        super();
        this._socket = new Laya.Socket();
        this._socket.endian = Laya.Byte.LITTLE_ENDIAN;
        this._socket.on(Laya.Event.OPEN, this, this.onOpen);
        this._socket.on(Laya.Event.MESSAGE, this, this.onMessage);
        this._socket.on(Laya.Event.ERROR, this, this.onError);
        this._socket.on(Laya.Event.CLOSE, this, this.onClose);

        this._routeInfo = routeInfo;
        this._tail = tail;
    }

    connect() {
        if (this.state != ESocketState.Disconnect) return;
        this.state = ESocketState.Connecting;
        this._socket.connectByUrl(this.url);
    }

    close() {
        if (this.state == ESocketState.Disconnect) return;
        this.state = ESocketState.Disconnect;
        this._socket.close();
    }

    send(methodName: EMessageID, data: any) {
        const dataStr = JSON.stringify(data);
        const rpcRepeatMap = this._rpcRepeatMap;
        if (rpcRepeatMap[methodName] && rpcRepeatMap[methodName][0].includes(dataStr))
            return rpcRepeatMap[methodName][1];

        const promise = new Promise<PartialAll<IResponse>>(resolve => {
            if (!this.connected) {
                this.eventResponse(methodName, { error: { code: -1 } }, resolve);
                return;
            }
            this._rpcIndex = (this._rpcIndex + 1) % 60007;
            const rpcID = this._rpcIndex;
            const method = $pbMgr.methodMap[methodName];
            const header = new Uint8Array([EHeaderType.Request, rpcID & 0xff, rpcID >> 8]);
            const packet = $pbMgr.encodeRpc(method.fullName, method.resolvedRequestType.encode(data).finish());
            this._waitList[rpcID] = { service: method.parent.fullName as EServiceType, method: methodName, callback: resolve };
            const byte = new Laya.Byte();
            byte.writeArrayBuffer(header);
            byte.writeArrayBuffer(packet);
            this._socket.send(byte.buffer);
        });

        if (!rpcRepeatMap[methodName]) rpcRepeatMap[methodName] = [[dataStr], promise];
        else rpcRepeatMap[methodName][0].push(dataStr);

        return promise;
    }

    private reconnect() {
        this.state = ESocketState.Reconnecting;
        this._socket.connectByUrl(this.url);
    }

    private onOpen(e: Event) {
        this.state = ESocketState.Connected;
    }

    private onMessage(msg: Uint8Array) {
        const data = new Uint8Array(msg);
        const type = data[0];
        switch (type) {
            case EHeaderType.Response:
                const requestID = data[1] + (data[2] << 8);
                const request = this._waitList[requestID];
                if (!request) {
                    Logger.error(`收到不存在的requestID: ${ requestID }`);
                    return;
                }
                delete this._waitList[requestID];
                delete this._rpcRepeatMap[request.method];
                const wrapper = $pbMgr.decodeRpc(data.slice(3));
                const res = $pbMgr.methodMap[request.method].resolvedResponseType.decode(wrapper.data);
                this.eventResponse(request.method, res, request.callback);
                break;
            case EHeaderType.Notify:
                const msg = $pbMgr.decodeMessage(data.slice(1));
                const msgName = msg.$type.name;
                this.event(ESocketEvent.Notify, [msgName, msg]);
                break;
        }
    }

    private onError(e: Event) {

    }

    private onClose(e: Event) {
        if (this.state == ESocketState.Disconnect) return;
        this.state = ESocketState.Disconnect;
        for (const key in this._waitList) {
            const request = this._waitList[key];
            this.eventResponse(request.method, { error: { code: -1 } }, request.callback);
        }
        this._waitList = {};
        this._rpcRepeatMap = {};
        Laya.timer.once(1000, this, this.reconnect);
    }

    private eventResponse(name: string, res: PartialAll<IResponse>, callback: (res: PartialAll<IResponse>) => void) {
        callback(res);
        this.event(ESocketEvent.Response, [name, res]);
    }
}