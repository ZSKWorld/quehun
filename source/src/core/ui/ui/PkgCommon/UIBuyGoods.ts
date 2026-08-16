/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";
import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class UIBuyGoods extends ViewBase(fgui.GComponent) {

	protected ctrl_c1: fgui.Controller;
	protected btn_mask: fgui.GButton;
	protected btn_close: fgui.GButton;
	protected com_item: ComItem1View;
	protected img_line: fgui.GImage;
	protected txt_title: fgui.GTextField;
	protected txt_own: fgui.GTextField;
	protected txt_desc: fgui.GTextField;
	protected txt_desc2: fgui.GTextField;
	protected com_cgCurrency: ComItemView;
	protected txt_cgName: fgui.GTextField;
	protected rtxt_cgCost: fgui.GRichTextField;
	protected com_multiCurrency: ComItemView;
	protected txt_multiPrice: fgui.GTextField;
	protected txt_multiLast: fgui.GTextField;
	protected txt_multiDesc: fgui.GTextField;
	protected txt_multiCount: fgui.GTextField;
	protected btn_sub10: fgui.GButton;
	protected btn_sub1: fgui.GButton;
	protected btn_add1: fgui.GButton;
	protected btn_add10: fgui.GButton;
	protected com_currency: ComItemView;
	protected txt_cost: fgui.GTextField;
	protected btn_buy: fgui.GButton;
	public static url: string = "ui://vx9zwserhraoobiz";

	public static createInstance(): UIBuyGoods {
		return <UIBuyGoods>(fgui.UIPackage.createObject("PkgCommon", "UIBuyGoods"));
	}

	protected override onConstruct(): void {
		this.ctrl_c1 = this.getControllerAt(0);
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(2));
		this.com_item = <ComItem1View>(this.getChildAt(3));
		this.img_line = <fgui.GImage>(this.getChildAt(4));
		this.txt_title = <fgui.GTextField>(this.getChildAt(5));
		this.txt_own = <fgui.GTextField>(this.getChildAt(6));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(7));
		this.txt_desc2 = <fgui.GTextField>(this.getChildAt(8));
		this.com_cgCurrency = <ComItemView>(this.getChildAt(10));
		this.txt_cgName = <fgui.GTextField>(this.getChildAt(11));
		this.rtxt_cgCost = <fgui.GRichTextField>(this.getChildAt(12));
		this.com_multiCurrency = <ComItemView>(this.getChildAt(15));
		this.txt_multiPrice = <fgui.GTextField>(this.getChildAt(17));
		this.txt_multiLast = <fgui.GTextField>(this.getChildAt(21));
		this.txt_multiDesc = <fgui.GTextField>(this.getChildAt(23));
		this.txt_multiCount = <fgui.GTextField>(this.getChildAt(24));
		this.btn_sub10 = <fgui.GButton>(this.getChildAt(25));
		this.btn_sub1 = <fgui.GButton>(this.getChildAt(26));
		this.btn_add1 = <fgui.GButton>(this.getChildAt(27));
		this.btn_add10 = <fgui.GButton>(this.getChildAt(28));
		this.com_currency = <ComItemView>(this.getChildAt(31));
		this.txt_cost = <fgui.GTextField>(this.getChildAt(33));
		this.btn_buy = <fgui.GButton>(this.getChildAt(35));
	}
}