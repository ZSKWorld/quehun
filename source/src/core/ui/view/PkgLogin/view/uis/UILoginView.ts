import UILogin from "../../../../ui/PkgLogin/UILogin";

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

	OnAccountInputEnter = "UILogin_OnAccountInputEnter",
}

export class UILoginView extends UILogin {

	get accountTxt() { return this.itxt_account.text; }
	get passwordTxt() { return this.itxt_password.text; }

	override onCreate() {
		const {
			btn_login, btn_announce, btn_help, btn_loginByAccount, btn_loginBtnPhone,
			btn_register, btn_forgotPassword, btn_forgotAccount, itxt_account, itxt_password,
			btn_logout } = this;
		btn_login.onClick(this, this.event, [EUILoginMsg.OnBtnLoginClick]);
		btn_announce.onClick(this, this.event, [EUILoginMsg.OnBtnAnnounceClick]);
		btn_help.onClick(this, this.event, [EUILoginMsg.OnBtnHelpClick]);
		btn_loginByAccount.onClick(this, this.event, [EUILoginMsg.OnBtnLoginByAccountClick]);
		btn_loginBtnPhone.onClick(this, this.event, [EUILoginMsg.OnBtnLoginBtnPhoneClick]);
		btn_register.onClick(this, this.event, [EUILoginMsg.OnBtnRegisterClick]);
		btn_forgotPassword.onClick(this, this.event, [EUILoginMsg.OnBtnForgotPasswordClick]);
		btn_forgotAccount.onClick(this, this.event, [EUILoginMsg.OnBtnForgotAccountClick]);
		btn_logout.onClick(this, this.event, [EUILoginMsg.OnBtnLogoutClick]);
		itxt_account.on(Laya.Event.ENTER, this, this.event, [EUILoginMsg.OnAccountInputEnter]);
		itxt_password.on(Laya.Event.ENTER, this, this.event, [EUILoginMsg.OnAccountInputEnter]);
	}

	setCtrlPage(index: 0 | 1 | 2) {
		this.ctrl_page.selectedIndex = index;
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
