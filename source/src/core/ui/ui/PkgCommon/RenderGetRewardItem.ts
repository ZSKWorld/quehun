/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class RenderGetRewardItem extends ViewBase(fgui.GComponent) {

	protected com_item: ComItem1View;
	protected txt_count: fgui.GTextField;
	protected txt_name: fgui.GTextField;
	public static url: string = "ui://vx9zwsernng6obhy";

	public static createInstance(): RenderGetRewardItem {
		return <RenderGetRewardItem>(fgui.UIPackage.createObject("PkgCommon", "RenderGetRewardItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItem1View>(this.getChildAt(0));
		this.txt_count = <fgui.GTextField>(this.getChildAt(1));
		this.txt_name = <fgui.GTextField>(this.getChildAt(2));
	}
}