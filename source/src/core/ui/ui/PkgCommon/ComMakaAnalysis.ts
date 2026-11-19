/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComMakaAnalysisContentView } from "../../view/PkgCommon/view/coms/ComMakaAnalysisContentView";
import { ComMakaAnalysisingView } from "../../view/PkgCommon/view/coms/ComMakaAnalysisingView";

export default class ComMakaAnalysis extends GComponentView {

	protected loader_bg: fgui.GLoader;
	protected btn_info: fgui.GButton;
	protected com_content: ComMakaAnalysisContentView;
	protected com_circle: ComMakaAnalysisingView;
	protected txt_count: fgui.GTextField;
	protected trans_start: fgui.Transition;
	protected trans_rotate: fgui.Transition;
	protected trans_finish: fgui.Transition;
	public static url: string = "ui://vx9zwserjbd2obn1";

	public static createInstance(): ComMakaAnalysis {
		return <ComMakaAnalysis>(fgui.UIPackage.createObject("PkgCommon", "ComMakaAnalysis"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(1));
		this.btn_info = <fgui.GButton>(this.getChildAt(4));
		this.com_content = <ComMakaAnalysisContentView>(this.getChildAt(5));
		this.com_circle = <ComMakaAnalysisingView>(this.getChildAt(6));
		this.txt_count = <fgui.GTextField>(this.getChildAt(8));
		this.trans_start = this.getTransitionAt(0);
		this.trans_rotate = this.getTransitionAt(1);
		this.trans_finish = this.getTransitionAt(2);
	}
}