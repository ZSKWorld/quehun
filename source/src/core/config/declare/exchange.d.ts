/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Exchange {
	/** unique */
	readonly exchange: CfgExt<ISheet_Exchange_Exchange>;
	/** unique */
	readonly searchexchange: CfgExt<ISheet_Exchange_Searchexchange>;
	/** unique */
	readonly fushiquanexchange: CfgExt<ISheet_Exchange_Fushiquanexchange>;
}

//#region exchange
declare interface ISheet_Exchange_Exchange {
	readonly [key: string]: ISheetData_Exchange_Exchange;
	readonly 2001: ISheetData_Exchange_Exchange;
	readonly 2002: ISheetData_Exchange_Exchange;
	readonly 2003: ISheetData_Exchange_Exchange;
	readonly 2004: ISheetData_Exchange_Exchange;
	readonly 2005: ISheetData_Exchange_Exchange;
	readonly 2006: ISheetData_Exchange_Exchange;
}
declare interface ISheetData_Exchange_Exchange extends ISheetDataBase {
	readonly id: number;
	/** 源币种 */
	readonly source_currency: number;
	/** 金额 */
	readonly source_value: number;
	/** 目标币种 */
	readonly target_currency: number;
	/** 金额 */
	readonly target_value: number;
	/** 图标 */
	readonly icon: string;
	/** 名称 */
	readonly name_chs: string;
	readonly name_chs_t: string;
	readonly name_jp: string;
	readonly name_en: string;
	readonly name_kr: string;
	/** 描述 */
	readonly desc_chs: string;
	readonly desc_chs_t: string;
	readonly desc_jp: string;
	readonly desc_en: string;
	readonly desc_kr: string;
}
//#endregion

//#region searchexchange
declare interface ISheet_Exchange_Searchexchange {
	readonly [key: string]: ISheetData_Exchange_Searchexchange;
	readonly 3001: ISheetData_Exchange_Searchexchange;
	readonly 3002: ISheetData_Exchange_Searchexchange;
}
declare interface ISheetData_Exchange_Searchexchange extends ISheetDataBase {
	readonly id: number;
	/** 源币种 */
	readonly source_currency: number;
	/** 金额 */
	readonly source_value: number;
	/** 目标币种 */
	readonly target_currency: number;
	/** 金额 */
	readonly target_value: number;
	/** 图标 */
	readonly icon: string;
	/** 名称 */
	readonly name_chs: string;
	readonly name_chs_t: string;
	readonly name_jp: string;
	readonly name_en: string;
	readonly name_kr: string;
	/** 描述 */
	readonly desc_chs: string;
	readonly desc_chs_t: string;
	readonly desc_jp: string;
	readonly desc_en: string;
	readonly desc_kor: string;
}
//#endregion

//#region fushiquanexchange
declare interface ISheet_Exchange_Fushiquanexchange {
	readonly [key: string]: ISheetData_Exchange_Fushiquanexchange;
	readonly 4001: ISheetData_Exchange_Fushiquanexchange;
}
declare interface ISheetData_Exchange_Fushiquanexchange extends ISheetDataBase {
	readonly id: number;
	/** 源币种 */
	readonly source_currency: number;
	/** 金额 */
	readonly source_value: number;
	/** 目标币种 */
	readonly target_currency: number;
	/** 金额 */
	readonly target_value: number;
	/** 图标 */
	readonly icon: string;
	/** 名称 */
	readonly name_chs: string;
	readonly name_chs_t: string;
	readonly name_jp: string;
	readonly name_en: string;
	readonly name_kr: string;
	/** 描述 */
	readonly desc_chs: string;
	/** 描述 */
	readonly desc_chs_t: string;
	readonly desc_jp: string;
	readonly desc_en: string;
	readonly desc_kr: string;
}
//#endregion