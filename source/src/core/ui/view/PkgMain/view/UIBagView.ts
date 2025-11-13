import UIBag from "../../../ui/PkgMain/UIBag";

export const enum EUIBagMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
	OnBtnTestClick = "EUILiaoSheMsg_OnBtnTestClick",
}

export class UIBagView extends ExtensionClass<IView, UIBag>(UIBag) implements IView {

	override onCreate() {
		const { com_back, btn_test } = this;
		com_back.btn_back.onClick(this, this.sendEvent, [EUIBagMsg.OnComBackClick]);
		btn_test.onClick(this, this.sendEvent, [EUIBagMsg.OnBtnTestClick]);
	}

}
