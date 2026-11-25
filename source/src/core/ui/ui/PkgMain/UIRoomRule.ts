/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UIRoomRule extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected btn_mask: fgui.GButton;
	protected btn_detail: fgui.GButton;
	protected btn_rule: fgui.GButton;
	protected loader_detailImg: fgui.GLoader;
	protected btn_left: fgui.GButton;
	protected btn_right: fgui.GButton;
	protected list_points: fgui.GList;
	protected btn_close: fgui.GButton;
	protected list_tab: fgui.GList;
	protected label_ruleTxt: fgui.GLabel;
	public static url: string = "ui://vith2b669r5pobjq";

	public static createInstance(): UIRoomRule {
		return <UIRoomRule>(fgui.UIPackage.createObject("PkgMain", "UIRoomRule"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.btn_detail = <fgui.GButton>(this.getChildAt(6));
		this.btn_rule = <fgui.GButton>(this.getChildAt(7));
		this.loader_detailImg = <fgui.GLoader>(this.getChildAt(12));
		this.btn_left = <fgui.GButton>(this.getChildAt(13));
		this.btn_right = <fgui.GButton>(this.getChildAt(14));
		this.list_points = <fgui.GList>(this.getChildAt(15));
		this.btn_close = <fgui.GButton>(this.getChildAt(17));
		this.list_tab = <fgui.GList>(this.getChildAt(18));
		this.label_ruleTxt = <fgui.GLabel>(this.getChildAt(19));
	}
}