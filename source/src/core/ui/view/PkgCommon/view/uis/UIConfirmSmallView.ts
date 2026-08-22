import UIConfirmSmall from "../../../../ui/PkgCommon/UIConfirmSmall";

export const enum EUIConfirmSmallMsg {
	OnBtnCloseClick = "UIConfirmSmall_OnBtnCloseClick",
	OnBtnConfirmClick = "UIConfirmSmall_OnBtnConfirmClick",
	OnBtnCancelClick = "UIConfirmSmall_OnBtnCancelClick",
}

export class UIConfirmSmallView extends UIConfirmSmall {

	override onCreate() {
		const { btn_close, btn_confirm, btn_cancel } = this;
		btn_close.onClick(this, this.event, [EUIConfirmSmallMsg.OnBtnCloseClick]);
		btn_confirm.onClick(this, this.event, [EUIConfirmSmallMsg.OnBtnConfirmClick]);
		btn_cancel.onClick(this, this.event, [EUIConfirmSmallMsg.OnBtnCancelClick]);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
