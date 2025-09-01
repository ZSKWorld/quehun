/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnCheckTxtRightView } from "../../view/PkgCommon/view/btns/BtnCheckTxtRightView";

export default class UILogin extends fgui.GComponent {

	public btn_close: fgui.GButton;
	public btn_remeber: BtnCheckTxtRightView;
	public btn_login: fgui.GButton;
	public btn_toRegister: fgui.GButton;
	public btn_forgotPsd: fgui.GButton;
	public input_account: fgui.GTextInput;
	public input_password: fgui.GTextInput;
	public static url: string = "ui://vs9845atqjdo0";

	public static createInstance(): UILogin {
		return <UILogin>(fgui.UIPackage.createObject("PkgLogin", "UILogin"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(5));
		this.btn_remeber = <BtnCheckTxtRightView>(this.getChildAt(6));
		this.btn_login = <fgui.GButton>(this.getChildAt(7));
		this.btn_toRegister = <fgui.GButton>(this.getChildAt(8));
		this.btn_forgotPsd = <fgui.GButton>(this.getChildAt(9));
		this.input_account = <fgui.GTextInput>(this.getChildAt(11));
		this.input_password = <fgui.GTextInput>(this.getChildAt(12));
	}
}