import { BaseVO } from "./BaseVO";

export class MailVO extends BaseVO implements VO.IMailVO {
	mails: ProtoObject<IMail>[] = [];

	@InterestMessage(EMessageID.fetchMailInfo)
	private onFetchMailInfo(res: IResMailInfo) {
		if (res.error) return;
		this.mails = res.mails.map(this.decodeProtoData);
	}

	@InterestMessage(ENotify.NotifyNewMail)
	private onNotifyNewMail(data: INotifyNewMail) {
		this.mails.push(this.decodeProtoData(data.mail));
	}
	@InterestMessage(ENotify.NotifyDeleteMail)
	private onNotifyDeleteMail(data: INotifyDeleteMail) {
		data.mail_id_list.forEach(v => {
			const index = this.mails.findIndex(m => m.mail_id == v);
			if (index >= 0) this.mails.splice(index, 1);
		});
	}
}