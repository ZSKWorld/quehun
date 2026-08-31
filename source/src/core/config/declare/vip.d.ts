/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Vip {
	/** unique */
	readonly vip: CfgExt<ISheet_Vip_Vip>;
}

//#region vip
declare interface ISheet_Vip_Vip {
	readonly [key: string]: ISheetData_Vip_Vip;
	readonly 1: ISheetData_Vip_Vip;
	readonly 2: ISheetData_Vip_Vip;
	readonly 3: ISheetData_Vip_Vip;
	readonly 4: ISheetData_Vip_Vip;
	readonly 5: ISheetData_Vip_Vip;
	readonly 6: ISheetData_Vip_Vip;
	readonly 7: ISheetData_Vip_Vip;
	readonly 8: ISheetData_Vip_Vip;
	readonly 9: ISheetData_Vip_Vip;
	readonly 10: ISheetData_Vip_Vip;
	readonly 11: ISheetData_Vip_Vip;
	readonly 12: ISheetData_Vip_Vip;
	readonly 13: ISheetData_Vip_Vip;
	readonly 14: ISheetData_Vip_Vip;
	readonly 15: ISheetData_Vip_Vip;
}
declare interface ISheetData_Vip_Vip extends ISheetDataBase {
	readonly id: number;
	/** 称号名称 */
	readonly name_chs: string;
	readonly name_chs_t: string;
	readonly name_jp: string;
	readonly name_en: string;
	readonly name_kr: string;
	/** 称号图标 */
	readonly img: string;
	/** 等级描述 */
	readonly desc_chs: string;
	readonly desc_chs_t: string;
	readonly desc_jp: string;
	readonly desc_en: string;
	readonly desc_kr: string;
	/** 所需累计充值金额 */
	readonly charge: number;
	/** 每日送礼次数上限 */
	readonly gift_limit: number;
	/** 增加好友上限 */
	readonly friend_added: number;
	/** 商店每日免费刷新次数 */
	readonly shop_free_refresh: number;
	/** 商店每日刷新次数上限 */
	readonly shop_refresh_limit: number;
	/** 对局好感度加成 */
	readonly buddy_bonus: number;
	/** 牌谱收藏上限 */
	readonly favourite_limit: number;
	/** 称号ID */
	readonly title_id: number;
	/** VIP领取奖励 */
	readonly rewards: string[];
}
//#endregion