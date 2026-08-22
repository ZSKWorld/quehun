/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GLabelView } from "../../core/viewBase/GLabelView";

export default class LabelName extends GLabelView {

	protected img_vip: fgui.GImage;
	public static url: string = "ui://vx9zwserpuubobfa";

	public static createInstance(): LabelName {
		return <LabelName>(fgui.UIPackage.createObject("PkgCommon", "LabelName"));
	}

	protected override onConstruct(): void {
		this.img_vip = <fgui.GImage>(this.getChildAt(1));
	}
}