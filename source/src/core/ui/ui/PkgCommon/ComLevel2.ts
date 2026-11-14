/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComLevel2 extends GComponentView {

	protected ctrl_ht: fgui.Controller;
	protected ctrl_star: fgui.Controller;
	protected loader_icon: fgui.GLoader;
	protected txt_htLevel: fgui.GTextField;
	public static url: string = "ui://vx9zwserftegobml";

	public static createInstance(): ComLevel2 {
		return <ComLevel2>(fgui.UIPackage.createObject("PkgCommon", "ComLevel2"));
	}

	protected override onConstruct(): void {
		this.ctrl_ht = this.getControllerAt(0);
		this.ctrl_star = this.getControllerAt(1);
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
		this.txt_htLevel = <fgui.GTextField>(this.getChildAt(9));
	}
}