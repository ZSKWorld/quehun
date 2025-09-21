import UILogin from "../../../ui/PkgLogin/UILogin";
import { ELoginByType } from "../event/UILoginEvent";

export const enum UILoginMsg {
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
		btn_login.onClick(this, this.sendEvent, [UILoginMsg.OnBtnLoginClick]);
		btn_announce.onClick(this, this.sendEvent, [UILoginMsg.OnBtnAnnounceClick]);
		btn_help.onClick(this, this.sendEvent, [UILoginMsg.OnBtnHelpClick]);
		btn_loginByAccount.onClick(this, this.sendEvent, [UILoginMsg.OnBtnLoginByAccountClick]);
		btn_loginBtnPhone.onClick(this, this.sendEvent, [UILoginMsg.OnBtnLoginBtnPhoneClick]);
		btn_register.onClick(this, this.sendEvent, [UILoginMsg.OnBtnRegisterClick]);
		btn_forgotPassword.onClick(this, this.sendEvent, [UILoginMsg.OnBtnForgotPasswordClick]);
		btn_forgotAccount.onClick(this, this.sendEvent, [UILoginMsg.OnBtnForgotAccountClick]);
		btn_logout.onClick(this, this.sendEvent, [UILoginMsg.OnBtnLogoutClick]);
	}

	refreshAccount(account: string, password: string) {
		this.itxt_account.text = account || "";
		this.itxt_password.text = password || "";
	}

	refreshLoginType(type: ELoginByType) {
		const { btn_loginByAccount, btn_loginBtnPhone, itxt_account } = this;
		btn_loginByAccount.selected = type == ELoginByType.Account;
		btn_loginBtnPhone.selected = type == ELoginByType.PhoneNumber;
		itxt_account.promptText = $localizeTxt(type == ELoginByType.Account ? 3138 : 3132);
	}


}
