/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class RenderShopSkin extends ViewBase(fgui.GComponent) {

	protected com_item: ComItemView;
	protected img_dynamic: fgui.GImage;
	protected img_owned: fgui.GImage;
	protected btn_buy: fgui.GButton;
	protected txt_lastTime: fgui.GTextField;
	protected txt_name: fgui.GTextField;
	protected txt_desc: fgui.GTextField;
	protected loader_currency2: fgui.GLoader;
	protected txt_currencyCount2: fgui.GTextField;
	protected loader_currency1: fgui.GLoader;
	protected txt_discount: fgui.GTextField;
	protected txt_newPrice: fgui.GTextField;
	protected txt_oldPrice: fgui.GTextField;
	public static url: string = "ui://vith2b66fpd2obgv";

	public static createInstance(): RenderShopSkin {
		return <RenderShopSkin>(fgui.UIPackage.createObject("PkgMain", "RenderShopSkin"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(0));
		this.img_dynamic = <fgui.GImage>(this.getChildAt(3));
		this.img_owned = <fgui.GImage>(this.getChildAt(5));
		this.btn_buy = <fgui.GButton>(this.getChildAt(6));
		this.txt_lastTime = <fgui.GTextField>(this.getChildAt(7));
		this.txt_name = <fgui.GTextField>(this.getChildAt(8));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(9));
		this.loader_currency2 = <fgui.GLoader>(this.getChildAt(10));
		this.txt_currencyCount2 = <fgui.GTextField>(this.getChildAt(11));
		this.loader_currency1 = <fgui.GLoader>(this.getChildAt(14));
		this.txt_discount = <fgui.GTextField>(this.getChildAt(15));
		this.txt_newPrice = <fgui.GTextField>(this.getChildAt(16));
		this.txt_oldPrice = <fgui.GTextField>(this.getChildAt(17));
	}
}