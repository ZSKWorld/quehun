/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UITestSpine extends GComponentView {

	protected btn_close: fgui.GButton;
	public static url: string = "ui://mz6x8cs5ol8q2";

	public static createInstance(): UITestSpine {
		return <UITestSpine>(fgui.UIPackage.createObject("PkgTest", "UITestSpine"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(1));
	}
}