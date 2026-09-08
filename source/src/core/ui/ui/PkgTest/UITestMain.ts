/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UITestMain extends GComponentView {

	protected btn_close: fgui.GButton;
	protected btn_spineTest: fgui.GButton;
	protected btn_bezierTest: fgui.GButton;
	public static url: string = "ui://mz6x8cs55zjlobgd";

	public static createInstance(): UITestMain {
		return <UITestMain>(fgui.UIPackage.createObject("PkgTest", "UITestMain"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(1));
		this.btn_spineTest = <fgui.GButton>(this.getChildAt(2));
		this.btn_bezierTest = <fgui.GButton>(this.getChildAt(3));
	}
}