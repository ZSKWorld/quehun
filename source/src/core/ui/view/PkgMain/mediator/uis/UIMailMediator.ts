import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { BtnMailTabView } from "../../view/btns/BtnMailTabView";
import { RenderMailItemView } from "../../view/renders/RenderMailItemView";
import { EUIMailMsg, UIMailView } from "../../view/uis/UIMailView";

export interface IUIMailData {

}

export class UIMailMediator extends MediatorBase<UIMailView, IUIMailData> {
	private _curMail: ProtoObject<IMail>;

	override onAwake() {
		this.addEvent(EUIMailMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addEvent(EUIMailMsg.OnBtnGetRewardClick, this.onBtnGetRewardClick);
		this.addEvent(EUIMailMsg.OnBtnDeleteClick, this.onBtnDeleteClick);
		$uiUtil.setList(this.view.listTab, true, this, this.onListTabRender, this.onListTabItemClick);
		$uiUtil.setList(this.view.listReward, true, this, this.onListRewardRender);
	}

	override onEnable() {
		this.refreshMail();
	}

	override onDisable() {
		this._curMail = null;
	}

	@InterestNotify(EUserEvent.OnMailChanged)
	private refreshMail() {
		const mails = $userData.mail.mails;
		const view = this.view;
		view.refreshEmail(mails.length);
		if (mails.length == 0) {
			this._curMail = null;
			return;
		}

		const curMail = this._curMail;
		if (curMail && !mails.find(v => v.mail_id == curMail.mail_id)) {
			this._curMail = null;
		}

		const mailId = this._curMail?.mail_id ?? mails[0].mail_id;
		const index = mails.findIndex(v => v.mail_id == mailId);
		this.view.listTab.selectedIndex = index;
		this.refreshMailContent(index);
	}

	private refreshMailContent(index: number) {
		const mail = $userData.mail.mails[index];
		this._curMail = mail;
		this.view.refreshContent(mail);
		if (mail.state == 0)
			$netMgr.requests.readMail({ mail_id: mail.mail_id });
	}

	private onListTabRender(index: number, item: BtnMailTabView) {
		item.refresh($userData.mail.mails[index]);
	}

	private onListTabItemClick(_, __, index: number) {
		const mail = $userData.mail.mails[index];
		if (mail.mail_id == this._curMail.mail_id) return;
		this.refreshMailContent(index);
	}

	private onListRewardRender(index: number, item: RenderMailItemView) {
		const { attachments, take_attachment } = this._curMail;
		const reward = attachments[index];
		item.refresh(reward.id, reward.count, take_attachment, true);
	}

	private onBtnBackClick() {
		this.closeSelf();
	}

	private onBtnGetRewardClick() {
		$netMgr.requests.takeAttachmentFromMail({ mail_id: this._curMail.mail_id });
	}

	private onBtnDeleteClick() {
		$netMgr.requests.deleteMail({ mail_id: this._curMail.mail_id });
	}
}