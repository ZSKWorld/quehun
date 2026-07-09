import ComAchieveRecent from "../../../../ui/PkgAchievement/ComAchieveRecent";

export const enum EComAchieveRecentMsg {

}

export class ComAchieveRecentView extends ExtendClass<IView, ComAchieveRecent>(ComAchieveRecent) implements IView {

	private _opened: boolean = false;
	override onCreate() {
		this.onClick(this, this.changeOpenStat);
	}

	private changeOpenStat() {
		const opened = this._opened = !this._opened;
		const w = opened ? 559 : 120;
		const h = opened ? 832 : 64;
		const duration = Math.abs(w - this.width) / 439 * 0.1;
		fgui.GTween.kill(this);
		this.tweenResize(w, h, duration);
	}
}
