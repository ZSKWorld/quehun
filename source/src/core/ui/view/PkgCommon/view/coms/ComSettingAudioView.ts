import ComSettingAudio from "../../../../ui/PkgCommon/ComSettingAudio";

export const enum EComSettingAudioMsg {
	OnBtnSpecialVolumeTipClick = "ComSettingAudio_OnBtnSpecialVolumeTipClick",
	OnBtnCharVolumeSetClick = "ComSettingAudio_OnBtnCharVolumeSetClick",
	OnBtnLobbyBgmSetClick = "ComSettingAudio_OnBtnLobbyBgmSetClick",
	OnBtnMjBgmSetClick = "ComSettingAudio_OnBtnMjBgmSetClick",
}

export class ComSettingAudioView extends ComSettingAudio {

	override onCreate() {
		const {
			btn_globalVolumeOn, btn_bgmVolumeOn, btn_seVolumeOn, btn_liqiVolumeOn, btn_charVolumeOn,
			slider_globalVolume, slider_bgmVolume, slider_seVolume, slider_liqiVolume, slider_charVolume,
			btn_specialVolumeTip, btn_charVolumeSet, btn_specialVolumeOn, btn_lobbyBgmSet, btn_mjBgmSet, btn_backgroundMuteOn, ctrl_globalMute
		} = this;
		btn_globalVolumeOn.mode = btn_bgmVolumeOn.mode = btn_seVolumeOn.mode = btn_liqiVolumeOn.mode = btn_charVolumeOn.mode = fgui.ButtonMode.Check;

		btn_globalVolumeOn.onClick(this, () => ($user.setting.audio.globalVolume.on = btn_globalVolumeOn.selected, ctrl_globalMute.selectedIndex = +!btn_globalVolumeOn.selected, this.refreshVolumeSlider()));
		btn_bgmVolumeOn.onClick(this, () => ($user.setting.audio.bgmVolume.on = btn_bgmVolumeOn.selected, this.refreshVolumeSlider()));
		btn_seVolumeOn.onClick(this, () => ($user.setting.audio.seVolume.on = btn_seVolumeOn.selected, this.refreshVolumeSlider()));
		btn_liqiVolumeOn.onClick(this, () => ($user.setting.audio.liqiVolume.on = btn_liqiVolumeOn.selected, this.refreshVolumeSlider()));
		btn_charVolumeOn.onClick(this, () => ($user.setting.audio.charVolume.on = btn_charVolumeOn.selected, this.refreshVolumeSlider()));

		slider_globalVolume.on(fgui.Events.STATE_CHANGED, this, () => $user.setting.audio.globalVolume.value = slider_globalVolume.value / 100);
		slider_bgmVolume.on(fgui.Events.STATE_CHANGED, this, () => $user.setting.audio.bgmVolume.value = slider_bgmVolume.value / 100);
		slider_seVolume.on(fgui.Events.STATE_CHANGED, this, () => $user.setting.audio.seVolume.value = slider_seVolume.value / 100);
		slider_liqiVolume.on(fgui.Events.STATE_CHANGED, this, () => $user.setting.audio.liqiVolume.value = slider_liqiVolume.value / 100);
		slider_charVolume.on(fgui.Events.STATE_CHANGED, this, () => $user.setting.audio.charVolume.value = slider_charVolume.value / 100);

		btn_specialVolumeOn.onClick(this, () => $user.setting.audio.specialVolume = btn_specialVolumeOn.selected);
		btn_backgroundMuteOn.onClick(this, () => $user.setting.audio.backgroundMute = btn_backgroundMuteOn.selected);

		btn_specialVolumeTip.onClick(this, this.sendEvent, [EComSettingAudioMsg.OnBtnSpecialVolumeTipClick]);
		btn_charVolumeSet.onClick(this, this.sendEvent, [EComSettingAudioMsg.OnBtnCharVolumeSetClick]);
		btn_lobbyBgmSet.onClick(this, this.sendEvent, [EComSettingAudioMsg.OnBtnLobbyBgmSetClick]);
		btn_mjBgmSet.onClick(this, this.sendEvent, [EComSettingAudioMsg.OnBtnMjBgmSetClick]);
	}

	override onEnable() {
		const { globalVolume, bgmVolume, seVolume, liqiVolume, charVolume, specialVolume, backgroundMute } = $user.setting.audio;
		const {
			btn_globalVolumeOn, btn_bgmVolumeOn, btn_seVolumeOn, btn_liqiVolumeOn, btn_charVolumeOn,
			slider_globalVolume, slider_bgmVolume, slider_seVolume, slider_liqiVolume, slider_charVolume,
			btn_specialVolumeOn, btn_backgroundMuteOn, ctrl_globalMute
		} = this;
		btn_globalVolumeOn.selected = globalVolume.on;
		btn_bgmVolumeOn.selected = bgmVolume.on;
		btn_seVolumeOn.selected = seVolume.on;
		btn_liqiVolumeOn.selected = liqiVolume.on;
		btn_charVolumeOn.selected = charVolume.on;

		slider_globalVolume.value = Math.round(globalVolume.value * 100);
		slider_bgmVolume.value = Math.round(bgmVolume.value * 100);
		slider_seVolume.value = Math.round(seVolume.value * 100);
		slider_liqiVolume.value = Math.round(liqiVolume.value * 100);
		slider_charVolume.value = Math.round(charVolume.value * 100);

		btn_specialVolumeOn.selected = specialVolume;
		btn_backgroundMuteOn.selected = backgroundMute;
		ctrl_globalMute.selectedIndex = +!btn_globalVolumeOn.selected;
		this.refreshVolumeSlider();
	}

	private refreshVolumeSlider() {
		const {
			btn_globalVolumeOn, btn_bgmVolumeOn, btn_seVolumeOn, btn_liqiVolumeOn, btn_charVolumeOn,
			slider_globalVolume, slider_bgmVolume, slider_seVolume, slider_liqiVolume, slider_charVolume,
		} = this;
		slider_globalVolume.grayed = !btn_globalVolumeOn.selected;
		slider_bgmVolume.grayed = !btn_bgmVolumeOn.selected;
		slider_seVolume.grayed = !btn_seVolumeOn.selected;
		slider_liqiVolume.grayed = !btn_liqiVolumeOn.selected;
		slider_charVolume.grayed = !btn_charVolumeOn.selected;
	}
}
