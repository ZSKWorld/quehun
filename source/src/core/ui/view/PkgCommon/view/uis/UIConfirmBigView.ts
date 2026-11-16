import UIConfirmBig from "../../../../ui/PkgCommon/UIConfirmBig";

export const enum EUIConfirmBigMsg {
	OnBtnConfirmClick = "UIConfirmBig_OnBtnConfirmClick",
}

export class UIConfirmBigView extends UIConfirmBig {

	override onCreate() {
		const { btn_close, btn_confirm, btn_cancel } = this;
		btn_close.onClick(this, this.closeSelf);
		btn_cancel.onClick(this, this.closeSelf);
		btn_confirm.onClick(this, this.event, [EUIConfirmBigMsg.OnBtnConfirmClick]);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
