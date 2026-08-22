/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";

export default class BtnCheckTxtRight extends GButtonView {

	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://vx9zwsermj5kb6q";

	public static createInstance(): BtnCheckTxtRight {
		return <BtnCheckTxtRight>(fgui.UIPackage.createObject("PkgCommon", "BtnCheckTxtRight"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}