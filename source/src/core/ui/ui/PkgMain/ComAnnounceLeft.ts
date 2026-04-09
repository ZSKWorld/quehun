/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComAnnounceLeft extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected list_tab: fgui.GList;
	protected txt_empty: fgui.GTextField;
	public static url: string = "ui://vith2b66ojz4obha";

	public static createInstance(): ComAnnounceLeft {
		return <ComAnnounceLeft>(fgui.UIPackage.createObject("PkgMain", "ComAnnounceLeft"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.list_tab = <fgui.GList>(this.getChildAt(1));
		this.txt_empty = <fgui.GTextField>(this.getChildAt(2));
	}
}