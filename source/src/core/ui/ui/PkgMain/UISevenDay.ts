/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnSevenDayTabView } from "../../view/PkgMain/view/btns/BtnSevenDayTabView";
import { RenderSevenDayItemView } from "../../view/PkgMain/view/renders/RenderSevenDayItemView";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class UISevenDay extends fgui.GComponent {

	protected btn_mask: fgui.GButton;
	protected loader_bg: fgui.GLoader;
	protected loader_char: fgui.GLoader;
	protected loader_title: fgui.GLoader;
	protected btn_close: fgui.GButton;
	protected btn_day0: BtnSevenDayTabView;
	protected btn_day1: BtnSevenDayTabView;
	protected btn_day2: BtnSevenDayTabView;
	protected btn_day3: BtnSevenDayTabView;
	protected btn_day4: BtnSevenDayTabView;
	protected btn_day5: BtnSevenDayTabView;
	protected btn_day6: BtnSevenDayTabView;
	protected com_task0: RenderSevenDayItemView;
	protected com_task1: RenderSevenDayItemView;
	protected com_task2: RenderSevenDayItemView;
	protected com_reward0: ComItem1View;
	protected com_reward1: ComItem1View;
	protected com_reward2: ComItem1View;
	public static url: string = "ui://vith2b66afneobhp";

	public static createInstance(): UISevenDay {
		return <UISevenDay>(fgui.UIPackage.createObject("PkgMain", "UISevenDay"));
	}

	protected override onConstruct(): void {
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.loader_bg = <fgui.GLoader>(this.getChildAt(2));
		this.loader_char = <fgui.GLoader>(this.getChildAt(3));
		this.loader_title = <fgui.GLoader>(this.getChildAt(4));
		this.btn_close = <fgui.GButton>(this.getChildAt(5));
		this.btn_day0 = <BtnSevenDayTabView>(this.getChildAt(9));
		this.btn_day1 = <BtnSevenDayTabView>(this.getChildAt(10));
		this.btn_day2 = <BtnSevenDayTabView>(this.getChildAt(11));
		this.btn_day3 = <BtnSevenDayTabView>(this.getChildAt(12));
		this.btn_day4 = <BtnSevenDayTabView>(this.getChildAt(13));
		this.btn_day5 = <BtnSevenDayTabView>(this.getChildAt(14));
		this.btn_day6 = <BtnSevenDayTabView>(this.getChildAt(15));
		this.com_task0 = <RenderSevenDayItemView>(this.getChildAt(16));
		this.com_task1 = <RenderSevenDayItemView>(this.getChildAt(17));
		this.com_task2 = <RenderSevenDayItemView>(this.getChildAt(18));
		this.com_reward0 = <ComItem1View>(this.getChildAt(19));
		this.com_reward1 = <ComItem1View>(this.getChildAt(20));
		this.com_reward2 = <ComItem1View>(this.getChildAt(21));
	}
}