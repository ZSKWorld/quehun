/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComRedDot1View } from "../../view/PkgCommon/view/coms/ComRedDot1View";

export default class BtnSevenDayTab extends ViewBase(fgui.GButton) {

	protected com_redDot: ComRedDot1View;
	public static url: string = "ui://vith2b66afneobhv";

	public static createInstance(): BtnSevenDayTab {
		return <BtnSevenDayTab>(fgui.UIPackage.createObject("PkgMain", "BtnSevenDayTab"));
	}

	protected override onConstruct(): void {
		this.com_redDot = <ComRedDot1View>(this.getChildAt(1));
	}
}