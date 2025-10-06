/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import PbLoading1 from "./PbLoading1";

export default class UILoading extends fgui.GComponent {

	public ctrl_state: fgui.Controller;
	public txt_tip: fgui.GTextField;
	public pb_progress: PbLoading1;
	public loader_tipIcon: fgui.GLoader;
	public loader_mid: fgui.GLoader;
	public loader_left: fgui.GLoader;
	public loader_right: fgui.GLoader;
	public loader_desk: fgui.GLoader;
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
	}
}