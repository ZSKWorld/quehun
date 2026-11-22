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
		this.setRDCheck(ERDTriggerType.MailNotRead, $user.mail.haveNotRead);
		this.setRDCheck(ERDTriggerType.MailHaveReward, $user.mail.haveNotReward);
	}

	@InjectUserEvent(EUserEvent.OnAnnouncementChanged)
	private checkAnnouncement() {
		this.setRDCheck(ERDTriggerType.AnnouncementHaveNotRead, $user.announcement.haveNotRead);
	}
}