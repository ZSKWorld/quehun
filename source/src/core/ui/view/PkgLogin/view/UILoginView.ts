import UILogin from "../../../ui/PkgLogin/UILogin";

export const enum UILoginMsg {
	OnBtnLoginClick = "UILogin_OnBtnLoginClick",
	OnBtnToRegisterClick = "UILogin_OnBtnToRegisterClick",
}

export const enum UILoginStatus {
	Login,
	Register,
	BeLogin,
}

export class UILoginView extends ExtensionClass<IView, UILogin>(UILogin) implements IView {

	override onCreate() {
		const { btn_close, btn_remeber, btn_login, btn_toRegister, btn_forgotPsd, input_account, input_password, } = this;
		btn_login.onClick(this, this.sendEvent, [UILoginMsg.OnBtnLoginClick]);
		btn_toRegister.onClick(this, this.sendEvent, [UILoginMsg.OnBtnToRegisterClick]);
	}

	refreshLoginInfo(account: string, password: string, autoLogin:boolean) {
		this.input_account.text = account || "";
		this.input_password.text = password || "";
		this.btn_remeber.selected = autoLogin;
	}

}
