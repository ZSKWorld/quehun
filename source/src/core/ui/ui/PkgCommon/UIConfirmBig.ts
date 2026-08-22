/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UIConfirmBig extends GComponentView {

	protected ctrl_format: fgui.Controller;
	protected btn_close: fgui.GButton;
	protected btn_confirm: fgui.GButton;
	protected btn_cancel: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected label_content: fgui.GLabel;
	public static url: string = "ui://vx9zwserj0ddob7e";

	public static createInstance(): UIConfirmBig {
		return <UIConfirmBig>(fgui.UIPackage.createObject("PkgCommon", "UIConfirmBig"));
	}

	protected override onConstruct(): void {
		this.ctrl_format = this.getControllerAt(0);
		this.btn_close = <fgui.GButton>(this.getChildAt(9));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(10));
		this.btn_cancel = <fgui.GButton>(this.getChildAt(11));
		this.txt_title = <fgui.GTextField>(this.getChildAt(13));
		this.label_content = <fgui.GLabel>(this.getChildAt(14));
	}
}