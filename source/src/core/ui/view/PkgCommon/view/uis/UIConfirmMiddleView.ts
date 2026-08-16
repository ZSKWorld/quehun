import UIConfirmMiddle from "../../../../ui/PkgCommon/UIConfirmMiddle";

export const enum EUIConfirmMiddleMsg {
	OnBtnCloseClick = "UIConfirmMiddle_OnBtnCloseClick",
	OnBtnConfirmClick = "UIConfirmMiddle_OnBtnConfirmClick",
	OnBtnCancelClick = "UIConfirmMiddle_OnBtnCancelClick",
}

export class UIConfirmMiddleView extends UIConfirmMiddle {

	override onCreate() {
		const { btn_close, btn_confirm, btn_cancel } = this;
		btn_close.onClick(this, this.sendEvent, [EUIConfirmMiddleMsg.OnBtnCloseClick]);
		btn_confirm.onClick(this, this.sendEvent, [EUIConfirmMiddleMsg.OnBtnConfirmClick]);
		btn_cancel.onClick(this, this.sendEvent, [EUIConfirmMiddleMsg.OnBtnCancelClick]);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
