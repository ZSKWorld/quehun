import { Observer } from "../mvc/provider/Observer";
import { ServiceType } from "./NetDefine";
import { SocketEvent, WebSocket } from "./WebSocket";

export class NetManager extends Observer implements INetManager {
    private _ipConfig: IIPConfig;
    private _gateway: string;
    private _routes: IRouteInfo[];
    private _lobbySocket: WebSocket;
    private _gameSocket: WebSocket;
    private _obSocket: WebSocket;


    async init() {
        this._ipConfig = await $loadMgr.fetch(ResPath.ConfigPath.Ip_config, Laya.Loader.JSON);
        await this.fetchRoutes();
        this._lobbySocket = new WebSocket(this._routes[0], "gateway");

        for (const key in EMessageID) {
            const service = $pbMgr.method2Service[key];
            let socket: WebSocket;
            if (service == ServiceType.Lobby) socket = this._lobbySocket;
            else if (service == ServiceType.FastTest) socket = this._gameSocket;
            else if (service == ServiceType.Route) socket = this._lobbySocket;
            else continue;
            this[key] = data => socket.send(EMessageID[key], data);
        }

        this._lobbySocket.on(SocketEvent.ConnectSuccess, this, () => {
            Logger.error("socket open")
        });
        this._lobbySocket.on(SocketEvent.Response, this, (methodName: string, data: any) => {
            Logger.error("response " + methodName, data);
            this.dispatch(methodName, data);
        });
        this._lobbySocket.on(SocketEvent.Notify, this, this.dispatch);
        this._lobbySocket.connect();
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