/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UITextInput extends GComponentView {

	protected ctrl_format: fgui.Controller;
	protected btn_mask: fgui.GButton;
	protected btn_close: fgui.GButton;
	protected btn_confirm: fgui.GButton;
	protected itxt_input: fgui.GTextInput;
	protected txt_title: fgui.GTextField;
	public static url: string = "ui://vx9zwsera7sxobjj";

	public static createInstance(): UITextInput {
		return <UITextInput>(fgui.UIPackage.createObject("PkgCommon", "UITextInput"));
	}

	protected override onConstruct(): void {
		this.ctrl_format = this.getControllerAt(0);
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(3));
		this.itxt_input = <fgui.GTextInput>(this.getChildAt(5));
		this.txt_title = <fgui.GTextField>(this.getChildAt(6));
	}
}