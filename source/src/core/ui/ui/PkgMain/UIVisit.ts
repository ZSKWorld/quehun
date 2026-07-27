/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComVisitIntroView } from "../../view/PkgMain/view/coms/ComVisitIntroView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIVisit extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected com_back: ComBackView;
	protected btn_tab0: fgui.GButton;
	protected btn_tab1: fgui.GButton;
	protected btn_tab2: fgui.GButton;
	protected com_intro: ComVisitIntroView;
	protected list_voice: fgui.GList;
	protected list_spot: fgui.GList;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vith2b669c0bobip";

	public static createInstance(): UIVisit {
		return <UIVisit>(fgui.UIPackage.createObject("PkgMain", "UIVisit"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_tab0 = <fgui.GButton>(this.getChildAt(4));
		this.btn_tab1 = <fgui.GButton>(this.getChildAt(5));
		this.btn_tab2 = <fgui.GButton>(this.getChildAt(6));
		this.com_intro = <ComVisitIntroView>(this.getChildAt(7));
		this.list_voice = <fgui.GList>(this.getChildAt(8));
		this.list_spot = <fgui.GList>(this.getChildAt(9));
		this.trans_show = this.getTransitionAt(0);
	}
}