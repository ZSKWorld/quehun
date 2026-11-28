/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComCreateRoomContentView } from "../../view/PkgMain/view/coms/ComCreateRoomContentView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UICreateRoom extends GComponentView {

	protected com_back: ComBackView;
	protected btn_rule: fgui.GButton;
	protected btn_create: fgui.GButton;
	protected com_content: ComCreateRoomContentView;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vith2b66z3vjobjm";

	public static createInstance(): UICreateRoom {
		return <UICreateRoom>(fgui.UIPackage.createObject("PkgMain", "UICreateRoom"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(1));
		this.btn_rule = <fgui.GButton>(this.getChildAt(3));
		this.btn_create = <fgui.GButton>(this.getChildAt(4));
		this.com_content = <ComCreateRoomContentView>(this.getChildAt(5));
		this.trans_show = this.getTransitionAt(0);
	}
}