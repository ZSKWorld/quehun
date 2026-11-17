/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { LabelNameView } from "../../view/PkgCommon/view/labels/LabelNameView";

export default class ComMakaAnalysisContent extends GComponentView {

	protected ctrl_self: fgui.Controller;
	protected ctrl_siMa: fgui.Controller;
	protected btn_confirm: fgui.GButton;
	protected loader_maka0: fgui.GLoader;
	protected loader_maka1: fgui.GLoader;
	protected loader_maka2: fgui.GLoader;
	protected loader_maka3: fgui.GLoader;
	protected loader_beilv0: fgui.GLoader;
	protected loader_beilv1: fgui.GLoader;
	protected loader_beilv2: fgui.GLoader;
	protected loader_beilv3: fgui.GLoader;
	protected label_name0: LabelNameView;
	protected label_name1: LabelNameView;
	protected label_name2: LabelNameView;
	protected label_name3: LabelNameView;
	protected txt_score0: fgui.GTextField;
	protected txt_score1: fgui.GTextField;
	protected txt_score2: fgui.GTextField;
	protected txt_score3: fgui.GTextField;
	protected txt_name: fgui.GTextField;
	protected txt_time: fgui.GTextField;
	public static url: string = "ui://vx9zwserjbd2obn2";

	public static createInstance(): ComMakaAnalysisContent {
		return <ComMakaAnalysisContent>(fgui.UIPackage.createObject("PkgCommon", "ComMakaAnalysisContent"));
	}

	protected override onConstruct(): void {
		this.ctrl_self = this.getControllerAt(0);
		this.ctrl_siMa = this.getControllerAt(1);
		this.btn_confirm = <fgui.GButton>(this.getChildAt(1));
		this.loader_maka0 = <fgui.GLoader>(this.getChildAt(3));
		this.loader_maka1 = <fgui.GLoader>(this.getChildAt(4));
		this.loader_maka2 = <fgui.GLoader>(this.getChildAt(5));
		this.loader_maka3 = <fgui.GLoader>(this.getChildAt(6));
		this.loader_beilv0 = <fgui.GLoader>(this.getChildAt(7));
		this.loader_beilv1 = <fgui.GLoader>(this.getChildAt(8));
		this.loader_beilv2 = <fgui.GLoader>(this.getChildAt(9));
		this.loader_beilv3 = <fgui.GLoader>(this.getChildAt(10));
		this.label_name0 = <LabelNameView>(this.getChildAt(11));
		this.label_name1 = <LabelNameView>(this.getChildAt(12));
		this.label_name2 = <LabelNameView>(this.getChildAt(13));
		this.label_name3 = <LabelNameView>(this.getChildAt(14));
		this.txt_score0 = <fgui.GTextField>(this.getChildAt(15));
		this.txt_score1 = <fgui.GTextField>(this.getChildAt(16));
		this.txt_score2 = <fgui.GTextField>(this.getChildAt(17));
		this.txt_score3 = <fgui.GTextField>(this.getChildAt(18));
		this.txt_name = <fgui.GTextField>(this.getChildAt(28));
		this.txt_time = <fgui.GTextField>(this.getChildAt(29));
	}
}