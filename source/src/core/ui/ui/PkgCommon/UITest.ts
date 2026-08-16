/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class UITest extends ViewBase(fgui.GComponent) {

	protected btn_close: fgui.GButton;
	public static url: string = "ui://vx9zwser5zjlobgd";

	public static createInstance(): UITest {
		return <UITest>(fgui.UIPackage.createObject("PkgCommon", "UITest"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(0));
	}
}