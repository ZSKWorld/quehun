import { LocalData, LocalDataKey } from "../core/common/LocalData";
import { GameUtil } from "../core/common/utils/GameUtil";

export abstract class PlatformBase implements IPlatform {
    protected _deviceId: string;
    protected _safeArea: ISafeArea;
    protected _menuBtnArea: ISafeArea;
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
    get safeArea() { return this._safeArea; }
    get menuBtnArea() { return this._menuBtnArea; }

    constructor() {
        this.onFix();
        this.onInit();
    }
    getCurrency() {
        const currency_platforms:number[] = [];
        let info = cfg.mall.channel_config.get(GameMgr.payChannelId);
        if (info.currency_platforms) {
            let lst = info.currency_platforms.split('-');
            for (let id of lst) {
                currency_platforms.push(parseInt(id));
            }
        }
        return currency_platforms;
    }

    showConfirm(title: string, msg: string) {
        return Promise.resolve(false);
    }


    protected dispatch(eventName: string, data?: any) {
        facade.dispatch(eventName, data);
    }

    /** 引擎修复 */
    protected abstract onFix(): void;

    /** 初始化 */
    protected abstract onInit(): void;
}