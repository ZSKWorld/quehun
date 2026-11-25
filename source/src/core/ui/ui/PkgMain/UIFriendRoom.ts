/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComFriendRoomItemView } from "../../view/PkgMain/view/coms/ComFriendRoomItemView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIFriendRoom extends GComponentView {

	protected com_back: ComBackView;
	protected txt_name: fgui.GTextField;
	protected btn_share: fgui.GButton;
	protected btn_rule: fgui.GButton;
	protected btn_yizhong: fgui.GButton;
	protected btn_deco: fgui.GButton;
	protected btn_start: fgui.GButton;
	protected btn_cancel: fgui.GButton;
	protected btn_ready: fgui.GButton;
	protected com_player0: ComFriendRoomItemView;
	protected com_player1: ComFriendRoomItemView;
	protected com_player2: ComFriendRoomItemView;
	protected com_player3: ComFriendRoomItemView;
	protected list_rules: fgui.GList;
	protected txt_title: fgui.GTextField;
	protected txt_titleValue: fgui.GTextField;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vith2b66il8eobjt";

	public static createInstance(): UIFriendRoom {
		return <UIFriendRoom>(fgui.UIPackage.createObject("PkgMain", "UIFriendRoom"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(1));
		this.txt_name = <fgui.GTextField>(this.getChildAt(4));
		this.btn_share = <fgui.GButton>(this.getChildAt(5));
		this.btn_rule = <fgui.GButton>(this.getChildAt(6));
		this.btn_yizhong = <fgui.GButton>(this.getChildAt(7));
		this.btn_deco = <fgui.GButton>(this.getChildAt(9));
		this.btn_start = <fgui.GButton>(this.getChildAt(10));
		this.btn_cancel = <fgui.GButton>(this.getChildAt(11));
		this.btn_ready = <fgui.GButton>(this.getChildAt(12));
		this.com_player0 = <ComFriendRoomItemView>(this.getChildAt(14));
		this.com_player1 = <ComFriendRoomItemView>(this.getChildAt(15));
		this.com_player2 = <ComFriendRoomItemView>(this.getChildAt(16));
		this.com_player3 = <ComFriendRoomItemView>(this.getChildAt(17));
		this.list_rules = <fgui.GList>(this.getChildAt(22));
		this.txt_title = <fgui.GTextField>(this.getChildAt(23));
		this.txt_titleValue = <fgui.GTextField>(this.getChildAt(24));
		this.trans_show = this.getTransitionAt(0);
	}
}