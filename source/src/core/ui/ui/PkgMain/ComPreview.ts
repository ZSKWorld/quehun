/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";
import { ComMJItemView } from "../../view/PkgCommon/view/coms/ComMJItemView";
import { ComHead2View } from "../../view/PkgCommon/view/coms/ComHead2View";

export default class ComPreview extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected btn_close1: fgui.GButton;
	protected btn_close2: fgui.GButton;
	protected com_item: ComItem1View;
	protected com_mjp0: ComMJItemView;
	protected com_mjp1: ComMJItemView;
	protected com_mjp2: ComMJItemView;
	protected com_mjp3: ComMJItemView;
	protected com_mjp4: ComMJItemView;
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
		this.com_mjp0 = <ComMJItemView>(this.getChildAt(4));
		this.com_mjp1 = <ComMJItemView>(this.getChildAt(5));
		this.com_mjp2 = <ComMJItemView>(this.getChildAt(6));
		this.com_mjp3 = <ComMJItemView>(this.getChildAt(7));
		this.com_mjp4 = <ComMJItemView>(this.getChildAt(8));
		this.com_head = <ComHead2View>(this.getChildAt(9));
		this.txt_name = <fgui.GTextField>(this.getChildAt(10));
	}
}