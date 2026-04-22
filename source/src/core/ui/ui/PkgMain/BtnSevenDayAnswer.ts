/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnSevenDayAnswer extends fgui.GButton {

	protected ctrl_type: fgui.Controller;
	public static url: string = "ui://vith2b66rg6eobia";

	public static createInstance(): BtnSevenDayAnswer {
		return <BtnSevenDayAnswer>(fgui.UIPackage.createObject("PkgMain", "BtnSevenDayAnswer"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
	}
}