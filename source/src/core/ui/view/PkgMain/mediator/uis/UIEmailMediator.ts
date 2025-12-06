import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUserEvent } from "../../../../../userData/UserDefine";
import { BtnEmailTabView } from "../../view/btns/BtnEmailTabView";
import { RenderEmailItemView } from "../../view/renders/RenderEmailItemView";
import { EUIEmailMsg, UIEmailView } from "../../view/uis/UIEmailView";

export interface IUIEmailData {

}

export class UIEmailMediator extends MediatorBase<UIEmailView, IUIEmailData> {
	private _lastTabClickIndex: number;

	private get curMail() { return $userData.mail.mails[this.view.listTab.selectedIndex]; }

	override onAwake() {
		this.addEvent(EUIEmailMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addEvent(EUIEmailMsg.OnBtnGetRewardClick, this.onBtnGetRewardClick);
		this.addEvent(EUIEmailMsg.OnBtnDeleteClick, this.onBtnDeleteClick);
		$uiUtil.setList(this.view.listTab, true, this, this.onListTabRender, this.onListTabItemClick);
		$uiUtil.setList(this.view.listReward, true, this, this.onListRewardRender);
	}

	override onEnable() {
		this.setTabIndex(0);
	}

	@InterestNotify(EUserEvent.OnMailChanged)
	private setTabIndex(index: number) {
		const { view } = this;
		index = index ?? view.listTab.selectedIndex;
		const mailCount = $userData.mail.mails.length;
		view.refreshTab(mailCount, index);
		if (mailCount > 0) {
			this.onListTabItemClick(index);
		}
	}

	private onListTabRender(index: number, item: BtnEmailTabView) {
		item.refresh($userData.mail.mails[index]);
	}

	private onListTabItemClick(index: number) {
		if (this._lastTabClickIndex == index) return;
		this._lastTabClickIndex = index;
		const { view, curMail } = this;
		view.refreshContent(curMail);
		if (curMail.state == 0)
			$netMgr.requests.readMail({ mail_id: curMail.mail_id });
	}

	private onListRewardRender(index: number, item: RenderEmailItemView) {
		const data = this.curMail;
		const reward = data.attachments[index];
		item.refresh(reward.id, reward.count, data.take_attachment, true);
	}

	private onBtnBackClick() {
		this.closeSelf();
	}

	private onBtnGetRewardClick() {
		$netMgr.requests.takeAttachmentFromMail({ mail_id: this.curMail.mail_id });
	}

	private onBtnDeleteClick() {
		$netMgr.requests.deleteMail({ mail_id: this.curMail.mail_id });
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}