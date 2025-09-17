import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UILoginMsg, UILoginView } from "../view/UILoginView";

export interface UILoginData {

}

export class UILoginMediator extends MediatorBase<UILoginView, UILoginData> {
	private _loginType: 0 | 1;

	override onAwake() {
		this.addEvent(UILoginMsg.OnBtnLoginClick, this.onBtnLoginClick);
		this.addEvent(UILoginMsg.OnBtnAnnounceClick, this.onBtnAnnounceClick);
		this.addEvent(UILoginMsg.OnBtnHelpClick, this.onBtnHelpClick);
		this.addEvent(UILoginMsg.OnBtnLoginByAccountClick, this.setLoginType, [0]);
		this.addEvent(UILoginMsg.OnBtnLoginBtnPhoneClick, this.setLoginType, [1]);
		this.addEvent(UILoginMsg.OnBtnRegisterClick, this.onBtnRegisterClick);
		this.addEvent(UILoginMsg.OnBtnForgotPasswordClick, this.onBtnForgotPasswordClick);
		this.addEvent(UILoginMsg.OnBtnForgotAccountClick, this.onBtnForgotAccountClick);
		this.addEvent(UILoginMsg.OnBtnRouteNameClick, this.onBtnRouteNameClick);
		this.addEvent(UILoginMsg.OnBtnRouteDelayClick, this.onBtnRouteDelayClick);
	}

	private onBtnLoginClick() {

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

	private onBtnRouteNameClick() {

	}

	private onBtnRouteDelayClick() {

	}

	private setLoginType(type: 0 | 1) {
		if (this._loginType == type) return;
		this._loginType = type;
		this.view.refreshLoginType(type);
	}

}