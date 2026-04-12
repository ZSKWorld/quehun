declare namespace DO {
	interface IAccountDO {
		account_id: number;
		nickname: string;
		login_time: number;
		logout_time: number;
		room_id: number;
		/** 防沉迷 */
		anti_addiction: ProtoObject<IAntiAddiction>;
		/** 称号 */
		title: number;
		/** 签名 */
		signature: string;
		email: string;
		email_verify: number;
		avatar_id: number;
		birthday: number;
		phone: string;
		phone_verify: number;
		/** 各平台钻石 */
		platform_diamond: ProtoObject<IAccount_PlatformDiamond>[];
		/** 4麻段位 */
		level: ProtoObject<IAccountLevel>;
		/** 3麻段位 */
		level3: ProtoObject<IAccountLevel>;
		avatar_frame: number;
		skin_ticket: number;
		platform_skin_ticket: ProtoObject<IAccount_PlatformSkinTicket>[];
		/** 名人认证 */
		verified: number;
		challenge_levels: ProtoObject<IAccount_ChallengeLevel>[];
		frozen_state: number;
		achievement_count: ProtoObject<IAccount_AchievementCount>[];
		favorite_hu: ProtoObject<IFavoriteHu>[];
		/** 勋章列表 */
		badges: ProtoObject<IAccount_Badge>[];
	}
}