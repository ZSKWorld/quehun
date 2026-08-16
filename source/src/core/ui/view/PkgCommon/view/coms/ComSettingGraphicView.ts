import ComSettingGraphic from "../../../../ui/PkgCommon/ComSettingGraphic";

export const enum EComSettingGraphicMsg {
	OnBtnBgMuteOnClick = "ComSettingGraphic_OnBtnBgMuteOnClick",
}

export class ComSettingGraphicView extends ComSettingGraphic {

	override onCreate() {
		const { cmb_fps, btn_activityEffect } = this;
		cmb_fps.on(fgui.Events.STATE_CHANGED, this, () => $user.setting.graphic.frameRate = cmb_fps.selectedIndex == 0 ? "fast" : "slow");
		btn_activityEffect.onClick(this, () => $user.setting.graphic.activityEffect = btn_activityEffect.selected);
	}

	override onEnable() {
		const { cmb_fps, btn_activityEffect } = this;
		cmb_fps.selectedIndex = $user.setting.graphic.frameRate == "fast" ? 0 : 1;
		btn_activityEffect.selected = $user.setting.graphic.activityEffect;
	}
}
