import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { ELoginType } from "../event/UILoginEvent";
import { EUILoginMsg, UILoginView } from "../view/UILoginView";

export interface IUILoginData {

}

interface ILoginInfo {
	loginType: ELoginType;
	loginAccountType: 0 | 1;
	account?: string;
	password?: string;
	access_token?: string;
}

export class UILoginMediator extends MediatorBase<UILoginView, IUILoginData> {
	private _lastLoginData: ILoginInfo;
	private _loginType = ELoginType.None;
	private _loginAccountType: 0 | 1;
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
		const lastLoginData = this._lastLoginData = $localDataMgr.get(ELocalDataKey.LastLoginData);
		let loginType = ELoginType.Account;
		let loginAccountType: 0 | 1 = 0;
		if (lastLoginData) {
			loginType = lastLoginData.loginType;
			loginAccountType = lastLoginData.loginAccountType;
			if (loginAccountType == 0) {
				this._accountInput.account = lastLoginData.account;
				this._accountInput.password = lastLoginData.password;
			} else if (loginAccountType == 1) {
				this._phoneInput.account = lastLoginData.account;
				this._phoneInput.password = lastLoginData.password;
			}
		}
		this.setLoginType(loginType, loginAccountType);
		autoLogin && this.doLogin();
	}

	private onBtnLoginClick() {
		// this.doLogin(ELoginType.Account);
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
		Laya.timer.clear(this, this.sendLogin);
		this.view.ctrl_page.selectedIndex = 0;
		$localDataMgr.remove(ELocalDataKey.AutoLogin);
	}

	private setLoginType(type: ELoginType, arg: 0 | 1 = 0) {
		const lastLoginType = this._loginType;
		if (lastLoginType != ELoginType.Account && lastLoginType == type) return;
		const lastLoginAccountType = this._loginAccountType;
		if (lastLoginType == ELoginType.Account && lastLoginAccountType == arg) return;

		const { view, _accountInput, _phoneInput } = this;
		if (lastLoginType == ELoginType.Account) {
			if (lastLoginAccountType == 0) {
				_accountInput.account = view.itxt_account.text;
				_accountInput.password = view.itxt_password.text;
			} else {
				_phoneInput.account = view.itxt_account.text;
				_phoneInput.password = view.itxt_password.text;
			}
			this._loginAccountType = arg;
		}

		this._loginType = type;
		if (type == ELoginType.Account) {
			if (arg == 0)
				view.refresh(arg, _accountInput.account, _accountInput.password);
			else
				view.refresh(arg, _phoneInput.account, _phoneInput.password);
		} else {

		}
	}

	private doLogin() {
		const { view, _loginType, _loginAccountType } = this;
		view.ctrl_page.selectedIndex = 1;
		$localDataMgr.set(ELocalDataKey.AutoLogin, 1);
		$localDataMgr.set<ILoginInfo>(ELocalDataKey.LastLoginData, {
			loginType: _loginType,
			loginAccountType: _loginAccountType,
			account: view.itxt_account.text,
			password: view.itxt_password.text,
			access_token: "",
		});
		Laya.timer.once(1000, this, this.sendLogin);
	}

	private sendLogin() {
		const { view, _loginType } = this;
		if (_loginType == ELoginType.Account) {
			$netMgr.login({
				account: view.itxt_account.text,
				password: $gameUtil.HmacSHA256(view.itxt_password.text),
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