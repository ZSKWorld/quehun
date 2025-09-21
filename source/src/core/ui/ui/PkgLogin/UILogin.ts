/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UILogin extends fgui.GComponent {

	public ctrl_page: fgui.Controller;
	public graph_scene: fgui.GGraph;
	public btn_login: fgui.GButton;
	public btn_announce: fgui.GButton;
	public btn_help: fgui.GButton;
	public btn_loginByAccount: fgui.GButton;
	public btn_loginBtnPhone: fgui.GButton;
	public btn_register: fgui.GButton;
	public btn_forgotPassword: fgui.GButton;
	public btn_forgotAccount: fgui.GButton;
	public txt_routeName: fgui.GTextField;
	public txt_routeDelay: fgui.GTextField;
	public itxt_account: fgui.GTextInput;
	public itxt_password: fgui.GTextInput;
	public btn_logout: fgui.GButton;
	public trans_t0: fgui.Transition;
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