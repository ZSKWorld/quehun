import { PlatformType } from "./PlatformDefine";
import { PlatformWeb } from "./PlatformWeb";
import { PlatformWX } from "./PlatformWX";

export class PlatfromManager implements IPlatformManager {
    private _platform: IPlatform;
    get stat() {
        return this._platform.config.stat;
    }
    get released() {
        return this._platform.config.released;
    }
    get platform() {
        return this._platform.config.platform;
    }
    get safeArea() {
        return this._platform.safeArea;
    }
    get menuBtnArea() {
        return this._platform.menuBtnArea;
    }
    get config() {
        return this._platform.config;
    }

    init() {
        const config = loadMgr.getRes<Laya.TextResource>(ResPath.UnclassifiedPath.Gameconfig).data;
        switch (config.platform) {
            case PlatformType.Wechat: this._platform = new PlatformWX(); break;
            default: this._platform = new PlatformWeb(); break;
        }
        this._platform.init(config);
    }

    showConfirm(title: string, msg: string) {
        return this._platform.showConfirm(title, msg);
    }

    isPlatform(platform: PlatformType) {
        return this.platform == platform;
    }
}