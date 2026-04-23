/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComRedDot1View } from "../../view/PkgCommon/view/coms/ComRedDot1View";

export default class BtnSevenDay extends fgui.GButton {

	protected com_redDot: ComRedDot1View;
	public static url: string = "ui://vith2b66jonfobib";

	public static createInstance(): BtnSevenDay {
		return <BtnSevenDay>(fgui.UIPackage.createObject("PkgMain", "BtnSevenDay"));
	}

	protected override onConstruct(): void {
		this.com_redDot = <ComRedDot1View>(this.getChildAt(1));
	}
}