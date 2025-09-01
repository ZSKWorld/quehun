import { UIPoolKey } from "./UIPoolKey";

/** 文本提示管理器 */
export class TipManager implements ITipManager {
    private _cache: string[] = [];
    private _inCD: boolean = false;

    /**
     * 显示文本提示
     * @param text 显示文本
     * @param color 文本颜色，默认："#ffffff"
     */
    showTip(text: string, color?: string) {
        if (this._cache.includes(text)) return;
        this._cache.push(text, color);
        if (!this._inCD) this.showNext();
    }

    private showNext() {
        this._inCD = false;
        if (!this._cache.length) return;
        this._inCD = true;
        const mediator = Laya.Pool.getItemByCreateFun(UIPoolKey.TipInfo, () => facade.createMediator(ViewID.ComTipInfoView));
        mediator.data = { text: this._cache.shift(), color: this._cache.shift() };
        uiMgr.addToLayer(mediator.view, Layer.UITop);
        Laya.timer.once(100, this, this.showNext);
    }
}