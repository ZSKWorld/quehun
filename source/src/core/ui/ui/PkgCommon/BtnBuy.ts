/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";

export default class BtnBuy extends GButtonView {

	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://vx9zwserfpd2obg3";

	public static createInstance(): BtnBuy {
		return <BtnBuy>(fgui.UIPackage.createObject("PkgCommon", "BtnBuy"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}