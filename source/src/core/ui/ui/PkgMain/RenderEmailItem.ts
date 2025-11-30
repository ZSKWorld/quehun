/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class RenderEmailItem extends fgui.GComponent {

	protected com_item: ComItemView;
	protected img_gotReward: fgui.GImage;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vith2b66hk7robax";

	public static createInstance(): RenderEmailItem {
		return <RenderEmailItem>(fgui.UIPackage.createObject("PkgMain", "RenderEmailItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(0));
		this.img_gotReward = <fgui.GImage>(this.getChildAt(1));
		this.txt_count = <fgui.GTextField>(this.getChildAt(2));
	}
}