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
	get zoneIds() { return this._ipConfig?.ip[0]?.zone_ids || []; }

	get lobbyConnected() { return this._lobbySocket?.connected; }
	get gameConnected() { return this._gameSocket?.connected; }
	get obConnected() { return this._obSocket?.connected; }

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
			reqs[key] = data => socket.send(EMessageID[key], data || {});
		}

		this.initLobby();
		this.initGame();
		this.initOb();
	}

	private initLobby() {
		this._lobbySocket.on(ESocketEvent.Connecting, this, () => $facade.dispatch(ENotifyConst.LobbyConnecting));
		this._lobbySocket.on(ESocketEvent.Reconnecting, this, () => $facade.dispatch(ENotifyConst.LobbyReconnecting));
		this._lobbySocket.on(ESocketEvent.Connected, this, () => $facade.dispatch(ENotifyConst.LobbyConnected));
		this._lobbySocket.on(ESocketEvent.Closed, this, () => $facade.dispatch(ENotifyConst.LobbyClosed));
		this._lobbySocket.on(ESocketEvent.Response, this, (method: string, res: IResponse, req: any) => {
			if (res.error)
				this.onResponseError(method, res.error);
			else
				this.event(method, [res, req]);
		});
		this._lobbySocket.on(ESocketEvent.Notify, this, this.event);
	}
	connectLobby() { this._lobbySocket?.connect(); }
	closeLobby() { this._lobbySocket?.close(); }

	private initGame() { }
	connectGame() { this._gameSocket?.connect(); }
	closeGame() { this._gameSocket?.close(); }
	
	private initOb() { }
	connectOb() { this._obSocket?.connect(); }
	closeOb() { this._obSocket?.close(); }

	closeAll() {
		this.closeLobby();
		this.closeGame();
		this.closeOb();
	}

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
		this._ipConfig.ip[0].zone_ids = this._ipConfig.ip[0].zone_ids || [];
		const gateways = this._ipConfig.ip[0].gateways;
		const routes = await Promise.race(gateways.map(v => {
			const url = `${ v.url }/api/clientgate/routes?platform=Web&version=${ $gameMgr.version }&lang=chs`;
			return $loadMgr.fetch(url, "json", null, { ignoreCache: true }).then(res => ({ routes: res?.data?.routes, url }));
		}));
		this._routes = routes.routes;
		this._gateway = routes.url;
	}

	private onResponseError(method: string, err: IError) {
		if (!err) return;
		if (method == EMessageID.heatbeat) return;
		Logger.error(method, err);
		const { code, u32_params, str_params, json_param } = err;
		if (code == -1) {
			$confirmSma(2, "", $lang(2061));
		} else if (code == 156) {
			//排队
		} else if (code == 503) {
			//账号待删除
		} else {
			const errStr = $netLang(code) || $lang(2068);
			$confirmSma(2, "", errStr);
		}
	}
}