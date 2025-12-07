/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnItem1View } from "../../view/PkgCommon/view/btns/BtnItem1View";

export default class RenderBagItem extends fgui.GComponent {

	protected btn_item: BtnItem1View;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vith2b66q5yiobbn";

	public static createInstance(): RenderBagItem {
		return <RenderBagItem>(fgui.UIPackage.createObject("PkgMain", "RenderBagItem"));
	}

	protected override onConstruct(): void {
		this.btn_item = <BtnItem1View>(this.getChildAt(0));
		this.txt_count = <fgui.GTextField>(this.getChildAt(1));
	}
}