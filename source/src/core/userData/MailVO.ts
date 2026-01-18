import { BaseVO } from "./BaseVO";
import { EUserEvent } from "./UserDefine";

export class MailVO extends BaseVO implements VO.IMailVO {
	private _mails: ProtoObject<IMail>[] = [];

	get mails() { return this._mails; }

	@InterestMessage(EMessageID.fetchMailInfo)
	private onFetchMailInfo(res: IResMailInfo) {
		this._mails = res.mails.map($decodeProtoData);
		this.dispatch(EUserEvent.OnMailChanged);
	}

	@InterestMessage(EMessageID.readMail)
	private onReadMail(_, req: IReqReadMail) {
		const mail = this._mails.find(v => v.mail_id == req.mail_id);
		if (!mail) return;
		mail.state = 1;
		this.dispatch(EUserEvent.OnMailChanged);
	}

	@InterestMessage(EMessageID.deleteMail)
	private onDeleteMail(_, req: IReqDeleteMail) {
		const index = this._mails.findIndex(v => v.mail_id == req.mail_id);
		if (index < 0) return;
		this._mails.splice(index, 1);
		this.dispatch(EUserEvent.OnMailChanged);
	}

	@InterestMessage(EMessageID.takeAttachmentFromMail)
	private onTakeAttachmentFromMail(_, req: IReqTakeAttachment) {
		const mail = this._mails.find(v => v.mail_id == req.mail_id);
		if (!mail) return;
		mail.take_attachment = true;
		this.dispatch(EUserEvent.OnMailChanged);
	}

	@InterestMessage(ENotify.NotifyNewMail)
	private onNotifyNewMail(data: INotifyNewMail) {
		this._mails.push($decodeProtoData(data.mail));
		this.dispatch(EUserEvent.OnMailChanged);
	}

	@InterestMessage(ENotify.NotifyDeleteMail)
	private onNotifyDeleteMail(data: INotifyDeleteMail) {
		data.mail_id_list.forEach(v => {
			const index = this._mails.findIndex(m => m.mail_id == v);
			if (index >= 0) this._mails.splice(index, 1);
		});
		this.dispatch(EUserEvent.OnMailChanged);
	}
}