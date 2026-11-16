/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { RenderRecordItem2View } from "../../view/PkgMain/view/renders/RenderRecordItem2View";

export default class RenderRecordItem extends GComponentView {

	protected ctrl_fold: fgui.Controller;
	protected ctrl_siMa: fgui.Controller;
	protected btn_rename: fgui.GButton;
	protected btn_collect: fgui.GButton;
	protected btn_share: fgui.GButton;
	protected btn_maka: fgui.GButton;
	protected btn_look: fgui.GButton;
	protected img_arrow: fgui.GImage;
	protected com_info0: RenderRecordItem2View;
	protected com_info1: RenderRecordItem2View;
	protected com_info2: RenderRecordItem2View;
	protected com_info3: RenderRecordItem2View;
	protected txt_name: fgui.GTextField;
	protected txt_time: fgui.GTextField;
	protected btn_foldArea: fgui.GButton;
	protected itxt_remarks: fgui.GTextInput;
	protected group_gremarks: fgui.GGroup;
	public static url: string = "ui://vith2b66ftegobjf";

	public static createInstance(): RenderRecordItem {
		return <RenderRecordItem>(fgui.UIPackage.createObject("PkgMain", "RenderRecordItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_fold = this.getControllerAt(0);
		this.ctrl_siMa = this.getControllerAt(1);
		this.btn_rename = <fgui.GButton>(this.getChildAt(1));
		this.btn_collect = <fgui.GButton>(this.getChildAt(2));
		this.btn_share = <fgui.GButton>(this.getChildAt(3));
		this.btn_maka = <fgui.GButton>(this.getChildAt(4));
		this.btn_look = <fgui.GButton>(this.getChildAt(5));
		this.img_arrow = <fgui.GImage>(this.getChildAt(6));
		this.com_info0 = <RenderRecordItem2View>(this.getChildAt(7));
		this.com_info1 = <RenderRecordItem2View>(this.getChildAt(8));
		this.com_info2 = <RenderRecordItem2View>(this.getChildAt(9));
		this.com_info3 = <RenderRecordItem2View>(this.getChildAt(10));
		this.txt_name = <fgui.GTextField>(this.getChildAt(11));
		this.txt_time = <fgui.GTextField>(this.getChildAt(12));
		this.btn_foldArea = <fgui.GButton>(this.getChildAt(18));
		this.itxt_remarks = <fgui.GTextInput>(this.getChildAt(20));
		this.group_gremarks = <fgui.GGroup>(this.getChildAt(21));
	}
}