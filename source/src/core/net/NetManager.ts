import { ServiceType } from "./NetDefine";
import { WebSocket } from "./WebSocket";

export class NetManager implements INetManager {
    private _ipConfig: IIPConfig;
    private _version: { version: string };
    private _routes: IRouteInfo[];
    private lobbySocket: WebSocket;
    // private gameSocket: ISocket;
    // private obSocket: ISocket;

    async fetchConfig() {
        const ipConfig = await loadMgr.fetch(ResPath.ConfigPath.Ip_config, Laya.Loader.JSON);
        const version = await loadMgr.fetch("https://game.maj-soul.com/1/version.json", "json", null, { ignoreCache: true });
        this._ipConfig = ipConfig;
        this._version = version;
        const routes = await this.fetchRoutes();
        this._routes = routes?.data?.routes;
        // Logger.error(this.ipConfig);
        // Logger.error(this.version);
        // Logger.error(this.routes);
        this.lobbySocket = new WebSocket(this._routes[0], "gateway", [ServiceType.Lobby]);
        this.lobbySocket.connect();
    }

    private fetchRoutes() {
        const urls = this._ipConfig.ip[0].gateways.map(v => `${ v.url }/api/clientgate/routes?platform=Web&version=${ this._version.version }&lang=chs`);
        return Promise.race(urls.map(v => loadMgr.fetch(v, "json", null, { ignoreCache: true })));
    }
}