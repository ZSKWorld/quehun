import UILogin from "../../../ui/PkgLogin/UILogin";

export const enum UILoginMsg {
	OnBtnLoginClick = "UILogin_OnBtnLoginClick",
	OnBtnAnnounceClick = "UILogin_OnBtnAnnounceClick",
	OnBtnHelpClick = "UILogin_OnBtnHelpClick",
	OnBtnLoginByAccountClick = "UILogin_OnBtnLoginByAccountClick",
	OnBtnLoginBtnPhoneClick = "UILogin_OnBtnLoginBtnPhoneClick",
	OnBtnRegisterClick = "UILogin_OnBtnRegisterClick",
	OnBtnForgotPasswordClick = "UILogin_OnBtnForgotPasswordClick",
	OnBtnForgotAccountClick = "UILogin_OnBtnForgotAccountClick",
	OnBtnRouteNameClick = "UILogin_OnBtnRouteNameClick",
	OnBtnRouteDelayClick = "UILogin_OnBtnRouteDelayClick",
}

export class UILoginView extends ExtensionClass<IView, UILogin>(UILogin) implements IView {

	override onCreate() {
		const { btn_login, btn_announce, btn_help, btn_loginByAccount, btn_loginBtnPhone, btn_register, btn_forgotPassword, btn_forgotAccount, btn_routeName, btn_routeDelay } = this;
		btn_login.onClick(this, this.sendEvent, [UILoginMsg.OnBtnLoginClick]);
		btn_announce.onClick(this, this.sendEvent, [UILoginMsg.OnBtnAnnounceClick]);
		btn_help.onClick(this, this.sendEvent, [UILoginMsg.OnBtnHelpClick]);
		btn_loginByAccount.onClick(this, this.sendEvent, [UILoginMsg.OnBtnLoginByAccountClick]);
		btn_loginBtnPhone.onClick(this, this.sendEvent, [UILoginMsg.OnBtnLoginBtnPhoneClick]);
		btn_register.onClick(this, this.sendEvent, [UILoginMsg.OnBtnRegisterClick]);
		btn_forgotPassword.onClick(this, this.sendEvent, [UILoginMsg.OnBtnForgotPasswordClick]);
		btn_forgotAccount.onClick(this, this.sendEvent, [UILoginMsg.OnBtnForgotAccountClick]);
		btn_routeName.onClick(this, this.sendEvent, [UILoginMsg.OnBtnRouteNameClick]);
		btn_routeDelay.onClick(this, this.sendEvent, [UILoginMsg.OnBtnRouteDelayClick]);
	}

	refreshLoginInfo(account: string, password: string, autoLogin: boolean) {
		// this.input_account.text = account || "";
		// this.input_password.text = password || "";
		// this.btn_remeber.selected = autoLogin;
	}

	refreshLoginType(type: 0 | 1) {
		this.btn_loginByAccount.selected = type == 0;
		this.btn_loginBtnPhone.selected = type == 1;
	}

}
