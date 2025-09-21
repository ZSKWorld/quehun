import { Account } from "./Account";
import { Character } from "./Character";

export class UserData implements UserData.IUserData{
    
    /** 账号id */
    account_id: number;
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

    account = new Account();
    character = new Character();

    numerical: IAccountUpdate_NumericalUpdate[];
    /** 背包 */
    bag: IBagUpdate;
    achievement: IAccountUpdate_AchievementUpdate;
    /** 试炼 */
    shilian: IAccountShiLian;
    daily_task: IAccountUpdate_DailyTaskUpdate;
    title: IAccountUpdate_TitleUpdate;
    /** 新增首充档位充值记录 */
    new_recharged_list: number[];
    activity_task: IAccountUpdate_TaskUpdate;
    /** 翻牌牌任务 */
    activity_flip_task: IAccountUpdate_TaskUpdate;
    activity_period_task: IAccountUpdate_TaskUpdate;
    activity_random_task: IAccountUpdate_TaskUpdate;
    challenge: IAccountUpdate_AccountChallengeUpdate;
    ab_match: IAccountUpdate_AccountABMatchUpdate;
    activity: IAccountActivityUpdate;
    activity_segment_task: IAccountUpdate_SegmentTaskUpdate;
    month_ticket: IAccountUpdate_MonthTicketUpdate;
    badge: IAccountUpdate_BadgeUpdate;

    loginUpdate(data: IResLogin) {
        if (!data) return;
        this.account_id = data.account_id;
        this.account.update(data.account);
        if (data.game_info) {
            this.game_info = {
                connect_token: data.game_info.connect_token,
                game_uuid: data.game_info.game_uuid,
                location: data.game_info.location,
            };
        } else {
            this.game_info = null;
        }
        this.has_unread_announcement = data.has_unread_announcement;
        this.access_token = data.access_token;
        this.signup_time = data.signup_time;
        this.is_id_card_authed = data.is_id_card_authed;
        this.country = data.country;
        this.logined_version = [...data.logined_version];
        this.rewarded_version = [...data.rewarded_version];
    }

    update(data:IAccountUpdate) {
        if (!data) return;
        this.character.update(data);
    }
}
