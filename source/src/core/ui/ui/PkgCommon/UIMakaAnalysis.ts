/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComMakaAnalysisView } from "../../view/PkgCommon/view/coms/ComMakaAnalysisView";

export default class UIMakaAnalysis extends GComponentView {

	protected ctrl_self: fgui.Controller;
	protected btn_mask: fgui.GButton;
	protected com_content: ComMakaAnalysisView;
	protected btn_close: fgui.GButton;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vx9zwserjbd2obmn";

	public static createInstance(): UIMakaAnalysis {
		return <UIMakaAnalysis>(fgui.UIPackage.createObject("PkgCommon", "UIMakaAnalysis"));
	}

	protected override onConstruct(): void {
		this.ctrl_self = this.getControllerAt(0);
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.com_content = <ComMakaAnalysisView>(this.getChildAt(1));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.trans_show = this.getTransitionAt(0);
	}
}