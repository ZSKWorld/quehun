/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBagGiftView } from "../../view/PkgMain/view/coms/ComBagGiftView";
import { ComBagDecoView } from "../../view/PkgMain/view/coms/ComBagDecoView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIBag extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected com_back: ComBackView;
	protected btn_daoJu: fgui.GButton;
	protected btn_liWu: fgui.GButton;
	protected btn_zhuangBan: fgui.GButton;
	protected btn_fuShi: fgui.GButton;
	protected btn_chaHua: fgui.GButton;
	protected list_item: fgui.GList;
	protected com_gift: ComBagGiftView;
	protected com_deco: ComBagDecoView;
	public static url: string = "ui://vith2b66qke2ob9p";

	public static createInstance(): UIBag {
		return <UIBag>(fgui.UIPackage.createObject("PkgMain", "UIBag"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_back = <ComBackView>(this.getChildAt(1));
		this.btn_daoJu = <fgui.GButton>(this.getChildAt(2));
		this.btn_liWu = <fgui.GButton>(this.getChildAt(3));
		this.btn_zhuangBan = <fgui.GButton>(this.getChildAt(4));
		this.btn_fuShi = <fgui.GButton>(this.getChildAt(5));
		this.btn_chaHua = <fgui.GButton>(this.getChildAt(6));
		this.list_item = <fgui.GList>(this.getChildAt(7));
		this.com_gift = <ComBagGiftView>(this.getChildAt(8));
		this.com_deco = <ComBagDecoView>(this.getChildAt(9));
	}
}