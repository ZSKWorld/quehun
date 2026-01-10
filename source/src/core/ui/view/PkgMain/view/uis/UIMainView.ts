import UIMain from "../../../../ui/PkgMain/UIMain";

export const enum EUIMainMsg {
	OnBtnLiaoSheClick = "UIMain_OnBtnLiaoSheClick",
	OnBtnFriendClick = "UIMain_OnBtnFriendClick",
	OnBtnObserveClick = "UIMain_OnBtnObserveClick",
	OnBtnPaiPuClick = "UIMain_OnBtnPaiPuClick",
	OnBtnBagClick = "UIMain_OnBtnBagClick",
	OnBtnShopClick = "UIMain_OnBtnShopClick",
	OnBtnTreasureClick = "UIMain_OnBtnTreasureClick",
	OnBtnSettingClick = "UIMain_OnBtnSettingClick",
	OnBtnHelpClick = "UIMain_OnBtnHelpClick",
	OnBtnGuideClick = "UIMain_OnBtnGuideClick",
	OnBtnCameraClick = "UIMain_OnBtnCameraClick",
	OnBtnAchieveClick = "UIMain_OnBtnAchieveClick",
	OnBtnActivityClick = "UIMain_OnBtnActivityClick",
	OnBtnMailClick = "UIMain_OnBtnMailClick",
	OnBtnRankClick = "UIMain_OnBtnRankClick",
	OnBtnAnnouncementClick = "UIMain_OnBtnAnnouncementClick",
}

export class UIMainView extends ExtensionClass<IView, UIMain>(UIMain) implements IView {

	override onCreate() {
		const { btn_liaoShe, btn_friend, btn_observe, btn_paiPu, btn_bag, btn_shop, btn_treasure, btn_setting, btn_help, btn_guide, btn_camera, btn_achieve, btn_activity, btn_mail, btn_rank, btn_announcement } = this;
		btn_liaoShe.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnLiaoSheClick]);
		btn_friend.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnFriendClick]);
		btn_observe.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnObserveClick]);
		btn_paiPu.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnPaiPuClick]);
		btn_bag.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnBagClick]);
		btn_shop.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnShopClick]);
		btn_treasure.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnTreasureClick]);
		btn_setting.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnSettingClick]);
		btn_help.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnHelpClick]);
		btn_guide.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnGuideClick]);
		btn_camera.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnCameraClick]);
		btn_achieve.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnAchieveClick]);
		btn_activity.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnActivityClick]);
		btn_mail.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnMailClick]);
		btn_rank.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnRankClick]);
		btn_announcement.onClick(this, this.sendEvent, [EUIMainMsg.OnBtnAnnouncementClick]);
	}

	onOpenAni() {
		return Promise.all([
			$uiUtil.playTrans(this.trans_in),
			$uiUtil.playTrans(this.com_matchMode.transModeIn),
		]) as unknown as Promise<void>;
	}

	onCloseAni() {
		return Promise.all([
			$uiUtil.playTrans(this.trans_out),
			$uiUtil.playTrans(this.com_matchMode.transModeOut),
		]) as unknown as Promise<void>;
	}
}
