import UIActivity from "../../../ui/PkgMain/UIActivity";

export const enum EUIActivityMsg {
	OnBtnBackClick = "UIActivity_OnBtnBackClick",
}

export class UIActivityView extends ExtensionClass<IView, UIActivity>(UIActivity) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		const { btn_back } = this;
		btn_back.onClick(this, this.sendEvent, [EUIActivityMsg.OnBtnBackClick]);
	}

}
