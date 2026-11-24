/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComFriendInvite extends GComponentView {

	protected btn_banned: fgui.GButton;
	protected btn_cancel: fgui.GButton;
	protected btn_join: fgui.GButton;
	protected txt_name: fgui.GTextField;
	protected txt_roomInfo: fgui.GTextField;
	protected txt_time: fgui.GTextField;
	public static url: string = "ui://vx9zwseril8eobnt";

	public static createInstance(): ComFriendInvite {
		return <ComFriendInvite>(fgui.UIPackage.createObject("PkgCommon", "ComFriendInvite"));
	}

	protected override onConstruct(): void {
		this.btn_banned = <fgui.GButton>(this.getChildAt(2));
		this.btn_cancel = <fgui.GButton>(this.getChildAt(3));
		this.btn_join = <fgui.GButton>(this.getChildAt(4));
		this.txt_name = <fgui.GTextField>(this.getChildAt(5));
		this.txt_roomInfo = <fgui.GTextField>(this.getChildAt(7));
		this.txt_time = <fgui.GTextField>(this.getChildAt(8));
	}
}