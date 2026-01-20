/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnSwitchRandom extends fgui.GButton {

	protected txt_title1: fgui.GTextField;
	protected txt_title2: fgui.GTextField;
	public static url: string = "ui://vx9zwserglpbobfo";

	public static createInstance(): BtnSwitchRandom {
		return <BtnSwitchRandom>(fgui.UIPackage.createObject("PkgCommon", "BtnSwitchRandom"));
	}

	protected override onConstruct(): void {
		this.txt_title1 = <fgui.GTextField>(this.getChildAt(1));
		this.txt_title2 = <fgui.GTextField>(this.getChildAt(2));
	}
}