/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComLevelView } from "../../view/PkgCommon/view/coms/ComLevelView";

export default class ComLevel1 extends GComponentView {

	protected ctrl_ht: fgui.Controller;
	protected ctrl_star: fgui.Controller;
	protected com_level: ComLevelView;
	protected txt_htScore: fgui.GTextField;
	public static url: string = "ui://vx9zwserhdeoobbq";

	public static createInstance(): ComLevel1 {
		return <ComLevel1>(fgui.UIPackage.createObject("PkgCommon", "ComLevel1"));
	}

	protected override onConstruct(): void {
		this.ctrl_ht = this.getControllerAt(0);
		this.ctrl_star = this.getControllerAt(1);
		this.com_level = <ComLevelView>(this.getChildAt(0));
		this.txt_htScore = <fgui.GTextField>(this.getChildAt(2));
	}
}