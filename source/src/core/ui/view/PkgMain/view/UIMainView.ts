import UIMain from "../../../ui/PkgMain/UIMain";

export const enum EUIMainMsg {
	OnBtnLiaoSheClick = "UIMain_OnBtnLiaoSheClick",
	OnBtnFriendClick = "UIMain_OnBtnFriendClick",
	OnBtnObserveClick = "UIMain_OnBtnObserveClick",
	OnBtnPaiPuClick = "UIMain_OnBtnPaiPuClick",
	OnBtnCangKuClick = "UIMain_OnBtnCangKuClick",
	OnBtnShopClick = "UIMain_OnBtnShopClick",
	OnBtnXunMiClick = "UIMain_OnBtnXunMiClick",
	OnBtnSettingClick = "UIMain_OnBtnSettingClick",
	OnBtnHelpClick = "UIMain_OnBtnHelpClick",
	OnBtnGuideClick = "UIMain_OnBtnGuideClick",
	OnBtnCameraClick = "UIMain_OnBtnCameraClick",
	OnBtnAchieveClick = "UIMain_OnBtnAchieveClick",
	OnBtnActivityClick = "UIMain_OnBtnActivityClick",
	OnBtnEmailClick = "UIMain_OnBtnEmailClick",
	OnBtnRankClick = "UIMain_OnBtnRankClick",
	OnBtnAnnouncementClick = "UIMain_OnBtnAnnouncementClick",
}

export class UIMainView extends ExtensionClass<IView, UIMain>(UIMain) implements IView {

	override onCreate() {
        const { btn_liaoShe, btn_friend, btn_observe, btn_paiPu, btn_cangKu, btn_shop, btn_xunMi, btn_setting, btn_help, btn_guide, btn_camera, btn_achieve, btn_activity, btn_email, btn_rank, btn_announcement } = this;
		btn_liaoShe.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnLiaoSheClick]);
		btn_friend.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnFriendClick]);
		btn_observe.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnObserveClick]);
		btn_paiPu.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnPaiPuClick]);
		btn_cangKu.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnCangKuClick]);
		btn_shop.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnShopClick]);
		btn_xunMi.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnXunMiClick]);
		btn_setting.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnSettingClick]);
		btn_help.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnHelpClick]);
		btn_guide.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnGuideClick]);
		btn_camera.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnCameraClick]);
		btn_achieve.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnAchieveClick]);
		btn_activity.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnActivityClick]);
		btn_email.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnEmailClick]);
		btn_rank.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnRankClick]);
		btn_announcement.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnAnnouncementClick]);
    }

}
