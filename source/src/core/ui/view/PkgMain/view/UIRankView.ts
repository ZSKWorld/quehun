import UIRank from "../../../ui/PkgMain/UIRank";
import { EUIRankType } from "../define/MainDefine";

export const enum EUIRankMsg {
	OnBtnCloseClick = "UIRank_OnBtnCloseClick",
	OnListLevelScroll = "UIRank_OnListLevelScroll",
	OnListLevelScrollEnd = "UIRank_OnListLevelScrollEnd",
}

export class UIRankView extends ExtensionClass<IView, UIRank>(UIRank) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		const { btn_close, btn_siMa, btn_sanMa, list_level } = this;
		btn_siMa.mode = btn_sanMa.mode = fgui.ButtonMode.Radio;
		btn_close.onClick(this, this.sendEvent, [EUIRankMsg.OnBtnCloseClick]);
		list_level.on(fgui.Events.SCROLL, this, this.sendEvent, [EUIRankMsg.OnListLevelScroll]);
		list_level.on(fgui.Events.SCROLL_END, this, this.sendEvent, [EUIRankMsg.OnListLevelScrollEnd]);
	}

	refreshView(type: EUIRankType, data: any[]) {
		const { btn_siMa, btn_sanMa, txt_title, list_level } = this;
		btn_siMa.selected = type == EUIRankType.SiMa;
		btn_sanMa.selected = type == EUIRankType.SanMa;
		txt_title.text = $lang(type == EUIRankType.SiMa ? 2796 : 2795);
		list_level.numItems = data.length;
	}
}
