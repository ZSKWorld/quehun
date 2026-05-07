/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class ComRechargeItem extends fgui.GComponent {

	protected img_first: fgui.GImage;
	protected com_item: ComItem1View;
	protected btn_buy1: fgui.GButton;
	protected btn_buy2: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected txt_desc: fgui.GTextField;
	public static url: string = "ui://vx9zwsern15iobik";

	public static createInstance(): ComRechargeItem {
		return <ComRechargeItem>(fgui.UIPackage.createObject("PkgCommon", "ComRechargeItem"));
	}

	protected override onConstruct(): void {
		this.img_first = <fgui.GImage>(this.getChildAt(1));
		this.com_item = <ComItem1View>(this.getChildAt(2));
		this.btn_buy1 = <fgui.GButton>(this.getChildAt(3));
		this.btn_buy2 = <fgui.GButton>(this.getChildAt(4));
		this.txt_title = <fgui.GTextField>(this.getChildAt(5));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(6));
	}
}