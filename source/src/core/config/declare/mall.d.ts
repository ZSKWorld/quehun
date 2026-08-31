/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Mall {
	/** 商品表  ---  unique */
	readonly goods: CfgExt<ISheet_Mall_Goods>;
	/** 商品上架表（映射对应渠道商品ID）  ---  group */
	readonly product: CfgExtGroup<ISheet_Mall_Product>;
	/** 货架表（设定对应货架有哪些商品可以购买）  ---  group */
	readonly goods_shelves: CfgExtGroup<ISheet_Mall_GoodsShelves>;
	/** 区域通用参数  ---  group */
	readonly zone_params: CfgExtGroup<ISheet_Mall_ZoneParams>;
	/** 月卡表  ---  unique */
	readonly month_ticket: CfgExt<ISheet_Mall_MonthTicket>;
	/** 渠道支付信息  ---  unique */
	readonly channel_config: CfgExt<ISheet_Mall_ChannelConfig>;
	/** 各服月卡统一的发放内容  ---  unique */
	readonly month_ticket_info: CfgExt<ISheet_Mall_MonthTicketInfo>;
	/** 首充双倍区间  ---  group */
	readonly recharge_bonus: CfgExtGroup<ISheet_Mall_RechargeBonus>;
}

//#region goods
declare interface ISheet_Mall_Goods {
	readonly [key: string]: ISheetData_Mall_Goods;
	readonly 1001: ISheetData_Mall_Goods;
	readonly 1002: ISheetData_Mall_Goods;
	readonly 1003: ISheetData_Mall_Goods;
	readonly 1004: ISheetData_Mall_Goods;
	readonly 1005: ISheetData_Mall_Goods;
	readonly 1006: ISheetData_Mall_Goods;
	readonly 1007: ISheetData_Mall_Goods;
	readonly 1008: ISheetData_Mall_Goods;
	readonly 1101: ISheetData_Mall_Goods;
	readonly 1102: ISheetData_Mall_Goods;
	readonly 1103: ISheetData_Mall_Goods;
	readonly 1104: ISheetData_Mall_Goods;
	readonly 1105: ISheetData_Mall_Goods;
	readonly 1106: ISheetData_Mall_Goods;
	readonly 1107: ISheetData_Mall_Goods;
	readonly 1108: ISheetData_Mall_Goods;
	readonly 2001: ISheetData_Mall_Goods;
	readonly 2002: ISheetData_Mall_Goods;
	readonly 2003: ISheetData_Mall_Goods;
	readonly 2004: ISheetData_Mall_Goods;
	readonly 2005: ISheetData_Mall_Goods;
	readonly 2006: ISheetData_Mall_Goods;
	readonly 2007: ISheetData_Mall_Goods;
	readonly 2008: ISheetData_Mall_Goods;
	readonly 2101: ISheetData_Mall_Goods;
	readonly 2102: ISheetData_Mall_Goods;
	readonly 2103: ISheetData_Mall_Goods;
	readonly 2104: ISheetData_Mall_Goods;
	readonly 2105: ISheetData_Mall_Goods;
	readonly 2106: ISheetData_Mall_Goods;
	readonly 2107: ISheetData_Mall_Goods;
	readonly 2108: ISheetData_Mall_Goods;
	readonly 3001: ISheetData_Mall_Goods;
	readonly 3002: ISheetData_Mall_Goods;
	readonly 3003: ISheetData_Mall_Goods;
	readonly 3004: ISheetData_Mall_Goods;
	readonly 3005: ISheetData_Mall_Goods;
	readonly 3006: ISheetData_Mall_Goods;
	readonly 3007: ISheetData_Mall_Goods;
	readonly 3008: ISheetData_Mall_Goods;
	readonly 3101: ISheetData_Mall_Goods;
	readonly 3102: ISheetData_Mall_Goods;
	readonly 3103: ISheetData_Mall_Goods;
	readonly 3104: ISheetData_Mall_Goods;
	readonly 3105: ISheetData_Mall_Goods;
	readonly 3106: ISheetData_Mall_Goods;
	readonly 3107: ISheetData_Mall_Goods;
	readonly 3108: ISheetData_Mall_Goods;
	readonly 4001: ISheetData_Mall_Goods;
	readonly 4002: ISheetData_Mall_Goods;
	readonly 4003: ISheetData_Mall_Goods;
	readonly 4004: ISheetData_Mall_Goods;
	readonly 4005: ISheetData_Mall_Goods;
	readonly 4006: ISheetData_Mall_Goods;
	readonly 4007: ISheetData_Mall_Goods;
	readonly 4008: ISheetData_Mall_Goods;
	readonly 4101: ISheetData_Mall_Goods;
	readonly 4102: ISheetData_Mall_Goods;
	readonly 4103: ISheetData_Mall_Goods;
	readonly 4104: ISheetData_Mall_Goods;
	readonly 4105: ISheetData_Mall_Goods;
	readonly 4106: ISheetData_Mall_Goods;
	readonly 4107: ISheetData_Mall_Goods;
	readonly 4108: ISheetData_Mall_Goods;
	readonly 5001: ISheetData_Mall_Goods;
	readonly 5002: ISheetData_Mall_Goods;
	readonly 5003: ISheetData_Mall_Goods;
	readonly 5004: ISheetData_Mall_Goods;
	readonly 5005: ISheetData_Mall_Goods;
	readonly 5006: ISheetData_Mall_Goods;
	readonly 5007: ISheetData_Mall_Goods;
	readonly 5008: ISheetData_Mall_Goods;
	readonly 5101: ISheetData_Mall_Goods;
	readonly 5102: ISheetData_Mall_Goods;
	readonly 5103: ISheetData_Mall_Goods;
	readonly 5104: ISheetData_Mall_Goods;
	readonly 5105: ISheetData_Mall_Goods;
	readonly 5106: ISheetData_Mall_Goods;
	readonly 5107: ISheetData_Mall_Goods;
	readonly 5108: ISheetData_Mall_Goods;
}
declare interface ISheetData_Mall_Goods extends ISheetDataBase {
	readonly id: number;
	readonly name_chs: string;
	readonly name_chs_t: string;
	readonly name_jp: string;
	readonly name_en: string;
	readonly name_kr: string;
	/** 描述 */
	readonly desc: string;
	readonly desc_chs: string;
	readonly desc_chs_t: string;
	readonly desc_jp: string;
	readonly desc_en: string;
	readonly desc_kr: string;
	/** 图标 */
	readonly icon: string;
	/** 资源ID */
	readonly resource_id: number;
	/** 资源数量 */
	readonly resource_count: number;
	/** 增加的vip经验 */
	readonly vip_exp: number;
	/** 首充档位ID */
	readonly cny: number;
	/** 显示用的价格 */
	readonly price: string;
	readonly first_desc_chs: string;
	readonly first_desc_chs_t: string;
	readonly first_desc_jp: string;
	readonly first_desc_en: string;
	readonly first_desc_kr: string;
	/** 首冲额外赠送 */
	readonly first_extend_add: number;
	readonly normal_desc_chs: string;
	readonly normal_desc_chs_t: string;
	readonly normal_desc_jp: string;
	readonly normal_desc_en: string;
	readonly normal_desc_kr: string;
	/** 非首冲赠送辉玉 */
	readonly normal_extend_add: number;
	/** 显示在哪个屋 */
	readonly type: number;
}
//#endregion

