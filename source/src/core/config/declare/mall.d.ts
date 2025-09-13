declare interface ITable_Mall {
	goods: ISheet_Mall_Goods;
	product: ISheet_Mall_Product;
	goods_shelves: ISheet_Mall_GoodsShelves;
	zone_params: ISheet_Mall_ZoneParams;
	month_ticket: ISheet_Mall_MonthTicket;
	channel_config: ISheet_Mall_ChannelConfig;
	month_ticket_info: ISheet_Mall_MonthTicketInfo;
}

//#region goods --- unique
declare interface ISheet_Mall_Goods {
	rows: ISheetData_Mall_Goods[];
	1001: ISheetData_Mall_Goods;
	1002: ISheetData_Mall_Goods;
	1003: ISheetData_Mall_Goods;
	1004: ISheetData_Mall_Goods;
	1005: ISheetData_Mall_Goods;
	1006: ISheetData_Mall_Goods;
	1007: ISheetData_Mall_Goods;
	1008: ISheetData_Mall_Goods;
	1101: ISheetData_Mall_Goods;
	1102: ISheetData_Mall_Goods;
	1103: ISheetData_Mall_Goods;
	1104: ISheetData_Mall_Goods;
	1105: ISheetData_Mall_Goods;
	1106: ISheetData_Mall_Goods;
	1107: ISheetData_Mall_Goods;
	1108: ISheetData_Mall_Goods;
	2001: ISheetData_Mall_Goods;
	2002: ISheetData_Mall_Goods;
	2003: ISheetData_Mall_Goods;
	2004: ISheetData_Mall_Goods;
	2005: ISheetData_Mall_Goods;
	2006: ISheetData_Mall_Goods;
	2007: ISheetData_Mall_Goods;
	2008: ISheetData_Mall_Goods;
	2101: ISheetData_Mall_Goods;
	2102: ISheetData_Mall_Goods;
	2103: ISheetData_Mall_Goods;
	2104: ISheetData_Mall_Goods;
	2105: ISheetData_Mall_Goods;
	2106: ISheetData_Mall_Goods;
	2107: ISheetData_Mall_Goods;
	2108: ISheetData_Mall_Goods;
	3001: ISheetData_Mall_Goods;
	3002: ISheetData_Mall_Goods;
	3003: ISheetData_Mall_Goods;
	3004: ISheetData_Mall_Goods;
	3005: ISheetData_Mall_Goods;
	3006: ISheetData_Mall_Goods;
	3007: ISheetData_Mall_Goods;
	3008: ISheetData_Mall_Goods;
	3101: ISheetData_Mall_Goods;
	3102: ISheetData_Mall_Goods;
	3103: ISheetData_Mall_Goods;
	3104: ISheetData_Mall_Goods;
	3105: ISheetData_Mall_Goods;
	3106: ISheetData_Mall_Goods;
	3107: ISheetData_Mall_Goods;
	3108: ISheetData_Mall_Goods;
	4001: ISheetData_Mall_Goods;
	4002: ISheetData_Mall_Goods;
	4003: ISheetData_Mall_Goods;
	4004: ISheetData_Mall_Goods;
	4005: ISheetData_Mall_Goods;
	4006: ISheetData_Mall_Goods;
	4007: ISheetData_Mall_Goods;
	4008: ISheetData_Mall_Goods;
	4101: ISheetData_Mall_Goods;
	4102: ISheetData_Mall_Goods;
	4103: ISheetData_Mall_Goods;
	4104: ISheetData_Mall_Goods;
	4105: ISheetData_Mall_Goods;
	4106: ISheetData_Mall_Goods;
	4107: ISheetData_Mall_Goods;
	4108: ISheetData_Mall_Goods;
	5001: ISheetData_Mall_Goods;
	5002: ISheetData_Mall_Goods;
	5003: ISheetData_Mall_Goods;
	5004: ISheetData_Mall_Goods;
	5005: ISheetData_Mall_Goods;
	5006: ISheetData_Mall_Goods;
	5007: ISheetData_Mall_Goods;
	5008: ISheetData_Mall_Goods;
	5101: ISheetData_Mall_Goods;
	5102: ISheetData_Mall_Goods;
	5103: ISheetData_Mall_Goods;
	5104: ISheetData_Mall_Goods;
	5105: ISheetData_Mall_Goods;
	5106: ISheetData_Mall_Goods;
	5107: ISheetData_Mall_Goods;
	5108: ISheetData_Mall_Goods;
}
declare interface ISheetData_Mall_Goods {
	id: number;
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 描述 */
	desc: string;
	desc_chs: string;
	desc_chs_t: string;
	desc_jp: string;
	desc_en: string;
	desc_kr: string;
	/** 图标 */
	icon: string;
	/** 资源ID */
	resource_id: number;
	/** 资源数量 */
	resource_count: number;
	/** 增加的vip经验 */
	vip_exp: number;
	/** 首充档位ID */
	cny: number;
	/** 显示用的价格 */
	price: string;
	first_desc_chs: string;
	first_desc_chs_t: string;
	first_desc_jp: string;
	first_desc_en: string;
	first_desc_kr: string;
	/** 首冲额外赠送 */
	first_extend_add: number;
	normal_desc_chs: string;
	normal_desc_chs_t: string;
	normal_desc_jp: string;
	normal_desc_en: string;
	normal_desc_kr: string;
	/** 非首冲赠送辉玉 */
	normal_extend_add: number;
	/** 显示在哪个屋 */
	type: number;
}
//#endregion

