import UIShop from "../../../../ui/PkgMain/UIShop";

export const enum EUIShopMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIShopView extends ExtensionClass<IView, UIShop>(UIShop) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.sendEvent, [EUIShopMsg.OnComBackClick]);
	}

	onOpenAni() {
		return this.com_back.mediator.onOpenAni();
	}

	onCloseAni() {
		return this.com_back.mediator.onCloseAni();
	}
}
