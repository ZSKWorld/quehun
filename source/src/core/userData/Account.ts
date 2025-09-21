export class Account implements UserData.IAccount {
    account_id: number = 0;
    nickname: string = "";
    login_time: number = 0;
    logout_time: number = 0;
    room_id: number = 0;
    /** 防沉迷 */
    anti_addiction: IAntiAddiction;
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
    platform_diamond: IAccount_PlatformDiamond[] = [];
    /** 4麻段位 */
    level: IAccountLevel;
    /** 3麻段位 */
    level3: IAccountLevel;
    avatar_frame: number = 0;
    skin_ticket: number = 0;
    platform_skin_ticket: IAccount_PlatformSkinTicket[] = [];
    /** 名人认证 */
    verified: number = 0;
    challenge_levels: IAccount_ChallengeLevel[] = [];
    frozen_state: number = 0;
    achievement_count: IAccount_AchievementCount[] = [];
    loading_image: number[] = [];
    favorite_hu: IFavoriteHu[] = [];
    /** 勋章列表 */
    badges: IAccount_Badge[] = [];

    update(data: IAccount) {
        if (!data) return;
        this.account_id = data.account_id;
        this.nickname = data.nickname;
        this.login_time = data.login_time;
        this.logout_time = data.logout_time;
        this.room_id = data.room_id;
        this.anti_addiction = data.anti_addiction;
        this.title = data.title;
        this.signature = data.signature;
        this.email = data.email;
        this.email_verify = data.email_verify;
        this.gold = data.gold;
        this.diamond = data.diamond;
        this.avatar_id = data.avatar_id;
        this.vip = data.vip;
        this.birthday = data.birthday;
        this.phone = data.phone;
        this.phone_verify = data.phone_verify;
        this.platform_diamond = data.platform_diamond;
        this.level = data.level;
        this.level3 = data.level3;
        this.avatar_frame = data.avatar_frame;
        this.skin_ticket = data.skin_ticket;
        this.platform_skin_ticket = data.platform_skin_ticket;
        this.verified = data.verified;
        this.challenge_levels = data.challenge_levels;
        this.frozen_state = data.frozen_state;
        this.achievement_count = data.achievement_count;
        this.loading_image = data.loading_image;
        this.favorite_hu = data.favorite_hu;
        this.badges = data.badges;
    }
}