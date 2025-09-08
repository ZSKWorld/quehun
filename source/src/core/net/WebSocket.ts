import { HeaderType, ServiceType } from "./NetDefine";

interface IWaitRpcInfo {
    service: ServiceType;
    method: string;
    cb: protobuf.RPCImplCallback;
}

const enum SocketState {
    /** 未连接 */
    Disconnect = "SocketState_Disconnect",
    /** 连接中 */
    Connecting = "SocketState_Connecting",
    /** 重连中 */
    Reconnecting = "SocketState_Reconnecting",
    /** 已连接 */
    Connected = "SocketState_Connected",
}

export const enum SocketEvent {
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
    /**
     * 消息错误
     * @param msg {@link IUserOutput} 错误消息
     */
    MsgError = "SocketEvent_MsgError",
    /** 连接关闭 */
    Close = "SocketEvent_Close",
}

export class WebSocket extends Laya.EventDispatcher {
    private _socket: Laya.Socket;
    private _routeInfo: IRouteInfo;
    private _tail: string;
    private _rpcServices: { [key in ServiceType]?: protobuf.rpc.Service } = {};
    private _rpcIndex = 0;
    private _state: SocketState = SocketState.Disconnect;
    private _waitList: { [key: number]: IWaitRpcInfo; } = {};


    private _stateTranslateMap: { [key in SocketState]: { [key in SocketState]?: SocketEvent[] } } = {
        [SocketState.Disconnect]: {
            [SocketState.Connecting]: [SocketEvent.Connecting],
            [SocketState.Reconnecting]: [SocketEvent.Reconnecting],
        },
        [SocketState.Connecting]: {
            [SocketState.Disconnect]: [SocketEvent.ConnectFail, SocketEvent.Close],
            [SocketState.Connected]: [SocketEvent.ConnectSuccess],
        },
        [SocketState.Reconnecting]: {
            [SocketState.Disconnect]: [SocketEvent.ReconnectFail, SocketEvent.Close],
            [SocketState.Connected]: [SocketEvent.ReconnectSuccess],
        },
        [SocketState.Connected]: {
            [SocketState.Disconnect]: [SocketEvent.Close],
        },
    };
    get url() {
        return `${ this._routeInfo.ssl ? "wss://" : "ws://" }${ this._routeInfo.domain }/${ this._tail }`;
    }
    get state() { return this._state; }
    private set state(v) {
        const lastState = this._state;
        if (v == lastState) return;
        this._state = v;
        const events = this._stateTranslateMap[lastState][v];
        if (!events) Logger.error(`状态错误 ${ lastState } => ${ v }`);
        else events.forEach(v => this.event(v));
    }
    get connected() { return this.state == SocketState.Connected; }

    constructor(routeInfo: IRouteInfo, tail: string, services: ServiceType[]) {
        super();
        this._socket = new Laya.Socket();
        this._socket.endian = Laya.Byte.LITTLE_ENDIAN;
        this._socket.on(Laya.Event.OPEN, this, this.onOpen);
        this._socket.on(Laya.Event.MESSAGE, this, this.onMessage);
        this._socket.on(Laya.Event.ERROR, this, this.onError);
        this._socket.on(Laya.Event.CLOSE, this, this.onClose);

        this._routeInfo = routeInfo;
        this._tail = tail;

        services.forEach(v => {
            const service = pbMgr.lookupService(v);
            const rpcService = service.create((method: protobuf.Method, request: Uint8Array, cb) => {
                this._rpcIndex = (this._rpcIndex + 1) % 60007;
                const rpcID = this._rpcIndex;
                const header = pbMgr.encodeHeaderData({ type: HeaderType.Request, reqIndex: rpcID });
                const packet = pbMgr.encodeRpc(method.fullName, request);

                this._waitList[rpcID] = { service: v, method: method.name, cb };
                const byte = new Laya.Byte();
                byte.writeArrayBuffer(header);
                byte.writeArrayBuffer(packet);
                this._socket.send(byte.buffer);
            });
            this._rpcServices[v] = rpcService;
        });
    }

    connect() {
        if (this.state != SocketState.Disconnect) return;
        this.state = SocketState.Connecting;
        this._socket.connectByUrl(this.url);
    }

    send(input) {

    }

    close() {
        this.state = SocketState.Disconnect;
        this._socket.close();
    }


    public sendRequest(rpcName: ERequest, data: any, callback: (error, res) => void) {

        if (this.state !== game.EConnectState.connecting && this.state !== game.EConnectState.usable) {
            callback('no open', null);
            return;
        }

        const _service = this.services_[service];
        if (!_service) {
            throw new Error(`ERR_SERVICE_NOT_FOUND, name=FastTest`);
        }
        _service[rpc_name](data, callback);
    }

    private onOpen(e: Event) {
        this.state = SocketState.Connected;
        Logger.log("连接成功", this.url);
    }

    private onMessage(message: string) {
        Logger.error("收到消息", message);
    }

    private onError(e: Event) {

    }

    private onClose(e: Event) {
        if (this.state == SocketState.Disconnect) return;
        this.state = SocketState.Disconnect;
        this._waitList = {};
        Laya.timer.once(1000, this, this.reconnect);
    }

    private dealResponse(output: IUserOutput) {
        const input = this._current;
        if (input && input.cmd == output.cmd) {
            const netMsg = `MessageID_${ output.cmd[0].toUpperCase() + output.cmd.substring(1) }`;
            if (!output.error) {
                userData.decode(output.syncInfo);
                this.dispatch(netMsg, [input, output]);
            } else {
                this.dispatch(SocketEvent.MsgError, output);
                this.dispatch(`${ netMsg }_Error`, [input, output]);
            }
        } else {
            Logger.error("消息错误", input, output);
        }
        this._curCb?.(output);
        this._current = null;
        this._curCb = null;

        this._socket.input.clear();
        this.executeWaitMsg();
    }

    private dealNotify(output: IUserOutput) {
        if (output && output.syncInfo)
            userData.decode(output.syncInfo);
        this.dispatch(output.cmd, output);
        this._socket.input.clear();
    }

    private reconnect() {
        this.state = SocketState.Reconnecting;
        this._socket.connectByUrl(this.url);
    }
}