import { ENotifyConst } from "../common/NotifyConst";
import { EServiceType } from "./NetDefine";
import { ESocketEvent, WebSocket } from "./WebSocket";

export class NetManager extends Laya.EventDispatcher implements INetManager {
    private _ipConfig: IIPConfig;
    private _gateway: string;
    private _routes: IRouteInfo[];
    private _lobbySocket: WebSocket;
    private _gameSocket: WebSocket;
    private _obSocket: WebSocket;

    requests: IReqMethod;

    async init() {
        this._ipConfig = await $loadMgr.fetch(ResPath.EConfigPath.Ip_config, Laya.Loader.JSON);
        await this.fetchRoutes();
        this._lobbySocket = new WebSocket(this._routes[0], "gateway");

        const reqs = this.requests = {} as any;
        for (const key in EMessageID) {
            const service = $pbMgr.method2Service[key];
            let socket: WebSocket;
            if (service == EServiceType.Lobby) socket = this._lobbySocket;
            else if (service == EServiceType.FastTest) socket = this._gameSocket;
            else if (service == EServiceType.Route) socket = this._lobbySocket;
            else continue;
            reqs[key] = data => socket.send(EMessageID[key], data);
        }

        this._lobbySocket.on(ESocketEvent.Connecting, this, () => $facade.dispatch(ENotifyConst.LobbyConnecting));
        this._lobbySocket.on(ESocketEvent.Reconnecting, this, () => $facade.dispatch(ENotifyConst.LobbyReconnecting));
        this._lobbySocket.on(ESocketEvent.Connected, this, () => $facade.dispatch(ENotifyConst.LobbyConnected));
        this._lobbySocket.on(ESocketEvent.Closed, this, () => $facade.dispatch(ENotifyConst.LobbyClosed));
        this._lobbySocket.on(ESocketEvent.Response, this, this.event);
        this._lobbySocket.on(ESocketEvent.Notify, this, this.event);
        this._lobbySocket.connect();
    }

    connectLobby() { this._lobbySocket?.connect(); }
    closeLobby() { this._lobbySocket?.close(); }

    connectGame() { this._gameSocket?.connect(); }
    closeGame() { this._gameSocket?.close(); }

    connectOb() { this._obSocket?.connect(); }
    closeOb() { this._obSocket?.close(); }

    interestMessage(caller: any) {
        if (!caller) return;
        const eventList = caller["__messageMap"];
        if (!eventList) return;
        for (const eventName in eventList) {
            const callbackList = eventList[eventName];
            for (const k in callbackList) {
                const callback: any = callbackList[k];
                const param = callback[eventName];
                const once = param ? param.__once : false;
                const args = param ? param.__args : null;
                if (once) {
                    this.once(eventName, caller, callback, args);
                } else {
                    this.on(eventName, caller, callback, args);
                }
            }
        }
    }

    private async fetchRoutes() {
        const gateways = this._ipConfig.ip[0].gateways;
        const routes = await Promise.race(gateways.map(v => {
            const url = `${ v.url }/api/clientgate/routes?platform=Web&version=${ $gameMgr.version }&lang=chs`;
            return $loadMgr.fetch(url, "json", null, { ignoreCache: true }).then(res => ({ routes: res?.data?.routes, url }));
        }));
        this._routes = routes.routes;
        this._gateway = routes.url;
    }
}