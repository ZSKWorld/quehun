/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComBagIllust extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	public static url: string = "ui://vith2b66rpakobc2";

	public static createInstance(): ComBagIllust {
		return <ComBagIllust>(fgui.UIPackage.createObject("PkgMain", "ComBagIllust"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
	}
}