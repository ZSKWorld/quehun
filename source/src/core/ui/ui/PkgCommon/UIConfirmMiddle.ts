/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIConfirmMiddle extends fgui.GComponent {

	protected ctrl_format: fgui.Controller;
	protected btn_close: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected txt_content: fgui.GTextField;
	protected btn_confirm: fgui.GButton;
	protected btn_cancel: fgui.GButton;
	public static url: string = "ui://vx9zwserj0ddob7j";

	public static createInstance(): UIConfirmMiddle {
		return <UIConfirmMiddle>(fgui.UIPackage.createObject("PkgCommon", "UIConfirmMiddle"));
	}

	protected override onConstruct(): void {
		this.ctrl_format = this.getControllerAt(0);
		this.btn_close = <fgui.GButton>(this.getChildAt(5));
		this.txt_title = <fgui.GTextField>(this.getChildAt(6));
		this.txt_content = <fgui.GTextField>(this.getChildAt(7));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(8));
		this.btn_cancel = <fgui.GButton>(this.getChildAt(9));
	}
}