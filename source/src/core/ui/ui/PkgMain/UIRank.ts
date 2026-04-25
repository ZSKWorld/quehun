/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIRank extends fgui.GComponent {

	protected btn_mask: fgui.GButton;
	protected list_rank: fgui.GList;
	protected btn_close: fgui.GButton;
	protected btn_siMa: fgui.GButton;
	protected btn_sanMa: fgui.GButton;
	protected txt_title: fgui.GTextField;
	public static url: string = "ui://vith2b66ktwpob9u";

	public static createInstance(): UIRank {
		return <UIRank>(fgui.UIPackage.createObject("PkgMain", "UIRank"));
	}

	protected override onConstruct(): void {
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.list_rank = <fgui.GList>(this.getChildAt(3));
		this.btn_close = <fgui.GButton>(this.getChildAt(4));
		this.btn_siMa = <fgui.GButton>(this.getChildAt(5));
		this.btn_sanMa = <fgui.GButton>(this.getChildAt(6));
		this.txt_title = <fgui.GTextField>(this.getChildAt(7));
	}
}