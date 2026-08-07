/** 文本提示管理器 */
@Singleton
export class TipManager implements ITipManager {
	private _cache: string[] = [];
	private _inCD: boolean = false;

	showTip(text: string) {
		if (this._cache.includes(text)) return;
		this._cache.push(text);
		if (!this._inCD) this.showNext();
	}

	private showNext() {
		this._inCD = false;
		if (!this._cache.length) return;
		this._inCD = true;
		const mediator = Laya.Pool.getItemByCreateFun(EUIPoolKey.TipInfo, () => $facade.createMediator(EViewID.ComTipInfoView));
		mediator.data = this._cache.shift();
		$uiMgr.addToLayer(mediator.view, ELayer.UITop);
		Laya.timer.once(100, this, this.showNext);
	}
}