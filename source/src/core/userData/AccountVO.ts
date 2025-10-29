import { BaseVO } from "./BaseVO";

export class AccountVO extends BaseVO implements VO.IAccountVO {
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
	/** 金币 */
	gold: number = 0;
	/** 钻石 */
	diamond: number = 0;
	avatar_id: number = 0;
	/** VIP经验 */
	vip: number = 0;
	birthday: number = 0;
	phone: string;
	phone_verify: number = 0;
	/** 各平台钻石 */
	platform_diamond: ProtoObject<IAccount_PlatformDiamond>[] = [];
	/** 4麻段位 */
	level: IAccountLevel;
	/** 3麻段位 */
	level3: IAccountLevel;
	avatar_frame: number = 0;
	skin_ticket: number = 0;
	platform_skin_ticket: ProtoObject<IAccount_PlatformSkinTicket>[] = [];
	/** 名人认证 */
	verified: number = 0;
	challenge_levels: ProtoObject<IAccount_ChallengeLevel>[] = [];
	frozen_state: number = 0;
	achievement_count: ProtoObject<IAccount_AchievementCount>[] = [];
	loading_image: number[] = [];
	favorite_hu: ProtoObject<IFavoriteHu>[] = [];
	/** 勋章列表 */
	badges: ProtoObject<IAccount_Badge>[] = [];

	@InterestMessage(EMessageID.login)
	@InterestMessage(EMessageID.oauth2Login)
	private onLogin(res: IResLogin) {
		if (!res || res.error || !res.account) return;
		const decodeAcc = this.decodeProtoData(res.account);
		res.account.$type.fieldsArray.forEach(v => {
			this[v.name] = decodeAcc[v.name];
		});
	}

	getRandomCgPath() {
		const cgId = this.loading_image[$mathUtil.randomInt(0, this.loading_image.length)];
		if (!cgId) return "";
		const cfgInfo = $cfgMgr.item_definition.loading_image[cgId];
		if (!cfgInfo) return "";
		return $langRes(cfgInfo.img_path);
	}
}