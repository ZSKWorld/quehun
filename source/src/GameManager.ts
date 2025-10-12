import { ENotifyConst } from "./core/common/NotifyConst";
import { ObserverAll } from "./core/mvc/provider/ObserverAll";

export class GameManager extends ObserverAll implements IGameManager {

    private _inDmm = false;
    private _deviceId: string;
    private _version: { version: string; };
    private _clientEndPoint: ProtoObject<INetworkEndpoint>;
    get inDmm() { return this._inDmm; }
    get language() { return "chs"; }
    get clientType() { return "chs"; }
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
        } else if (this.clientType == 'en') {
            return 302;
        } else if (this.clientType == 'chs_t') {
            return 204;
        } else if (this.clientType == 'kr') {
            return 502;
        } else {
            return 402;
        }
    }
    get reportClientType() {
        switch (this.clientType) {
            case 'chs_t':
                return 'cn';
            case 'jp':
                return 'jp';
            case 'kr':
                return 'kr';
            case 'en':
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
        const device: IClientDeviceInfo = {
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
        Laya.timer.loop(1000, this, this.setMultiLoginTime);
        const version = await $loadMgr.fetch("https://game.maj-soul.com/1/version.json", "json", null, { ignoreCache: true });
        this._version = version;
    }

    showConfirm(msg: string) {
        return Promise.resolve(confirm(msg));
    }

    private setMultiLoginTime() {
        $localDataMgr.set(ELocalDataKey.MultiLogin, $timeUtil.second);
    }

    @InterestNotify(ENotifyConst.LoginSuccess)
    private loginSuccess() {
        $netMgr.requests.fetchConnectionInfo().then(res => {
            if (res.error) return;
            this._clientEndPoint = $decodeProtoData(res.client_endpoint);
        });
        $netMgr.requests.fetchClientValue();
        $userData.announcement.fetchAnnouncement();
    }

    @InterestMessage(EMessageID.login)
    @InterestMessage(EMessageID.oauth2Login)
    private onLogin() {
        $netMgr.requests.loginBeat({ contract: this.p2 });
    }
}