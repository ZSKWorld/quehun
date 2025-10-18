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
        Logger.error($timeUtil.second, stime + 1.5, $timeUtil.second + 1800);
        return $timeUtil.second < stime + 1.5 && stime < $timeUtil.second + 1800;
    }
    get p2() { return "DF2vkXCnfeXp4WoGSBGNcJBufZiMN3UP" + (window["pertinent3"] || ""); }

    async init() {
        const version = await $loadMgr.fetch("https://game.maj-soul.com/1/version.json", "json", null, { ignoreCache: true });
        this._version = version;
    }

    showConfirm(msg: string) {
        return Promise.resolve(confirm(msg));
    }

    @InterestNotify(ENotifyConst.LoginSuccess)
    private loginSuccess() {
        $netMgr.requests.fetchConnectionInfo().then(res => {
            if (res.error) return;
            this._clientEndPoint = $decodeProtoData(res.client_endpoint);
        });
        $netMgr.requests.fetchClientValue();
        $userData.announcement.fetchAnnouncement();

        let lastHeatBeatTime = 0, lastMouseX = 0, lastMouseY = 0;
        //每6分钟心跳一次，挂机超过1个小时会掉线
        Laya.timer.loop(6 * 60 * 1000, this, () => {
            if (!$netMgr.lobbyConnected) return;
            //23/12/27新增，每6分钟同步服务器时间
            $netMgr.requests.fetchServerTime().then(res => {
                if (res.error) return;
                $timeUtil.setServerTime(res.server_time);
            });
            const t = ($timeUtil.milliSecond - lastHeatBeatTime) / 1000;
            $netMgr.requests.heatbeat({ no_operation_counter: t });
            //客户端有能力断线的话，超过50分钟就断线
            if (t >= 50 * 60) {
                this.onNotifyAccountLogout();
            }
        });
        Laya.timer.loop(1000, this, () => {
            const _m = Laya.stage.getMousePoint();
            if (_m.x != lastMouseX || _m.y != lastMouseY) {
                const t = ($timeUtil.milliSecond - lastHeatBeatTime) / 1000;
                //当玩家长时间不动，突然动了，通知一下服务器
                if (t > 40 * 60) {
                    $netMgr.requests.heatbeat({ no_operation_counter: 0 });
                }
                lastHeatBeatTime = $timeUtil.milliSecond;
                lastMouseX = _m.x;
                lastMouseY = _m.y;
            }
        });
        Laya.timer.loop(1000, this, () => {
            $localDataMgr.set(ELocalDataKey.MultiLogin, $timeUtil.second)
        });

    }

    @InterestMessage(EMessageID.login)
    @InterestMessage(EMessageID.oauth2Login)
    private onLogin() {
        $netMgr.requests.loginBeat({ contract: this.p2 });
    }

    @InterestMessage(ENotify.NotifyAnotherLogin)
    private onNotifyAnotherLogin() {
        $localDataMgr.set(ELocalDataKey.AutoLogin, 0);
        $confirmSma(2, "", $lang(2324)).then(v => {
            window.location.reload();
        });
    }

    @InterestMessage(ENotify.NotifyAccountLogout)
    private onNotifyAccountLogout() {
        $netMgr.closeLobby();
        $netMgr.closeGame();
        $netMgr.closeOb();
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

    @InterestMessage(ENotify.NotifyVipLevelChange)
    private onNotifyVipLevelChange(data: INotifyVipLevelChange) {
        Logger.error("NotifyVipLevelChange", data);
    }
}