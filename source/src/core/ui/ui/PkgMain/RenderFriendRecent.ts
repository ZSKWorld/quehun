/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComHead2View } from "../../view/PkgCommon/view/coms/ComHead2View";
import { ComTitleView } from "../../view/PkgCommon/view/coms/ComTitleView";
import { LabelNameView } from "../../view/PkgCommon/view/labels/LabelNameView";

export default class RenderFriendRecent extends fgui.GComponent {

	protected com_head: ComHead2View;
	protected com_title: ComTitleView;
	protected label_name: LabelNameView;
	protected btn_add: fgui.GButton;
	protected txt_added: fgui.GTextField;
	public static url: string = "ui://vith2b66jcnmobfd";

	public static createInstance(): RenderFriendRecent {
		return <RenderFriendRecent>(fgui.UIPackage.createObject("PkgMain", "RenderFriendRecent"));
	}

	protected override onConstruct(): void {
		this.com_head = <ComHead2View>(this.getChildAt(1));
		this.com_title = <ComTitleView>(this.getChildAt(2));
		this.label_name = <LabelNameView>(this.getChildAt(3));
		this.btn_add = <fgui.GButton>(this.getChildAt(4));
		this.txt_added = <fgui.GTextField>(this.getChildAt(5));
	}
}