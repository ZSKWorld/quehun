import UITreasure from "../../../ui/PkgMain/UITreasure";

export const enum EUITreasureMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UITreasureView extends ExtensionClass<IView, UITreasure>(UITreasure) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.btn_back.onClick(this, this.sendEvent, [EUITreasureMsg.OnComBackClick]);
	}

}
