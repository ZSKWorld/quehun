import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { ELoginByType } from "../event/UILoginEvent";
import { UILoginMsg, UILoginView } from "../view/UILoginView";

export interface UILoginData {

}

interface ILastLoginData {
	loginByType: ELoginByType,
	loginType: ELoginType,
	account?: string,
	password?: string,
	token?: string,
}

const enum ELoginType {
	Account,
	Token,
}

export class UILoginMediator extends MediatorBase<UILoginView, UILoginData> {
	private _lastLoginData: ILastLoginData;
	private _loginByType = ELoginByType.None;
	private _accountInput = { account: "", password: "" }
	private _phoneInput = { account: "", password: "" }

	override onAwake() {
		this.addEvent(UILoginMsg.OnBtnLoginClick, this.onBtnLoginClick);
		this.addEvent(UILoginMsg.OnBtnAnnounceClick, this.onBtnAnnounceClick);
		this.addEvent(UILoginMsg.OnBtnHelpClick, this.onBtnHelpClick);
		this.addEvent(UILoginMsg.OnBtnLoginByAccountClick, this.setLoginByType, [ELoginByType.Account]);
		this.addEvent(UILoginMsg.OnBtnLoginBtnPhoneClick, this.setLoginByType, [ELoginByType.PhoneNumber]);
		this.addEvent(UILoginMsg.OnBtnRegisterClick, this.onBtnRegisterClick);
		this.addEvent(UILoginMsg.OnBtnForgotPasswordClick, this.onBtnForgotPasswordClick);
		this.addEvent(UILoginMsg.OnBtnForgotAccountClick, this.onBtnForgotAccountClick);
		this.addEvent(UILoginMsg.OnBtnLogoutClick, this.onBtnLogoutClick);
	}

	override onEnable() {
		const autoLogin = !!localDataMgr.get(LocalDataKey.AutoLogin);
		const lastLoginData = this._lastLoginData = localDataMgr.get(LocalDataKey.LastLoginData);
		let loginType = ELoginType.Account;
		let loginByType = ELoginByType.Account;
		if (lastLoginData) {
			loginType = lastLoginData.loginType;
			loginByType = lastLoginData.loginByType;
			if (loginByType == ELoginByType.Account) {
				this._accountInput.account = lastLoginData.account;
				this._accountInput.password = lastLoginData.password;
			} else if (loginByType == ELoginByType.PhoneNumber) {
				this._phoneInput.account = lastLoginData.account;
				this._phoneInput.password = lastLoginData.password;
			}
		}
		this.setLoginByType(loginByType);
		autoLogin && this.doLogin(loginType);
	}

	private onBtnLoginClick() {
		// this.doLogin(ELoginType.Account);
	}

	private onBtnAnnounceClick() {

	}

	private onBtnHelpClick() {

	}

	private onBtnLoginByAccountClick() {

	}

	private onBtnLoginBtnPhoneClick() {

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
		localDataMgr.remove(LocalDataKey.AutoLogin);
	}

	private setLoginByType(type: ELoginByType) {
		const lastLoginByType = this._loginByType;
		if (lastLoginByType == type) return;
		const { view, _accountInput, _phoneInput } = this;
		if (lastLoginByType == ELoginByType.Account) {
			_accountInput.account = view.itxt_account.text;
			_accountInput.password = view.itxt_password.text;
		} else if (lastLoginByType == ELoginByType.PhoneNumber) {
			_phoneInput.account = view.itxt_account.text;
			_phoneInput.password = view.itxt_password.text;
		}
		this._loginByType = type;
		if (type == ELoginByType.Account) {
			view.refreshAccount(_accountInput.account, _accountInput.password);
		} else if (type == ELoginByType.PhoneNumber) {
			view.refreshAccount(_phoneInput.account, _phoneInput.password);
		} else {
			view.refreshAccount("", "");
		}
		view.refreshLoginType(type);
	}

	private doLogin(type: ELoginType) {
		const { view, _loginByType } = this;
		view.ctrl_page.selectedIndex = 1;
		localDataMgr.set(LocalDataKey.AutoLogin, 1);
		localDataMgr.set<ILastLoginData>(LocalDataKey.LastLoginData, {
			loginByType: _loginByType,
			loginType: type,
			account: view.itxt_account.text,
			password: view.itxt_password.text,
			token: "",
		});
		Laya.timer.once(1000, this, this.sendLogin, [type]);
	}

	private sendLogin(type: ELoginType) {
		const view = this.view;
		if (type == ELoginType.Account) {
			netMgr.login({
				account: view.itxt_account.text,
				password: GameUtil.HmacSHA256(view.itxt_password.text),
				reconnect: false,
				device: gameMgr.deviceInfo,
				random_key: gameMgr.deviceId,
				client_version: {
					resource: gameMgr.version,
					package: "",
				},
				gen_access_token: true,
				currency_platforms: gameMgr.currency,
				type: 0,
				client_version_string: gameMgr.clientVersion,
				tag: gameMgr.reportClientType,
				version: 0,
			});
		}
		else if (type == ELoginType.Token) {

		}
	}
}