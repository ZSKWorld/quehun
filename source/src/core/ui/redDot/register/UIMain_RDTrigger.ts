import { RDTriggerBase } from "./RDTriggerBase";

export class UIMain_RDTrigger extends RDTriggerBase {
	override get rdInfos(): IRDTriggerInfo[] {
		return [
			[ERDName.Main_SevenDay, ERDName.Root, "UIBottom.UIMainView.qiri"],
			[ERDName.Main_Mail, ERDName.Root, "UIBottom.UIMainView.mail", [ERDTriggerType.MailNotRead, ERDTriggerType.MailHaveReward]],
			[ERDName.Main_Announcement, ERDName.Root, "UIBottom.UIMainView.announcement", [ERDTriggerType.AnnouncementHaveNotRead]],
		];
	}

	@InjectUserEvent(EUserEvent.OnMailChanged)
	private checkMail() {
		const mails = $user.mail.mails;
		this.setTriggered(ERDTriggerType.MailNotRead, mails.some(v => v.state == 0));
		this.setTriggered(ERDTriggerType.MailHaveReward, mails.some(v => v.attachments.length && !v.take_attachment));
	}

	@InjectUserEvent(EUserEvent.OnAnnouncementChanged)
	private checkAnnouncement() {
		const announcement = $user.announcement;
		this.setTriggered(ERDTriggerType.AnnouncementHaveNotRead, announcement.announcements.some(v => !announcement.isRead(v.id)));
	}
}