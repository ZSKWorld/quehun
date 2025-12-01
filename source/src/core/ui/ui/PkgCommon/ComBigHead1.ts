/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBigHeadView } from "../../view/PkgCommon/view/coms/ComBigHeadView";

export default class ComBigHead1 extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected loader_bg: fgui.GLoader;
	protected com_head: ComBigHeadView;
	protected loader_mid: fgui.GLoader;
	protected loader_bound: fgui.GLoader;
	public static url: string = "ui://vx9zwsergsi2obeq";

	public static createInstance(): ComBigHead1 {
		return <ComBigHead1>(fgui.UIPackage.createObject("PkgCommon", "ComBigHead1"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
		this.com_head = <ComBigHeadView>(this.getChildAt(1));
		this.loader_mid = <fgui.GLoader>(this.getChildAt(2));
		this.loader_bound = <fgui.GLoader>(this.getChildAt(3));
	}
}