/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";

export default class RenderBagGiftItem extends fgui.GComponent {

	protected com_item: ComItemView;
	protected btn_delete: fgui.GButton;
	protected btn_add: fgui.GButton;
	protected txt_total: fgui.GTextField;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vith2b66q5yiobbp";

	public static createInstance(): RenderBagGiftItem {
		return <RenderBagGiftItem>(fgui.UIPackage.createObject("PkgMain", "RenderBagGiftItem"));
	}

	protected override onConstruct(): void {
		this.com_item = <ComItemView>(this.getChildAt(0));
		this.btn_delete = <fgui.GButton>(this.getChildAt(1));
		this.btn_add = <fgui.GButton>(this.getChildAt(2));
		this.txt_total = <fgui.GTextField>(this.getChildAt(3));
		this.txt_count = <fgui.GTextField>(this.getChildAt(4));
	}
}