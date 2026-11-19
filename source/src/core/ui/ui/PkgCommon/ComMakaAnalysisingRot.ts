/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComMakaAnalysisingRot extends GComponentView {

	protected trans_rotate: fgui.Transition;
	protected trans_show: fgui.Transition;
	protected trans_finish: fgui.Transition;
	public static url: string = "ui://vx9zwsereexsobnm";

	public static createInstance(): ComMakaAnalysisingRot {
		return <ComMakaAnalysisingRot>(fgui.UIPackage.createObject("PkgCommon", "ComMakaAnalysisingRot"));
	}

	protected override onConstruct(): void {
		this.trans_rotate = this.getTransitionAt(0);
		this.trans_show = this.getTransitionAt(1);
		this.trans_finish = this.getTransitionAt(2);
	}
}