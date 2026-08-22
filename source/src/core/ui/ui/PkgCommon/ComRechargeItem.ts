/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class ComRechargeItem extends GButtonView {

	protected ctrl_type: fgui.Controller;
	protected img_first: fgui.GImage;
	protected com_item: ComItem1View;
	protected loader_currency: fgui.GLoader;
	protected txt_desc: fgui.GTextField;
	protected txt_cost: fgui.GTextField;
	public static url: string = "ui://vx9zwsern15iobik";

	public static createInstance(): ComRechargeItem {
		return <ComRechargeItem>(fgui.UIPackage.createObject("PkgCommon", "ComRechargeItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.img_first = <fgui.GImage>(this.getChildAt(1));
		this.com_item = <ComItem1View>(this.getChildAt(3));
		this.loader_currency = <fgui.GLoader>(this.getChildAt(4));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(6));
		this.txt_cost = <fgui.GTextField>(this.getChildAt(7));
	}
}