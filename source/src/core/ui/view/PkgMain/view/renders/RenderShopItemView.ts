import RenderShopItem from "../../../../ui/PkgMain/RenderShopItem";

export const enum ERenderShopItemMsg {
	OnBtnBugClick = "RenderShopItem_OnBtnBugClick",
}

export class RenderShopItemView extends ExtensionClass<IView, RenderShopItem>(RenderShopItem) implements IView {

	override onCreate() {
		const { btn_bug } = this;
		btn_bug.onClick(this, this.sendEvent, [ERenderShopItemMsg.OnBtnBugClick]);
	}

}
