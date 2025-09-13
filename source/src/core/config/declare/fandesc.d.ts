declare interface ITable_Fandesc {
	fandesc: ISheet_Fandesc_Fandesc;
}

//#region fandesc --- unique
declare interface ISheet_Fandesc_Fandesc {
	rows: ISheetData_Fandesc_Fandesc[];
	101: ISheetData_Fandesc_Fandesc;
	102: ISheetData_Fandesc_Fandesc;
	103: ISheetData_Fandesc_Fandesc;
	104: ISheetData_Fandesc_Fandesc;
	105: ISheetData_Fandesc_Fandesc;
	106: ISheetData_Fandesc_Fandesc;
	107: ISheetData_Fandesc_Fandesc;
	108: ISheetData_Fandesc_Fandesc;
	109: ISheetData_Fandesc_Fandesc;
	110: ISheetData_Fandesc_Fandesc;
	111: ISheetData_Fandesc_Fandesc;
	112: ISheetData_Fandesc_Fandesc;
	113: ISheetData_Fandesc_Fandesc;
	114: ISheetData_Fandesc_Fandesc;
	115: ISheetData_Fandesc_Fandesc;
	116: ISheetData_Fandesc_Fandesc;
	117: ISheetData_Fandesc_Fandesc;
	118: ISheetData_Fandesc_Fandesc;
	119: ISheetData_Fandesc_Fandesc;
	201: ISheetData_Fandesc_Fandesc;
	202: ISheetData_Fandesc_Fandesc;
	203: ISheetData_Fandesc_Fandesc;
	204: ISheetData_Fandesc_Fandesc;
	205: ISheetData_Fandesc_Fandesc;
	206: ISheetData_Fandesc_Fandesc;
	207: ISheetData_Fandesc_Fandesc;
	208: ISheetData_Fandesc_Fandesc;
	209: ISheetData_Fandesc_Fandesc;
	210: ISheetData_Fandesc_Fandesc;
	211: ISheetData_Fandesc_Fandesc;
	212: ISheetData_Fandesc_Fandesc;
	213: ISheetData_Fandesc_Fandesc;
	301: ISheetData_Fandesc_Fandesc;
	302: ISheetData_Fandesc_Fandesc;
	303: ISheetData_Fandesc_Fandesc;
	304: ISheetData_Fandesc_Fandesc;
	401: ISheetData_Fandesc_Fandesc;
	501: ISheetData_Fandesc_Fandesc;
	502: ISheetData_Fandesc_Fandesc;
	503: ISheetData_Fandesc_Fandesc;
	601: ISheetData_Fandesc_Fandesc;
	602: ISheetData_Fandesc_Fandesc;
	603: ISheetData_Fandesc_Fandesc;
	604: ISheetData_Fandesc_Fandesc;
	605: ISheetData_Fandesc_Fandesc;
	606: ISheetData_Fandesc_Fandesc;
	607: ISheetData_Fandesc_Fandesc;
	608: ISheetData_Fandesc_Fandesc;
	609: ISheetData_Fandesc_Fandesc;
	610: ISheetData_Fandesc_Fandesc;
	611: ISheetData_Fandesc_Fandesc;
	612: ISheetData_Fandesc_Fandesc;
	613: ISheetData_Fandesc_Fandesc;
	614: ISheetData_Fandesc_Fandesc;
	615: ISheetData_Fandesc_Fandesc;
	616: ISheetData_Fandesc_Fandesc;
	701: ISheetData_Fandesc_Fandesc;
	702: ISheetData_Fandesc_Fandesc;
	703: ISheetData_Fandesc_Fandesc;
	704: ISheetData_Fandesc_Fandesc;
	705: ISheetData_Fandesc_Fandesc;
	801: ISheetData_Fandesc_Fandesc;
	802: ISheetData_Fandesc_Fandesc;
	803: ISheetData_Fandesc_Fandesc;
	804: ISheetData_Fandesc_Fandesc;
	1000: ISheetData_Fandesc_Fandesc;
	1001: ISheetData_Fandesc_Fandesc;
	1002: ISheetData_Fandesc_Fandesc;
	1003: ISheetData_Fandesc_Fandesc;
	1004: ISheetData_Fandesc_Fandesc;
	1005: ISheetData_Fandesc_Fandesc;
	1101: ISheetData_Fandesc_Fandesc;
	1102: ISheetData_Fandesc_Fandesc;
	1103: ISheetData_Fandesc_Fandesc;
	1104: ISheetData_Fandesc_Fandesc;
	1105: ISheetData_Fandesc_Fandesc;
	1106: ISheetData_Fandesc_Fandesc;
	1107: ISheetData_Fandesc_Fandesc;
	1108: ISheetData_Fandesc_Fandesc;
	1109: ISheetData_Fandesc_Fandesc;
	1110: ISheetData_Fandesc_Fandesc;
	1111: ISheetData_Fandesc_Fandesc;
	1112: ISheetData_Fandesc_Fandesc;
	1113: ISheetData_Fandesc_Fandesc;
	1114: ISheetData_Fandesc_Fandesc;
	1115: ISheetData_Fandesc_Fandesc;
	1116: ISheetData_Fandesc_Fandesc;
}
declare interface ISheetData_Fandesc_Fandesc {
	id: number;
	/** 标签 */
	tag: number;
	/** 番名 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 说明 */
	desc_chs: string;
	desc_chs_t: string;
	desc_jp: string;
	desc_en: string;
	desc_kr: string;
	/** 状态说明 */
	desc2_chs: string;
	desc2_jp: string;
	desc2_en: string;
	desc2_chs_t: string;
	desc2_kr: string;
	/** 例子 */
	case: string;
	/** 是否显示 */
	show: number;
	/** 0通常 1川麻 */
	mode: number;
}
//#endregion