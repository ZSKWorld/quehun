import ComLiaoSheChar from "../../../../ui/PkgMain/ComLiaoSheChar";

export const enum EComLiaoSheCharMsg {
	OnBtnSortClick = "ComLiaoSheChar_OnBtnSortClick",
	OnBtnFilterClick = "ComLiaoSheChar_OnBtnFilterClick",
	OnBtnStarClick = "ComLiaoSheChar_OnBtnStarClick",
}

export class ComLiaoSheCharView extends ExtensionClass<IView, ComLiaoSheChar>(ComLiaoSheChar) implements IView {

	override onCreate() {
		const { btn_sort, btn_filter, btn_star } = this;
		btn_sort.onClick(this, this.sendEvent, [EComLiaoSheCharMsg.OnBtnSortClick]);
		btn_filter.onClick(this, this.sendEvent, [EComLiaoSheCharMsg.OnBtnFilterClick]);
		btn_star.onClick(this, this.sendEvent, [EComLiaoSheCharMsg.OnBtnStarClick]);
	}

	override onEnable() {
		this.list_chars.numItems = $userData.character.chars.length;
	}
}
