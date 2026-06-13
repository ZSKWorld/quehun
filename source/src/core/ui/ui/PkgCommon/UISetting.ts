/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UISetting extends fgui.GComponent {

	protected btn_mask: fgui.GButton;
	protected btn_close: fgui.GButton;
	public static url: string = "ui://vx9zwserktwpob9w";

	public static createInstance(): UISetting {
		return <UISetting>(fgui.UIPackage.createObject("PkgCommon", "UISetting"));
	}

	protected override onConstruct(): void {
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
	}
}