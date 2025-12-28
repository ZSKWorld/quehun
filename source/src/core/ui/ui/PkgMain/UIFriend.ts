/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIFriend extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected com_back: ComBackView;
	protected btn_copy: fgui.GButton;
	protected txt_myID: fgui.GTextField;
	protected btn_friendList: fgui.GButton;
	protected btn_friendApply: fgui.GButton;
	protected btn_searchFriend: fgui.GButton;
	protected btn_recentMatch: fgui.GButton;
	protected txt_limit: fgui.GTextField;
	protected list_friend: fgui.GList;
	protected list_apply: fgui.GList;
	protected btn_look: fgui.GButton;
	public static url: string = "ui://vith2b66qke2ob9m";

	public static createInstance(): UIFriend {
		return <UIFriend>(fgui.UIPackage.createObject("PkgMain", "UIFriend"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_back = <ComBackView>(this.getChildAt(1));
		this.btn_copy = <fgui.GButton>(this.getChildAt(4));
		this.txt_myID = <fgui.GTextField>(this.getChildAt(5));
		this.btn_friendList = <fgui.GButton>(this.getChildAt(6));
		this.btn_friendApply = <fgui.GButton>(this.getChildAt(7));
		this.btn_searchFriend = <fgui.GButton>(this.getChildAt(8));
		this.btn_recentMatch = <fgui.GButton>(this.getChildAt(9));
		this.txt_limit = <fgui.GTextField>(this.getChildAt(10));
		this.list_friend = <fgui.GList>(this.getChildAt(11));
		this.list_apply = <fgui.GList>(this.getChildAt(13));
		this.btn_look = <fgui.GButton>(this.getChildAt(17));
	}
}