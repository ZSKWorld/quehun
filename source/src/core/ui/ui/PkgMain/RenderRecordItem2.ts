/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComLevel2View } from "../../view/PkgCommon/view/coms/ComLevel2View";
import { LabelNameView } from "../../view/PkgCommon/view/labels/LabelNameView";

export default class RenderRecordItem2 extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected ctrl_my: fgui.Controller;
	protected loader_maka: fgui.GLoader;
	protected loader_beilv: fgui.GLoader;
	protected com_level: ComLevel2View;
	protected label_name: LabelNameView;
	protected txt_rank: fgui.GTextField;
	protected txt_score: fgui.GTextField;
	protected txt_point: fgui.GTextField;
	protected txt_lizhi: fgui.GTextField;
	protected txt_ron: fgui.GTextField;
	protected txt_zimo: fgui.GTextField;
	protected txt_cong: fgui.GTextField;
	public static url: string = "ui://vith2b66ftegobjk";

	public static createInstance(): RenderRecordItem2 {
		return <RenderRecordItem2>(fgui.UIPackage.createObject("PkgMain", "RenderRecordItem2"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.ctrl_my = this.getControllerAt(1);
		this.loader_maka = <fgui.GLoader>(this.getChildAt(1));
		this.loader_beilv = <fgui.GLoader>(this.getChildAt(2));
		this.com_level = <ComLevel2View>(this.getChildAt(3));
		this.label_name = <LabelNameView>(this.getChildAt(4));
		this.txt_rank = <fgui.GTextField>(this.getChildAt(5));
		this.txt_score = <fgui.GTextField>(this.getChildAt(7));
		this.txt_point = <fgui.GTextField>(this.getChildAt(8));
		this.txt_lizhi = <fgui.GTextField>(this.getChildAt(9));
		this.txt_ron = <fgui.GTextField>(this.getChildAt(10));
		this.txt_zimo = <fgui.GTextField>(this.getChildAt(11));
		this.txt_cong = <fgui.GTextField>(this.getChildAt(12));
	}
}