import { BaseDO } from "./BaseDO";

export class AccountDO extends BaseDO implements DO.IAccountDO {
	account_id: number = 0;
	nickname: string = "";
	login_time: number = 0;
	logout_time: number = 0;
	room_id: number = 0;
	/** 防沉迷 */
	anti_addiction: ProtoObject<IAntiAddiction>;
	/** 称号 */
	title: number = 0;
	/** 签名 */
	signature: string = "";
	email: string = "";
	email_verify: number = 0;
	avatar_id: number = 0;
	birthday: number = 0;
	phone: string;
	phone_verify: number = 0;
	/** 各平台钻石 */
	platform_diamond: ProtoObject<IAccount_PlatformDiamond>[] = [];
	/** 4麻段位 */
	level: ProtoObject<IAccountLevel>;
	/** 3麻段位 */
	level3: ProtoObject<IAccountLevel>;
	avatar_frame: number = 0;
	skin_ticket: number = 0;
	platform_skin_ticket: ProtoObject<IAccount_PlatformSkinTicket>[] = [];
	/** 名人认证 */
	verified: number = 0;
	challenge_levels: ProtoObject<IAccount_ChallengeLevel>[] = [];
	frozen_state: number = 0;
	achievement_count: ProtoObject<IAccount_AchievementCount>[] = [];
	favorite_hu: ProtoObject<IFavoriteHu>[] = [];
	/** 勋章列表 */
	badges: ProtoObject<IAccount_Badge>[] = [];

	@InterestMessage(ENetMessage.login)
	@InterestMessage(ENetMessage.oauth2Login)
	private onLogin(res: IResLogin) {
		if (!res.account) return;
		const decodeAcc = $decodeProtoData(res.account);
		res.account.$type.fieldsArray.forEach(v => {
			this[v.name] = decodeAcc[v.name];
		});
	}
}