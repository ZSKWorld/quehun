/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class RenderAchieveDetailGroup extends ViewBase(fgui.GButton) {

	protected ctrl_type: fgui.Controller;
	protected img_proBar: fgui.GImage;
	protected img_redDot: fgui.GImage;
	public static url: string = "ui://ko8zynrwoo1iobij";

	public static createInstance(): RenderAchieveDetailGroup {
		return <RenderAchieveDetailGroup>(fgui.UIPackage.createObject("PkgAchievement", "RenderAchieveDetailGroup"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.img_proBar = <fgui.GImage>(this.getChildAt(5));
		this.img_redDot = <fgui.GImage>(this.getChildAt(6));
	}
}