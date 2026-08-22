/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";

export default class BtnXunMi extends GButtonView {

	protected trans_t0: fgui.Transition;
	public static url: string = "ui://vith2b66vwgmj";

	public static createInstance(): BtnXunMi {
		return <BtnXunMi>(fgui.UIPackage.createObject("PkgMain", "BtnXunMi"));
	}

	protected override onConstruct(): void {
		this.trans_t0 = this.getTransitionAt(0);
	}
}