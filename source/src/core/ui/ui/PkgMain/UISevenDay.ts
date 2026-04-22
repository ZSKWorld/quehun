/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnSevenDayTabView } from "../../view/PkgMain/view/btns/BtnSevenDayTabView";
import { RenderSevenDayItemView } from "../../view/PkgMain/view/renders/RenderSevenDayItemView";
import { BtnSevenDayAnswerView } from "../../view/PkgMain/view/btns/BtnSevenDayAnswerView";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class UISevenDay extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
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
	protected img_finishDay0: fgui.GImage;
	protected img_finishDay1: fgui.GImage;
	protected img_finishDay2: fgui.GImage;
	protected img_finishDay3: fgui.GImage;
	protected img_finishDay4: fgui.GImage;
	protected img_finishDay5: fgui.GImage;
	protected img_finishDay6: fgui.GImage;
	protected com_task0: RenderSevenDayItemView;
	protected com_task1: RenderSevenDayItemView;
	protected com_task2: RenderSevenDayItemView;
	protected com_reward0: ComItem1View;
	protected com_reward1: ComItem1View;
	protected com_reward2: ComItem1View;
	protected loader_qaTitle: fgui.GLoader;
	protected loader_qaBg: fgui.GLoader;
	protected loader_qaChar: fgui.GLoader;
	protected btn_answer0: BtnSevenDayAnswerView;
	protected btn_answer1: BtnSevenDayAnswerView;
	protected btn_answer2: BtnSevenDayAnswerView;
	protected btn_qaClose: fgui.GButton;
	protected btn_qaSkip: fgui.GButton;
	protected txt_qaTip: fgui.GTextField;
	public static url: string = "ui://vith2b66afneobhp";

	public static createInstance(): UISevenDay {
		return <UISevenDay>(fgui.UIPackage.createObject("PkgMain", "UISevenDay"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
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
		this.img_finishDay0 = <fgui.GImage>(this.getChildAt(16));
		this.img_finishDay1 = <fgui.GImage>(this.getChildAt(17));
		this.img_finishDay2 = <fgui.GImage>(this.getChildAt(18));
		this.img_finishDay3 = <fgui.GImage>(this.getChildAt(19));
		this.img_finishDay4 = <fgui.GImage>(this.getChildAt(20));
		this.img_finishDay5 = <fgui.GImage>(this.getChildAt(21));
		this.img_finishDay6 = <fgui.GImage>(this.getChildAt(22));
		this.com_task0 = <RenderSevenDayItemView>(this.getChildAt(23));
		this.com_task1 = <RenderSevenDayItemView>(this.getChildAt(24));
		this.com_task2 = <RenderSevenDayItemView>(this.getChildAt(25));
		this.com_reward0 = <ComItem1View>(this.getChildAt(26));
		this.com_reward1 = <ComItem1View>(this.getChildAt(27));
		this.com_reward2 = <ComItem1View>(this.getChildAt(28));
		this.loader_qaTitle = <fgui.GLoader>(this.getChildAt(32));
		this.loader_qaBg = <fgui.GLoader>(this.getChildAt(33));
		this.loader_qaChar = <fgui.GLoader>(this.getChildAt(34));
		this.btn_answer0 = <BtnSevenDayAnswerView>(this.getChildAt(35));
		this.btn_answer1 = <BtnSevenDayAnswerView>(this.getChildAt(36));
		this.btn_answer2 = <BtnSevenDayAnswerView>(this.getChildAt(37));
		this.btn_qaClose = <fgui.GButton>(this.getChildAt(38));
		this.btn_qaSkip = <fgui.GButton>(this.getChildAt(39));
		this.txt_qaTip = <fgui.GTextField>(this.getChildAt(40));
	}
}