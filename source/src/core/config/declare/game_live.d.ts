/** This script is generated automatically, Please do not any modify! */

declare interface ITable_GameLive {
	/** 观战选项过滤  ---  unique */
	readonly select_filters: CfgExt<ISheet_GameLive_SelectFilters>;
}

//#region select_filters
declare interface ISheet_GameLive_SelectFilters {
	readonly [key: string]: ISheetData_GameLive_SelectFilters;
	readonly 101: ISheetData_GameLive_SelectFilters;
	readonly 102: ISheetData_GameLive_SelectFilters;
	readonly 201: ISheetData_GameLive_SelectFilters;
	readonly 202: ISheetData_GameLive_SelectFilters;
	readonly 203: ISheetData_GameLive_SelectFilters;
	readonly 204: ISheetData_GameLive_SelectFilters;
	readonly 205: ISheetData_GameLive_SelectFilters;
	readonly 206: ISheetData_GameLive_SelectFilters;
	readonly 207: ISheetData_GameLive_SelectFilters;
	readonly 208: ISheetData_GameLive_SelectFilters;
	readonly 209: ISheetData_GameLive_SelectFilters;
	readonly 210: ISheetData_GameLive_SelectFilters;
	readonly 211: ISheetData_GameLive_SelectFilters;
	readonly 212: ISheetData_GameLive_SelectFilters;
	readonly 213: ISheetData_GameLive_SelectFilters;
	readonly 214: ISheetData_GameLive_SelectFilters;
	readonly 215: ISheetData_GameLive_SelectFilters;
	readonly 216: ISheetData_GameLive_SelectFilters;
	readonly 217: ISheetData_GameLive_SelectFilters;
	readonly 218: ISheetData_GameLive_SelectFilters;
	readonly 219: ISheetData_GameLive_SelectFilters;
	readonly 220: ISheetData_GameLive_SelectFilters;
	readonly 221: ISheetData_GameLive_SelectFilters;
	readonly 222: ISheetData_GameLive_SelectFilters;
	readonly 223: ISheetData_GameLive_SelectFilters;
	readonly 224: ISheetData_GameLive_SelectFilters;
	readonly 225: ISheetData_GameLive_SelectFilters;
	readonly 226: ISheetData_GameLive_SelectFilters;
	readonly 227: ISheetData_GameLive_SelectFilters;
	readonly 228: ISheetData_GameLive_SelectFilters;
}
declare interface ISheetData_GameLive_SelectFilters extends ISheetDataBase {
	readonly id: number;
	/** 游戏分类 */
	readonly category: number;
	/** 匹配模式id */
	readonly mode_id: number;
	/** 游戏模式（好友模式） */
	readonly mode: number;
	/** 联赛id */
	readonly tournament_id: number;
	/** 开关 */
	readonly open: number;
	/** 初始选项 */
	readonly initial: number;
	/** 选项名字1 */
	readonly name1_chs: string;
	readonly name1_chs_t: string;
	readonly name1_jp: string;
	readonly name1_en: string;
	readonly name1_kr: string;
	/** 选项名字2 */
	readonly name2_chs: string;
	readonly name2_chs_t: string;
	readonly name2_jp: string;
	readonly name2_en: string;
	readonly name2_kr: string;
}
//#endregion