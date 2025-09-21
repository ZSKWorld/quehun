import UIConfirmSmall from "../../../ui/PkgCommon/UIConfirmSmall";

export const enum UIConfirmSmallMsg {
	OnBtnCloseClick = "UIConfirmSmall_OnBtnCloseClick",
	OnBtnConfirmClick = "UIConfirmSmall_OnBtnConfirmClick",
	OnBtnCancelClick = "UIConfirmSmall_OnBtnCancelClick",
}

export class UIConfirmSmallView extends ExtensionClass<IView, UIConfirmSmall>(UIConfirmSmall) implements IView {

	override onCreate() {
        const { btn_close, btn_confirm, btn_cancel } = this;
		btn_close.onClick(this, this.sendEvent, [UIConfirmSmallMsg.OnBtnCloseClick]);
		btn_confirm.onClick(this, this.sendEvent, [UIConfirmSmallMsg.OnBtnConfirmClick]);
		btn_cancel.onClick(this, this.sendEvent, [UIConfirmSmallMsg.OnBtnCancelClick]);
    }

}
