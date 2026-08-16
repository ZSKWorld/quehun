/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { BtnShopRefreshView } from "../../view/PkgMain/view/btns/BtnShopRefreshView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIShop extends ViewBase(fgui.GComponent) {

	protected ctrl_c1: fgui.Controller;
	protected com_back: ComBackView;
	protected btn_tab0: fgui.GButton;
	protected btn_tab1: fgui.GButton;
	protected btn_tab2: fgui.GButton;
	protected btn_tab3: fgui.GButton;
	protected btn_tab4: fgui.GButton;
	protected btn_tab5: fgui.GButton;
	protected btn_tab6: fgui.GButton;
	protected btn_zhwRefresh: BtnShopRefreshView;
	protected txt_zhwRefreshTime: fgui.GTextField;
	protected txt_zhwRefreshCount: fgui.GTextField;
	protected txt_zhwRefreshAll: fgui.GTextField;
	protected loader_currency: fgui.GLoader;
	protected txt_currencyCount: fgui.GTextField;
	protected txt_tip: fgui.GTextField;
	protected txt_refreshTime: fgui.GTextField;
	protected list_item: fgui.GList;
	protected list_skin: fgui.GList;
	protected list_cg: fgui.GList;
	protected txt_cgSellAll: fgui.GTextField;
	protected txt_cgRefreshTime: fgui.GTextField;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vith2b66qke2ob9q";

	public static createInstance(): UIShop {
		return <UIShop>(fgui.UIPackage.createObject("PkgMain", "UIShop"));
	}

	protected override onConstruct(): void {
		this.ctrl_c1 = this.getControllerAt(0);
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_tab0 = <fgui.GButton>(this.getChildAt(7));
		this.btn_tab1 = <fgui.GButton>(this.getChildAt(8));
		this.btn_tab2 = <fgui.GButton>(this.getChildAt(9));
		this.btn_tab3 = <fgui.GButton>(this.getChildAt(10));
		this.btn_tab4 = <fgui.GButton>(this.getChildAt(11));
		this.btn_tab5 = <fgui.GButton>(this.getChildAt(12));
		this.btn_tab6 = <fgui.GButton>(this.getChildAt(13));
		this.btn_zhwRefresh = <BtnShopRefreshView>(this.getChildAt(15));
		this.txt_zhwRefreshTime = <fgui.GTextField>(this.getChildAt(16));
		this.txt_zhwRefreshCount = <fgui.GTextField>(this.getChildAt(17));
		this.txt_zhwRefreshAll = <fgui.GTextField>(this.getChildAt(18));
		this.loader_currency = <fgui.GLoader>(this.getChildAt(20));
		this.txt_currencyCount = <fgui.GTextField>(this.getChildAt(21));
		this.txt_tip = <fgui.GTextField>(this.getChildAt(22));
		this.txt_refreshTime = <fgui.GTextField>(this.getChildAt(23));
		this.list_item = <fgui.GList>(this.getChildAt(25));
		this.list_skin = <fgui.GList>(this.getChildAt(26));
		this.list_cg = <fgui.GList>(this.getChildAt(27));
		this.txt_cgSellAll = <fgui.GTextField>(this.getChildAt(28));
		this.txt_cgRefreshTime = <fgui.GTextField>(this.getChildAt(29));
		this.trans_show = this.getTransitionAt(0);
	}
}