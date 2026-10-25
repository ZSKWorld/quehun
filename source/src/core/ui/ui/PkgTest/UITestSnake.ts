/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UITestSnake extends GComponentView {

	protected graph_bg: fgui.GGraph;
	protected graph_map: fgui.GGraph;
	protected btn_close: fgui.GButton;
	protected slider_cellSize: fgui.GSlider;
	protected slider_obsPercent: fgui.GSlider;
	protected btn_resetObs: fgui.GButton;
	public static url: string = "ui://mz6x8cs5ffc7obgf";

	public static createInstance(): UITestSnake {
		return <UITestSnake>(fgui.UIPackage.createObject("PkgTest", "UITestSnake"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.graph_map = <fgui.GGraph>(this.getChildAt(1));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.slider_cellSize = <fgui.GSlider>(this.getChildAt(3));
		this.slider_obsPercent = <fgui.GSlider>(this.getChildAt(5));
		this.btn_resetObs = <fgui.GButton>(this.getChildAt(6));
	}
}