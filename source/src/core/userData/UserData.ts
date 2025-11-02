import { AccountVO } from "./AccountVO";
import { ActivityVO } from "./ActivityVO";
import { AnnouncementVO } from "./AnnouncementVO";
import { BaseVO } from "./BaseVO";
import { CharacterVO } from "./CharacterVO";
import { ClientValueVO } from "./ClientValueVO";
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
	announcement = new AnnouncementVO();
	clientValue = new ClientValueVO();
	serverSetting = new ServerSettingVO();
	friend = new FriendVO();
	mail = new MailVO();

	@InterestMessage(EMessageID.login)
	@InterestMessage(EMessageID.oauth2Login)
	private onLogin(res: IResLogin) {
		if (!res || res.error) return;
		this.game_info = this.decodeProtoData(res.game_info);
		this.has_unread_announcement = res.has_unread_announcement;
		this.access_token = res.access_token;
		this.signup_time = res.signup_time;
		this.is_id_card_authed = res.is_id_card_authed;
		this.country = res.country;
		this.logined_version = [...res.logined_version];
		this.rewarded_version = [...res.rewarded_version];
	}

	@InterestMessage(ENotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: IAccountUpdate) {

		
	}

	@InterestMessage(ENotify.NotifyVipLevelChange)
	private onNotifyVipLevelChange(data: INotifyVipLevelChange) {
		Logger.error("NotifyVipLevelChange", data);
	}

	@InterestMessage(EMessageID.fetchInfo)
	private onFetchInfo(res: IResFetchInfo) {
		if (!res || res.error) return;
		$netMgr.event(EMessageID.fetchServerTime, res.server_time)
		$netMgr.event(EMessageID.fetchServerSettings, res.server_setting);
		$netMgr.event(EMessageID.fetchClientValue, res.client_value);
		$netMgr.event(EMessageID.fetchFriendList, res.friend_list);
		$netMgr.event(EMessageID.fetchFriendApplyList, res.friend_apply_list);
		$netMgr.event(EMessageID.fetchRecentFriend, res.recent_friend);
		$netMgr.event(EMessageID.fetchMailInfo, res.mail_info);
		$netMgr.event(EMessageID.fetchReviveCoinInfo, res.receive_coin_info);
		$netMgr.event(EMessageID.fetchTitleList, res.title_list);
		$netMgr.event(EMessageID.fetchBagInfo, res.bag_info);
		$netMgr.event(EMessageID.fetchShopInfo, res.shop_info);
		$netMgr.event(EMessageID.fetchShopInterval, res.shop_interval);
		$netMgr.event(EMessageID.fetchAccountActivityData, res.activity_data);
		$netMgr.event(EMessageID.fetchActivityInterval, res.activity_interval);
		$netMgr.event(EMessageID.fetchActivityBuff, res.activity_buff);
		$netMgr.event(EMessageID.fetchVipReward, res.vip_reward);
		$netMgr.event(EMessageID.fetchMonthTicketInfo, res.month_ticket_info);
		$netMgr.event(EMessageID.fetchAchievement, res.achievement);
		$netMgr.event(EMessageID.fetchCommentSetting, res.comment_setting);
		$netMgr.event(EMessageID.fetchAccountSettings, res.account_settings);
		$netMgr.event(EMessageID.fetchModNicknameTime, res.mod_nickname_time);
		$netMgr.event(EMessageID.fetchMisc, res.misc);
		$netMgr.event(EMessageID.fetchAnnouncement, res.announcement);
		$netMgr.event(EMessageID.fetchActivityList, res.activity_list);
		$netMgr.event(EMessageID.fetchCharacterInfo, res.character_info);
		$netMgr.event(EMessageID.fetchAllCommonViews, res.all_common_views);
		$netMgr.event(EMessageID.fetchCollectedGameRecordList, res.collected_game_record_list);
		$netMgr.event(EMessageID.fetchMaintainNotice, res.maintain_notice);
		$netMgr.event(EMessageID.fetchRandomCharacter, res.random_character);
		$netMgr.event(EMessageID.fetchServerMaintenanceInfo, res.maintenance_info);
		$netMgr.event(EMessageID.fetchSeerInfo, res.seer_info);
		$netMgr.event(EMessageID.fetchAnnualReportInfo, res.annual_report_info);
	}
}
