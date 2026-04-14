/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UICamera extends fgui.GComponent {

	protected btn_close: fgui.GButton;
	public static url: string = "ui://vith2b66ktwpob9y";

	public static createInstance(): UICamera {
		return <UICamera>(fgui.UIPackage.createObject("PkgMain", "UICamera"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(0));
	}
}