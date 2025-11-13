import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { EUIMainMsg, UIMainView } from "../view/UIMainView";

export interface IUIMainData {

}

export class UIMainMediator extends MediatorBase<UIMainView, IUIMainData> {

	override onAwake() {
		this.addEvent(EUIMainMsg.OnBtnLiaoSheClick, this.onBtnLiaoSheClick);
		this.addEvent(EUIMainMsg.OnBtnFriendClick, this.onBtnFriendClick);
		this.addEvent(EUIMainMsg.OnBtnObserveClick, this.onBtnObserveClick);
		this.addEvent(EUIMainMsg.OnBtnPaiPuClick, this.onBtnPaiPuClick);
		this.addEvent(EUIMainMsg.OnBtnBagClick, this.onBtnCangKuClick);
		this.addEvent(EUIMainMsg.OnBtnShopClick, this.onBtnShopClick);
		this.addEvent(EUIMainMsg.OnBtnTreasureClick, this.onBtnXunMiClick);
		this.addEvent(EUIMainMsg.OnBtnSettingClick, this.onBtnSettingClick);
		this.addEvent(EUIMainMsg.OnBtnHelpClick, this.onBtnHelpClick);
		this.addEvent(EUIMainMsg.OnBtnGuideClick, this.onBtnGuideClick);
		this.addEvent(EUIMainMsg.OnBtnCameraClick, this.onBtnCameraClick);
		this.addEvent(EUIMainMsg.OnBtnAchieveClick, this.onBtnAchieveClick);
		this.addEvent(EUIMainMsg.OnBtnActivityClick, this.onBtnActivityClick);
		this.addEvent(EUIMainMsg.OnBtnEmailClick, this.onBtnEmailClick);
		this.addEvent(EUIMainMsg.OnBtnRankClick, this.onBtnRankClick);
		this.addEvent(EUIMainMsg.OnBtnAnnouncementClick, this.onBtnAnnouncementClick);
	}

	private async onBtnLiaoSheClick() {
		this.openView(EViewID.UILiaoSheView, null, EViewOpenType.Hide);
	}

	private onBtnFriendClick() {
		this.openView(EViewID.UIFriendView, null, EViewOpenType.Hide);
	}

	private onBtnObserveClick() {
		this.openView(EViewID.UIObserverView, null, EViewOpenType.Hide);
	}

	private onBtnPaiPuClick() {
		this.openView(EViewID.UIPaipuView, null, EViewOpenType.Hide);
	}

	private onBtnCangKuClick() {
		this.openView(EViewID.UIBagView, null, EViewOpenType.Hide);
	}

	private onBtnShopClick() {
		this.openView(EViewID.UIShopView, null, EViewOpenType.Hide);
	}

	private onBtnXunMiClick() {
		this.openView(EViewID.UITreasureView, null, EViewOpenType.Hide);
	}

	private onBtnSettingClick() {

	}

	private onBtnHelpClick() {

	}

	private onBtnGuideClick() {

	}

	private onBtnCameraClick() {

	}

	private onBtnAchieveClick() {

	}

	private onBtnActivityClick() {

	}

	private onBtnEmailClick() {

	}

	private onBtnRankClick() {

	}

	private onBtnAnnouncementClick() {

	}

	override async onOpenAni() {
		await Promise.all([
			$uiUtil.playTrans(this.view.trans_in),
			$uiUtil.playTrans(this.view.com_matchMode.trans_modeIn),
		]);
	}

	override async onCloseAni() {
		await Promise.all([
			$uiUtil.playTrans(this.view.trans_out),
			$uiUtil.playTrans(this.view.com_matchMode.trans_modeOut),
		]);
	}
}