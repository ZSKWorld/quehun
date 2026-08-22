/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";

export default class BtnMailTab extends GButtonView {

	protected ctrl_open: fgui.Controller;
	protected img_redDot: fgui.GImage;
	public static url: string = "ui://vith2b66pt3aobb0";

	public static createInstance(): BtnMailTab {
		return <BtnMailTab>(fgui.UIPackage.createObject("PkgMain", "BtnMailTab"));
	}

	protected override onConstruct(): void {
		this.ctrl_open = this.getControllerAt(1);
		this.img_redDot = <fgui.GImage>(this.getChildAt(2));
	}
}