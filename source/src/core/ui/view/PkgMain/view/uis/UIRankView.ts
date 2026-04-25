import UIRank from "../../../../ui/PkgMain/UIRank";
import { EUIRankType } from "../../Definition";

export const enum EUIRankMsg {
}

export class UIRankView extends ExtensionClass<IView, UIRank>(UIRank) implements IView {
	get listRank() { return this.list_rank; }
	get btnSiMa() { return this.btn_siMa; }
	get btnSanMa() { return this.btn_sanMa; }
	get tabBtns() { return [this.btn_siMa, this.btn_sanMa]; }

	override onCreate() {
		const { btn_mask, btn_close, btn_siMa, btn_sanMa, list_rank } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
	}

	refreshView(type: EUIRankType, count: number) {
		const { btn_siMa, btn_sanMa, txt_title, list_rank } = this;
		btn_siMa.selected = type == EUIRankType.SiMa;
		btn_sanMa.selected = type == EUIRankType.SanMa;
		txt_title.text = $lang(type == EUIRankType.SiMa ? 2796 : 2795);
		list_rank.numItems = count;
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }
}
