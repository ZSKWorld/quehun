/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";

export default class BtnCheckRichTxtRight extends GButtonView {

	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://vx9zwsermj5kb6t";

	public static createInstance(): BtnCheckRichTxtRight {
		return <BtnCheckRichTxtRight>(fgui.UIPackage.createObject("PkgCommon", "BtnCheckRichTxtRight"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}