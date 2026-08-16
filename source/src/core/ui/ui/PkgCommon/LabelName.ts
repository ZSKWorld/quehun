/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class LabelName extends ViewBase(fgui.GLabel) {

	protected img_vip: fgui.GImage;
	public static url: string = "ui://vx9zwserpuubobfa";

	public static createInstance(): LabelName {
		return <LabelName>(fgui.UIPackage.createObject("PkgCommon", "LabelName"));
	}

	protected override onConstruct(): void {
		this.img_vip = <fgui.GImage>(this.getChildAt(1));
	}
}