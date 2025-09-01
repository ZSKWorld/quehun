/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnCheckTxtRight extends fgui.GButton {

	public bg: fgui.GLoader;
	public static url: string = "ui://vx9zwsermj5kb6q";

	public static createInstance(): BtnCheckTxtRight {
		return <BtnCheckTxtRight>(fgui.UIPackage.createObject("PkgCommon", "BtnCheckTxtRight"));
	}

	protected override onConstruct(): void {
		this.bg = <fgui.GLoader>(this.getChildAt(0));
	}
}