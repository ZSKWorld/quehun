/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { ComMatchContentView } from "../../view/PkgMain/view/coms/ComMatchContentView";

export default class ComMatchMode extends ViewBase(fgui.GComponent) {

	protected ctrl_type: fgui.Controller;
	protected btn_rankMode: fgui.GButton;
	protected btn_matchMode: fgui.GButton;
	protected btn_friendMode: fgui.GButton;
	protected btn_back: fgui.GButton;
	protected btn_rule: fgui.GButton;
	protected txt_title: fgui.GTextField;
	protected com_content1: ComMatchContentView;
	protected com_content2: ComMatchContentView;
	protected trans_modeIn: fgui.Transition;
	protected trans_modeOut: fgui.Transition;
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
		this.com_content1 = <ComMatchContentView>(this.getChildAt(9));
		this.com_content2 = <ComMatchContentView>(this.getChildAt(10));
		this.trans_modeIn = this.getTransitionAt(0);
		this.trans_modeOut = this.getTransitionAt(1);
		this.trans_titleIn = this.getTransitionAt(2);
		this.trans_titleOut = this.getTransitionAt(3);
	}
}