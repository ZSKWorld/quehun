import { ESceneType } from "../../../../../scene/SceneDefine";
import { ENotifyConst } from "../../../../common/NotifyConst";
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
		this.addEvent(EUILoginMsg.OnBtnLoginByAccountClick, this.onBtnLoginByAccountClick);
		this.addEvent(EUILoginMsg.OnBtnLoginBtnPhoneClick, this.onBtnLoginBtnPhoneClick);
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
		const { _loginInfo, _accountInput, _phoneInput } = this;
		if (_loginInfo.accountType == 0) {
			_accountInput.account = _loginInfo.account;
			_accountInput.password = _loginInfo.password;
		} else if (_loginInfo.accountType == 1) {
			_phoneInput.account = _loginInfo.account;
			_phoneInput.password = _loginInfo.password;
		}
		this.setLoginType(_loginInfo.loginType);
		autoLogin && this.toLogin();
	}

	private onBtnLoginClick() {
		const { view, _loginInfo } = this;
		const txtAccount = view.itxt_account.text;
		const txtPassword = view.itxt_password.text;
		if (!txtAccount) return;
		if (!txtPassword) return;
		_loginInfo.account = txtAccount;
		_loginInfo.password = txtPassword;
		this.toLogin();
	}

	private onBtnAnnounceClick() {

	}

	private onBtnHelpClick() {

	}

	private onBtnLoginByAccountClick() {
		const { view, _loginInfo, _phoneInput } = this;
		if (_loginInfo.loginType == ELoginType.Account && _loginInfo.accountType == 0) return;
		_loginInfo.accountType = 0;
		_phoneInput.account = view.itxt_account.text;
		_phoneInput.password = view.itxt_password.text;
		this.setLoginType(ELoginType.Account);
	}

	private onBtnLoginBtnPhoneClick() {
		const { view, _loginInfo, _accountInput } = this;
		if (_loginInfo.loginType == ELoginType.Account && _loginInfo.accountType == 1) return;
		_loginInfo.accountType = 1;
		_accountInput.account = view.itxt_account.text;
		_accountInput.password = view.itxt_password.text;
		this.setLoginType(ELoginType.Account);
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

	private setLoginType(type: ELoginType) {
		const { view, _loginInfo, _accountInput, _phoneInput } = this;
		_loginInfo.loginType = type;
		if (type == ELoginType.Account) {
			const accountType = _loginInfo.accountType;
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
		Laya.timer.once(1000, this, this.sendLogin);
	}

	private cancelLogin() {
		Laya.timer.clear(this, this.sendLogin);
		this.view.ctrl_page.selectedIndex = 0;
		this._loginInfo.access_token = "";
		$localDataMgr.remove(ELocalDataKey.AutoLogin);
	}

	private async sendLogin() {
		const { view, _loginInfo } = this;
		let loginSuccess = false;
		if (_loginInfo.loginType == ELoginType.Account) {
			view.ctrl_page.selectedIndex = 2;
			if (!_loginInfo.access_token) {
				loginSuccess = await this.loginByAccount();
			} else {
				loginSuccess = await this.loginByToken();
			}
		}
		if (loginSuccess)
			this.afterLogin();
		else
			this.cancelLogin();
	}

	private async loginByAccount() {
		const { _loginInfo } = this;
		const res = await $netMgr.requests.login({
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
		if (res.error) return false;
		//协议
		if (res.access_token) {
			_loginInfo.access_token = res.access_token;
		}
		return true;
	}

	private async loginByToken() {
		const { _loginInfo } = this;
		const res = await $netMgr.requests.oauth2Check({
			type: _loginInfo.loginType,
			access_token: _loginInfo.access_token
		});
		if (res.error) return false;

		if (!res.has_account) {
			const res = await $netMgr.requests.oauth2Signup({
				type: _loginInfo.loginType,
				access_token: _loginInfo.access_token,
				email: "",
				advertise_str: "",
				device: $gameMgr.deviceInfo,
				client_version: {
					resource: $gameMgr.version,
					package: "",
				},
				client_version_string: $gameMgr.clientVersion,
				tag: $gameMgr.reportClientType
			});
			if (res.error) return false;
		}
		const res2 = await $netMgr.requests.oauth2Login({
			type: _loginInfo.loginType,
			access_token: _loginInfo.access_token,
			reconnect: false,
			device: $gameMgr.deviceInfo,
			random_key: $gameMgr.deviceId,
			client_version: {
				resource: $gameMgr.version,
				package: "",
			},
			gen_access_token: false,
			currency_platforms: $gameMgr.currency,
			version: 0,
			client_version_string: $gameMgr.clientVersion,
			tag: $gameMgr.reportClientType
		});
		if (res2.error) return false;
		//协议
		if (res2.access_token) {
			_loginInfo.access_token = res2.access_token;
		}
		return true;
	}

	private async afterLogin() {
		const { _loginInfo } = this;
		$localDataMgr.set(ELocalDataKey.AutoLogin, 1);
		$localDataMgr.set<ILoginInfo>(ELocalDataKey.LastLoginData, _loginInfo);

		const account = $userData.account;
		//绑定电话
		// if ($gameMgr.clientType == 'chs' && !account.phone_verify) {
		// 	UI_Bind_Phone1.Inst.show(true, Laya.Handler.create(this, () => {
		// 		app.NetAgent.sendReq2Lobby('Lobby', 'fetchPhoneLoginBind', {}, (err, res) => {
		// 			if (err || res['error']) {
		// 				this.showError(err, res['error']);
		// 			} else {
		// 				if (res['phone_login'] == 0) {
		// 					UI_Create_Phone_Account.Inst.show(Laya.Handler.create(this, () => {
		// 						this.checkFrozenState();
		// 					}));
		// 				} else {
		// 					UI_Canot_Create_Phone_Account.Inst.show(Laya.Handler.create(this, () => {
		// 						this.checkFrozenState();
		// 					}));
		// 				}
		// 			}
		// 		});
		// 	}));
		// } else {
		// 	this.checkFrozenState();
		// }

		if (account.frozen_state) {
			const res = await $netMgr.requests.fetchRefundOrder();
			if (res.error) {
				$showNetError(res.error);
				this.cancelLogin();
				return;
			}
		}
		this.dispatch(ENotifyConst.LoginSuccess);
		await Promise.all([
			$netMgr.requests.fetchClientValue(),
			$userData.announcement.fetchAnnouncement(),
			$netMgr.requests.fetchInfo(),
		]);
		$sceneMgr.enterScene(ESceneType.MainScene);
	}
}