/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { RenderFriendRecentView } from "../../view/PkgMain/view/renders/RenderFriendRecentView";
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
	protected txt_empty: fgui.GTextField;
	protected txt_limit: fgui.GTextField;
	protected list_friend: fgui.GList;
	protected list_apply: fgui.GList;
	protected itxt_searchId: fgui.GTextInput;
	protected btn_find: fgui.GButton;
	protected com_searchPlayer: RenderFriendRecentView;
	protected list_recent: fgui.GList;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vith2b66qke2ob9m";

	public static createInstance(): UIFriend {
		return <UIFriend>(fgui.UIPackage.createObject("PkgMain", "UIFriend"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_copy = <fgui.GButton>(this.getChildAt(3));
		this.txt_myID = <fgui.GTextField>(this.getChildAt(5));
		this.btn_friendList = <fgui.GButton>(this.getChildAt(8));
		this.btn_friendApply = <fgui.GButton>(this.getChildAt(9));
		this.btn_searchFriend = <fgui.GButton>(this.getChildAt(10));
		this.btn_recentMatch = <fgui.GButton>(this.getChildAt(11));
		this.txt_empty = <fgui.GTextField>(this.getChildAt(13));
		this.txt_limit = <fgui.GTextField>(this.getChildAt(14));
		this.list_friend = <fgui.GList>(this.getChildAt(15));
		this.list_apply = <fgui.GList>(this.getChildAt(17));
		this.itxt_searchId = <fgui.GTextInput>(this.getChildAt(19));
		this.btn_find = <fgui.GButton>(this.getChildAt(20));
		this.com_searchPlayer = <RenderFriendRecentView>(this.getChildAt(21));
		this.list_recent = <fgui.GList>(this.getChildAt(23));
		this.trans_show = this.getTransitionAt(0);
	}
}