/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class BtnCheckRichTxtRight extends ViewBase(fgui.GButton) {

	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://vx9zwsermj5kb6t";

	public static createInstance(): BtnCheckRichTxtRight {
		return <BtnCheckRichTxtRight>(fgui.UIPackage.createObject("PkgCommon", "BtnCheckRichTxtRight"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}