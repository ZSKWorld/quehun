/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComMakaAnalysisCircle extends GComponentView {

	protected ctrl_self: fgui.Controller;
	protected ctrl_siMa: fgui.Controller;
	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://vx9zwserjbd2obn3";

	public static createInstance(): ComMakaAnalysisCircle {
		return <ComMakaAnalysisCircle>(fgui.UIPackage.createObject("PkgCommon", "ComMakaAnalysisCircle"));
	}

	protected override onConstruct(): void {
		this.ctrl_self = this.getControllerAt(0);
		this.ctrl_siMa = this.getControllerAt(1);
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}