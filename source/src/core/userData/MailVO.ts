import { ENotifyConst } from "../common/NotifyConst";
import { BaseVO } from "./BaseVO";

export class MailVO extends BaseVO implements VO.IMailVO {
	mails: ProtoObject<IMail>[] = [];

	@InterestMessage(EMessageID.fetchMailInfo)
	private onFetchMailInfo(res: IResMailInfo) {
		this.mails = res.mails.map(this.decodeProtoData);
		this.mails = [{
			mail_id: 111,
			state: 0,
			take_attachment: false,
			title: "aaa",
			content: "a\naa\naaa\naaaa\naaaaa",
			attachments: [],
			create_time: 0,
			expire_time: 0,
			reference_id: 0,
			title_i18n: [],
			content_i18n: [],
			template_id: 0
		}, {
			mail_id: 222,
			state: 0,
			take_attachment: false,
			title: "bbb",
			content: "b\nbb\nbbb\nbbbb\nbbbbb",
			attachments: [{ id: 1, count: 1 }, { id: 2, count: 2 }, { id: 3, count: 3 }],
			create_time: 0,
			expire_time: 0,
			reference_id: 0,
			title_i18n: [],
			content_i18n: [],
			template_id: 0
		}];
		this.dispatch(ENotifyConst.OnMailDataChanged);
	}

	@InterestMessage(EMessageID.readMail)
	private onReadMail(_, req: IReqReadMail) {
		const mail = this.mails.find(v => v.mail_id == req.mail_id);
		if (!mail) return;
		mail.state = 1;
		this.dispatch(ENotifyConst.OnMailDataChanged);
	}

	@InterestMessage(EMessageID.deleteMail)
	private onDeleteMail(_, req: IReqDeleteMail) {
		const index = this.mails.findIndex(v => v.mail_id == req.mail_id);
		if (index < 0) return;
		this.mails.splice(index, 1);
		this.dispatch(ENotifyConst.OnMailDataChanged);
	}

	@InterestMessage(EMessageID.takeAttachmentFromMail)
	private onTakeAttachmentFromMail(_, req: IReqTakeAttachment) {
		const mail = this.mails.find(v => v.mail_id == req.mail_id);
		if (!mail) return;
		mail.take_attachment = true;
		this.dispatch(ENotifyConst.OnMailDataChanged);
	}

	@InterestMessage(ENotify.NotifyNewMail)
	private onNotifyNewMail(data: INotifyNewMail) {
		this.mails.push(this.decodeProtoData(data.mail));
		this.dispatch(ENotifyConst.OnMailDataChanged);
	}

	@InterestMessage(ENotify.NotifyDeleteMail)
	private onNotifyDeleteMail(data: INotifyDeleteMail) {
		data.mail_id_list.forEach(v => {
			const index = this.mails.findIndex(m => m.mail_id == v);
			if (index >= 0) this.mails.splice(index, 1);
		});
		this.dispatch(ENotifyConst.OnMailDataChanged);
	}
}