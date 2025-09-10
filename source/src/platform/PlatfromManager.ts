import { PlatformType } from "./PlatformDefine";
import { PlatformWeb } from "./PlatformWeb";
import { PlatformWX } from "./PlatformWX";

export class PlatfromManager implements IPlatformManager {
    private _platform: IPlatform;
    private get platformType() {
        return PlatformType.Web;
    }
    private get platform() {
        if (this._platform) return this._platform;
        switch (this.platformType) {
            case PlatformType.Wechat: this._platform = new PlatformWX(); break;
            default: this._platform = new PlatformWeb(); break;
        }
        return this._platform;
    }
    get deviceId() { return this.platform.deviceId; }
    get safeArea() { return this.platform.safeArea; }
    get menuBtnArea() { return this.platform.menuBtnArea; }

    showConfirm(title: string, msg: string) {
        return this.platform.showConfirm(title, msg);
    }

    isPlatform(platform: PlatformType) {
        return this.platformType == platform;
    }
}