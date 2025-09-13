declare interface ITable_Fan {
	/** unique */
	fan: CfgExt<ISheet_Fan_Fan>;
}

//#region fan
declare interface ISheet_Fan_Fan {
	1: ISheetData_Fan_Fan;
	2: ISheetData_Fan_Fan;
	3: ISheetData_Fan_Fan;
	4: ISheetData_Fan_Fan;
	5: ISheetData_Fan_Fan;
	6: ISheetData_Fan_Fan;
	7: ISheetData_Fan_Fan;
	8: ISheetData_Fan_Fan;
	9: ISheetData_Fan_Fan;
	10: ISheetData_Fan_Fan;
	11: ISheetData_Fan_Fan;
	12: ISheetData_Fan_Fan;
	13: ISheetData_Fan_Fan;
	14: ISheetData_Fan_Fan;
	15: ISheetData_Fan_Fan;
	16: ISheetData_Fan_Fan;
	17: ISheetData_Fan_Fan;
	18: ISheetData_Fan_Fan;
	19: ISheetData_Fan_Fan;
	20: ISheetData_Fan_Fan;
	21: ISheetData_Fan_Fan;
	22: ISheetData_Fan_Fan;
	23: ISheetData_Fan_Fan;
	24: ISheetData_Fan_Fan;
	25: ISheetData_Fan_Fan;
	26: ISheetData_Fan_Fan;
	27: ISheetData_Fan_Fan;
	28: ISheetData_Fan_Fan;
	29: ISheetData_Fan_Fan;
	30: ISheetData_Fan_Fan;
	31: ISheetData_Fan_Fan;
	32: ISheetData_Fan_Fan;
	33: ISheetData_Fan_Fan;
	34: ISheetData_Fan_Fan;
	35: ISheetData_Fan_Fan;
	36: ISheetData_Fan_Fan;
	37: ISheetData_Fan_Fan;
	38: ISheetData_Fan_Fan;
	39: ISheetData_Fan_Fan;
	40: ISheetData_Fan_Fan;
	41: ISheetData_Fan_Fan;
	42: ISheetData_Fan_Fan;
	43: ISheetData_Fan_Fan;
	44: ISheetData_Fan_Fan;
	45: ISheetData_Fan_Fan;
	46: ISheetData_Fan_Fan;
	47: ISheetData_Fan_Fan;
	48: ISheetData_Fan_Fan;
	49: ISheetData_Fan_Fan;
	50: ISheetData_Fan_Fan;
	51: ISheetData_Fan_Fan;
	52: ISheetData_Fan_Fan;
	53: ISheetData_Fan_Fan;
	54: ISheetData_Fan_Fan;
	55: ISheetData_Fan_Fan;
	56: ISheetData_Fan_Fan;
	57: ISheetData_Fan_Fan;
	58: ISheetData_Fan_Fan;
	59: ISheetData_Fan_Fan;
	60: ISheetData_Fan_Fan;
	61: ISheetData_Fan_Fan;
	62: ISheetData_Fan_Fan;
	63: ISheetData_Fan_Fan;
	64: ISheetData_Fan_Fan;
	65: ISheetData_Fan_Fan;
	801: ISheetData_Fan_Fan;
	802: ISheetData_Fan_Fan;
	803: ISheetData_Fan_Fan;
	804: ISheetData_Fan_Fan;
	805: ISheetData_Fan_Fan;
	806: ISheetData_Fan_Fan;
	807: ISheetData_Fan_Fan;
	808: ISheetData_Fan_Fan;
	809: ISheetData_Fan_Fan;
	1000: ISheetData_Fan_Fan;
	1001: ISheetData_Fan_Fan;
	1002: ISheetData_Fan_Fan;
	1003: ISheetData_Fan_Fan;
	1004: ISheetData_Fan_Fan;
	1005: ISheetData_Fan_Fan;
	1006: ISheetData_Fan_Fan;
	1007: ISheetData_Fan_Fan;
	1008: ISheetData_Fan_Fan;
	1009: ISheetData_Fan_Fan;
	1010: ISheetData_Fan_Fan;
	1011: ISheetData_Fan_Fan;
	1012: ISheetData_Fan_Fan;
	1013: ISheetData_Fan_Fan;
	1014: ISheetData_Fan_Fan;
	1015: ISheetData_Fan_Fan;
	1016: ISheetData_Fan_Fan;
	1017: ISheetData_Fan_Fan;
	1018: ISheetData_Fan_Fan;
	1019: ISheetData_Fan_Fan;
	1020: ISheetData_Fan_Fan;
	1021: ISheetData_Fan_Fan;
}
declare interface ISheetData_Fan_Fan {
	id: number;
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 是否悬赏，悬赏不算役 */
	xuanshang: number;
	/** 役满 */
	yiman: number;
	/** 门清时候的番数 */
	fan_menqing: number;
	/** 副露时候的番数 */
	fan_fulu: number;
	/** 排序 */
	show_index: number;
	/** 报番语音 */
	sound: string;
	/** 是否古役 */
	is_guyi: number;
	/** 役满特效的珍稀度 */
	rarity: number;
	/** 显示区间三四麻 */
	show_range_1: number;
	/** 显示区间段位友人活动 */
	show_range_2: string;
	/** 合并至其他役种id */
	merge_id: number;
	/** 特殊标记字色 */
	mark: number;
}
//#endregion