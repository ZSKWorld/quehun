/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComSevenDayItem1View } from "../../view/PkgMain/view/coms/ComSevenDayItem1View";

export default class RenderSevenDayItem extends fgui.GComponent {

	protected ctrl_c1: fgui.Controller;
	protected com_item: ComSevenDayItem1View;
	protected btn_question: fgui.GButton;
	protected btn_goto: fgui.GButton;
	protected img_done: fgui.GImage;
	protected txt_title: fgui.GTextField;
	protected txt_progress: fgui.GTextField;
	public static url: string = "ui://vith2b66afneobhx";

	public static createInstance(): RenderSevenDayItem {
		return <RenderSevenDayItem>(fgui.UIPackage.createObject("PkgMain", "RenderSevenDayItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_c1 = this.getControllerAt(0);
		this.com_item = <ComSevenDayItem1View>(this.getChildAt(1));
		this.btn_question = <fgui.GButton>(this.getChildAt(2));
		this.btn_goto = <fgui.GButton>(this.getChildAt(3));
		this.img_done = <fgui.GImage>(this.getChildAt(4));
		this.txt_title = <fgui.GTextField>(this.getChildAt(5));
		this.txt_progress = <fgui.GTextField>(this.getChildAt(6));
	}
}