/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class BtnBagSkinCheck extends ViewBase(fgui.GButton) {

	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://vith2b66mj5kb6p";

	public static createInstance(): BtnBagSkinCheck {
		return <BtnBagSkinCheck>(fgui.UIPackage.createObject("PkgMain", "BtnBagSkinCheck"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}