import { GameUtil } from "../common/utils/GameUtil";
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
        this._ipConfig = await loadMgr.fetch(ResPath.ConfigPath.Ip_config, Laya.Loader.JSON);
        await this.fetchRoutes();
        this._lobbySocket = new WebSocket(this._routes[0], "gateway");

        for (const key in EMessageID) {
            const service = pbMgr.method2Service[key];
            let socket: WebSocket;
            if (service == ServiceType.Lobby) socket = this._lobbySocket;
            else if (service == ServiceType.FastTest) socket = this._gameSocket;
            else if (service == ServiceType.Route) socket = this._lobbySocket;
            else continue;
            this[key] = (data) => {
                return socket.send(key as EMessageID, data)
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
                    resource: gameMgr.version,
                    package: "",
                },
                gen_access_token: true,
                currency_platforms: gameMgr.getCurrency(),
                type: 0,
                client_version_string: gameMgr.clientVersion,
                tag: gameMgr.getReportClientType(),
                version: 0,
            };
            netMgr.login(param);
        });
        this._lobbySocket.on(SocketEvent.Response, this, this.dispatch);
        this._lobbySocket.on(SocketEvent.Notify, this, this.dispatch);
        this._lobbySocket.connect();
    }

    private async fetchRoutes() {
        const gateways = this._ipConfig.ip[0].gateways;
        const routes = await Promise.race(gateways.map(v => {
            const url = `${ v.url }/api/clientgate/routes?platform=Web&version=${ gameMgr.version }&lang=chs`;
            return loadMgr.fetch(url, "json", null, { ignoreCache: true }).then(res => ({ routes: res?.data?.routes, url }));
        }));
        this._routes = routes.routes;
        this._gateway = routes.url;
    }
}