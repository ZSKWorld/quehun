import { ENotifyConst } from "./core/common/NotifyConst";
import { ObserverAll } from "./core/mvc/provider/ObserverAll";

const enum EClientMessageType {
	RoomInvite = 1,
}

export class GameManager extends ObserverAll implements IGameManager {

	private _inDmm = false;
	private _deviceId: string;
	private _version: { version: string; };
	private _clientEndPoint: ProtoObject<INetworkEndpoint>;
	get inDmm() { return this._inDmm; }
	get language() { return ELanguage.CHS; }
	get clientLanguage() {
		if (this.clientType == EClientType.EN && this.language == ELanguage.KR)
			return ELanguage.US_KR;
		return this.language;
	}
	get clientType() { return EClientType.CHS; }
	get version() { return this._version?.version || ""; }
	get clientVersion() { return 'web-' + this.version.replace('.w', ''); }
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
				return 'cn';
			case EClientType.JP:
				return 'jp';
			case EClientType.KR:
				return 'kr';
			case EClientType.EN:
				return 'en';
		}
		return 'unknown';
	}
	get deviceId() {
		this._deviceId = this._deviceId || $localDataMgr.get(ELocalDataKey.DeviceId);
		if (!this._deviceId) {
			this._deviceId = $gameUtil.createUUID();
			$localDataMgr.set(ELocalDataKey.DeviceId, this._deviceId);
		}
		return this._deviceId;
	}
	get deviceInfo() {
		const userAgent = navigator.userAgent;
		const device: ProtoObject<IClientDeviceInfo> = {
			hardware: 'pc',
			platform: 'pc',
			os: 'windows',
			os_version: 'win10',
			sale_platform: 'web',
			is_browser: true,
			software: 'Chrome',
			model_number: '',
			screen_height: window.innerHeight,
			screen_width: window.innerWidth,
			user_agent: userAgent,
			screen_type: 'ontouchstart' in window || navigator.maxTouchPoints > 0 ? 2 : 1,
			hardware_vendor: ""
		};
		/;\s+([a-zA-Z0-9-_\s]+)\s+Build/.exec(userAgent);
		const type = (RegExp.$1).toLowerCase();
		if (type) device.model_number = type;
		return device;
	}
	get multiLogin() {
		const stime = $localDataMgr.get<number>(ELocalDataKey.MultiLogin);
		if (!stime) return false;
		return $timeUtil.second < stime + 1.5 && stime < $timeUtil.second + 1800;
	}
	get regionLimited() { return this.clientType == EClientType.KR; }
	get p2() { return "DF2vkXCnfeXp4WoGSBGNcJBufZiMN3UP" + (window["pertinent3"] || ""); }

	private _hangOutTime = 0;
	private _lastHeatBeatTime = $timeUtil.second;
	private _lastMousePoint = new Laya.Point();

	async init() {
		const version = await $loadMgr.fetch(`https://game.maj-soul.com/1/version.json?randv=${ $timeUtil.milliSecond }`, "json", null, { ignoreCache: true });
		this._version = version;
	}

	showConfirm(msg: string) {
		return Promise.resolve(confirm(msg));
	}

	@InterestNotify(ENotifyConst.LoginSuccess)
	private loginSuccess() {
		$netMgr.requests.fetchConnectionInfo();
		Laya.timer.loop(1000, this, this.secondCheckLoop);
	}

	private secondCheckLoop() {
		if (!$netMgr.lobbyConnected) return;
		this._hangOutTime += 1;
		const { _hangOutTime, _lastHeatBeatTime, _lastMousePoint } = this;
		const t = $timeUtil.second - _lastHeatBeatTime;

		const mousePoint = Laya.stage.getMousePoint();
		if (mousePoint.x != _lastMousePoint.x || mousePoint.y != _lastMousePoint.y) {
			//当玩家长时间不动，突然动了，通知一下服务器
			if (t > 2400) {
				$netMgr.requests.heatbeat({ no_operation_counter: 0 });
			}
			this._lastHeatBeatTime = $timeUtil.second;
			_lastMousePoint.setTo(mousePoint.x, mousePoint.y);
		}

		$localDataMgr.set(ELocalDataKey.MultiLogin, $timeUtil.second);

		//23/12/27新增，每6分钟同步服务器时间
		if (_hangOutTime % 360 == 0) {
			$netMgr.requests.fetchServerTime();
			$netMgr.requests.heatbeat({ no_operation_counter: t });
			//客户端有能力断线的话，超过50分钟就断线
			if (t >= 3000) {
				this.onNotifyAccountLogout();
			}
		}
	}

	@InterestMessage(EMessageID.fetchConnectionInfo)
	private onFetchConnectionInfo(res: IResConnectionInfo) {
		this._clientEndPoint = $decodeProtoData(res.client_endpoint);
	}

	@InterestMessage(EMessageID.login)
	@InterestMessage(EMessageID.oauth2Login)
	private onLogin() {
		$netMgr.requests.loginBeat({ contract: this.p2 });
	}

	@InterestMessage(ENotify.NotifyAnotherLogin)
	private onNotifyAnotherLogin() {
		$netMgr.closeAll();
		$localDataMgr.set(ELocalDataKey.AutoLogin, 0);
		const loginInfo = $localDataMgr.get<ILoginInfo>(ELocalDataKey.LastLoginData);
		if (loginInfo) {
			loginInfo.access_token = "";
			$localDataMgr.set(ELocalDataKey.LastLoginData, loginInfo);
		}
		$confirmSma(2, "", $lang(2324)).then(v => {
		    // window.location.reload();
		});
	}

	@InterestMessage(ENotify.NotifyAccountLogout)
	private onNotifyAccountLogout() {
		$netMgr.closeAll();
		$confirmSma(2, "", $lang(2329)).then(v => {
			window.location.reload();
		});
	}

	@InterestMessage(ENotify.NotifyClientMessage)
	private onNotifyClientMessage(data: INotifyClientMessage) {
		if (data.type == EClientMessageType.RoomInvite) {
			Logger.error("有邀请", data);
		}
	}
}