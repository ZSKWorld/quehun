/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { RenderBagItemView } from "../../view/PkgMain/view/renders/RenderBagItemView";

export default class RenderBagGiftItem extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected btn_item: RenderBagItemView;
	protected btn_delete: fgui.GButton;
	protected txt_count: fgui.GTextField;
	public static url: string = "ui://vith2b66q5yiobbp";

	public static createInstance(): RenderBagGiftItem {
		return <RenderBagGiftItem>(fgui.UIPackage.createObject("PkgMain", "RenderBagGiftItem"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.btn_item = <RenderBagItemView>(this.getChildAt(0));
		this.btn_delete = <fgui.GButton>(this.getChildAt(2));
		this.txt_count = <fgui.GTextField>(this.getChildAt(4));
	}
}