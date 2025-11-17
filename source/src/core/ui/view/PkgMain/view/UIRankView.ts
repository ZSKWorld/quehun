import UIRank from "../../../ui/PkgMain/UIRank";

export const enum EUIRankMsg {
	OnBtnCloseClick = "UIRank_OnBtnCloseClick",
	OnBtnSiMaClick = "UIRank_OnBtnSiMaClick",
	OnBtnSanMaClick = "UIRank_OnBtnSanMaClick",
}

export class UIRankView extends ExtensionClass<IView, UIRank>(UIRank) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		const { btn_close, btn_siMa, btn_sanMa } = this;
		btn_siMa.mode = btn_sanMa.mode = fgui.ButtonMode.Radio;
		btn_close.onClick(this, this.sendEvent, [EUIRankMsg.OnBtnCloseClick]);
		btn_siMa.onClick(this, this.sendEvent, [EUIRankMsg.OnBtnSiMaClick]);
		btn_sanMa.onClick(this, this.sendEvent, [EUIRankMsg.OnBtnSanMaClick]);
	}

	refreshLevelType(type: 3 | 4) {
		const { btn_siMa, btn_sanMa, txt_title } = this;
		btn_siMa.selected = type == 4;
		btn_sanMa.selected = type == 3;
		txt_title.text = $lang(type == 4 ? 2796 : 2795);
	}

	refreshList(data: any[]) {
		const { list_level } = this;
		list_level.numItems = data.length;
	}
}
