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
import { SettingDO } from "./SettingDO";

@Singleton
export class UserDO extends BaseDO implements DO.IUserDO {
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

	setting = new SettingDO();

	@InjectNetEvent(ENetMessage.login)
	@InjectNetEvent(ENetMessage.oauth2Login)
	private onLogin(res: IResLogin) {
		this.game_info = $decodeProtoData(res.game_info);
		this.has_unread_announcement = res.has_unread_announcement;
		this.access_token = res.access_token;
		this.signup_time = res.signup_time;
		this.is_id_card_authed = res.is_id_card_authed;
		this.country = res.country;
		this.logined_version = res.logined_version.slice();
		this.rewarded_version = res.rewarded_version.slice();
	}

	@InjectNetEvent(ENetNotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {


	}

	@InjectNetEvent(ENetNotify.NotifyVipLevelChange)
	private onNotifyVipLevelChange(data: INotifyVipLevelChange) {
		Logger.error("NotifyVipLevelChange", data);
	}

	@InjectNetEvent(ENetMessage.fetchInfo)
	private onFetchInfo(res: IResFetchInfo) {
		const dispatch = $facade.dispatch.bind($facade) as typeof $facade.dispatch;
		res.server_time && dispatch(ENetMessage.fetchServerTime, res.server_time);
		res.server_setting && dispatch(ENetMessage.fetchServerSettings, res.server_setting);
		res.client_value && dispatch(ENetMessage.fetchClientValue, res.client_value);
		res.friend_list && dispatch(ENetMessage.fetchFriendList, res.friend_list);
		res.friend_apply_list && dispatch(ENetMessage.fetchFriendApplyList, res.friend_apply_list);
		res.recent_friend && dispatch(ENetMessage.fetchRecentFriend, res.recent_friend);
		res.mail_info && dispatch(ENetMessage.fetchMailInfo, res.mail_info);
		res.receive_coin_info && dispatch(ENetMessage.fetchReviveCoinInfo, res.receive_coin_info);
		res.title_list && dispatch(ENetMessage.fetchTitleList, res.title_list);
		res.bag_info && dispatch(ENetMessage.fetchBagInfo, res.bag_info);
		res.shop_info && dispatch(ENetMessage.fetchShopInfo, res.shop_info);
		res.shop_interval && dispatch(ENetMessage.fetchShopInterval, res.shop_interval);
		res.activity_data && dispatch(ENetMessage.fetchAccountActivityData, res.activity_data);
		res.activity_interval && dispatch(ENetMessage.fetchActivityInterval, res.activity_interval);
		res.activity_buff && dispatch(ENetMessage.fetchActivityBuff, res.activity_buff);
		res.vip_reward && dispatch(ENetMessage.fetchVipReward, res.vip_reward);
		res.month_ticket_info && dispatch(ENetMessage.fetchMonthTicketInfo, res.month_ticket_info);
		res.achievement && dispatch(ENetMessage.fetchAchievement, res.achievement);
		res.comment_setting && dispatch(ENetMessage.fetchCommentSetting, res.comment_setting);
		res.account_settings && dispatch(ENetMessage.fetchAccountSettings, res.account_settings);
		res.mod_nickname_time && dispatch(ENetMessage.fetchModNicknameTime, res.mod_nickname_time);
		res.misc && dispatch(ENetMessage.fetchMisc, res.misc);
		// res.announcement && dispatch(ENetMessage.fetchAnnouncement, res.announcement);
		res.activity_list && dispatch(ENetMessage.fetchActivityList, res.activity_list);
		res.character_info && dispatch(ENetMessage.fetchCharacterInfo, res.character_info);
		res.all_common_views && dispatch(ENetMessage.fetchAllCommonViews, res.all_common_views);
		res.collected_game_record_list && dispatch(ENetMessage.fetchCollectedGameRecordList, res.collected_game_record_list);
		res.maintain_notice && dispatch(ENetMessage.fetchMaintainNotice, res.maintain_notice);
		res.random_character && dispatch(ENetMessage.fetchRandomCharacter, res.random_character);
		res.maintenance_info && dispatch(ENetMessage.fetchServerMaintenanceInfo, res.maintenance_info);
		res.seer_info && dispatch(ENetMessage.fetchSeerInfo, res.seer_info);
		res.annual_report_info && dispatch(ENetMessage.fetchAnnualReportInfo, res.annual_report_info);
	}
}
