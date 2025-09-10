import { GameUtil } from "../common/utils/GameUtil";
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
    private _rpcIndex = 0;
    private _rpcServices: KeyMap<protobuf.rpc.Service> = {};
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
            const rpcService = service.create(this.sendRpc.bind(this));
            this._rpcServices[v] = rpcService;
        });

    }

    connect() {
        if (this.state != SocketState.Disconnect) return;
        this.state = SocketState.Connecting;
        this._socket.connectByUrl(this.url);
    }

    send(rpcName: ERequest, data: any) {
        return new Promise<IResponse>(resolve => {
            if (this.state != SocketState.Connected) {
                resolve({ error: { code: -1 } });
                return;
            }

            const serviceName = pbMgr.methodMap[rpcName];
            const service = this._rpcServices[serviceName];
            if (!service) {
                resolve({ error: { code: -2 } });
                return;
            }
            service[rpcName](data, resolve);
        });
    }

    close() {
        this.state = SocketState.Disconnect;
        this._socket.close();
    }

    private onOpen(e: Event) {
        this.state = SocketState.Connected;
        Logger.log("连接成功", this.url);
        const param:IReqLogin = {
				account: "1052938743@qq.com",
				password: GameUtil.HmacSHA256("zsk412824"),
				reconnect: false,
				device: GameUtil.getDeviceInfo(),
				random_key: platformMgr.deviceId,
				client_version: {
                    resource: netMgr.version,
                    package:"",
				},
				gen_access_token: true,
				currency_platforms: currency_platforms,
				type: this.login_type_tab_index,
				client_version_string: GameMgr.Inst.getClientVersion(),
				tag: GameMgr.Inst.getReportClientType()
			};
        this.send(ERequest.login, param).then(res => Logger.error("login", res));
    }

    private onMessage(data: Uint8Array) {
        const header: IHeaderData = { type: data[0] };
        switch (header.type) {
            case HeaderType.Response:
                if (data.length < 3)
                    throw new Error(`invalid message length.`);
                header.reqIndex = data[1] + (data[2] << 8);
                data = data.slice(3);
                break;
            case HeaderType.Notify:
                data = data.slice(1);
                break;
            default:
                throw new Error(`unknown header type: ${ header.type }`);
        }
        switch (header.type) {
            case HeaderType.Response:
                const requestID = header.reqIndex;
                const request = this._waitList[requestID];
                if (!request) {
                    Logger.error(`收到不存在的requestID: ${ requestID }`);
                    return;
                }
                delete this._waitList[requestID];
                const wrapper = pbMgr.decodeRpc(data);
                try {
                    request.cb(null, wrapper.data);
                } catch (err) {
                    Logger.error("处理回调时出错", err);
                }
                break;
            case HeaderType.Notify:
                const msg = pbMgr.decodeMessage(data);
                const msgName = msg.$type.fullName;
                this.event('OnNotify', [msgName, msg]);
                break;
        }
    }

    private onError(e: Event) {

    }

    private onClose(e: Event) {
        if (this.state == SocketState.Disconnect) return;
        this.state = SocketState.Disconnect;
        this._waitList = {};
        Laya.timer.once(1000, this, this.reconnect);
    }

    private sendRpc(method: protobuf.Method, request: Uint8Array, cb: protobuf.RPCImplCallback) {
        this._rpcIndex = (this._rpcIndex + 1) % 60007;
        const rpcID = this._rpcIndex;
        const header = pbMgr.encodeHeaderData({ type: HeaderType.Request, reqIndex: rpcID });
        const packet = pbMgr.encodeRpc(method.fullName, request);
        this._waitList[rpcID] = { service: method.parent.fullName as ServiceType, method: method.name, cb };
        const byte = new Laya.Byte();
        byte.writeArrayBuffer(header);
        byte.writeArrayBuffer(packet);
        this._socket.send(byte.buffer);
        byte.clear();
    }

    private reconnect() {
        this.state = SocketState.Reconnecting;
        this._socket.connectByUrl(this.url);
    }
}