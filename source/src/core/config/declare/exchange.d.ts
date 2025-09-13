declare interface ITable_Exchange {
	exchange: ISheet_Exchange_Exchange;
	searchexchange: ISheet_Exchange_Searchexchange;
	fushiquanexchange: ISheet_Exchange_Fushiquanexchange;
}

//#region exchange --- unique
declare interface ISheet_Exchange_Exchange {
	rows: ISheetData_Exchange_Exchange[];
	2001: ISheetData_Exchange_Exchange;
	2002: ISheetData_Exchange_Exchange;
	2003: ISheetData_Exchange_Exchange;
	2004: ISheetData_Exchange_Exchange;
	2005: ISheetData_Exchange_Exchange;
	2006: ISheetData_Exchange_Exchange;
}
declare interface ISheetData_Exchange_Exchange {
	id: number;
	/** 源币种 */
	source_currency: number;
	/** 金额 */
	source_value: number;
	/** 目标币种 */
	target_currency: number;
	/** 金额 */
	target_value: number;
	/** 图标 */
	icon: string;
	/** 名称 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 描述 */
	desc_chs: string;
	desc_chs_t: string;
	desc_jp: string;
	desc_en: string;
	desc_kr: string;
}
//#endregion

//#region searchexchange --- unique
declare interface ISheet_Exchange_Searchexchange {
	rows: ISheetData_Exchange_Searchexchange[];
	3001: ISheetData_Exchange_Searchexchange;
	3002: ISheetData_Exchange_Searchexchange;
}
declare interface ISheetData_Exchange_Searchexchange {
	id: number;
	/** 源币种 */
	source_currency: number;
	/** 金额 */
	source_value: number;
	/** 目标币种 */
	target_currency: number;
	/** 金额 */
	target_value: number;
	/** 图标 */
	icon: string;
	/** 名称 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 描述 */
	desc_chs: string;
	desc_chs_t: string;
	desc_jp: string;
	desc_en: string;
	desc_kor: string;
}
//#endregion

//#region fushiquanexchange --- unique
declare interface ISheet_Exchange_Fushiquanexchange {
	rows: ISheetData_Exchange_Fushiquanexchange[];
	4001: ISheetData_Exchange_Fushiquanexchange;
}
declare interface ISheetData_Exchange_Fushiquanexchange {
	id: number;
	/** 源币种 */
	source_currency: number;
	/** 金额 */
	source_value: number;
	/** 目标币种 */
	target_currency: number;
	/** 金额 */
	target_value: number;
	/** 图标 */
	icon: string;
	/** 名称 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 描述 */
	desc_chs: string;
	/** 描述 */
	desc_chs_t: string;
	desc_jp: string;
	desc_en: string;
	desc_kr: string;
}
//#endregion