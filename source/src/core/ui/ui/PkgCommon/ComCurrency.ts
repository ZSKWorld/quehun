/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class ComCurrency extends ViewBase(fgui.GComponent) {

	protected ctrl_type: fgui.Controller;
	protected btn_add: fgui.GButton;
	protected btn_currency: fgui.GButton;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vx9zwserqs7jobft";

	public static createInstance(): ComCurrency {
		return <ComCurrency>(fgui.UIPackage.createObject("PkgCommon", "ComCurrency"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.btn_add = <fgui.GButton>(this.getChildAt(1));
		this.btn_currency = <fgui.GButton>(this.getChildAt(2));
		this.txt_count = <fgui.GTextField>(this.getChildAt(3));
	}
}