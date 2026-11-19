/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComMakaAnalysisingRotView } from "../../view/PkgCommon/view/coms/ComMakaAnalysisingRotView";

export default class ComMakaAnalysising extends GComponentView {

	protected com_rot: ComMakaAnalysisingRotView;
	protected trans_show: fgui.Transition;
	protected trans_rotate: fgui.Transition;
	protected trans_finish: fgui.Transition;
	public static url: string = "ui://vx9zwserjbd2obn3";

	public static createInstance(): ComMakaAnalysising {
		return <ComMakaAnalysising>(fgui.UIPackage.createObject("PkgCommon", "ComMakaAnalysising"));
	}

	protected override onConstruct(): void {
		this.com_rot = <ComMakaAnalysisingRotView>(this.getChildAt(5));
		this.trans_show = this.getTransitionAt(0);
		this.trans_rotate = this.getTransitionAt(1);
		this.trans_finish = this.getTransitionAt(2);
	}
}