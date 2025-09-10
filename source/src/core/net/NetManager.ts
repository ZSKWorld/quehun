import { GameUtil } from "../common/utils/GameUtil";
import { Observer } from "../mvc/provider/Observer";
import { ServiceType } from "./NetDefine";
import { SocketEvent, WebSocket } from "./WebSocket";

export class NetManager extends Observer implements INetManager {
    private _ipConfig: IIPConfig;
    private _version: { version: string; };
    private _gateway: string;
    private _routes: IRouteInfo[];
    private _lobbySocket: WebSocket;
    private _gameSocket: WebSocket;
    private _obSocket: WebSocket;

    get version() { return this._version?.version || ""; }
    get clientVersion() { return 'web-' + this.version.replace('.w', ''); }

    async fetchConfig() {
        const ipConfig = await loadMgr.fetch(ResPath.ConfigPath.Ip_config, Laya.Loader.JSON);
        const version = await loadMgr.fetch("https://game.maj-soul.com/1/version.json", "json", null, { ignoreCache: true });
        this._ipConfig = ipConfig;
        this._version = version;
        const routes = await this.fetchRoutes();
        this._routes = routes.routes;
        this._gateway = routes.url;
        this._lobbySocket = new WebSocket(this._routes[0], "gateway", [ServiceType.Lobby]);
        
        for (const key in ERequest) {
            const service = pbMgr.methodMap[key];
            let socket: WebSocket;
            if (service == ServiceType.Lobby) socket = this._lobbySocket;
            else if (service == ServiceType.FastTest) socket = this._gameSocket;
            else if (service == ServiceType.Route) socket = this._lobbySocket;
            else continue;
            this[key] = (data) => {
                return socket.send(key as ERequest, data)
            };
        }

        this._lobbySocket.on(SocketEvent.ConnectSuccess, this, () => {
            const param: IReqLogin = {
                account: "1052938743@qq.com",
                password: GameUtil.HmacSHA256("zsk412824"),
                reconnect: false,
                device: gameMgr.getDeviceInfo(),
                random_key: gameMgr.deviceId,
                client_version: {
                    resource: netMgr.version,
                    package: "",
                },
                gen_access_token: true,
                currency_platforms: gameMgr.getCurrency(),
                type: 0,
                client_version_string: netMgr.clientVersion,
                tag: gameMgr.getReportClientType(),
                version: 0,
            };
            netMgr.login(param).then(res => Logger.error("login", res));
        });
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