//#region product
declare interface ISheet_Mall_Product {
	readonly [key: string]: ISheetData_Mall_Product[];
	readonly 10: ISheetData_Mall_Product[];
	readonly 11: ISheetData_Mall_Product[];
	readonly 12: ISheetData_Mall_Product[];
	readonly 21: ISheetData_Mall_Product[];
	readonly 22: ISheetData_Mall_Product[];
	readonly 31: ISheetData_Mall_Product[];
	readonly 32: ISheetData_Mall_Product[];
	readonly 33: ISheetData_Mall_Product[];
	readonly 34: ISheetData_Mall_Product[];
	readonly 35: ISheetData_Mall_Product[];
	readonly 36: ISheetData_Mall_Product[];
	readonly 37: ISheetData_Mall_Product[];
	readonly 38: ISheetData_Mall_Product[];
	readonly 41: ISheetData_Mall_Product[];
	readonly 42: ISheetData_Mall_Product[];
	readonly 43: ISheetData_Mall_Product[];
	readonly 44: ISheetData_Mall_Product[];
	readonly 45: ISheetData_Mall_Product[];
	readonly 51: ISheetData_Mall_Product[];
	readonly 60: ISheetData_Mall_Product[];
	readonly 61: ISheetData_Mall_Product[];
	readonly 62: ISheetData_Mall_Product[];
	readonly 63: ISheetData_Mall_Product[];
	readonly 64: ISheetData_Mall_Product[];
	readonly 65: ISheetData_Mall_Product[];
	readonly 66: ISheetData_Mall_Product[];
	readonly 67: ISheetData_Mall_Product[];
	readonly 68: ISheetData_Mall_Product[];
	readonly 70: ISheetData_Mall_Product[];
	readonly 71: ISheetData_Mall_Product[];
	readonly 72: ISheetData_Mall_Product[];
	readonly 73: ISheetData_Mall_Product[];
	readonly 80: ISheetData_Mall_Product[];
	readonly 90: ISheetData_Mall_Product[];
	readonly 91: ISheetData_Mall_Product[];
	readonly 92: ISheetData_Mall_Product[];
	readonly 93: ISheetData_Mall_Product[];
	readonly 94: ISheetData_Mall_Product[];
	readonly 95: ISheetData_Mall_Product[];
	readonly 96: ISheetData_Mall_Product[];
	readonly 97: ISheetData_Mall_Product[];
}
declare interface ISheetData_Mall_Product extends ISheetDataBase {
	/** 支付平台 */
	readonly payment_platform: number;
	/** 商品ID */
	readonly goods_id: number;
	/** 商品类型 */
	readonly product_type: number;
	/** 上架平台商品ID */
	readonly product_id: string;
	/** 货币标准符号 */
	readonly currency_code: string;
	/** 货币价格 */
	readonly currency_price: number;
	/** 实际使用的货币符号 */
	readonly actual_code: string;
	/** 实际支付价格（用于第三方支付） */
	readonly actual_price: number;
	/** 简要描述 */
	readonly brief_desc: string;
	/** 详细描述 */
	readonly detail_desc: string;
}
//#endregion

