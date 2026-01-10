/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComRedDot1View } from "../../view/PkgCommon/view/coms/ComRedDot1View";

export default class BtnDengLong extends fgui.GButton {

	protected com_redDot: ComRedDot1View;
	public static url: string = "ui://vith2b66vwgmob8d";

	public static createInstance(): BtnDengLong {
		return <BtnDengLong>(fgui.UIPackage.createObject("PkgMain", "BtnDengLong"));
	}

	protected override onConstruct(): void {
		this.com_redDot = <ComRedDot1View>(this.getChildAt(2));
	}
}