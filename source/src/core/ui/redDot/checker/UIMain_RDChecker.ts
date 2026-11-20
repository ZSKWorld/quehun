import { Base_RDChecker } from "./Base_RDChecker";

export class UIMain_RDChecker extends Base_RDChecker {
	override get rdInfos(): IRDCheckInfo[] {
		return [
			[ERDName.Main_SevenDay, ERDName.Root, "ELayer_UIBottom.UIMainView.qiri"],
			[ERDName.Main_Mail, ERDName.Root, "ELayer_UIBottom.UIMainView.mail", [ERDTriggerType.MailNotRead, ERDTriggerType.MailHaveReward]],
			[ERDName.Main_Announcement, ERDName.Root, "ELayer_UIBottom.UIMainView.announcement", [ERDTriggerType.AnnouncementHaveNotRead]],
		];
	}

	@InjectUserEvent(EUserEvent.OnMailChanged)
	private checkMail() {
		const mails = $user.mail.mails;
		this.setRDCheck(ERDTriggerType.MailNotRead, mails.some(v => v.state == 0));
		this.setRDCheck(ERDTriggerType.MailHaveReward, mails.some(v => v.attachments.length && !v.take_attachment));
	}

	@InjectUserEvent(EUserEvent.OnAnnouncementChanged)
	private checkAnnouncement() {
		const announcement = $user.announcement;
		this.setRDCheck(ERDTriggerType.AnnouncementHaveNotRead, announcement.announcements.some(v => !announcement.isRead(v.id)));
	}
}