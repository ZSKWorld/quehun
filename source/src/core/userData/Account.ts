import { BaseData } from "./MessageData";

export class Account extends BaseData implements UserData.IAccount {
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
        data.$type.fieldsArray.forEach(v => {
            const value = data[v.name];
            if (Array.isArray(value))
                this[v.name] = [...value.map(v1 => this.decode(v1))];
            else
                this[v.name] = this.decode(value);
        });
    }
}