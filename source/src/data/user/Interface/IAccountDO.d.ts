declare namespace DO {
	interface IRefundInfo {
		get orders(): ProtoObject<IResFetchRefundOrder.IOrderInfo>[];
		get clearDeadline(): number;
		get message(): ProtoObject<II18nContext>[];
	}

	interface IAccountDO {
		get accountId(): number;
		get nickName(): string;
		get loginTime(): number;
		get logoutTime(): number;
		get roomId(): number;
		/** 防沉迷 */
		get antiAddiction(): ProtoObject<IAntiAddiction>;
		/** 称号 */
		get title(): number;
		/** 签名 */
		get signature(): string;
		get email(): string;
		get emailVerify(): number;
		get avatarId(): number;
		get birthday(): number;
		get phone(): string;
		get phoneVerify(): number;
		/** 4麻段位 */
		get level(): ProtoObject<IAccountLevel>;
		/** 3麻段位 */
		get level3(): ProtoObject<IAccountLevel>;
		get avatarFrame(): number;
		/** 名人认证 */
		get verified(): number;
		get challengeLevels(): ProtoObject<IAccount.IChallengeLevel>[];
		get frozenState(): number;
		get achievementCount(): ProtoObject<IAccount.IAchievementCount>[];
		get favoriteHu(): ProtoObject<IFavoriteHu>[];
		/** 勋章列表 */
		get badges(): ProtoObject<IAccount.IBadge>[];

		/** 是否是冻结账户 */
		get isFrozen(): boolean;
	}
}