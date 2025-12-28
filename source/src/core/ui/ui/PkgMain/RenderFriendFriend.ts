/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComHead2View } from "../../view/PkgCommon/view/coms/ComHead2View";
import { ComTitleView } from "../../view/PkgCommon/view/coms/ComTitleView";

export default class RenderFriendFriend extends fgui.GComponent {

	protected com_head: ComHead2View;
	protected com_title: ComTitleView;
	protected btn_look: fgui.GButton;
	protected btn_ob: fgui.GButton;
	protected btn_delete: fgui.GButton;
	public static url: string = "ui://vith2b66puubobfa";

	public static createInstance(): RenderFriendFriend {
		return <RenderFriendFriend>(fgui.UIPackage.createObject("PkgMain", "RenderFriendFriend"));
	}

	protected override onConstruct(): void {
		this.com_head = <ComHead2View>(this.getChildAt(2));
		this.com_title = <ComTitleView>(this.getChildAt(3));
		this.btn_look = <fgui.GButton>(this.getChildAt(7));
		this.btn_ob = <fgui.GButton>(this.getChildAt(8));
		this.btn_delete = <fgui.GButton>(this.getChildAt(9));
	}
}