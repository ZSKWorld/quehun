import ComMatchItem from "../../../../ui/PkgMain/ComMatchItem";

export const enum EComMatchItemMsg {
	OnBtnBgClick = "ComMatchItem_OnBtnBgClick",
	OnBtnInfoClick = "ComMatchItem_OnBtnInfoClick",
}

export class ComMatchItemView extends ExtendClass<IView, ComMatchItem>(ComMatchItem) implements IView {

	override onCreate() {
		const { btn_bg, btn_info } = this;
		btn_bg.onClick(this, this.sendEvent, [EComMatchItemMsg.OnBtnBgClick]);
		btn_info.onClick(this, this.sendEvent, [EComMatchItemMsg.OnBtnInfoClick]);
	}

}
