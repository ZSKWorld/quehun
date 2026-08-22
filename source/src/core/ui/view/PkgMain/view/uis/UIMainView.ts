import UIMain from "../../../../ui/PkgMain/UIMain";
import { EUIMainEvent } from "../../Definition";

export class UIMainView extends UIMain {

	override onCreate() {
		const {
			btn_liaoShe, btn_friend, btn_observer, btn_paiPu, btn_bag, btn_shop, btn_treasure,
			btn_setting, btn_help, btn_guide, btn_camera, btn_achieve, btn_activity, btn_mail,
			btn_rank, btn_announcement, btn_qiri, btn_report
		} = this;
		btn_liaoShe.onClick(this, this.openView, [EViewID.UILiaoSheView, null, EViewOpenType.Hide]);
		btn_friend.onClick(this, this.openView, [EViewID.UIFriendView, null, EViewOpenType.Hide]);
		btn_observer.onClick(this, this.event, [EUIMainEvent.OnBtnObserverClick]);
		btn_paiPu.onClick(this, this.openView, [EViewID.UIPaipuView, null, EViewOpenType.Hide]);
		btn_bag.onClick(this, this.openView, [EViewID.UIBagView, null, EViewOpenType.Hide]);
		btn_shop.onClick(this, this.openView, [EViewID.UIShopView, null, EViewOpenType.Hide]);
		btn_treasure.onClick(this, this.openView, [EViewID.UITreasureView, null, EViewOpenType.Hide]);
		btn_setting.onClick(this, this.openView, [EViewID.UISettingView, null]);
		btn_help.onClick(this, this.openView, [EViewID.UIHelpView]);
		btn_guide.onClick(this, this.openView, [EViewID.UIGuideView]);
		btn_camera.onClick(this, this.openView, [EViewID.UICameraView, null, EViewOpenType.Hide]);
		btn_achieve.onClick(this, this.openView, [EViewID.UIAchievementView, null, EViewOpenType.Hide]);
		btn_activity.onClick(this, this.openView, [EViewID.UIActivityView]);
		btn_mail.onClick(this, this.openView, [EViewID.UIMailView]);
		btn_rank.onClick(this, this.openView, [EViewID.UIRankView]);
		btn_announcement.onClick(this, this.openView, [EViewID.UIAnnouncementView]);
		btn_qiri.onClick(this, this.openView, [EViewID.UISevenDayView]);
		// btn_report.onClick(this, this.openView, [EViewID.])
	}

	refreshPlayerInfo() {
		this.com_playInfo.refresh();
	}

	refreshQiRi(visible: boolean) {
		this.btn_qiri.visible = visible;
	}

	override onOpenAni() {
		return Promise.all([
			$uiUtil.playTrans(this.trans_in),
			$uiUtil.playTrans(this.com_matchMode.transModeIn),
		]) as unknown as Promise<void>;
	}

	override onCloseAni() {
		return Promise.all([
			$uiUtil.playTrans(this.trans_out),
			$uiUtil.playTrans(this.com_matchMode.transModeOut),
		]) as unknown as Promise<void>;
	}

	override onDisable() {
		const anis = [this.trans_in, this.com_matchMode.transModeIn];
		anis.forEach(v => {
			v.playing && v.stop(true, true);
		});
	}
}
