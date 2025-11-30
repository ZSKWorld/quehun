/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComBagDeco extends fgui.GComponent {

	protected list_item: fgui.GList;
	protected cmb_type: fgui.GComboBox;
	public static url: string = "ui://vith2b66gsi2obbs";

	public static createInstance(): ComBagDeco {
		return <ComBagDeco>(fgui.UIPackage.createObject("PkgMain", "ComBagDeco"));
	}

	protected override onConstruct(): void {
		this.list_item = <fgui.GList>(this.getChildAt(0));
		this.cmb_type = <fgui.GComboBox>(this.getChildAt(1));
	}
}