//#region product --- group
declare interface ISheet_Mall_Product {
	rows: ISheetData_Mall_Product[];
	10: ISheetData_Mall_Product[];
	11: ISheetData_Mall_Product[];
	12: ISheetData_Mall_Product[];
	21: ISheetData_Mall_Product[];
	22: ISheetData_Mall_Product[];
	31: ISheetData_Mall_Product[];
	32: ISheetData_Mall_Product[];
	33: ISheetData_Mall_Product[];
	34: ISheetData_Mall_Product[];
	35: ISheetData_Mall_Product[];
	36: ISheetData_Mall_Product[];
	37: ISheetData_Mall_Product[];
	38: ISheetData_Mall_Product[];
	41: ISheetData_Mall_Product[];
	42: ISheetData_Mall_Product[];
	43: ISheetData_Mall_Product[];
	44: ISheetData_Mall_Product[];
	45: ISheetData_Mall_Product[];
	51: ISheetData_Mall_Product[];
	60: ISheetData_Mall_Product[];
	61: ISheetData_Mall_Product[];
	62: ISheetData_Mall_Product[];
	63: ISheetData_Mall_Product[];
	64: ISheetData_Mall_Product[];
	65: ISheetData_Mall_Product[];
	66: ISheetData_Mall_Product[];
	67: ISheetData_Mall_Product[];
	68: ISheetData_Mall_Product[];
	70: ISheetData_Mall_Product[];
	71: ISheetData_Mall_Product[];
	72: ISheetData_Mall_Product[];
	73: ISheetData_Mall_Product[];
	80: ISheetData_Mall_Product[];
	90: ISheetData_Mall_Product[];
	91: ISheetData_Mall_Product[];
	92: ISheetData_Mall_Product[];
	93: ISheetData_Mall_Product[];
}
declare interface ISheetData_Mall_Product {
	/** 支付平台 */
	payment_platform: number;
	/** 商品ID */
	goods_id: number;
	/** 商品类型 */
	product_type: number;
	/** 上架平台商品ID */
	product_id: string;
	/** 货币标准符号 */
	currency_code: string;
	/** 货币价格 */
	currency_price: number;
	/** 实际使用的货币符号 */
	actual_code: string;
	/** 实际支付价格（用于第三方支付） */
	actual_price: number;
	/** 简要描述 */
	brief_desc: string;
	/** 详细描述 */
	detail_desc: string;
}
//#endregion

//#region goods_shelves --- group
declare interface ISheet_Mall_GoodsShelves {
	rows: ISheetData_Mall_GoodsShelves[];
	shelves_001: ISheetData_Mall_GoodsShelves[];
	shelves_002: ISheetData_Mall_GoodsShelves[];
	shelves_003: ISheetData_Mall_GoodsShelves[];
	shelves_004: ISheetData_Mall_GoodsShelves[];
	shelves_005: ISheetData_Mall_GoodsShelves[];
	shelves_006: ISheetData_Mall_GoodsShelves[];
	shelves_007: ISheetData_Mall_GoodsShelves[];
	shelves_008: ISheetData_Mall_GoodsShelves[];
}
declare interface ISheetData_Mall_GoodsShelves {
	/** 货架ID */
	id: string;
	/** 商品ID */
	goods_id: number;
	/** 货币标准符号 */
	currency_code: string;
	/** 货币价格 */
	currency_price: number;
	price: string;
	/** 是不是月卡 */
	is_monthcard: number;
}
//#endregion

