/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class RenderRechargeItem extends ViewBase(fgui.GComponent) {

	protected com_item: ComItem1View;
	protected txt_count: fgui.GTextField;
	protected img_gotReward: fgui.GImage;
	public static url: string = "ui://vx9zwsersxdbobiq";

	public static createInstance(): RenderRechargeItem {
		return <RenderRechargeItem>(fgui.UIPackage.createObject("PkgCommon", "RenderRechargeItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItem1View>(this.getChildAt(0));
		this.txt_count = <fgui.GTextField>(this.getChildAt(1));
		this.img_gotReward = <fgui.GImage>(this.getChildAt(2));
	}
}