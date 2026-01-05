import UIRank from "../../../../ui/PkgMain/UIRank";
import { EUIRankType } from "../../define/MainDefine";

export const enum EUIRankMsg {
	OnBtnCloseClick = "UIRank_OnBtnCloseClick",
}

export class UIRankView extends ExtensionClass<IView, UIRank>(UIRank) implements IView {
	override readonly viewCategory = EViewCategory.Popup;
	get listRank() { return this.list_rank; }
	get btnSiMa() { return this.btn_siMa; }
	get btnSanMa() { return this.btn_sanMa; }
	get tabBtns() { return [this.btn_siMa, this.btn_sanMa]; }

	override onCreate() {
		const { btn_close, btn_siMa, btn_sanMa, list_rank } = this;
		btn_siMa.mode = btn_sanMa.mode = fgui.ButtonMode.Radio;
		btn_close.onClick(this, this.sendEvent, [EUIRankMsg.OnBtnCloseClick]);
	}

	refreshView(type: EUIRankType, count: number) {
		const { btn_siMa, btn_sanMa, txt_title, list_rank } = this;
		btn_siMa.selected = type == EUIRankType.SiMa;
		btn_sanMa.selected = type == EUIRankType.SanMa;
		txt_title.text = $lang(type == EUIRankType.SiMa ? 2796 : 2795);
		list_rank.numItems = count;
	}
}