//#region zone_params --- group
declare interface ISheet_Mall_ZoneParams {
	rows: ISheetData_Mall_ZoneParams[];
	1: ISheetData_Mall_ZoneParams[];
	2: ISheetData_Mall_ZoneParams[];
	3: ISheetData_Mall_ZoneParams[];
}
declare interface ISheetData_Mall_ZoneParams {
	zone_id: string;
	key: string;
	string_value: string;
}
//#endregion

//#region month_ticket --- unique
declare interface ISheet_Mall_MonthTicket {
	rows: ISheetData_Mall_MonthTicket[];
	1010: ISheetData_Mall_MonthTicket;
	2010: ISheetData_Mall_MonthTicket;
	3010: ISheetData_Mall_MonthTicket;
	5010: ISheetData_Mall_MonthTicket;
}
declare interface ISheetData_Mall_MonthTicket {
	/** 月票ID 和goods里的ID是同一个 不要重复 */
	id: number;
	/** 月票名称 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 资源ID */
	resource_id: number;
	/** 一次性交付资源数量 */
	resource_count: number;
	/** 增加的vip经验 */
	vip_exp: number;
	/** 有效期(日) */
	effective_time: number;
	/** 图标 */
	icon: string;
	/** 描述 */
	desc_chs: string;
	desc_chs_t: string;
	desc_jp: string;
	desc_en: string;
	desc_kr: string;
	/** 购买弹出来的描述 */
	desc_detail_chs: string;
	desc_detail_chs_t: string;
	desc_detail_jp: string;
	desc_detail_en: string;
	desc_detail_kr: string;
	/** 购买弹出来的描述 */
	desc_detail2_chs: string;
	desc_detail2_chs_t: string;
	desc_detail2_jp: string;
	desc_detail2_en: string;
	desc_detail2_kr: string;
}
//#endregion

//#region channel_config --- unique
declare interface ISheet_Mall_ChannelConfig {
	rows: ISheetData_Mall_ChannelConfig[];
	100: ISheetData_Mall_ChannelConfig;
	101: ISheetData_Mall_ChannelConfig;
	200: ISheetData_Mall_ChannelConfig;
	201: ISheetData_Mall_ChannelConfig;
	202: ISheetData_Mall_ChannelConfig;
	203: ISheetData_Mall_ChannelConfig;
	204: ISheetData_Mall_ChannelConfig;
	205: ISheetData_Mall_ChannelConfig;
	206: ISheetData_Mall_ChannelConfig;
	300: ISheetData_Mall_ChannelConfig;
	301: ISheetData_Mall_ChannelConfig;
	302: ISheetData_Mall_ChannelConfig;
	303: ISheetData_Mall_ChannelConfig;
	304: ISheetData_Mall_ChannelConfig;
	400: ISheetData_Mall_ChannelConfig;
	401: ISheetData_Mall_ChannelConfig;
	402: ISheetData_Mall_ChannelConfig;
	403: ISheetData_Mall_ChannelConfig;
	404: ISheetData_Mall_ChannelConfig;
	405: ISheetData_Mall_ChannelConfig;
	500: ISheetData_Mall_ChannelConfig;
	501: ISheetData_Mall_ChannelConfig;
	502: ISheetData_Mall_ChannelConfig;
	503: ISheetData_Mall_ChannelConfig;
}
declare interface ISheetData_Mall_ChannelConfig {
	/** 渠道ID */
	id: number;
	/** 渠道可消费货币种类 */
	currency_platforms: string;
	/** 免费辉玉ID */
	free_jade_ids: string;
	/** 付费辉玉ID */
	paid_jade_ids: string;
	/** 免费服饰券ID */
	free_voucher_ids: string;
	/** 付费服饰券ID */
	paid_voucher_ids: string;
	/** 渠道使用的goods_id */
	goods_id: number;
	/** 货架id */
	shelves_id: string;
	/** 渠道代号 */
	name: string;
}
//#endregion

//#region month_ticket_info --- unique
declare interface ISheet_Mall_MonthTicketInfo {
	rows: ISheetData_Mall_MonthTicketInfo[];
	1: ISheetData_Mall_MonthTicketInfo;
}
declare interface ISheetData_Mall_MonthTicketInfo {
	id: number;
	/** 资源ID */
	resource_id: number;
	/** 每日交付资源种类 */
	resource_id_daily: number;
	/** 每日交付资源数量 */
	resource_count_daily: number;
	/** 每日多刷新任务数量 */
	extra_event: number;
	/** 增加任务刷新次数 */
	extra_refresh_count: number;
	/** 增加任务上限数量 */
	extra_event_limit: number;
}
//#endregion