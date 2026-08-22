/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UITest extends GComponentView {

	protected btn_close: fgui.GButton;
	public static url: string = "ui://vx9zwser5zjlobgd";

	public static createInstance(): UITest {
		return <UITest>(fgui.UIPackage.createObject("PkgCommon", "UITest"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(0));
	}
}