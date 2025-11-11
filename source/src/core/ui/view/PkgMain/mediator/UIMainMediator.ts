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
		this.addEvent(EUIMainMsg.OnBtnCangKuClick, this.onBtnCangKuClick);
		this.addEvent(EUIMainMsg.OnBtnShopClick, this.onBtnShopClick);
		this.addEvent(EUIMainMsg.OnBtnXunMiClick, this.onBtnXunMiClick);
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

	private onBtnLiaoSheClick() {
		this.openView(EViewID.UILiaoSheView);
	}

	private onBtnFriendClick() {

	}

	private onBtnObserveClick() {

	}

	private onBtnPaiPuClick() {

	}

	private onBtnCangKuClick() {

	}

	private onBtnShopClick() {

	}

	private onBtnXunMiClick() {

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

	override onOpenAni() {
		return $uiUtil.playTrans(this.view.com_matchMode.trans_modeIn);
	}
}