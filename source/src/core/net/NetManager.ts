import { ESocketEvent, WebSocket } from "./WebSocket";

export class NetManager extends Singleton<NetManager>() implements INetManager {
	private _gateway: string;
	private _routes: IRouteInfo[];
	private _lobbySocket: WebSocket;
	private _gameSocket: WebSocket;
	private _obSocket: WebSocket;

	requests: IReqMethod;

	get lobbyConnected() { return this._lobbySocket?.connected; }
	get gameConnected() { return this._gameSocket?.connected; }
	get obConnected() { return this._obSocket?.connected; }

	async init() {
		await this.fetchRoutes();

		this.initLobby();
		this.initGame();
		this.initOb();

		const reqs = {} as any;
		for (const key in ENetMessage) {
			const service = $pbMgr.method2Service[key];
			let socket: WebSocket;
			if (service == EServiceType.Lobby) socket = this._lobbySocket;
			else if (service == EServiceType.FastTest) socket = this._gameSocket;
			else if (service == EServiceType.Route) socket = this._lobbySocket;
			else continue;
			reqs[key] = data => socket.send(ENetMessage[key], data || {});
		}
		this.requests = Object.freeze(reqs);
	}

	private initLobby() {
		const socket = this._lobbySocket = new WebSocket(this._routes[0], "gateway");
		socket.on(ESocketEvent.Connecting, this, () => $facade.dispatch(ENotifyConst.LobbyConnecting));
		socket.on(ESocketEvent.Reconnecting, this, () => $facade.dispatch(ENotifyConst.LobbyReconnecting));
		socket.on(ESocketEvent.Connected, this, () => $facade.dispatch(ENotifyConst.LobbyConnected));
		socket.on(ESocketEvent.Closed, this, () => $facade.dispatch(ENotifyConst.LobbyClosed));
		socket.on(ESocketEvent.Response, this, (method: string, res: IResponse, req: IRequest) => {
			if (res.error)
				this.onResponseError(method, res, req);
			else
				$facade.dispatch(method, [res, req]);
		});
		socket.on(ESocketEvent.Notify, $facade, $facade.dispatch);
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

	private async fetchRoutes() {
		const gateways = $gameMgr.ipInfo.gateways;
		const routes = await Promise.race(gateways.map(v => {
			const url = `${ v.url }/api/clientgate/routes?platform=Web&version=${ $gameMgr.version }&lang=${ $gameMgr.clientType }`;
			return $loadMgr.fetch(url, Laya.Loader.JSON, null, { ignoreCache: true }).then(res => ({ routes: res?.data?.routes, url }));
		}));
		this._routes = routes.routes || [];
		this._gateway = routes.url;
	}

	private _ignoreErrRequest = new Set<string>([
		ENetMessage.heatbeat,
		ENetMessage.updateClientValue,
	]);
	private onResponseError(method: string, res: IResponse, req: IRequest) {
		if (req.ignoreError) return;
		const err = res.error;
		if (!err) return;
		if (this._ignoreErrRequest.has(method)) return;
		Logger.error(method, err);
		const { code, u32_params, str_params, json_param } = err;
		if (code == -1) {
			$confirmSma(2, $lang(2061));
		} else if (code == 156) {
			//排队
		} else if (code == 503) {
			//账号待删除
		} else {
			const errStr = $langNet(code) || $lang(2068);
			$confirmSma(2, errStr);
		}
	}

	@InterestNotify(ENotifyConst.LobbyClosed)
	private onLobbyClosed() {
		$confirmSma(2, $lang(2061));
	}
}