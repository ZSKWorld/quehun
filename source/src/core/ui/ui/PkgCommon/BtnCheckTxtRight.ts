/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class BtnCheckTxtRight extends ViewBase(fgui.GButton) {

	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://vx9zwsermj5kb6q";

	public static createInstance(): BtnCheckTxtRight {
		return <BtnCheckTxtRight>(fgui.UIPackage.createObject("PkgCommon", "BtnCheckTxtRight"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}