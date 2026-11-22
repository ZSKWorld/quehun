declare namespace DO {
	interface IMailDO {
		get mails(): ProtoObject<IMail>[];
		/** 有未读邮件 */
		get haveNotRead(): boolean;
		/** 有未领取奖励邮件 */
		get haveNotReward(): boolean;
	}
}