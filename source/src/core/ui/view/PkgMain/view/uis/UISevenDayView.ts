import { RadioGroup } from "../../../../extention/RadioGroup";
import UISevenDay from "../../../../ui/PkgMain/UISevenDay";

export const enum EUISevenDayMsg {
	OnTabSelectChanged = "EUISevenDayMsg_OnTabSelectChanged",
}

export class UISevenDayView extends ExtensionClass<IView, UISevenDay>(UISevenDay) implements IView {
	private _tabGroup = new RadioGroup();

	override onCreate() {
		const { btn_mask, btn_close, btn_day0, btn_day1, btn_day2, btn_day3, btn_day4, btn_day5, btn_day6 } = this;
		btn_mask.onClick(this, this.closeSelf);
		btn_close.onClick(this, this.closeSelf);
		this._tabGroup.init([btn_day0, btn_day1, btn_day2, btn_day3, btn_day4, btn_day5, btn_day6], this, this.onTabSelectChanged, "#d4815c", "#8d6f61");
	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, $langRes("myres/activity_qiri/img_4160.png"));
		$dynamicResMgr.setLoader(this.loader_char, $langRes("myres/activity_qiri/img_4207.png"));
		$dynamicResMgr.setLoader(this.loader_title, $langRes("myres/activity_qiri/img_3826.png"));
	}

	refreshTab(index: number) {
		this._tabGroup.selectIndex = index;
	}

	refreshContent() {

	}

	private onTabSelectChanged(index: number) {
		this.sendEvent(EUISevenDayMsg.OnTabSelectChanged, index);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this); }

	override onDisable() {
		this._tabGroup.clearSelection();
		$dynamicResMgr.clearLoaders(this.loader_bg, this.loader_char, this.loader_title);
	}
}
