import UIConfirmSmall from "../../../../ui/PkgCommon/UIConfirmSmall";

export const enum EUIConfirmSmallMsg {
	OnBtnConfirmClick = "UIConfirmSmall_OnBtnConfirmClick",
}

export class UIConfirmSmallView extends UIConfirmSmall {

	override onCreate() {
		const { btn_close, btn_confirm, btn_cancel } = this;
		btn_close.onClick(this, this.closeSelf);
		btn_cancel.onClick(this, this.closeSelf);
		btn_confirm.onClick(this, this.event, [EUIConfirmSmallMsg.OnBtnConfirmClick]);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
