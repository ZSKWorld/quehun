/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnItem1View } from "../../view/PkgCommon/view/btns/BtnItem1View";

export default class UIItemDetail extends fgui.GComponent {

	protected graph_bg: fgui.GGraph;
	protected btn_close: fgui.GButton;
	protected btn_item: BtnItem1View;
	protected btn_confirm: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected txt_desc1: fgui.GTextField;
	protected txt_desc2: fgui.GTextField;
	public static url: string = "ui://vx9zwsersi7robf6";

	public static createInstance(): UIItemDetail {
		return <UIItemDetail>(fgui.UIPackage.createObject("PkgCommon", "UIItemDetail"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(3));
		this.btn_item = <BtnItem1View>(this.getChildAt(4));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(5));
		this.txt_title = <fgui.GTextField>(this.getChildAt(6));
		this.txt_desc1 = <fgui.GTextField>(this.getChildAt(7));
		this.txt_desc2 = <fgui.GTextField>(this.getChildAt(8));
	}
}