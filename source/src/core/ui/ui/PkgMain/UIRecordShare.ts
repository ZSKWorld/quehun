/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { BtnBagSkinCheckView } from "../../view/PkgMain/view/btns/BtnBagSkinCheckView";

export default class UIRecordShare extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected btn_mask: fgui.GButton;
	protected btn_close: fgui.GButton;
	protected btn_hideId: BtnBagSkinCheckView;
	protected btn_copy: fgui.GButton;
	protected btn_confirm: fgui.GButton;
	protected itxt_input: fgui.GTextInput;
	protected txt_title: fgui.GTextField;
	public static url: string = "ui://vith2b66itojobjl";

	public static createInstance(): UIRecordShare {
		return <UIRecordShare>(fgui.UIPackage.createObject("PkgMain", "UIRecordShare"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.btn_hideId = <BtnBagSkinCheckView>(this.getChildAt(4));
		this.btn_copy = <fgui.GButton>(this.getChildAt(5));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(6));
		this.itxt_input = <fgui.GTextInput>(this.getChildAt(7));
		this.txt_title = <fgui.GTextField>(this.getChildAt(8));
	}
}