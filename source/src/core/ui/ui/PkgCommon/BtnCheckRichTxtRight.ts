/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnCheckRichTxtRight extends fgui.GButton {

	public bg: fgui.GLoader;
	public static url: string = "ui://vx9zwsermj5kb6t";

	public static createInstance(): BtnCheckRichTxtRight {
		return <BtnCheckRichTxtRight>(fgui.UIPackage.createObject("PkgCommon", "BtnCheckRichTxtRight"));
	}

	protected override onConstruct(): void {
		this.bg = <fgui.GLoader>(this.getChildAt(0));
	}
}