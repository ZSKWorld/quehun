declare interface ITable_GameLive {
	select_filters: ISheet_GameLive_SelectFilters;
}

//#region select_filters --- unique
declare interface ISheet_GameLive_SelectFilters {
	rows: ISheetData_GameLive_SelectFilters[];
	101: ISheetData_GameLive_SelectFilters;
	102: ISheetData_GameLive_SelectFilters;
	201: ISheetData_GameLive_SelectFilters;
	202: ISheetData_GameLive_SelectFilters;
	203: ISheetData_GameLive_SelectFilters;
	204: ISheetData_GameLive_SelectFilters;
	205: ISheetData_GameLive_SelectFilters;
	206: ISheetData_GameLive_SelectFilters;
	207: ISheetData_GameLive_SelectFilters;
	208: ISheetData_GameLive_SelectFilters;
	209: ISheetData_GameLive_SelectFilters;
	210: ISheetData_GameLive_SelectFilters;
	211: ISheetData_GameLive_SelectFilters;
	212: ISheetData_GameLive_SelectFilters;
	213: ISheetData_GameLive_SelectFilters;
	214: ISheetData_GameLive_SelectFilters;
	215: ISheetData_GameLive_SelectFilters;
	216: ISheetData_GameLive_SelectFilters;
	217: ISheetData_GameLive_SelectFilters;
	218: ISheetData_GameLive_SelectFilters;
	219: ISheetData_GameLive_SelectFilters;
	220: ISheetData_GameLive_SelectFilters;
	221: ISheetData_GameLive_SelectFilters;
	222: ISheetData_GameLive_SelectFilters;
	223: ISheetData_GameLive_SelectFilters;
	224: ISheetData_GameLive_SelectFilters;
	225: ISheetData_GameLive_SelectFilters;
	226: ISheetData_GameLive_SelectFilters;
	227: ISheetData_GameLive_SelectFilters;
	228: ISheetData_GameLive_SelectFilters;
}
declare interface ISheetData_GameLive_SelectFilters {
	id: number;
	/** 游戏分类 */
	category: number;
	/** 匹配模式id */
	mode_id: number;
	/** 游戏模式（好友模式） */
	mode: number;
	/** 联赛id */
	tournament_id: number;
	/** 开关 */
	open: number;
	/** 初始选项 */
	initial: number;
	/** 选项名字1 */
	name1_chs: string;
	name1_chs_t: string;
	name1_jp: string;
	name1_en: string;
	name1_kr: string;
	/** 选项名字2 */
	name2_chs: string;
	name2_chs_t: string;
	name2_jp: string;
	name2_en: string;
	name2_kr: string;
}
//#endregion