/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UIPayment extends GComponentView {

	protected btn_mask: fgui.GButton;
	protected btn_close: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected txt_name: fgui.GTextField;
	protected txt_price: fgui.GTextField;
	protected list_payment: fgui.GList;
	public static url: string = "ui://vx9zwserq9u3obj3";

	public static createInstance(): UIPayment {
		return <UIPayment>(fgui.UIPackage.createObject("PkgCommon", "UIPayment"));
	}

	protected override onConstruct(): void {
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.txt_title = <fgui.GTextField>(this.getChildAt(3));
		this.txt_name = <fgui.GTextField>(this.getChildAt(7));
		this.txt_price = <fgui.GTextField>(this.getChildAt(8));
		this.list_payment = <fgui.GList>(this.getChildAt(9));
	}
}