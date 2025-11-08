declare namespace VO {
	declare interface IAccountVO {
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
		/** 金币 */
		gold: number;
		/** 钻石 */
		diamond: number;
		avatar_id: number;
		/** VIP经验 */
		vip: number;
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
		loading_image: number[];
		favorite_hu: ProtoObject<IFavoriteHu>[];
		/** 勋章列表 */
		badges: ProtoObject<IAccount_Badge>[];
		getRandomCgPath(): string;
	}
}