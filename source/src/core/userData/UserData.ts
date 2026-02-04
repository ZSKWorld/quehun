import { AccountVO } from "./AccountVO";
import { AchievementVO } from "./AchievementVO";
import { ActivityVO } from "./ActivityVO";
import { AnnouncementVO } from "./AnnouncementVO";
import { BagVO } from "./BagVO";
import { BaseVO } from "./BaseVO";
import { CharacterVO } from "./CharacterVO";
import { ClientValueVO } from "./ClientValueVO";
import { CommonViewVO } from "./CommonViewVO";
import { FriendVO } from "./FriendVO";
import { MailVO } from "./MailVO";
import { RechargeVO } from "./RechargeVO";
import { ServerSettingVO } from "./ServerSettingVO";

export class UserData extends BaseVO implements VO.IUserDataVO {
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

	account = new AccountVO();
	character = new CharacterVO();
	activity = new ActivityVO();
	recharge = new RechargeVO();
	commonView = new CommonViewVO();
	announcement = new AnnouncementVO();
	clientValue = new ClientValueVO();
	serverSetting = new ServerSettingVO();
	friend = new FriendVO();
	mail = new MailVO();
	bag = new BagVO();
	achievement = new AchievementVO();

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
		res.server_time && $netMgr.event(ENetMessage.fetchServerTime, res.server_time)
		res.server_setting && $netMgr.event(ENetMessage.fetchServerSettings, res.server_setting);
		res.client_value && $netMgr.event(ENetMessage.fetchClientValue, res.client_value);
		res.friend_list && $netMgr.event(ENetMessage.fetchFriendList, res.friend_list);
		res.friend_apply_list && $netMgr.event(ENetMessage.fetchFriendApplyList, res.friend_apply_list);
		res.recent_friend && $netMgr.event(ENetMessage.fetchRecentFriend, res.recent_friend);
		res.mail_info && $netMgr.event(ENetMessage.fetchMailInfo, res.mail_info);
		res.receive_coin_info && $netMgr.event(ENetMessage.fetchReviveCoinInfo, res.receive_coin_info);
		res.title_list && $netMgr.event(ENetMessage.fetchTitleList, res.title_list);
		res.bag_info && $netMgr.event(ENetMessage.fetchBagInfo, res.bag_info);
		res.shop_info && $netMgr.event(ENetMessage.fetchShopInfo, res.shop_info);
		res.shop_interval && $netMgr.event(ENetMessage.fetchShopInterval, res.shop_interval);
		res.activity_data && $netMgr.event(ENetMessage.fetchAccountActivityData, res.activity_data);
		res.activity_interval && $netMgr.event(ENetMessage.fetchActivityInterval, res.activity_interval);
		res.activity_buff && $netMgr.event(ENetMessage.fetchActivityBuff, res.activity_buff);
		res.vip_reward && $netMgr.event(ENetMessage.fetchVipReward, res.vip_reward);
		res.month_ticket_info && $netMgr.event(ENetMessage.fetchMonthTicketInfo, res.month_ticket_info);
		res.achievement && $netMgr.event(ENetMessage.fetchAchievement, res.achievement);
		res.comment_setting && $netMgr.event(ENetMessage.fetchCommentSetting, res.comment_setting);
		res.account_settings && $netMgr.event(ENetMessage.fetchAccountSettings, res.account_settings);
		res.mod_nickname_time && $netMgr.event(ENetMessage.fetchModNicknameTime, res.mod_nickname_time);
		res.misc && $netMgr.event(ENetMessage.fetchMisc, res.misc);
		res.announcement && $netMgr.event(ENetMessage.fetchAnnouncement, res.announcement);
		res.activity_list && $netMgr.event(ENetMessage.fetchActivityList, res.activity_list);
		res.character_info && $netMgr.event(ENetMessage.fetchCharacterInfo, res.character_info);
		res.all_common_views && $netMgr.event(ENetMessage.fetchAllCommonViews, res.all_common_views);
		res.collected_game_record_list && $netMgr.event(ENetMessage.fetchCollectedGameRecordList, res.collected_game_record_list);
		res.maintain_notice && $netMgr.event(ENetMessage.fetchMaintainNotice, res.maintain_notice);
		res.random_character && $netMgr.event(ENetMessage.fetchRandomCharacter, res.random_character);
		res.maintenance_info && $netMgr.event(ENetMessage.fetchServerMaintenanceInfo, res.maintenance_info);
		res.seer_info && $netMgr.event(ENetMessage.fetchSeerInfo, res.seer_info);
		res.annual_report_info && $netMgr.event(ENetMessage.fetchAnnualReportInfo, res.annual_report_info);
	}
}
