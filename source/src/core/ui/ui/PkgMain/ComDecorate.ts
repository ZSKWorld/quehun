/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComDecorate extends fgui.GComponent {

	protected list_tab: fgui.GList;
	protected btn_close: fgui.GButton;
	public static url: string = "ui://vith2b66glpbobfu";

	public static createInstance(): ComDecorate {
		return <ComDecorate>(fgui.UIPackage.createObject("PkgMain", "ComDecorate"));
	}

	protected override onConstruct(): void {
		this.list_tab = <fgui.GList>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(7));
	}
}