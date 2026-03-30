import UIVideo from "../../../../ui/PkgMain/UIVideo";

export const enum EUIVideoMsg {
	OnBtnJumpClick = "UIVideo_OnBtnJumpClick",
}

export class UIVideoView extends ExtensionClass<IView, UIVideo>(UIVideo) implements IView {
	get transShow() { return this.trans_show; }
	get transHide() { return this.trans_hide; }
	get videoRoot() { return this.com_videoRoot; }

	override onCreate() {
		const { btn_jump } = this;
		btn_jump.onClick(this, this.sendEvent, [EUIVideoMsg.OnBtnJumpClick]);
	}

	override onOpenAni() {
		return $uiUtil.playTrans(this.trans_show);
	}
}
