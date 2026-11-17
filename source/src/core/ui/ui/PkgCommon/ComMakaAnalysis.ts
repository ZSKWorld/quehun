/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComMakaAnalysisCircleView } from "../../view/PkgCommon/view/coms/ComMakaAnalysisCircleView";
import { ComMakaAnalysisContentView } from "../../view/PkgCommon/view/coms/ComMakaAnalysisContentView";

export default class ComMakaAnalysis extends GComponentView {

	protected loader_bg: fgui.GLoader;
	protected btn_info: fgui.GButton;
	protected com_circle: ComMakaAnalysisCircleView;
	protected com_content: ComMakaAnalysisContentView;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vx9zwserjbd2obn1";

	public static createInstance(): ComMakaAnalysis {
		return <ComMakaAnalysis>(fgui.UIPackage.createObject("PkgCommon", "ComMakaAnalysis"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(1));
		this.btn_info = <fgui.GButton>(this.getChildAt(4));
		this.com_circle = <ComMakaAnalysisCircleView>(this.getChildAt(5));
		this.com_content = <ComMakaAnalysisContentView>(this.getChildAt(6));
		this.txt_count = <fgui.GTextField>(this.getChildAt(8));
	}
}