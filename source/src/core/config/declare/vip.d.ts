declare interface ITable_Vip {
	vip: ISheet_Vip_Vip;
}

//#region vip --- unique
declare interface ISheet_Vip_Vip {
	rows: ISheetData_Vip_Vip[];
	1: ISheetData_Vip_Vip;
	2: ISheetData_Vip_Vip;
	3: ISheetData_Vip_Vip;
	4: ISheetData_Vip_Vip;
	5: ISheetData_Vip_Vip;
	6: ISheetData_Vip_Vip;
	7: ISheetData_Vip_Vip;
	8: ISheetData_Vip_Vip;
	9: ISheetData_Vip_Vip;
	10: ISheetData_Vip_Vip;
	11: ISheetData_Vip_Vip;
	12: ISheetData_Vip_Vip;
	13: ISheetData_Vip_Vip;
	14: ISheetData_Vip_Vip;
	15: ISheetData_Vip_Vip;
}
declare interface ISheetData_Vip_Vip {
	id: number;
	/** 称号名称 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 称号图标 */
	img: string;
	/** 等级描述 */
	desc_chs: string;
	desc_chs_t: string;
	desc_jp: string;
	desc_en: string;
	desc_kr: string;
	/** 所需累计充值金额 */
	charge: number;
	/** 每日送礼次数上限 */
	gift_limit: number;
	/** 增加好友上限 */
	friend_added: number;
	/** 商店每日免费刷新次数 */
	shop_free_refresh: number;
	/** 商店每日刷新次数上限 */
	shop_refresh_limit: number;
	/** 对局好感度加成 */
	buddy_bonus: number;
	/** 牌谱收藏上限 */
	favourite_limit: number;
	/** 称号ID */
	title_id: number;
	/** VIP领取奖励 */
	rewards: string[];
}
//#endregion