/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import PbLoading1 from "./PbLoading1";
import PbLoading2 from "./PbLoading2";

export default class UILoading extends fgui.GComponent {

	protected ctrl_state: fgui.Controller;
	protected txt_tip: fgui.GTextField;
	protected pb_progress: PbLoading1;
	protected loader_tipIcon: fgui.GLoader;
	protected loader_mid: fgui.GLoader;
	protected loader_left: fgui.GLoader;
	protected loader_right: fgui.GLoader;
	protected loader_desk: fgui.GLoader;
	protected loader_cg: fgui.GLoader;
	protected loader_tipIcon2: fgui.GLoader;
	protected pb_progress2: PbLoading2;
	public static url: string = "ui://vx9zwserieavob8b";

	public static createInstance(): UILoading {
		return <UILoading>(fgui.UIPackage.createObject("PkgCommon", "UILoading"));
	}

	protected override onConstruct(): void {
		this.ctrl_state = this.getControllerAt(0);
		this.txt_tip = <fgui.GTextField>(this.getChildAt(4));
		this.pb_progress = <PbLoading1>(this.getChildAt(5));
		this.loader_tipIcon = <fgui.GLoader>(this.getChildAt(6));
		this.loader_mid = <fgui.GLoader>(this.getChildAt(7));
		this.loader_left = <fgui.GLoader>(this.getChildAt(8));
		this.loader_right = <fgui.GLoader>(this.getChildAt(9));
		this.loader_desk = <fgui.GLoader>(this.getChildAt(10));
		this.loader_cg = <fgui.GLoader>(this.getChildAt(12));
		this.loader_tipIcon2 = <fgui.GLoader>(this.getChildAt(14));
		this.pb_progress2 = <PbLoading2>(this.getChildAt(15));
	}
}