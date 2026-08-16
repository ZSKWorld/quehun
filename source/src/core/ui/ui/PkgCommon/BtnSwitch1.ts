/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class BtnSwitch1 extends ViewBase(fgui.GButton) {

	protected txt_title1: fgui.GTextField;
	protected txt_title2: fgui.GTextField;
	protected img_bar: fgui.GImage;
	public static url: string = "ui://vx9zwserglpbobfo";

	public static createInstance(): BtnSwitch1 {
		return <BtnSwitch1>(fgui.UIPackage.createObject("PkgCommon", "BtnSwitch1"));
	}

	protected override onConstruct(): void {
		this.txt_title1 = <fgui.GTextField>(this.getChildAt(1));
		this.txt_title2 = <fgui.GTextField>(this.getChildAt(2));
		this.img_bar = <fgui.GImage>(this.getChildAt(3));
	}
}