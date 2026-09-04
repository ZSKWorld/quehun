import { ESocketEvent, WebSocket } from "./WebSocket";

@Singleton
export class NetManager implements INetManager {
	private _gateway: string;
	private _routes: IRouteInfo[];
	private _requests: IReqMethod = new Proxy({} as any, {
		get: (target: Object, prop) => {
			if (target[prop] !== void 0) return target[prop];
			return $gameUtil.emptyFunc;
		}
	});

	private _lobbySocket: WebSocket;
	private _gameSocket: WebSocket;
	private _obSocket: WebSocket;

	get requests() { return this._requests; };
	get lobbyConnected() { return !!this._lobbySocket?.connected; }
	get gameConnected() { return !!this._gameSocket?.connected; }
	get obConnected() { return !!this._obSocket?.connected; }

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
		this._requests = $gameUtil.freeze(new Proxy(reqs, {
			get: (target: Object, prop) => {
				if (target[prop] !== void 0)
					return target[prop];
				$logger.error("请求方法不存在", prop);
				return $gameUtil.emptyFunc;
			}
		}));
	}

	private initLobby() {
		const info = this._routes.first;
		const socket = this._lobbySocket = new WebSocket(info, "gateway");
		socket.on(ESocketEvent.OnConnecting, $facade, $facade.dispatch, [EGlobalEvent.LobbyConnecting]);
		socket.on(ESocketEvent.OnReconnecting, $facade, $facade.dispatch, [EGlobalEvent.LobbyReconnecting]);
		socket.on(ESocketEvent.OnConnect, this, () => {
			$facade.dispatch(EGlobalEvent.LobbyConnected);
			this._requests.requestConnection({
				type: 1,
				route_id: info.id,
				timestamp: $timeUtil.second,
				platform: $gameMgr.detailPlatform
			}).then(res => {
				// $logger.error("requestConnection", res);
			});
		});
		socket.on(ESocketEvent.OnClosed, $facade, $facade.dispatch, [EGlobalEvent.LobbyClosed]);
		socket.on(ESocketEvent.OnResponse, this, (method: string, res: IResponse, req: IRequest) => {
			if (res.error)
				this.onResponseError(method, res, req);
			else
				$facade.dispatch(method, [res, req]);
		});
		socket.on(ESocketEvent.OnNotify, this, (notify: string, res: INotify) => {
			$logger.error("on notify", notify, res);
			$facade.dispatch(notify, res);
		});
	}
	private initGame() {
		// const socket = this._gameSocket = new WebSocket(this._routes.first, "gateway");
		// socket.on(ESocketEvent.Connecting, $facade, $facade.dispatch, [EGlobalEvent.GameConnecting]);
		// socket.on(ESocketEvent.Reconnecting, $facade, $facade.dispatch, [EGlobalEvent.GameReconnecting]);
		// socket.on(ESocketEvent.Connected, $facade, $facade.dispatch, [EGlobalEvent.GameConnected]);
		// socket.on(ESocketEvent.Closed, $facade, $facade.dispatch, [EGlobalEvent.GameClosed]);
		// socket.on(ESocketEvent.Response, this, (method: string, res: IResponse, req: IRequest) => {
		// 	if (res.error)
		// 		this.onResponseError(method, res, req);
		// 	else
		// 		$facade.dispatch(method, [res, req]);
		// });
		// socket.on(ESocketEvent.Notify, $facade, $facade.dispatch);
	}
	private initOb() {
		// const socket = this._obSocket = new WebSocket(this._routes.first, "gateway");
		// socket.on(ESocketEvent.Connecting, $facade, $facade.dispatch, [EGlobalEvent.OBConnecting]);
		// socket.on(ESocketEvent.Reconnecting, $facade, $facade.dispatch, [EGlobalEvent.OBReconnecting]);
		// socket.on(ESocketEvent.Connected, $facade, $facade.dispatch, [EGlobalEvent.OBConnected]);
		// socket.on(ESocketEvent.Closed, $facade, $facade.dispatch, [EGlobalEvent.OBClosed]);
		// socket.on(ESocketEvent.Response, this, (method: string, res: IResponse, req: IRequest) => {
		// 	if (res.error)
		// 		this.onResponseError(method, res, req);
		// 	else
		// 		$facade.dispatch(method, [res, req]);
		// });
		// socket.on(ESocketEvent.Notify, $facade, $facade.dispatch);
	}

	connectLobby() { this._lobbySocket?.connect(); }
	connectGame() { this._gameSocket?.connect(); }
	connectOb() { this._obSocket?.connect(); }

	closeLobby() { this._lobbySocket?.close(); }
	closeGame() { this._gameSocket?.close(); }
	closeOb() { this._obSocket?.close(); }

	closeAll() {
		this.closeLobby();
		this.closeGame();
		this.closeOb();
	}

	private async fetchRoutes() {
		const gateways = $gameMgr.ipInfo.gateways;
		const routes = await Promise.race(gateways.map(v => {
			const url = `${ v.url }/api/clientgate/routes?platform=${ $gameMgr.detailPlatform }&version=${ $gameMgr.packageVersion }&lang=${ $gameMgr.clientType }`;
			return $loadMgr.fetch(url, Laya.Loader.JSON, null, { ignoreCache: true }).then(res => ({ routes: res?.data?.routes, url: v.url }));
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
		$logger.error(method, res, req);
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

	@InjectGlobalEvent(EGlobalEvent.LobbyClosed)
	private onLobbyClosed() {
		$confirmSma(2, $lang(2061));
	}
}