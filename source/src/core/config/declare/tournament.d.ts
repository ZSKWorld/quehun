/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Tournament {
	/** 联赛列表  ---  unique */
	tournaments: CfgExt<ISheet_Tournament_Tournaments>;
}

//#region tournaments
declare interface ISheet_Tournament_Tournaments {
	[key: string]: ISheetData_Tournament_Tournaments;
	1: ISheetData_Tournament_Tournaments;
}
declare interface ISheetData_Tournament_Tournaments extends ISheetDataBase {
	id: number;
	/** 比赛名称 */
	name: string;
	/** 参与比赛门票Id */
	game_ticket_id: number;
}
//#endregion