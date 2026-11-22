/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UICreateRoom extends GComponentView {

	protected com_back: ComBackView;
	protected btn_rule: fgui.GButton;
	protected btn_create: fgui.GButton;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vith2b66z3vjobjm";

	public static createInstance(): UICreateRoom {
		return <UICreateRoom>(fgui.UIPackage.createObject("PkgMain", "UICreateRoom"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_rule = <fgui.GButton>(this.getChildAt(2));
		this.btn_create = <fgui.GButton>(this.getChildAt(3));
		this.trans_show = this.getTransitionAt(0);
	}
}