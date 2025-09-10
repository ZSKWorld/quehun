import { ServiceType } from "./NetDefine";
import { WebSocket } from "./WebSocket";

export class NetManager implements INetManager {
    private _ipConfig: IIPConfig;
    private _version: { version: string; };
    private _gateway: string;
    private _routes: IRouteInfo[];
    private _lobbySocket: WebSocket;
    // private gameSocket: ISocket;
    // private obSocket: ISocket;

    async fetchConfig() {
        const ipConfig = await loadMgr.fetch(ResPath.ConfigPath.Ip_config, Laya.Loader.JSON);
        const version = await loadMgr.fetch("https://game.maj-soul.com/1/version.json", "json", null, { ignoreCache: true });
        this._ipConfig = ipConfig;
        this._version = version;
        const routes = await this.fetchRoutes();
        this._routes = routes.routes;
        this._gateway = routes.url;
        this._lobbySocket = new WebSocket(this._routes[0], "gateway", [ServiceType.Lobby]);
        this._lobbySocket.connect();
    }

    private fetchRoutes() {
        const gateways = this._ipConfig.ip[0].gateways;
        return Promise.race(gateways.map(v => {
            const url = `${ v.url }/api/clientgate/routes?platform=Web&version=${ this._version.version }&lang=chs`;
            return loadMgr.fetch(url, "json", null, { ignoreCache: true }).then(res => ({ routes: res?.data?.routes, url }));
        }));
    }
}