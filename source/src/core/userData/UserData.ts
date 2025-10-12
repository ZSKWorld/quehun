import { AccountVO } from "./AccountVO";
import { ActivityVO } from "./ActivityVO";
import { AnnouncementVO } from "./AnnouncementVO";
import { BaseVO } from "./BaseVO";
import { CharacterVO } from "./CharacterVO";
import { ClientValueVO } from "./ClientValueVO";
import { RechargeVO } from "./RechargeVO";

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
    challenge: IAccountUpdate_AccountChallengeUpdate;
    ab_match: IAccountUpdate_AccountABMatchUpdate;
    month_ticket: IAccountUpdate_MonthTicketUpdate;
    badge: IAccountUpdate_BadgeUpdate;

    @InterestMessage(EMessageID.login)
    @InterestMessage(EMessageID.oauth2Login)
    private onLogin(data: IResLogin) {
        if (!data || data.error) return;
        this.account.update(data.account);
        this.game_info = this.decode(data.game_info);
        this.has_unread_announcement = data.has_unread_announcement;
        this.access_token = data.access_token;
        this.signup_time = data.signup_time;
        this.is_id_card_authed = data.is_id_card_authed;
        this.country = data.country;
        this.logined_version = [...data.logined_version];
        this.rewarded_version = [...data.rewarded_version];
    }

    @InterestMessage(ENotify.NotifyAccountUpdate)
    private onNotifyAccountUpdate(data: IAccountUpdate) {
        if (!data) return;
        this.character.update(data);
        this.activity.update(data);
        Logger.error("account update");
    }
}
