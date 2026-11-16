import UIConfirmMiddle from "../../../../ui/PkgCommon/UIConfirmMiddle";

export const enum EUIConfirmMiddleMsg {
	OnBtnConfirmClick = "UIConfirmMiddle_OnBtnConfirmClick",
}

export class UIConfirmMiddleView extends UIConfirmMiddle {

	override onCreate() {
		const { btn_close, btn_confirm, btn_cancel } = this;
		btn_close.onClick(this, this.closeSelf);
		btn_cancel.onClick(this, this.closeSelf);
		btn_confirm.onClick(this, this.event, [EUIConfirmMiddleMsg.OnBtnConfirmClick]);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
