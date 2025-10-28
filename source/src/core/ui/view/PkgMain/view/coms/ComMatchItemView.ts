import ComMatchItem from "../../../../ui/PkgMain/ComMatchItem";

export const enum EComMatchItemMsg {
	OnBtnInfoClick = "ComMatchItem_OnBtnInfoClick",
}

export class ComMatchItemView extends ExtensionClass<IView, ComMatchItem>(ComMatchItem) implements IView {

	override onCreate() {
		const { btn_info } = this;
		btn_info.onClick(this, this.sendEvent, [EComMatchItemMsg.OnBtnInfoClick]);
	}

}