//#region goods_shelves
declare interface ISheet_Mall_GoodsShelves {
	readonly [key: string]: ISheetData_Mall_GoodsShelves[];
	readonly shelves_001: ISheetData_Mall_GoodsShelves[];
	readonly shelves_002: ISheetData_Mall_GoodsShelves[];
	readonly shelves_003: ISheetData_Mall_GoodsShelves[];
	readonly shelves_004: ISheetData_Mall_GoodsShelves[];
	readonly shelves_005: ISheetData_Mall_GoodsShelves[];
	readonly shelves_006: ISheetData_Mall_GoodsShelves[];
	readonly shelves_007: ISheetData_Mall_GoodsShelves[];
	readonly shelves_008: ISheetData_Mall_GoodsShelves[];
}
declare interface ISheetData_Mall_GoodsShelves extends ISheetDataBase {
	/** 货架ID */
	readonly id: string;
	/** 商品ID */
	readonly goods_id: number;
	/** 货币标准符号 */
	readonly currency_code: string;
	/** 货币价格 */
	readonly currency_price: number;
	readonly price: string;
	/** 是不是月卡 */
	readonly is_monthcard: number;
}
//#endregion

//#region zone_params
declare interface ISheet_Mall_ZoneParams {
	readonly [key: string]: ISheetData_Mall_ZoneParams[];
	readonly 1: ISheetData_Mall_ZoneParams[];
	readonly 2: ISheetData_Mall_ZoneParams[];
	readonly 3: ISheetData_Mall_ZoneParams[];
}
declare interface ISheetData_Mall_ZoneParams extends ISheetDataBase {
	readonly zone_id: string;
	readonly key: string;
	readonly string_value: string;
}
//#endregion

//#region month_ticket
declare interface ISheet_Mall_MonthTicket {
	readonly [key: string]: ISheetData_Mall_MonthTicket;
	readonly 1010: ISheetData_Mall_MonthTicket;
	readonly 2010: ISheetData_Mall_MonthTicket;
	readonly 3010: ISheetData_Mall_MonthTicket;
	readonly 5010: ISheetData_Mall_MonthTicket;
}
declare interface ISheetData_Mall_MonthTicket extends ISheetDataBase {
	/** 月票ID 和goods里的ID是同一个 不要重复 */
	readonly id: number;
	/** 月票名称 */
	readonly name_chs: string;
	readonly name_chs_t: string;
	readonly name_jp: string;
	readonly name_en: string;
	readonly name_kr: string;
	/** 资源ID */
	readonly resource_id: number;
	/** 一次性交付资源数量 */
	readonly resource_count: number;
	/** 增加的vip经验 */
	readonly vip_exp: number;
	/** 有效期(日) */
	readonly effective_time: number;
	/** 图标 */
	readonly icon: string;
	/** 描述 */
	readonly desc_chs: string;
	readonly desc_chs_t: string;
	readonly desc_jp: string;
	readonly desc_en: string;
	readonly desc_kr: string;
	/** 购买弹出来的描述 */
	readonly desc_detail_chs: string;
	readonly desc_detail_chs_t: string;
	readonly desc_detail_jp: string;
	readonly desc_detail_en: string;
	readonly desc_detail_kr: string;
	/** 购买弹出来的描述 */
	readonly desc_detail2_chs: string;
	readonly desc_detail2_chs_t: string;
	readonly desc_detail2_jp: string;
	readonly desc_detail2_en: string;
	readonly desc_detail2_kr: string;
}
//#endregion

