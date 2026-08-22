/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComHeadView } from "../../view/PkgCommon/view/coms/ComHeadView";

export default class ComHead1 extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected loader_bg: fgui.GLoader;
	protected com_head: ComHeadView;
	protected loader_mid: fgui.GLoader;
	protected loader_bound: fgui.GLoader;
	public static url: string = "ui://vx9zwsergsi2obeq";

	public static createInstance(): ComHead1 {
		return <ComHead1>(fgui.UIPackage.createObject("PkgCommon", "ComHead1"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
		this.com_head = <ComHeadView>(this.getChildAt(1));
		this.loader_mid = <fgui.GLoader>(this.getChildAt(2));
		this.loader_bound = <fgui.GLoader>(this.getChildAt(3));
	}
}