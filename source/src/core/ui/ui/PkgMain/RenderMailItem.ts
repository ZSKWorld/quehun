/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class RenderMailItem extends GComponentView {

	protected com_item: ComItem1View;
	protected img_gotReward: fgui.GImage;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vith2b66hk7robax";

	public static createInstance(): RenderMailItem {
		return <RenderMailItem>(fgui.UIPackage.createObject("PkgMain", "RenderMailItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItem1View>(this.getChildAt(0));
		this.img_gotReward = <fgui.GImage>(this.getChildAt(1));
		this.txt_count = <fgui.GTextField>(this.getChildAt(2));
	}
}