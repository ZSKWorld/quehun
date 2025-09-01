/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnCheck extends fgui.GButton {

	public bg: fgui.GLoader;
	public static url: string = "ui://vx9zwsermj5kb6p";

	public static createInstance(): BtnCheck {
		return <BtnCheck>(fgui.UIPackage.createObject("PkgCommon", "BtnCheck"));
	}

	protected override onConstruct(): void {
		this.bg = <fgui.GLoader>(this.getChildAt(0));
	}
}