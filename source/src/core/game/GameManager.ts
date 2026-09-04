import { Observer } from "../mvc/provider/Observer";

const enum EClientMessageType {
	RoomInvite = 1,
}

@Singleton
export class GameManager extends Observer implements IGameManager {
	private _inDmm = false;
	private _deviceId: string;
	private _clientEndPoint: ProtoObject<INetworkEndpoint>;
	private _config: IConfig;
	private _ipIndex: number;
	get released() { return false; }
	get platform() { return "WebGL"; };
	get reqPlatform() {
		if (this.inDmm) return "web_dmm";
		return "web";
	}
	get detailPlatform() { return "Web"; };
	get inDmm() { return this._inDmm; }
	get language() { return ELanguage.CHS; }
	get clientType() { return EClientType.CHST; }
	get packageVersion() {
		return "4.0.46";
	}
	get resourceVersion() {
		return "0.16.274";
	}
	get clientVersionStr() {
		return this.platform + "_2022-" + this.resourceVersion;
	}
	get displayVersionStr() {
		return "v" + this.resourceVersion + "." + this.platform[0] + "." + this.packageVersion;
	}
	get currency() {
		const info = $cfgMgr.mall.channel_config[this.payChannelId];
		if (!info.currency_platforms) return [];
		return info.currency_platforms.split("-").map(Number);
	}
	get payChannelId() {
		if (this._inDmm) {
			return 403;
		} else if (this.clientType == EClientType.EN) {
			return 302;
		} else if (this.clientType == EClientType.CHST) {
			return 204;
		} else if (this.clientType == EClientType.KR) {
			return 502;
		} else {
			return 402;
		}
	}
	get reportClientType() {
		switch (this.clientType) {
			case EClientType.CHST:
				return EReportTag.CN;
			case EClientType.JP:
				return EReportTag.JP;
			case EClientType.KR:
				return EReportTag.KR;
			case EClientType.EN:
				return EReportTag.EN;
		}
		return EReportTag.None;
	}
	get deviceId() {
		this._deviceId = this._deviceId || $localDataMgr.getStr(ELocalDataKey.DeviceId);
		if (!this._deviceId) {
			this._deviceId = $gameUtil.createUUID();
			$localDataMgr.setStr(ELocalDataKey.DeviceId, this._deviceId);
		}
		return this._deviceId;
	}
	get deviceInfo() {
		const userAgent = navigator.userAgent;
		const device: ProtoObject<IClientDeviceInfo> = {
			hardware: "pc",
			platform: "pc",
			os: "windows",
			os_version: "win10",
			sale_platform: "web",
			is_browser: true,
			software: "Chrome",
			model_number: "",
			screen_height: window.innerHeight,
			screen_width: window.innerWidth,
			user_agent: userAgent,
			screen_type: "ontouchstart" in window || navigator.maxTouchPoints > 0 ? 2 : 1,
			hardware_vendor: "",
			device_id: this.deviceId,
		};
		/;\s+([a-zA-Z0-9-_\s]+)\s+Build/.exec(userAgent);
		const type = (RegExp.$1).toLowerCase();
		if (type) device.model_number = type;
		return device;
	}
	get multiLogin() {
		const stime = $localDataMgr.getNum(ELocalDataKey.MultiLogin);
		if (!stime) return false;
		return $timeUtil.second < stime + 1.5 && stime < $timeUtil.second + 1800;
	}
	get regionLimited() { return this.clientType == EClientType.KR; }
	get p2() { return "DF2vkXCnfeXp4WoGSBGNcJBufZiMN3UP" + (window["pertinent3"] || ""); }
	get config() { return this._config; }
	get ipInfo() { return this._config.ip[this._ipIndex]; }
	get zoneIds() { return this.ipInfo.zone_ids; }

	init(ipIndex: number, config: IConfig) {
		this._ipIndex = ipIndex;
		this._config = config;
	}

	showConfirm(msg: string) {
		return Promise.resolve(confirm(msg));
	}

	@InjectNetEvent(ENetNotify.NotifyAnotherLogin, false, [true, 2324])
	@InjectNetEvent(ENetNotify.NotifyAccountLogout, false, [false, 2329])
	exitGame(logout: boolean, tipLangId?: number) {
		if (logout) {
			$netMgr.requests.logout();
			$localDataMgr.setBool(ELocalDataKey.AutoLogin, false);
		}
		$netMgr.closeAll();
		if (tipLangId) {
			$confirmSma(2, $lang(tipLangId)).then(() => {
				// window.location.reload();
			});
		} else {
			// window.location.reload();
		}
	}

	@InjectGlobalEvent(EGlobalEvent.LoginSuccess)
	private loginSuccess() {
		$netMgr.requests.fetchConnectionInfo();
		//每6分钟同步服务器时间
		Laya.timer.loop(360 * 1000, this, () => {
			if (!$netMgr.lobbyConnected) return;
			$netMgr.requests.fetchServerTime();
		});
	}

	@InjectNetEvent(ENetMessage.fetchConnectionInfo)
	private onFetchConnectionInfo(res: IResConnectionInfo) {
		this._clientEndPoint = $decodeProtoData(res.client_endpoint);
	}

	@InjectNetEvent(ENetMessage.login)
	@InjectNetEvent(ENetMessage.oauth2Login)
	private onLogin() {
		$netMgr.requests.loginBeat({ contract: this.p2 });
	}

	@InjectNetEvent(ENetNotify.NotifyClientMessage)
	private onNotifyClientMessage(data: INotifyClientMessage) {
		if (data.type == EClientMessageType.RoomInvite) {
			$logger.error("有邀请", data);
		}
	}

	@InjectNetEvent(ENetMessage.fetchServerTime)
	private onFetchServerTime(res: IResServerTime) {
		$timeUtil.setServerTime(res.server_time * 1000);
	}
}