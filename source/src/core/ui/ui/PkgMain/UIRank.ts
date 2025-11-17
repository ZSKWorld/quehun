/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIRank extends fgui.GComponent {

	public list_level: fgui.GList;
	public btn_close: fgui.GButton;
	public btn_siMa: fgui.GButton;
	public btn_sanMa: fgui.GButton;
	public txt_title: fgui.GTextField;
	public static url: string = "ui://vith2b66ktwpob9u";

	public static createInstance(): UIRank {
		return <UIRank>(fgui.UIPackage.createObject("PkgMain", "UIRank"));
	}

	protected override onConstruct(): void {
		this.list_level = <fgui.GList>(this.getChildAt(1));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.btn_siMa = <fgui.GButton>(this.getChildAt(3));
		this.btn_sanMa = <fgui.GButton>(this.getChildAt(4));
		this.txt_title = <fgui.GTextField>(this.getChildAt(5));
	}
}