/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComBagGift extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	public static url: string = "ui://vith2b66gsi2obbr";

	public static createInstance(): ComBagGift {
		return <ComBagGift>(fgui.UIPackage.createObject("PkgMain", "ComBagGift"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
	}
}