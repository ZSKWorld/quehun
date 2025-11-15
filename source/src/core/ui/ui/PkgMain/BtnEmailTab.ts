/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnEmailTab extends fgui.GButton {

	public ctrl_open: fgui.Controller;
	public img_redDot: fgui.GImage;
	public static url: string = "ui://vith2b66pt3aobb0";

	public static createInstance(): BtnEmailTab {
		return <BtnEmailTab>(fgui.UIPackage.createObject("PkgMain", "BtnEmailTab"));
	}

	protected override onConstruct(): void {
		this.ctrl_open = this.getControllerAt(1);
		this.img_redDot = <fgui.GImage>(this.getChildAt(2));
	}
}