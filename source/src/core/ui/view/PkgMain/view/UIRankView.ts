import UIRank from "../../../ui/PkgMain/UIRank";
import { EUIRankType } from "../event/MainDefine";

export const enum EUIRankMsg {
	OnBtnCloseClick = "UIRank_OnBtnCloseClick",
}

export class UIRankView extends ExtensionClass<IView, UIRank>(UIRank) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		const { btn_close, btn_siMa, btn_sanMa } = this;
		btn_siMa.mode = btn_sanMa.mode = fgui.ButtonMode.Radio;
		btn_close.onClick(this, this.sendEvent, [EUIRankMsg.OnBtnCloseClick]);
	}

	refreshView(type: EUIRankType, data: any[]) {
		const { btn_siMa, btn_sanMa, txt_title, list_level } = this;
		btn_siMa.selected = type == EUIRankType.SiMa;
		btn_sanMa.selected = type == EUIRankType.SanMa;
		txt_title.text = $lang(type == EUIRankType.SiMa ? 2796 : 2795);
		list_level.numItems = data.length;
	}
}
