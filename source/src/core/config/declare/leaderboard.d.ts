declare interface ITable_Leaderboard {
	/** 排行榜  ---  unique */
	leaderboard: CfgExt<ISheet_Leaderboard_Leaderboard>;
}

//#region leaderboard
declare interface ISheet_Leaderboard_Leaderboard {
	1010: ISheetData_Leaderboard_Leaderboard;
}
declare interface ISheetData_Leaderboard_Leaderboard {
	id: number;
	/** 开始排名时间 */
	start_time: string;
	/** 最终排名时间 */
	end_time: string;
	/** 刷新cd（秒） */
	refresh_cd: number;
	/** 上榜最多人数 */
	max_count: number;
	/** 展示列表（排名） */
	show_list: string;
}
//#endregion