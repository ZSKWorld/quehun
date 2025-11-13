import UIEmail from "../../../ui/PkgMain/UIEmail";

export const enum EUIEmailMsg {
	OnBtnBackClick = "UIEmail_OnBtnBackClick",
}

export class UIEmailView extends ExtensionClass<IView, UIEmail>(UIEmail) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		const { btn_back } = this;
		btn_back.onClick(this, this.sendEvent, [EUIEmailMsg.OnBtnBackClick]);
	}

}
