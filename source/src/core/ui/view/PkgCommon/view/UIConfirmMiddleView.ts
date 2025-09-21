import UIConfirmMiddle from "../../../ui/PkgCommon/UIConfirmMiddle";

export const enum UIConfirmMiddleMsg {
	OnBtnCloseClick = "UIConfirmMiddle_OnBtnCloseClick",
	OnBtnConfirmClick = "UIConfirmMiddle_OnBtnConfirmClick",
	OnBtnCancelClick = "UIConfirmMiddle_OnBtnCancelClick",
}

export class UIConfirmMiddleView extends ExtensionClass<IView, UIConfirmMiddle>(UIConfirmMiddle) implements IView {

	override onCreate() {
        const { btn_close, btn_confirm, btn_cancel } = this;
		btn_close.onClick(this, this.sendEvent, [UIConfirmMiddleMsg.OnBtnCloseClick]);
		btn_confirm.onClick(this, this.sendEvent, [UIConfirmMiddleMsg.OnBtnConfirmClick]);
		btn_cancel.onClick(this, this.sendEvent, [UIConfirmMiddleMsg.OnBtnCancelClick]);
    }

}
