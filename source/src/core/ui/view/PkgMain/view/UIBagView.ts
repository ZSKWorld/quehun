import UIBag from "../../../ui/PkgMain/UIBag";

export const enum EUIBagMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIBagView extends ExtensionClass<IView, UIBag>(UIBag) implements IView {
	get tabBtns() {
		return [this.btn_daoJu, this.btn_liWu, this.btn_zhuangBan, this.btn_fuShi, this.btn_chaHua];
	}

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.sendEvent, [EUIBagMsg.OnComBackClick]);
	}

	onOpenAni() {
		return this.com_back.mediator.onOpenAni();
	}

	onCloseAni() {
		return this.com_back.mediator.onCloseAni();
	}

}
