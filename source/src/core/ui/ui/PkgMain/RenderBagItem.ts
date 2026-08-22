/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class RenderBagItem extends GButtonView {

	protected com_item: ComItem1View;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vith2b66q5yiobbn";

	public static createInstance(): RenderBagItem {
		return <RenderBagItem>(fgui.UIPackage.createObject("PkgMain", "RenderBagItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItem1View>(this.getChildAt(0));
		this.txt_count = <fgui.GTextField>(this.getChildAt(1));
	}
}