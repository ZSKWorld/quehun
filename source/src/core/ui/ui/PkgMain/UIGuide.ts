/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIGuide extends fgui.GComponent {

	protected btn_bg: fgui.GButton;
	protected btn_close: fgui.GButton;
	public static url: string = "ui://vith2b66exjcobhn";

	public static createInstance(): UIGuide {
		return <UIGuide>(fgui.UIPackage.createObject("PkgMain", "UIGuide"));
	}

	protected override onConstruct(): void {
		this.btn_bg = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
	}
}