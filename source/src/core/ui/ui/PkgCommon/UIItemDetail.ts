/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class UIItemDetail extends fgui.GComponent {

	protected ctrl_desc: fgui.Controller;
	protected ctrl_open: fgui.Controller;
	protected ctrl_go: fgui.Controller;
	protected graph_bg: fgui.GGraph;
	protected btn_close: fgui.GButton;
	protected com_item: ComItem1View;
	protected btn_open1: fgui.GButton;
	protected btn_open10: fgui.GButton;
	protected btn_goto: fgui.GButton;
	protected txt_name: fgui.GTextField;
	protected txt_desc1: fgui.GTextField;
	protected txt_desc2: fgui.GTextField;
	protected txt_goTitle: fgui.GTextField;
	protected txt_goDesc: fgui.GTextField;
	public static url: string = "ui://vx9zwsersi7robf6";

	public static createInstance(): UIItemDetail {
		return <UIItemDetail>(fgui.UIPackage.createObject("PkgCommon", "UIItemDetail"));
	}

	protected override onConstruct(): void {
		this.ctrl_desc = this.getControllerAt(0);
		this.ctrl_open = this.getControllerAt(1);
		this.ctrl_go = this.getControllerAt(2);
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(4));
		this.com_item = <ComItem1View>(this.getChildAt(5));
		this.btn_open1 = <fgui.GButton>(this.getChildAt(6));
		this.btn_open10 = <fgui.GButton>(this.getChildAt(7));
		this.btn_goto = <fgui.GButton>(this.getChildAt(8));
		this.txt_name = <fgui.GTextField>(this.getChildAt(9));
		this.txt_desc1 = <fgui.GTextField>(this.getChildAt(10));
		this.txt_desc2 = <fgui.GTextField>(this.getChildAt(11));
		this.txt_goTitle = <fgui.GTextField>(this.getChildAt(12));
		this.txt_goDesc = <fgui.GTextField>(this.getChildAt(13));
	}
}