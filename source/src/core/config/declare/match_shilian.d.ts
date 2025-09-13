declare interface ITable_MatchShilian {
	shilian: ISheet_MatchShilian_Shilian;
	shilian_reward: ISheet_MatchShilian_ShilianReward;
	shilian_time: ISheet_MatchShilian_ShilianTime;
}

//#region shilian --- unique
declare interface ISheet_MatchShilian_Shilian {
	rows: ISheetData_MatchShilian_Shilian[];
	1: ISheetData_MatchShilian_Shilian;
}
declare interface ISheetData_MatchShilian_Shilian {
	id: number;
	name: string;
	ticket_id: number;
	currency_id: number;
	currency_count: number;
	/** 见mode解释 */
	mode: number;
	mode1: number;
	mode2: number;
	/** 起始配点 */
	init_point: number;
	/** 返场点数 */
	back_point: number;
}
//#endregion

//#region shilian_reward --- group
declare interface ISheet_MatchShilian_ShilianReward {
	rows: ISheetData_MatchShilian_ShilianReward[];
	1: ISheetData_MatchShilian_ShilianReward[];
	2: ISheetData_MatchShilian_ShilianReward[];
	3: ISheetData_MatchShilian_ShilianReward[];
	4: ISheetData_MatchShilian_ShilianReward[];
	5: ISheetData_MatchShilian_ShilianReward[];
}
declare interface ISheetData_MatchShilian_ShilianReward {
	id: number;
	reward_id: number;
	reward_count: number;
}
//#endregion

//#region shilian_time --- unique
declare interface ISheet_MatchShilian_ShilianTime {
	rows: ISheetData_MatchShilian_ShilianTime[];
	1: ISheetData_MatchShilian_ShilianTime;
}
declare interface ISheetData_MatchShilian_ShilianTime {
	id: number;
	start: string;
	end: string;
}
//#endregion