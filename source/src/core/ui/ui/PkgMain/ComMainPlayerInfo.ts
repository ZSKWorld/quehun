/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComTitleView } from "../../view/PkgCommon/view/coms/ComTitleView";
import { LabelNameView } from "../../view/PkgCommon/view/labels/LabelNameView";

export default class ComMainPlayerInfo extends GComponentView {

	protected ctrl_ht: fgui.Controller;
	protected ctrl_star: fgui.Controller;
	protected loader_icon: fgui.GLoader;
	protected txt_htLevel: fgui.GTextField;
	protected com_title: ComTitleView;
	protected label_name: LabelNameView;
	protected btn_level: fgui.GButton;
	protected btn_info: fgui.GButton;
	public static url: string = "ui://vith2b66exjcobgg";

	public static createInstance(): ComMainPlayerInfo {
		return <ComMainPlayerInfo>(fgui.UIPackage.createObject("PkgMain", "ComMainPlayerInfo"));
	}

	protected override onConstruct(): void {
		this.ctrl_ht = this.getControllerAt(0);
		this.ctrl_star = this.getControllerAt(1);
		this.loader_icon = <fgui.GLoader>(this.getChildAt(1));
		this.txt_htLevel = <fgui.GTextField>(this.getChildAt(3));
		this.com_title = <ComTitleView>(this.getChildAt(11));
		this.label_name = <LabelNameView>(this.getChildAt(12));
		this.btn_level = <fgui.GButton>(this.getChildAt(13));
		this.btn_info = <fgui.GButton>(this.getChildAt(14));
	}
}