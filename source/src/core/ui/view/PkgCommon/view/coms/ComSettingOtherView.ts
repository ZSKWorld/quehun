import ComSettingOther from "../../../../ui/PkgCommon/ComSettingOther";

export const enum EComSettingOtherMsg {
	OnBtnYiZhongClick = "ComSettingOther_OnBtnYiZhongClick",
	OnBtnGiftCodeClick = "ComSettingOther_OnBtnGiftCodeClick",
	OnBtnKeFuCenterClick = "ComSettingOther_OnBtnKeFuCenterClick",
	OnBtnEmailBindClick = "ComSettingOther_OnBtnEmailBindClick",
	OnBtnUserAgreementClick = "ComSettingOther_OnBtnUserAgreementClick",
	OnBtnPrivacyPolicyClick = "ComSettingOther_OnBtnPrivacyPolicyClick",
	OnBtnResetSettingClick = "ComSettingOther_OnBtnResetSettingClick",
	OnBtnStreamerOnClick = "ComSettingOther_OnBtnStreamerOnClick",
}

export class ComSettingOtherView extends ExtendClass<IView, ComSettingOther>(ComSettingOther) implements IView {

	override onCreate() {
		const { btn_yiZhong, btn_giftCode, btn_keFuCenter, btn_emailBind, btn_userAgreement, btn_privacyPolicy, btn_resetSetting, btn_streamerOn } = this;
		btn_yiZhong.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnYiZhongClick]);
		btn_giftCode.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnGiftCodeClick]);
		btn_keFuCenter.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnKeFuCenterClick]);
		btn_emailBind.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnEmailBindClick]);
		btn_userAgreement.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnUserAgreementClick]);
		btn_privacyPolicy.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnPrivacyPolicyClick]);
		btn_resetSetting.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnResetSettingClick]);
		btn_streamerOn.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnStreamerOnClick]);
	}

}
