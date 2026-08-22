/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";

export default class BtnBagSkinCheck extends GButtonView {

	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://vith2b66mj5kb6p";

	public static createInstance(): BtnBagSkinCheck {
		return <BtnBagSkinCheck>(fgui.UIPackage.createObject("PkgMain", "BtnBagSkinCheck"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}