/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComBack extends fgui.GComponent {

	public btn_back: fgui.GButton;
	public txt_title: fgui.GTextField;
	public static url: string = "ui://vx9zwserp5uzob8h";

	public static createInstance(): ComBack {
		return <ComBack>(fgui.UIPackage.createObject("PkgCommon", "ComBack"));
	}

	protected override onConstruct(): void {
		this.btn_back = <fgui.GButton>(this.getChildAt(1));
		this.txt_title = <fgui.GTextField>(this.getChildAt(2));
	}
}