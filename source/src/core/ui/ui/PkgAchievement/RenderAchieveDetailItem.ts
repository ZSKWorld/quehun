/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class RenderAchieveDetailItem extends fgui.GComponent {

	protected ctrl_icon: fgui.Controller;
	protected ctrl_state: fgui.Controller;
	protected com_reward: ComItem1View;
	protected btn_getReward: fgui.GButton;
	protected txt_name: fgui.GTextField;
	protected txt_desc: fgui.GTextField;
	protected txt_progress: fgui.GTextField;
	protected txt_time1: fgui.GTextField;
	protected txt_time2: fgui.GTextField;
	public static url: string = "ui://ko8zynrwoo1iobil";

	public static createInstance(): RenderAchieveDetailItem {
		return <RenderAchieveDetailItem>(fgui.UIPackage.createObject("PkgAchievement", "RenderAchieveDetailItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_icon = this.getControllerAt(0);
		this.ctrl_state = this.getControllerAt(1);
		this.com_reward = <ComItem1View>(this.getChildAt(2));
		this.btn_getReward = <fgui.GButton>(this.getChildAt(4));
		this.txt_name = <fgui.GTextField>(this.getChildAt(5));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(6));
		this.txt_progress = <fgui.GTextField>(this.getChildAt(7));
		this.txt_time1 = <fgui.GTextField>(this.getChildAt(8));
		this.txt_time2 = <fgui.GTextField>(this.getChildAt(9));
	}
}