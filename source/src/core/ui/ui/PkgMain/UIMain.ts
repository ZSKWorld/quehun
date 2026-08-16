/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComMatchModeView } from "../../view/PkgMain/view/coms/ComMatchModeView";
import { BtnDengLongView } from "../../view/PkgMain/view/btns/BtnDengLongView";
import { BtnXunMiView } from "../../view/PkgMain/view/btns/BtnXunMiView";
import { ComMainPlayerInfoView } from "../../view/PkgMain/view/coms/ComMainPlayerInfoView";
import { BtnSevenDayView } from "../../view/PkgMain/view/btns/BtnSevenDayView";
import { ComCurrencyView } from "../../view/PkgCommon/view/coms/ComCurrencyView";

export default class UIMain extends ViewBase(fgui.GComponent) {

	protected com_matchMode: ComMatchModeView;
	protected btn_setting: fgui.GButton;
	protected btn_help: fgui.GButton;
	protected btn_guide: fgui.GButton;
	protected btn_camera: fgui.GButton;
	protected btn_achieve: fgui.GButton;
	protected com_currency0: ComCurrencyView;
	protected com_currency1: ComCurrencyView;
	protected btn_activity: fgui.GButton;
	protected btn_mail: BtnDengLongView;
	protected btn_rank: BtnDengLongView;
	protected btn_announcement: BtnDengLongView;
	protected group_rightTop: fgui.GGroup;
	protected btn_liaoShe: fgui.GButton;
	protected btn_friend: fgui.GButton;
	protected btn_observer: fgui.GButton;
	protected btn_paiPu: fgui.GButton;
	protected btn_bag: fgui.GButton;
	protected btn_shop: fgui.GButton;
	protected btn_treasure: BtnXunMiView;
	protected com_playInfo: ComMainPlayerInfoView;
	protected btn_qiri: BtnSevenDayView;
	protected btn_report: fgui.GButton;
	protected group_leftTop: fgui.GGroup;
	protected trans_in: fgui.Transition;
	protected trans_out: fgui.Transition;
	public static url: string = "ui://vith2b66vwgm0";

	public static createInstance(): UIMain {
		return <UIMain>(fgui.UIPackage.createObject("PkgMain", "UIMain"));
	}

	protected override onConstruct(): void {
		this.com_matchMode = <ComMatchModeView>(this.getChildAt(0));
		this.btn_setting = <fgui.GButton>(this.getChildAt(1));
		this.btn_help = <fgui.GButton>(this.getChildAt(2));
		this.btn_guide = <fgui.GButton>(this.getChildAt(3));
		this.btn_camera = <fgui.GButton>(this.getChildAt(4));
		this.btn_achieve = <fgui.GButton>(this.getChildAt(5));
		this.com_currency0 = <ComCurrencyView>(this.getChildAt(6));
		this.com_currency1 = <ComCurrencyView>(this.getChildAt(7));
		this.btn_activity = <fgui.GButton>(this.getChildAt(8));
		this.btn_mail = <BtnDengLongView>(this.getChildAt(9));
		this.btn_rank = <BtnDengLongView>(this.getChildAt(10));
		this.btn_announcement = <BtnDengLongView>(this.getChildAt(11));
		this.group_rightTop = <fgui.GGroup>(this.getChildAt(12));
		this.btn_liaoShe = <fgui.GButton>(this.getChildAt(13));
		this.btn_friend = <fgui.GButton>(this.getChildAt(14));
		this.btn_observer = <fgui.GButton>(this.getChildAt(15));
		this.btn_paiPu = <fgui.GButton>(this.getChildAt(16));
		this.btn_bag = <fgui.GButton>(this.getChildAt(17));
		this.btn_shop = <fgui.GButton>(this.getChildAt(18));
		this.btn_treasure = <BtnXunMiView>(this.getChildAt(19));
		this.com_playInfo = <ComMainPlayerInfoView>(this.getChildAt(20));
		this.btn_qiri = <BtnSevenDayView>(this.getChildAt(21));
		this.btn_report = <fgui.GButton>(this.getChildAt(22));
		this.group_leftTop = <fgui.GGroup>(this.getChildAt(23));
		this.trans_in = this.getTransitionAt(0);
		this.trans_out = this.getTransitionAt(1);
	}
}