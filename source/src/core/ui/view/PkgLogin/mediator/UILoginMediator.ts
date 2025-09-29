import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { ELoginType } from "../event/UILoginEvent";
import { EUILoginMsg, UILoginView } from "../view/UILoginView";

export interface IUILoginData {

}

interface ILoginInfo {
	loginType: ELoginType;
	accountType: 0 | 1;
	account?: string;
	password?: string;
	access_token?: string;
}

export class UILoginMediator extends MediatorBase<UILoginView, IUILoginData> {
	private _loginInfo: ILoginInfo;
	private _accountInput = { account: "", password: "" };
	private _phoneInput = { account: "", password: "" };

	override onAwake() {
		this.addEvent(EUILoginMsg.OnBtnLoginClick, this.onBtnLoginClick);
		this.addEvent(EUILoginMsg.OnBtnAnnounceClick, this.onBtnAnnounceClick);
		this.addEvent(EUILoginMsg.OnBtnHelpClick, this.onBtnHelpClick);
		this.addEvent(EUILoginMsg.OnBtnLoginByAccountClick, this.setLoginType, [ELoginType.Account, 0]);
		this.addEvent(EUILoginMsg.OnBtnLoginBtnPhoneClick, this.setLoginType, [ELoginType.Account, 1]);
		this.addEvent(EUILoginMsg.OnBtnRegisterClick, this.onBtnRegisterClick);
		this.addEvent(EUILoginMsg.OnBtnForgotPasswordClick, this.onBtnForgotPasswordClick);
		this.addEvent(EUILoginMsg.OnBtnForgotAccountClick, this.onBtnForgotAccountClick);
		this.addEvent(EUILoginMsg.OnBtnLogoutClick, this.onBtnLogoutClick);
	}

	override onEnable() {
		const autoLogin = !!$localDataMgr.get(ELocalDataKey.AutoLogin);
		this._loginInfo = $localDataMgr.get(ELocalDataKey.LastLoginData);
		if (!this._loginInfo) {
			this._loginInfo = {
				loginType: ELoginType.Account,
				accountType: 0,
			};
		}
		const loginInfo = this._loginInfo;
		if (loginInfo.accountType == 0) {
			this._accountInput.account = loginInfo.account;
			this._accountInput.password = loginInfo.password;
		} else if (loginInfo.accountType == 1) {
			this._phoneInput.account = loginInfo.account;
			this._phoneInput.password = loginInfo.password;
		}
		this.view.refresh(loginInfo.accountType, loginInfo.account, loginInfo.password);
		this.setLoginType(loginInfo.loginType, loginInfo.accountType);
		autoLogin && this.toLogin();
	}

	private onBtnLoginClick() {
		const { view, _loginInfo } = this;
		const txtAccount = view.itxt_account.text;
		const txtPassword = view.itxt_password.text;
		if (!txtAccount) return;
		if (!txtPassword) return;
		_loginInfo.loginType = ELoginType.Account;
		_loginInfo.account = txtAccount;
		_loginInfo.password = txtPassword;
		this.toLogin();
	}

	private onBtnAnnounceClick() {

	}

	private onBtnHelpClick() {

	}

	private onBtnRegisterClick() {

	}

	private onBtnForgotPasswordClick() {

	}

	private onBtnForgotAccountClick() {

	}

	private onBtnLogoutClick() {
		this.cancelLogin();
	}

	private setLoginType(type: ELoginType, accountType: 0 | 1 = 0) {
		const loginInfo = this._loginInfo;
		const lastLoginType = loginInfo.loginType;
		if (lastLoginType != ELoginType.Account && lastLoginType == type) return;
		const lastAccountType = loginInfo.accountType;
		if (lastLoginType == ELoginType.Account && lastAccountType == accountType) return;

		const { view, _accountInput, _phoneInput } = this;
		if (lastLoginType == ELoginType.Account) {
			if (lastAccountType == 0) {
				_accountInput.account = view.itxt_account.text;
				_accountInput.password = view.itxt_password.text;
			} else {
				_phoneInput.account = view.itxt_account.text;
				_phoneInput.password = view.itxt_password.text;
			}
			loginInfo.accountType = accountType;
		}

		loginInfo.loginType = type;
		if (type == ELoginType.Account) {
			if (accountType == 0)
				view.refresh(accountType, _accountInput.account, _accountInput.password);
			else
				view.refresh(accountType, _phoneInput.account, _phoneInput.password);
		} else {

		}
	}

	private toLogin() {
		const { view, _loginInfo } = this;
		view.ctrl_page.selectedIndex = 1;
		$localDataMgr.set(ELocalDataKey.AutoLogin, 1);
		$localDataMgr.set<ILoginInfo>(ELocalDataKey.LastLoginData, _loginInfo);
		Laya.timer.once(1000, this, this.sendLogin);
	}

	private cancelLogin() {
		Laya.timer.clear(this, this.sendLogin);
		this.view.ctrl_page.selectedIndex = 0;
		$localDataMgr.remove(ELocalDataKey.AutoLogin);
	}

	private sendLogin() {
		const { _loginInfo } = this;
		Logger.error(_loginInfo.loginType);
		if (_loginInfo.loginType == ELoginType.Account) {
			$netMgr.login({
				account: _loginInfo.account,
				password: $gameUtil.HmacSHA256(_loginInfo.password),
				reconnect: false,
				device: $gameMgr.deviceInfo,
				random_key: $gameMgr.deviceId,
				client_version: {
					resource: $gameMgr.version,
					package: "",
				},
				gen_access_token: true,
				currency_platforms: $gameMgr.currency,
				type: 0,
				client_version_string: $gameMgr.clientVersion,
				tag: $gameMgr.reportClientType,
				version: 0,
			});
		}
	}
}