
export abstract class PlatformBase implements IPlatform {
    protected _safeArea: ISafeArea;
    protected _menuBtnArea: ISafeArea;
    get safeArea() { return this._safeArea; }
    get menuBtnArea() { return this._menuBtnArea; }

    constructor() {
        this.onFix();
        this.onInit();
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