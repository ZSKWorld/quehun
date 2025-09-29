import { Observer } from "../mvc/provider/Observer";
import { EServiceType } from "./NetDefine";
import { ESocketEvent, WebSocket } from "./WebSocket";

export class NetManager extends Observer implements INetManager {
    private _ipConfig: IIPConfig;
    private _gateway: string;
    private _routes: IRouteInfo[];
    private _lobbySocket: WebSocket;
    private _gameSocket: WebSocket;
    private _obSocket: WebSocket;

    reqs: IReqMethod;

    async init() {
        this._ipConfig = await $loadMgr.fetch(ResPath.EConfigPath.Ip_config, Laya.Loader.JSON);
        await this.fetchRoutes();
        this._lobbySocket = new WebSocket(this._routes[0], "gateway");

        const reqs = this.reqs = {} as any;
        for (const key in EMessageID) {
            const service = $pbMgr.method2Service[key];
            let socket: WebSocket;
            if (service == EServiceType.Lobby) socket = this._lobbySocket;
            else if (service == EServiceType.FastTest) socket = this._gameSocket;
            else if (service == EServiceType.Route) socket = this._lobbySocket;
            else continue;
            reqs[key] = data => socket.send(EMessageID[key], data);
        }

        this._lobbySocket.on(ESocketEvent.ConnectSuccess, this, () => {
            Logger.error("socket open")
        });
        this._lobbySocket.on(ESocketEvent.Response, this, (methodName: string, data: any) => {
            Logger.error("response " + methodName, data);
            this.dispatch(methodName, data);
        });
        this._lobbySocket.on(ESocketEvent.Notify, this, this.dispatch);
        this._lobbySocket.connect();
    }

    connectLobby() { this._lobbySocket?.connect(); }
    closeLobby() { this._lobbySocket?.close(); }

    connectGame() { this._gameSocket?.connect(); }
    closeGame() { this._gameSocket?.close(); }

    connectOb() { this._obSocket?.connect(); }
    closeOb() { this._obSocket?.close(); }

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