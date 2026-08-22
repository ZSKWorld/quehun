import ComMatchItem from "../../../../ui/PkgMain/ComMatchItem";

export const enum EComMatchItemMsg {
	OnBtnBgClick = "ComMatchItem_OnBtnBgClick",
	OnBtnInfoClick = "ComMatchItem_OnBtnInfoClick",
}

export class ComMatchItemView extends ComMatchItem {

	override onCreate() {
		const { btn_bg, btn_info } = this;
		btn_bg.onClick(this, this.event, [EComMatchItemMsg.OnBtnBgClick]);
		btn_info.onClick(this, this.event, [EComMatchItemMsg.OnBtnInfoClick]);
	}

}
