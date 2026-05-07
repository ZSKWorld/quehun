/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIRecharge extends fgui.GComponent {

	protected ctrl_c1: fgui.Controller;
	protected com_back: ComBackView;
	protected btn_tab0: fgui.GButton;
	protected btn_tab1: fgui.GButton;
	protected btn_tab2: fgui.GButton;
	protected btn_tab3: fgui.GButton;
	protected btn_tab4: fgui.GButton;
	protected list_item: fgui.GList;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://vx9zwserfpd2obgp";

	public static createInstance(): UIRecharge {
		return <UIRecharge>(fgui.UIPackage.createObject("PkgCommon", "UIRecharge"));
	}

	protected override onConstruct(): void {
		this.ctrl_c1 = this.getControllerAt(0);
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.btn_tab0 = <fgui.GButton>(this.getChildAt(7));
		this.btn_tab1 = <fgui.GButton>(this.getChildAt(8));
		this.btn_tab2 = <fgui.GButton>(this.getChildAt(9));
		this.btn_tab3 = <fgui.GButton>(this.getChildAt(10));
		this.btn_tab4 = <fgui.GButton>(this.getChildAt(11));
		this.list_item = <fgui.GList>(this.getChildAt(13));
		this.trans_show = this.getTransitionAt(0);
	}
}