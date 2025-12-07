/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnItem1View } from "../../view/PkgCommon/view/btns/BtnItem1View";

export default class RenderEmailItem extends fgui.GComponent {

	protected btn_item: BtnItem1View;
	protected img_gotReward: fgui.GImage;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vith2b66hk7robax";

	public static createInstance(): RenderEmailItem {
		return <RenderEmailItem>(fgui.UIPackage.createObject("PkgMain", "RenderEmailItem"));
	}

	protected override onConstruct(): void {
		this.btn_item = <BtnItem1View>(this.getChildAt(0));
		this.img_gotReward = <fgui.GImage>(this.getChildAt(1));
		this.txt_count = <fgui.GTextField>(this.getChildAt(2));
	}
}