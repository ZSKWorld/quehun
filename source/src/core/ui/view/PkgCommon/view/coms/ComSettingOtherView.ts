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
		const {
			btn_yiZhong, btn_giftCode, btn_keFuCenter, btn_emailBind, btn_userAgreement, btn_privacyPolicy,
			btn_resetSetting, btn_streamerOn, btn_foreignNickname, btn_localNickname, btn_replayNickname,
			btn_observeNickname, btn_matchNickname, btn_rankNickname
		} = this;
		btn_yiZhong.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnYiZhongClick]);
		btn_giftCode.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnGiftCodeClick]);
		btn_keFuCenter.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnKeFuCenterClick]);
		btn_emailBind.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnEmailBindClick]);
		btn_userAgreement.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnUserAgreementClick]);
		btn_privacyPolicy.onClick(this, this.sendEvent, [EComSettingOtherMsg.OnBtnPrivacyPolicyClick]);
		btn_resetSetting.onClick(this, this.onBtnResetSettingClick);

		btn_streamerOn.onClick(this, () => $user.setting.other.streamerOn = btn_streamerOn.selected);
		btn_foreignNickname.onClick(this, () => $user.setting.other.foreignNickname = btn_foreignNickname.selected);
		btn_localNickname.onClick(this, () => $user.setting.other.localNickname = btn_localNickname.selected);
		btn_replayNickname.onClick(this, () => $user.setting.other.replayNickname = btn_replayNickname.selected);
		btn_observeNickname.onClick(this, () => $user.setting.other.observeNickname = btn_observeNickname.selected);
		btn_matchNickname.onClick(this, () => $user.setting.other.matchNickname = btn_matchNickname.selected);
		btn_rankNickname.onClick(this, () => $user.setting.other.rankNickname = btn_rankNickname.selected);
	}

	override onEnable() {
		const {
			btn_streamerOn, btn_foreignNickname, btn_localNickname, btn_replayNickname, btn_observeNickname,
			btn_matchNickname, btn_rankNickname
		} = this;
		const {
			streamerOn, foreignNickname, localNickname, replayNickname, observeNickname, matchNickname, rankNickname
		} = $user.setting.other;
		btn_streamerOn.selected = streamerOn;
		btn_foreignNickname.selected = foreignNickname;
		btn_localNickname.selected = localNickname;
		btn_replayNickname.selected = replayNickname;
		btn_observeNickname.selected = observeNickname;
		btn_matchNickname.selected = matchNickname;
		btn_rankNickname.selected = rankNickname;
	}

	private onBtnResetSettingClick() {
		$confirmSma(3, $lang(26030522)).then(success => {
			if (!success) return;
			$user.setting.resetDefaultSetting();
			this.onEnable();
		});
	}
}
