/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComTitleView } from "../../view/PkgCommon/view/coms/ComTitleView";
import PbLoading3 from "./PbLoading3";

export default class ComRechargeVIP extends ViewBase(fgui.GComponent) {

	protected ctrl_type: fgui.Controller;
	protected com_title: ComTitleView;
	protected com_curTitle: ComTitleView;
	protected com_nextTitle: ComTitleView;
	protected list_rewards: fgui.GList;
	protected pb_vip: PbLoading3;
	protected btn_getReward: fgui.GButton;
	protected btn_last: fgui.GButton;
	protected btn_next: fgui.GButton;
	protected txt_desc: fgui.GTextField;
	protected txt_info1: fgui.GTextField;
	protected txt_info2: fgui.GTextField;
	protected txt_desc2: fgui.GTextField;
	public static url: string = "ui://vx9zwserexetobio";

	public static createInstance(): ComRechargeVIP {
		return <ComRechargeVIP>(fgui.UIPackage.createObject("PkgCommon", "ComRechargeVIP"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_title = <ComTitleView>(this.getChildAt(6));
		this.com_curTitle = <ComTitleView>(this.getChildAt(7));
		this.com_nextTitle = <ComTitleView>(this.getChildAt(8));
		this.list_rewards = <fgui.GList>(this.getChildAt(9));
		this.pb_vip = <PbLoading3>(this.getChildAt(10));
		this.btn_getReward = <fgui.GButton>(this.getChildAt(11));
		this.btn_last = <fgui.GButton>(this.getChildAt(12));
		this.btn_next = <fgui.GButton>(this.getChildAt(13));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(16));
		this.txt_info1 = <fgui.GTextField>(this.getChildAt(17));
		this.txt_info2 = <fgui.GTextField>(this.getChildAt(18));
		this.txt_desc2 = <fgui.GTextField>(this.getChildAt(20));
	}
}