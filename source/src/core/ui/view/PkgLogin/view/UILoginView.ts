import UILogin from "../../../ui/PkgLogin/UILogin";

export const enum EUILoginMsg {
	OnBtnLoginClick = "UILogin_OnBtnLoginClick",
	OnBtnAnnounceClick = "UILogin_OnBtnAnnounceClick",
	OnBtnHelpClick = "UILogin_OnBtnHelpClick",
	OnBtnLoginByAccountClick = "UILogin_OnBtnLoginByAccountClick",
	OnBtnLoginBtnPhoneClick = "UILogin_OnBtnLoginBtnPhoneClick",
	OnBtnRegisterClick = "UILogin_OnBtnRegisterClick",
	OnBtnForgotPasswordClick = "UILogin_OnBtnForgotPasswordClick",
	OnBtnForgotAccountClick = "UILogin_OnBtnForgotAccountClick",
	OnBtnLogoutClick = "UILogin_OnBtnLogoutClick",
}

export class UILoginView extends ExtensionClass<IView, UILogin>(UILogin) implements IView {

	override onCreate() {
		const {
			btn_login, btn_announce, btn_help, btn_loginByAccount, btn_loginBtnPhone,
			btn_register, btn_forgotPassword, btn_forgotAccount,
			btn_logout } = this;
		btn_login.onClick(this, this.sendEvent, [EUILoginMsg.OnBtnLoginClick]);
		btn_announce.onClick(this, this.sendEvent, [EUILoginMsg.OnBtnAnnounceClick]);
		btn_help.onClick(this, this.sendEvent, [EUILoginMsg.OnBtnHelpClick]);
		btn_loginByAccount.onClick(this, this.sendEvent, [EUILoginMsg.OnBtnLoginByAccountClick]);
		btn_loginBtnPhone.onClick(this, this.sendEvent, [EUILoginMsg.OnBtnLoginBtnPhoneClick]);
		btn_register.onClick(this, this.sendEvent, [EUILoginMsg.OnBtnRegisterClick]);
		btn_forgotPassword.onClick(this, this.sendEvent, [EUILoginMsg.OnBtnForgotPasswordClick]);
		btn_forgotAccount.onClick(this, this.sendEvent, [EUILoginMsg.OnBtnForgotAccountClick]);
		btn_logout.onClick(this, this.sendEvent, [EUILoginMsg.OnBtnLogoutClick]);
	}

	refresh(loginAccountType: 0 | 1, account: string, password: string) {
		const { itxt_account, itxt_password, btn_loginByAccount, btn_loginBtnPhone } = this;
		itxt_account.text = account || "";
		itxt_password.text = password || "";
		btn_loginByAccount.selected = loginAccountType == 0;
		btn_loginBtnPhone.selected = loginAccountType == 1;
		itxt_account.promptText = $lang(loginAccountType == 0 ? 3138 : 3132);
	}
}