//#region channel_config
declare interface ISheet_Mall_ChannelConfig {
	readonly [key: string]: ISheetData_Mall_ChannelConfig;
	readonly 100: ISheetData_Mall_ChannelConfig;
	readonly 101: ISheetData_Mall_ChannelConfig;
	readonly 200: ISheetData_Mall_ChannelConfig;
	readonly 201: ISheetData_Mall_ChannelConfig;
	readonly 202: ISheetData_Mall_ChannelConfig;
	readonly 203: ISheetData_Mall_ChannelConfig;
	readonly 204: ISheetData_Mall_ChannelConfig;
	readonly 205: ISheetData_Mall_ChannelConfig;
	readonly 206: ISheetData_Mall_ChannelConfig;
	readonly 300: ISheetData_Mall_ChannelConfig;
	readonly 301: ISheetData_Mall_ChannelConfig;
	readonly 302: ISheetData_Mall_ChannelConfig;
	readonly 303: ISheetData_Mall_ChannelConfig;
	readonly 304: ISheetData_Mall_ChannelConfig;
	readonly 305: ISheetData_Mall_ChannelConfig;
	readonly 400: ISheetData_Mall_ChannelConfig;
	readonly 401: ISheetData_Mall_ChannelConfig;
	readonly 402: ISheetData_Mall_ChannelConfig;
	readonly 403: ISheetData_Mall_ChannelConfig;
	readonly 404: ISheetData_Mall_ChannelConfig;
	readonly 405: ISheetData_Mall_ChannelConfig;
	readonly 406: ISheetData_Mall_ChannelConfig;
	readonly 500: ISheetData_Mall_ChannelConfig;
	readonly 501: ISheetData_Mall_ChannelConfig;
	readonly 502: ISheetData_Mall_ChannelConfig;
	readonly 503: ISheetData_Mall_ChannelConfig;
	readonly 504: ISheetData_Mall_ChannelConfig;
}
declare interface ISheetData_Mall_ChannelConfig extends ISheetDataBase {
	/** 渠道ID */
	readonly id: number;
	/** 渠道可消费货币种类 */
	readonly currency_platforms: string;
	/** 免费辉玉ID */
	readonly free_jade_ids: string;
	/** 付费辉玉ID */
	readonly paid_jade_ids: string;
	/** 免费服饰券ID */
	readonly free_voucher_ids: string;
	/** 付费服饰券ID */
	readonly paid_voucher_ids: string;
	/** 渠道使用的goods_id */
	readonly goods_id: number;
	/** 货架id */
	readonly shelves_id: string;
	/** 渠道代号 */
	readonly name: string;
}
//#endregion

//#region month_ticket_info
declare interface ISheet_Mall_MonthTicketInfo {
	readonly [key: string]: ISheetData_Mall_MonthTicketInfo;
	readonly 1: ISheetData_Mall_MonthTicketInfo;
}
declare interface ISheetData_Mall_MonthTicketInfo extends ISheetDataBase {
	readonly id: number;
}
//#endregion

//#region recharge_bonus
declare interface ISheet_Mall_RechargeBonus {
	readonly [key: string]: ISheetData_Mall_RechargeBonus[];
	readonly 1: ISheetData_Mall_RechargeBonus[];
	readonly 2: ISheetData_Mall_RechargeBonus[];
	readonly 3: ISheetData_Mall_RechargeBonus[];
}
declare interface ISheetData_Mall_RechargeBonus extends ISheetDataBase {
	readonly zone_id: number;
	readonly reset_time: string;
}
//#endregion