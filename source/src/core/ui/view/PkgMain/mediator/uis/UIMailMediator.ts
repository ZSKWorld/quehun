import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIMailMsg, UIMailView } from "../../view/uis/UIMailView";

export class UIMailMediator extends MediatorBase<UIMailView, IUIMailData> {
	private _curMail: ProtoObject<IMail>;

	override onAwake() {
		this.addEvent(EUIMailMsg.OnTabSelectChanged, this.onTabSelectChanged);
		this.addEvent(EUIMailMsg.OnBtnGetRewardClick, this.onBtnGetRewardClick);
		this.addEvent(EUIMailMsg.OnBtnDeleteClick, this.onBtnDeleteClick);
	}

	override onEnable() {
		this.refreshMails();
	}

	override onDisable() {
		this._curMail = null;
	}

	@InterestUserEvent(EUserEvent.OnMailChanged)
	private refreshMails() {
		const mails = $user.mail.mails;
		const mailId = this._curMail?.mail_id || 0;
		this.view.refreshTab(mails, mailId);
	}

	private onTabSelectChanged(index: number) {
		const mail = $user.mail.mails[index];
		this._curMail = mail;
		if (mail.state == 0)
			$netMgr.requests.readMail({ mail_id: mail.mail_id });
	}

	private onBtnGetRewardClick() {
		const { mail_id, attachments } = this._curMail;
		$netMgr.requests.takeAttachmentFromMail({ mail_id }).then(res => {
			if (res.error) return;
			this.openView<IUIGetRewardData>(EViewID.UIGetRewardView, { rewards: attachments });
		});
	}

	private onBtnDeleteClick() {
		$netMgr.requests.deleteMail({ mail_id: this._curMail.mail_id });
	}
}