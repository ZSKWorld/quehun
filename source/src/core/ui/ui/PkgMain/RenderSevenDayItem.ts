/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComSevenDayItem1View } from "../../view/PkgMain/view/coms/ComSevenDayItem1View";

export default class RenderSevenDayItem extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected com_item: ComSevenDayItem1View;
	protected btn_question: fgui.GButton;
	protected btn_jump: fgui.GButton;
	protected btn_getReward: fgui.GButton;
	protected img_done: fgui.GImage;
	protected txt_desc: fgui.GTextField;
	protected txt_progress: fgui.GTextField;
	public static url: string = "ui://vith2b66afneobhx";

	public static createInstance(): RenderSevenDayItem {
		return <RenderSevenDayItem>(fgui.UIPackage.createObject("PkgMain", "RenderSevenDayItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_item = <ComSevenDayItem1View>(this.getChildAt(1));
		this.btn_question = <fgui.GButton>(this.getChildAt(2));
		this.btn_jump = <fgui.GButton>(this.getChildAt(3));
		this.btn_getReward = <fgui.GButton>(this.getChildAt(4));
		this.img_done = <fgui.GImage>(this.getChildAt(5));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(6));
		this.txt_progress = <fgui.GTextField>(this.getChildAt(7));
	}
}