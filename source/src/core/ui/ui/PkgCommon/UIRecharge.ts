/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";
import { ComRechargeVIPView } from "../../view/PkgCommon/view/coms/ComRechargeVIPView";

export default class UIRecharge extends ViewBase(fgui.GComponent) {

	protected com_back: ComBackView;
	protected btn_tab0: fgui.GButton;
	protected btn_tab1: fgui.GButton;
	protected btn_tab2: fgui.GButton;
	protected btn_tab3: fgui.GButton;
	protected btn_tab4: fgui.GButton;
	protected list_item: fgui.GList;
	protected com_vip: ComRechargeVIPView;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vx9zwserfpd2obgp";

	public static createInstance(): UIRecharge {
		return <UIRecharge>(fgui.UIPackage.createObject("PkgCommon", "UIRecharge"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_tab0 = <fgui.GButton>(this.getChildAt(6));
		this.btn_tab1 = <fgui.GButton>(this.getChildAt(7));
		this.btn_tab2 = <fgui.GButton>(this.getChildAt(8));
		this.btn_tab3 = <fgui.GButton>(this.getChildAt(9));
		this.btn_tab4 = <fgui.GButton>(this.getChildAt(10));
		this.list_item = <fgui.GList>(this.getChildAt(12));
		this.com_vip = <ComRechargeVIPView>(this.getChildAt(13));
		this.trans_show = this.getTransitionAt(0);
	}
}