/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UIRecordRemarks extends GComponentView {

	protected ctrl_format: fgui.Controller;
	protected btn_mask: fgui.GButton;
	protected btn_close: fgui.GButton;
	protected btn_confirm: fgui.GButton;
	protected itxt_input: fgui.GTextInput;
	protected txt_title: fgui.GTextField;
	protected txt_tip: fgui.GTextField;
	public static url: string = "ui://vx9zwseritojobmm";

	public static createInstance(): UIRecordRemarks {
		return <UIRecordRemarks>(fgui.UIPackage.createObject("PkgCommon", "UIRecordRemarks"));
	}

	protected override onConstruct(): void {
		this.ctrl_format = this.getControllerAt(0);
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(4));
		this.itxt_input = <fgui.GTextInput>(this.getChildAt(5));
		this.txt_title = <fgui.GTextField>(this.getChildAt(6));
		this.txt_tip = <fgui.GTextField>(this.getChildAt(8));
	}
}