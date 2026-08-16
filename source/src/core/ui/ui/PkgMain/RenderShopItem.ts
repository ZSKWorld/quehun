/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";
import { BtnBuyView } from "../../view/PkgCommon/view/btns/BtnBuyView";

export default class RenderShopItem extends ViewBase(fgui.GComponent) {

	protected com_item: ComItem1View;
	protected btn_bug: BtnBuyView;
	protected txt_name: fgui.GTextField;
	protected txt_last: fgui.GTextField;
	protected img_owned1: fgui.GImage;
	protected img_owned2: fgui.GImage;
	public static url: string = "ui://vith2b66fpd2obgr";

	public static createInstance(): RenderShopItem {
		return <RenderShopItem>(fgui.UIPackage.createObject("PkgMain", "RenderShopItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItem1View>(this.getChildAt(1));
		this.btn_bug = <BtnBuyView>(this.getChildAt(2));
		this.txt_name = <fgui.GTextField>(this.getChildAt(3));
		this.txt_last = <fgui.GTextField>(this.getChildAt(4));
		this.img_owned1 = <fgui.GImage>(this.getChildAt(5));
		this.img_owned2 = <fgui.GImage>(this.getChildAt(6));
	}
}