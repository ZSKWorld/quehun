declare namespace DO {
	interface IUserDO {
		setting: ISettingDO;
		account: IAccountDO;
		character: ICharacterDO;
		activity: IActivityDO;
		recharge: IRechargeDO;
		commonView: ICommonViewDO;
		announcement: IAnnouncementDO;
		clientValue: IClientValueDO;
		serverSetting: IServerSettingDO;
		friend: IFriendDO;
		mail: IMailDO;
		bag: IBagDO;
		achievement: IAchievementDO;
		questionnaire: IQuestionnaireDO;
	}
}