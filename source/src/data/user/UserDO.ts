import { AccountDO } from "./AccountDO";
import { AchievementDO } from "./AchievementDO";
import { ActivityDO } from "./ActivityDO";
import { AnnouncementDO } from "./AnnouncementDO";
import { BagDO } from "./BagDO";
import { BaseDO } from "./BaseDO";
import { CharacterDO } from "./CharacterDO";
import { ClientValueDO } from "./ClientValueDO";
import { CommonViewDO } from "./CommonViewDO";
import { FriendDO } from "./FriendDO";
import { MailDO } from "./MailDO";
import { RechargeDO } from "./RechargeDO";
import { ServerSettingDO } from "./ServerSettingDO";

export class UserDO extends BaseDO implements DO.IUserDO {
	private static _inst: UserDO;
	static get Inst() { return this._inst || (this._inst = new UserDO()); }

	/** 正在进行的游戏信息 */
	game_info: IGameConnectInfo;
	/** 有未读公告 */
	has_unread_announcement: boolean;
	/** 游戏通用登录口令 */
	access_token: string;
	/** 帐号注册时间 */
	signup_time: number;
	/** 是否进行了实名认证 */
	is_id_card_authed: boolean;
	/** 用户登录地区 */
	country: string;
	/** 该账户曾经登录过的奖励version值 */
	logined_version: number[];
	/** 该账户曾经领取过的奖励version值 */
	rewarded_version: number[];

	account = new AccountDO();
	character = new CharacterDO();
	activity = new ActivityDO();
	recharge = new RechargeDO();
	commonView = new CommonViewDO();
	announcement = new AnnouncementDO();
	clientValue = new ClientValueDO();
	serverSetting = new ServerSettingDO();
	friend = new FriendDO();
	mail = new MailDO();
	bag = new BagDO();
	achievement = new AchievementDO();

	protected constructor() { super(); }

	@InterestMessage(ENetMessage.login)
	@InterestMessage(ENetMessage.oauth2Login)
	private onLogin(res: IResLogin) {
		this.game_info = $decodeProtoData(res.game_info);
		this.has_unread_announcement = res.has_unread_announcement;
		this.access_token = res.access_token;
		this.signup_time = res.signup_time;
		this.is_id_card_authed = res.is_id_card_authed;
		this.country = res.country;
		this.logined_version = [...res.logined_version];
		this.rewarded_version = [...res.rewarded_version];
	}

	@InterestMessage(ENetNotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {


	}

	@InterestMessage(ENetNotify.NotifyVipLevelChange)
	private onNotifyVipLevelChange(data: INotifyVipLevelChange) {
		Logger.error("NotifyVipLevelChange", data);
	}

	@InterestMessage(ENetMessage.fetchInfo)
	private onFetchInfo(res: IResFetchInfo) {
		res.server_time && $facade.dispatch(ENetMessage.fetchServerTime, res.server_time);
		res.server_setting && $facade.dispatch(ENetMessage.fetchServerSettings, res.server_setting);
		res.client_value && $facade.dispatch(ENetMessage.fetchClientValue, res.client_value);
		res.friend_list && $facade.dispatch(ENetMessage.fetchFriendList, res.friend_list);
		res.friend_apply_list && $facade.dispatch(ENetMessage.fetchFriendApplyList, res.friend_apply_list);
		res.recent_friend && $facade.dispatch(ENetMessage.fetchRecentFriend, res.recent_friend);
		res.mail_info && $facade.dispatch(ENetMessage.fetchMailInfo, res.mail_info);
		res.receive_coin_info && $facade.dispatch(ENetMessage.fetchReviveCoinInfo, res.receive_coin_info);
		res.title_list && $facade.dispatch(ENetMessage.fetchTitleList, res.title_list);
		res.bag_info && $facade.dispatch(ENetMessage.fetchBagInfo, res.bag_info);
		res.shop_info && $facade.dispatch(ENetMessage.fetchShopInfo, res.shop_info);
		res.shop_interval && $facade.dispatch(ENetMessage.fetchShopInterval, res.shop_interval);
		res.activity_data && $facade.dispatch(ENetMessage.fetchAccountActivityData, res.activity_data);
		res.activity_interval && $facade.dispatch(ENetMessage.fetchActivityInterval, res.activity_interval);
		res.activity_buff && $facade.dispatch(ENetMessage.fetchActivityBuff, res.activity_buff);
		res.vip_reward && $facade.dispatch(ENetMessage.fetchVipReward, res.vip_reward);
		res.month_ticket_info && $facade.dispatch(ENetMessage.fetchMonthTicketInfo, res.month_ticket_info);
		res.achievement && $facade.dispatch(ENetMessage.fetchAchievement, res.achievement);
		res.comment_setting && $facade.dispatch(ENetMessage.fetchCommentSetting, res.comment_setting);
		res.account_settings && $facade.dispatch(ENetMessage.fetchAccountSettings, res.account_settings);
		res.mod_nickname_time && $facade.dispatch(ENetMessage.fetchModNicknameTime, res.mod_nickname_time);
		res.misc && $facade.dispatch(ENetMessage.fetchMisc, res.misc);
		// res.announcement && $facade.dispatch(ENetMessage.fetchAnnouncement, res.announcement);
		res.activity_list && $facade.dispatch(ENetMessage.fetchActivityList, res.activity_list);
		res.character_info && $facade.dispatch(ENetMessage.fetchCharacterInfo, res.character_info);
		res.all_common_views && $facade.dispatch(ENetMessage.fetchAllCommonViews, res.all_common_views);
		res.collected_game_record_list && $facade.dispatch(ENetMessage.fetchCollectedGameRecordList, res.collected_game_record_list);
		res.maintain_notice && $facade.dispatch(ENetMessage.fetchMaintainNotice, res.maintain_notice);
		res.random_character && $facade.dispatch(ENetMessage.fetchRandomCharacter, res.random_character);
		res.maintenance_info && $facade.dispatch(ENetMessage.fetchServerMaintenanceInfo, res.maintenance_info);
		res.seer_info && $facade.dispatch(ENetMessage.fetchSeerInfo, res.seer_info);
		res.annual_report_info && $facade.dispatch(ENetMessage.fetchAnnualReportInfo, res.annual_report_info);
	}
}
