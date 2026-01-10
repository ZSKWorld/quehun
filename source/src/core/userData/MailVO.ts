import { BaseVO } from "./BaseVO";
import { EUserEvent } from "./UserDefine";

export class MailVO extends BaseVO implements VO.IMailVO {
	private _mails: ProtoObject<IMail>[] = [];

	get mails() { return this._mails; }

	@InterestMessage(EMessageID.fetchMailInfo)
	private onFetchMailInfo(res: IResMailInfo) {
		this._mails = res.mails.map($decodeProtoData);
		this._mails = [
			{
				mail_id: 0,
				state: 1,
				take_attachment: false,
				title: "aaa",
				content: "aaa",
				attachments: [
					{ id: 302003, count: 1 },
					{ id: 302004, count: 1 },
					{ id: 302005, count: 1 },
				],
				create_time: 0,
				expire_time: 0,
				reference_id: 0,
				title_i18n: [],
				content_i18n: [],
				template_id: 0
			},
			{
				mail_id: 1,
				state: 1,
				take_attachment: false,
				title: "bbb",
				content: "bbb",
				attachments: [
					{ id: 302003, count: 1 },
					{ id: 302004, count: 1 },
					{ id: 302005, count: 1 },
				],
				create_time: 0,
				expire_time: 0,
				reference_id: 0,
				title_i18n: [],
				content_i18n: [],
				template_id: 0
			},
			{
				mail_id: 2,
				state: 1,
				take_attachment: false,
				title: "ccc",
				content: "ccc",
				attachments: [
					{ id: 302003, count: 1 },
					{ id: 302004, count: 1 },
					{ id: 302005, count: 1 },
				],
				create_time: 0,
				expire_time: 0,
				reference_id: 0,
				title_i18n: [],
				content_i18n: [],
				template_id: 0
			}
		];
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