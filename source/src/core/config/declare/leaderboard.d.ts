/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Leaderboard {
	/** 排行榜  ---  unique */
	readonly leaderboard: CfgExt<ISheet_Leaderboard_Leaderboard>;
}

//#region leaderboard
declare interface ISheet_Leaderboard_Leaderboard {
	readonly [key: string]: ISheetData_Leaderboard_Leaderboard;
	readonly 1010: ISheetData_Leaderboard_Leaderboard;
}
declare interface ISheetData_Leaderboard_Leaderboard extends ISheetDataBase {
	readonly id: number;
	/** 开始排名时间 */
	readonly start_time: string;
	/** 最终排名时间 */
	readonly end_time: string;
	/** 刷新cd（秒） */
	readonly refresh_cd: number;
	/** 上榜最多人数 */
	readonly max_count: number;
	/** 展示列表（排名） */
	readonly show_list: string;
}
//#endregion