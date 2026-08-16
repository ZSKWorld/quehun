import UIConfirmBig from "../../../../ui/PkgCommon/UIConfirmBig";

export const enum EUIConfirmBigMsg {
	OnBtnCloseClick = "UIConfirmBig_OnBtnCloseClick",
	OnBtnConfirmClick = "UIConfirmBig_OnBtnConfirmClick",
	OnBtnCancelClick = "UIConfirmBig_OnBtnCancelClick",
}

export class UIConfirmBigView extends UIConfirmBig {

	override onCreate() {
		const { btn_close, btn_confirm, btn_cancel } = this;
		btn_close.onClick(this, this.sendEvent, [EUIConfirmBigMsg.OnBtnCloseClick]);
		btn_confirm.onClick(this, this.sendEvent, [EUIConfirmBigMsg.OnBtnConfirmClick]);
		btn_cancel.onClick(this, this.sendEvent, [EUIConfirmBigMsg.OnBtnCancelClick]);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
