import UILoginWaitting from "../../../ui/PkgLogin/UILoginWaitting";

export const enum UILoginWaittingMsg {
	OnBtnCloseClick = "UILoginWaitting_OnBtnCloseClick",
}

export class UILoginWaittingView extends ExtensionClass<IView, UILoginWaitting>(UILoginWaitting) implements IView {

	override onCreate() {
        const { btn_close } = this;
		btn_close.onClick(this, this.sendEvent, [UILoginWaittingMsg.OnBtnCloseClick]);
    }

}
