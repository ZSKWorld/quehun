import UIVideo from "../../../../ui/PkgMain/UIVideo";

export const enum EUIVideoMsg {
	OnBtnJumpClick = "UIVideo_OnBtnJumpClick",
}

export class UIVideoView extends ExtensionClass<IView, UIVideo>(UIVideo) implements IView {

	override onCreate() {
		const { btn_jump } = this;
		btn_jump.onClick(this, this.sendEvent, [EUIVideoMsg.OnBtnJumpClick]);
	}

	override onOpenAni() {
		const data = this.mediator.data as IUIVideoData;
		this.img_bg.alpha = (data.showIn || data.showOut) ? 0 : 1;
		if (data.showIn)
			return $uiUtil.playTrans(this.trans_show);
		else
			return $timeUtil.wait(1000);
	}
}
