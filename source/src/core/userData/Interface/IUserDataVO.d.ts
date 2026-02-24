declare namespace VO {
	declare interface IUserDataVO {
		account: IAccountVO;
		character: ICharacterVO;
		activity: IActivityVO;
		recharge: IRechargeVO;
		commonView: ICommonViewVO;
		announcement: IAnnouncementVO;
		clientValue: IClientValueVO;
		serverSetting: IServerSettingVO;
		friend: IFriendVO;
		mail: IMailVO;
		bag: IBagVO;
		achievement: IAchievementVO;
	}
}