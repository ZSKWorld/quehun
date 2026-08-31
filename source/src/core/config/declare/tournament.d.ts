/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Tournament {
	/** 联赛列表  ---  unique */
	readonly tournaments: CfgExt<ISheet_Tournament_Tournaments>;
}

//#region tournaments
declare interface ISheet_Tournament_Tournaments {
	readonly [key: string]: ISheetData_Tournament_Tournaments;
	readonly 1: ISheetData_Tournament_Tournaments;
}
declare interface ISheetData_Tournament_Tournaments extends ISheetDataBase {
	readonly id: number;
	/** 比赛名称 */
	readonly name: string;
	/** 参与比赛门票Id */
	readonly game_ticket_id: number;
}
//#endregion