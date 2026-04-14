/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UISetting extends fgui.GComponent {

	protected btn_close: fgui.GButton;
	public static url: string = "ui://vith2b66ktwpob9w";

	public static createInstance(): UISetting {
		return <UISetting>(fgui.UIPackage.createObject("PkgMain", "UISetting"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(0));
	}
}