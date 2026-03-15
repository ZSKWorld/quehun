/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnShopRefresh extends fgui.GButton {

	protected img_currency: fgui.GImage;
	protected txt_refresh: fgui.GTextField;
	protected txt_count: fgui.GTextField;
	protected txt_refreshNow: fgui.GTextField;
	public static url: string = "ui://vith2b66fpd2obgq";

	public static createInstance(): BtnShopRefresh {
		return <BtnShopRefresh>(fgui.UIPackage.createObject("PkgMain", "BtnShopRefresh"));
	}

	protected override onConstruct(): void {
		this.img_currency = <fgui.GImage>(this.getChildAt(1));
		this.txt_refresh = <fgui.GTextField>(this.getChildAt(2));
		this.txt_count = <fgui.GTextField>(this.getChildAt(3));
		this.txt_refreshNow = <fgui.GTextField>(this.getChildAt(4));
	}
}