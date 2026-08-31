/** This script is generated automatically, Please do not any modify! */

declare interface ITable_MatchShilian {
	/** unique */
	readonly shilian: CfgExt<ISheet_MatchShilian_Shilian>;
	/** group */
	readonly shilian_reward: CfgExtGroup<ISheet_MatchShilian_ShilianReward>;
	/** unique */
	readonly shilian_time: CfgExt<ISheet_MatchShilian_ShilianTime>;
}

//#region shilian
declare interface ISheet_MatchShilian_Shilian {
	readonly [key: string]: ISheetData_MatchShilian_Shilian;
	readonly 1: ISheetData_MatchShilian_Shilian;
}
declare interface ISheetData_MatchShilian_Shilian extends ISheetDataBase {
	readonly id: number;
	readonly name: string;
	readonly ticket_id: number;
	readonly currency_id: number;
	readonly currency_count: number;
	/** 见mode解释 */
	readonly mode: number;
	readonly mode1: number;
	readonly mode2: number;
	/** 起始配点 */
	readonly init_point: number;
	/** 返场点数 */
	readonly back_point: number;
}
//#endregion

//#region shilian_reward
declare interface ISheet_MatchShilian_ShilianReward {
	readonly [key: string]: ISheetData_MatchShilian_ShilianReward[];
	readonly 1: ISheetData_MatchShilian_ShilianReward[];
	readonly 2: ISheetData_MatchShilian_ShilianReward[];
	readonly 3: ISheetData_MatchShilian_ShilianReward[];
	readonly 4: ISheetData_MatchShilian_ShilianReward[];
	readonly 5: ISheetData_MatchShilian_ShilianReward[];
}
declare interface ISheetData_MatchShilian_ShilianReward extends ISheetDataBase {
	readonly id: number;
	readonly reward_id: number;
	readonly reward_count: number;
}
//#endregion

//#region shilian_time
declare interface ISheet_MatchShilian_ShilianTime {
	readonly [key: string]: ISheetData_MatchShilian_ShilianTime;
	readonly 1: ISheetData_MatchShilian_ShilianTime;
}
declare interface ISheetData_MatchShilian_ShilianTime extends ISheetDataBase {
	readonly id: number;
	readonly start: string;
	readonly end: string;
}
//#endregion