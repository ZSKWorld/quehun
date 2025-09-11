import { LocalData, LocalDataKey } from "./core/common/LocalData";
import { GameUtil } from "./core/common/utils/GameUtil";

export class GameManager implements IGameManager {

    private _inDmm = false;
    private _deviceId: string;
    private _version: { version: string; };
    get deviceId() {
        if (!this._deviceId) {
            this._deviceId = LocalData.get(LocalDataKey.DeviceId);
            if (!this._deviceId) {
                this._deviceId = GameUtil.createUUID();
                LocalData.set(LocalDataKey.DeviceId, this._deviceId);
            }
        }
        return this._deviceId;
    }
    get language() { return "chs"; }
    get clientType() { return "chs"; }
    get version() { return this._version?.version || ""; }
    get clientVersion() { return 'web-' + this.version.replace('.w', ''); }
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

    async init() {
        const version = await loadMgr.fetch("https://game.maj-soul.com/1/version.json", "json", null, { ignoreCache: true });
        this._version = version;
    }

    getDeviceInfo() {
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
    getCurrency() {
        const info = cfgMgr.mall.channel_config.get(this.payChannelId);
        if (!info.currency_platforms) return [];
        return info.currency_platforms.split("-").map(Number);
    }

    showConfirm(msg: string) {
        return Promise.resolve(confirm(msg));
    }
    getReportClientType() {
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
}