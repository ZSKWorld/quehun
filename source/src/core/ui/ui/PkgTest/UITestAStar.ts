/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UITestAStar extends GComponentView {

	protected ctrl_state: fgui.Controller;
	protected graph_map: fgui.GGraph;
	protected graph_cell: fgui.GGraph;
	protected btn_close: fgui.GButton;
	protected slider_cellSize: fgui.GSlider;
	protected slider_obsPercent: fgui.GSlider;
	protected btn_resetObs: fgui.GButton;
	protected btn_setPoint: fgui.GButton;
	public static url: string = "ui://mz6x8cs5pxuvobge";

	public static createInstance(): UITestAStar {
		return <UITestAStar>(fgui.UIPackage.createObject("PkgTest", "UITestAStar"));
	}

	protected override onConstruct(): void {
		this.ctrl_state = this.getControllerAt(0);
		this.graph_map = <fgui.GGraph>(this.getChildAt(0));
		this.graph_cell = <fgui.GGraph>(this.getChildAt(1));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.slider_cellSize = <fgui.GSlider>(this.getChildAt(3));
		this.slider_obsPercent = <fgui.GSlider>(this.getChildAt(5));
		this.btn_resetObs = <fgui.GButton>(this.getChildAt(6));
		this.btn_setPoint = <fgui.GButton>(this.getChildAt(8));
	}
}