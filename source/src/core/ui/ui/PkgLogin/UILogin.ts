/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class UILogin extends GComponentView {

	protected ctrl_page: fgui.Controller;
	protected graph_scene: fgui.GGraph;
	protected btn_login: fgui.GButton;
	protected btn_announce: fgui.GButton;
	protected btn_help: fgui.GButton;
	protected btn_loginByAccount: fgui.GButton;
	protected btn_loginBtnPhone: fgui.GButton;
	protected btn_register: fgui.GButton;
	protected btn_forgotPassword: fgui.GButton;
	protected btn_forgotAccount: fgui.GButton;
	protected txt_routeName: fgui.GTextField;
	protected txt_routeDelay: fgui.GTextField;
	protected itxt_account: fgui.GTextInput;
	protected itxt_password: fgui.GTextInput;
	protected btn_logout: fgui.GButton;
	protected trans_t0: fgui.Transition;
	public static url: string = "ui://vs9845atjdu6b6x";

	public static createInstance(): UILogin {
		return <UILogin>(fgui.UIPackage.createObject("PkgLogin", "UILogin"));
	}

	protected override onConstruct(): void {
		this.ctrl_page = this.getControllerAt(0);
		this.graph_scene = <fgui.GGraph>(this.getChildAt(0));
		this.btn_login = <fgui.GButton>(this.getChildAt(6));
		this.btn_announce = <fgui.GButton>(this.getChildAt(7));
		this.btn_help = <fgui.GButton>(this.getChildAt(8));
		this.btn_loginByAccount = <fgui.GButton>(this.getChildAt(9));
		this.btn_loginBtnPhone = <fgui.GButton>(this.getChildAt(10));
		this.btn_register = <fgui.GButton>(this.getChildAt(11));
		this.btn_forgotPassword = <fgui.GButton>(this.getChildAt(12));
		this.btn_forgotAccount = <fgui.GButton>(this.getChildAt(13));
		this.txt_routeName = <fgui.GTextField>(this.getChildAt(15));
		this.txt_routeDelay = <fgui.GTextField>(this.getChildAt(16));
		this.itxt_account = <fgui.GTextInput>(this.getChildAt(17));
		this.itxt_password = <fgui.GTextInput>(this.getChildAt(18));
		this.btn_logout = <fgui.GButton>(this.getChildAt(21));
		this.trans_t0 = this.getTransitionAt(0);
	}
}