/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class ComBagGift extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected list_item: fgui.GList;
	protected com_icon: ComItemView;
	protected btn_start: fgui.GButton;
	protected btn_clear: fgui.GButton;
	protected btn_sell: fgui.GButton;
	protected btn_back: fgui.GButton;
	protected txt_count: fgui.GTextField;
	protected txt_add: fgui.GTextField;
	public static url: string = "ui://vith2b66gsi2obbr";

	public static createInstance(): ComBagGift {
		return <ComBagGift>(fgui.UIPackage.createObject("PkgMain", "ComBagGift"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.list_item = <fgui.GList>(this.getChildAt(0));
		this.com_icon = <ComItemView>(this.getChildAt(1));
		this.btn_start = <fgui.GButton>(this.getChildAt(3));
		this.btn_clear = <fgui.GButton>(this.getChildAt(4));
		this.btn_sell = <fgui.GButton>(this.getChildAt(5));
		this.btn_back = <fgui.GButton>(this.getChildAt(6));
		this.txt_count = <fgui.GTextField>(this.getChildAt(7));
		this.txt_add = <fgui.GTextField>(this.getChildAt(8));
	}
}