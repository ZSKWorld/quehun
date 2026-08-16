/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";
import { ComItemView } from "../../view/PkgCommon/view/coms/ComItemView";
import { ComHead2View } from "../../view/PkgCommon/view/coms/ComHead2View";

export default class ComPreview extends ViewBase(fgui.GComponent) {

	protected ctrl_type: fgui.Controller;
	protected btn_close1: fgui.GButton;
	protected btn_close2: fgui.GButton;
	protected com_item: ComItem1View;
	protected com_preview: ComItemView;
	protected com_head: ComHead2View;
	protected txt_name: fgui.GTextField;
	public static url: string = "ui://vith2b66fw4wobig";

	public static createInstance(): ComPreview {
		return <ComPreview>(fgui.UIPackage.createObject("PkgMain", "ComPreview"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.btn_close1 = <fgui.GButton>(this.getChildAt(1));
		this.btn_close2 = <fgui.GButton>(this.getChildAt(2));
		this.com_item = <ComItem1View>(this.getChildAt(3));
		this.com_preview = <ComItemView>(this.getChildAt(4));
		this.com_head = <ComHead2View>(this.getChildAt(5));
		this.txt_name = <fgui.GTextField>(this.getChildAt(6));
	}
}