/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComMatchMode extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected btn_rankMode: fgui.GButton;
	protected btn_matchMode: fgui.GButton;
	protected btn_friendMode: fgui.GButton;
	protected btn_back: fgui.GButton;
	protected btn_rule: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected com_contentRank: fgui.GComponent;
	protected com_contentMatch: fgui.GComponent;
	protected com_contentFriend: fgui.GComponent;
	protected com_contentMode: fgui.GComponent;
	protected trans_in: fgui.Transition;
	protected trans_out: fgui.Transition;
	protected trans_titleIn: fgui.Transition;
	protected trans_titleOut: fgui.Transition;
	public static url: string = "ui://vith2b66w29kob8f";

	public static createInstance(): ComMatchMode {
		return <ComMatchMode>(fgui.UIPackage.createObject("PkgMain", "ComMatchMode"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.btn_rankMode = <fgui.GButton>(this.getChildAt(0));
		this.btn_matchMode = <fgui.GButton>(this.getChildAt(1));
		this.btn_friendMode = <fgui.GButton>(this.getChildAt(2));
		this.btn_back = <fgui.GButton>(this.getChildAt(5));
		this.btn_rule = <fgui.GButton>(this.getChildAt(6));
		this.txt_title = <fgui.GTextField>(this.getChildAt(7));
		this.com_contentRank = <fgui.GComponent>(this.getChildAt(9));
		this.com_contentMatch = <fgui.GComponent>(this.getChildAt(10));
		this.com_contentFriend = <fgui.GComponent>(this.getChildAt(11));
		this.com_contentMode = <fgui.GComponent>(this.getChildAt(12));
		this.trans_in = this.getTransitionAt(0);
		this.trans_out = this.getTransitionAt(1);
		this.trans_titleIn = this.getTransitionAt(2);
		this.trans_titleOut = this.getTransitionAt(3);
	}
}