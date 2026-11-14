/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIPaipu extends GComponentView {

	protected com_back: ComBackView;
	protected btn_filter: fgui.GButton;
	protected btn_other: fgui.GButton;
	protected txt_collectNum: fgui.GTextField;
	protected btn_overview: fgui.GButton;
	protected btn_level: fgui.GButton;
	protected btn_friend: fgui.GButton;
	protected btn_activity: fgui.GButton;
	protected btn_match: fgui.GButton;
	protected btn_collect: fgui.GButton;
	protected list_info: fgui.GList;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vith2b66qke2ob9o";

	public static createInstance(): UIPaipu {
		return <UIPaipu>(fgui.UIPackage.createObject("PkgMain", "UIPaipu"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_filter = <fgui.GButton>(this.getChildAt(1));
		this.btn_other = <fgui.GButton>(this.getChildAt(2));
		this.txt_collectNum = <fgui.GTextField>(this.getChildAt(3));
		this.btn_overview = <fgui.GButton>(this.getChildAt(6));
		this.btn_level = <fgui.GButton>(this.getChildAt(7));
		this.btn_friend = <fgui.GButton>(this.getChildAt(8));
		this.btn_activity = <fgui.GButton>(this.getChildAt(9));
		this.btn_match = <fgui.GButton>(this.getChildAt(10));
		this.btn_collect = <fgui.GButton>(this.getChildAt(11));
		this.list_info = <fgui.GList>(this.getChildAt(12));
		this.trans_show = this.getTransitionAt(0);
	}
}