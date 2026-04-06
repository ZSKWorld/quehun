import UIVideo from "../../../../ui/PkgMain/UIVideo";

export const enum EUIVideoMsg {
}

export class UIVideoView extends ExtensionClass<IView, UIVideo>(UIVideo) implements IView {
	get transShow() { return this.trans_show; }
	get transHide() { return this.trans_hide; }
	get videoRoot() { return this.com_videoRoot; }

	override onCreate() {
		const { btn_jump } = this;
		btn_jump.onClick(this, this.closeSelf);
	}

	override onOpenAni() {
		return $uiUtil.playTrans(this.trans_show);
	}

	override onDisable() {
		if (this.trans_show.playing)
			this.trans_show.stop(true, true);
	}
}
