/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";

export default class BtnVisitHeart extends GButtonView {

	protected ctrl_char: fgui.Controller;
	protected ctrl_type: fgui.Controller;
	public static url: string = "ui://vith2b669c0bobj0";

	public static createInstance(): BtnVisitHeart {
		return <BtnVisitHeart>(fgui.UIPackage.createObject("PkgMain", "BtnVisitHeart"));
	}

	protected override onConstruct(): void {
		this.ctrl_char = this.getControllerAt(0);
		this.ctrl_type = this.getControllerAt(1);
	}
}