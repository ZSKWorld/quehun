/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UICheckCurrency extends fgui.GComponent {

	protected btn_mask: fgui.GButton;
	protected btn_close: fgui.GButton;
	protected btn_buy: fgui.GButton;
	protected btn_confirm: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected txt_paid: fgui.GTextField;
	protected txt_free: fgui.GTextField;
	protected txt_total: fgui.GTextField;
	public static url: string = "ui://vith2b66giq1obic";

	public static createInstance(): UICheckCurrency {
		return <UICheckCurrency>(fgui.UIPackage.createObject("PkgMain", "UICheckCurrency"));
	}

	protected override onConstruct(): void {
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.btn_buy = <fgui.GButton>(this.getChildAt(3));
		this.btn_confirm = <fgui.GButton>(this.getChildAt(4));
		this.txt_title = <fgui.GTextField>(this.getChildAt(5));
		this.txt_paid = <fgui.GTextField>(this.getChildAt(9));
		this.txt_free = <fgui.GTextField>(this.getChildAt(10));
		this.txt_total = <fgui.GTextField>(this.getChildAt(11));
	}
}