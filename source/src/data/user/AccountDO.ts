import { BaseDO } from "./BaseDO";

export class AccountDO extends BaseDO implements DO.IAccountDO {
	//#region 属性
	private _accountId: number = 0;
	private _nickName: string = "";
	private _loginTime: number = 0;
	private _logoutTime: number = 0;
	private _roomId: number = 0;
	private _antiAddiction: ProtoObject<IAntiAddiction>;
	private _title: number = 0;
	private _signature: string = "";
	private _email: string = "";
	private _emailVerify: number = 0;
	private _avatarId: number = 0;
	private _birthday: number = 0;
	private _phone: string;
	private _phoneVerify: number = 0;
	private _level: ProtoObject<IAccountLevel>;
	private _level3: ProtoObject<IAccountLevel>;
	private _avatarFrame: number = 0;
	private _verified: number = 0;
	private _challengeLevels: ProtoObject<IAccount_ChallengeLevel>[] = [];
	private _frozenState: number = 0;
	private _achievementCount: ProtoObject<IAccount_AchievementCount>[] = [];
	private _favoriteHu: ProtoObject<IFavoriteHu>[] = [];
	private _badges: ProtoObject<IAccount_Badge>[] = [];
	private _refundOrderInfo: DO.IRefundInfo;

	get accountId() { return this._accountId; }
	get nickName() { return this._nickName; }
	get loginTime() { return this._loginTime; }
	get logoutTime() { return this._logoutTime; }
	get roomId() { return this._roomId; }
	get antiAddiction() { return this._antiAddiction; }
	get title() { return this._title; }
	get signature() { return this._signature; }
	get email() { return this._email; }
	get emailVerify() { return this._emailVerify; }
	get avatarId() { return this._avatarId; }
	get birthday() { return this._birthday; }
	get phone() { return this._phone; }
	get phoneVerify() { return this._phoneVerify; }
	get level() { return this._level; }
	get level3() { return this._level3; }
	get avatarFrame() { return this._avatarFrame; }
	get verified() { return this._verified; }
	get challengeLevels() { return this._challengeLevels; }
	get frozenState() { return this._frozenState; }
	get achievementCount() { return this._achievementCount; }
	get favoriteHu() { return this._favoriteHu; }
	get badges() { return this._badges; }
	get isFrozen() {
		if (!this._frozenState) return false;
		for (const order of this._refundOrderInfo.orders) {
			if (!order.cleared)
				return true;
		}
		return false;
	}
	//#endregion

	@InterestMessage(ENetMessage.login)
	@InterestMessage(ENetMessage.oauth2Login)
	private onLogin(res: IResLogin) {
		if (!res.account) return;
		const account = $decodeProtoData(res.account);

		this._accountId = account.account_id;
		this._nickName = account.nickname;
		this._loginTime = account.login_time;
		this._logoutTime = account.logout_time;
		this._roomId = account.room_id;
		this._antiAddiction = account.anti_addiction;
		this._title = account.title;
		this._signature = account.signature;
		this._email = account.email;
		this._emailVerify = account.email_verify;
		this._avatarId = account.avatar_id;
		this._birthday = account.birthday;
		this._phone = account.phone;
		this._phoneVerify = account.phone_verify;
		this._level = account.level;
		this._level3 = account.level3;
		this._avatarFrame = account.avatar_frame;
		this._verified = account.verified;
		this._challengeLevels = account.challenge_levels;
		this._frozenState = account.frozen_state;
		this._achievementCount = account.achievement_count;
		this._favoriteHu = account.favorite_hu;
		this._badges = account.badges;
	}

	@InterestMessage(ENetMessage.fetchRefundOrder)
	private onFetchRefundOrder(res: IResFetchRefundOrder) {
		const data = $decodeProtoData(res);
		this._refundOrderInfo = {
			orders: data.orders,
			clearDeadline: data.clear_deadline,
			message: data.message,
		};
	}
}