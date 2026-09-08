/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UITestBezier extends GComponentView {

	protected btn_close: fgui.GButton;
	protected graph_canvas: fgui.GGraph;
	protected btn_add: fgui.GButton;
	protected btn_remove: fgui.GButton;
	public static url: string = "ui://mz6x8cs5ol8q1";

	public static createInstance(): UITestBezier {
		return <UITestBezier>(fgui.UIPackage.createObject("PkgTest", "UITestBezier"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(1));
		this.graph_canvas = <fgui.GGraph>(this.getChildAt(2));
		this.btn_add = <fgui.GButton>(this.getChildAt(3));
		this.btn_remove = <fgui.GButton>(this.getChildAt(4));
	}
}