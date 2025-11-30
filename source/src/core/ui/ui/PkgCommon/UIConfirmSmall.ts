/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIConfirmSmall extends fgui.GComponent {

	protected ctrl_format: fgui.Controller;
	protected btn_close: fgui.GButton;
	protected btn_confirm: fgui.GButton;
	protected btn_cancel: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected txt_content: fgui.GTextField;
	public static url: string = "ui://vx9zwserj0ddob7k";

	public static createInstance(): UIConfirmSmall {
		return <UIConfirmSmall>(fgui.UIPackage.createObject("PkgCommon", "UIConfirmSmall"));
	}

	protected override onConstruct(): void {
		this.ctrl_format = this.getControllerAt(0);
		this.btn_close = <fgui.GButton>(this.getChildAt(5));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(6));
		this.btn_cancel = <fgui.GButton>(this.getChildAt(7));
		this.txt_title = <fgui.GTextField>(this.getChildAt(9));
		this.txt_content = <fgui.GTextField>(this.getChildAt(10));
	}
}