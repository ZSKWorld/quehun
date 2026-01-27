import UITreasure from "../../../../ui/PkgMain/UITreasure";

export const enum EUITreasureMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UITreasureView extends ExtensionClass<IView, UITreasure>(UITreasure) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	override onOpenAni() { return this.com_back.onOpenAni(); }

	override onCloseAni() { return this.com_back.onCloseAni(); }
}
