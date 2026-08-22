/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComLevel extends GComponentView {

	protected ctrl_ht: fgui.Controller;
	protected ctrl_star: fgui.Controller;
	protected loader_icon: fgui.GLoader;
	protected txt_htLevel: fgui.GTextField;
	public static url: string = "ui://vx9zwserpuubobfb";

	public static createInstance(): ComLevel {
		return <ComLevel>(fgui.UIPackage.createObject("PkgCommon", "ComLevel"));
	}

	protected override onConstruct(): void {
		this.ctrl_ht = this.getControllerAt(0);
		this.ctrl_star = this.getControllerAt(1);
		this.loader_icon = <fgui.GLoader>(this.getChildAt(1));
		this.txt_htLevel = <fgui.GTextField>(this.getChildAt(3));
	}
}