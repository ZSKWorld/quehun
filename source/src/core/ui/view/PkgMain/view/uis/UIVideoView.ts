import UIVideo from "../../../../ui/PkgMain/UIVideo";

export const enum EUIVideoMsg {
	OnBtnJumpClick = "UIVideo_OnBtnJumpClick",
}

export class UIVideoView extends ExtensionClass<IView, UIVideo>(UIVideo) implements IView {

	override onCreate() {
		const { btn_jump } = this;
		btn_jump.onClick(this, this.sendEvent, [EUIVideoMsg.OnBtnJumpClick]);
	}

}
