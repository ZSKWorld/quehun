import UIShop from "../../../../ui/PkgMain/UIShop";

export const enum EUIShopMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIShopView extends ExtensionClass<IView, UIShop>(UIShop) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	override onOpenAni() { return this.com_back.onOpenAni(); }

	override onCloseAni() { return this.com_back.onCloseAni(); }
}
