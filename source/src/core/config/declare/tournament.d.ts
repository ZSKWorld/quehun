declare interface ITable_Tournament {
	tournaments: ISheet_Tournament_Tournaments;
}

//#region tournaments --- unique
declare interface ISheet_Tournament_Tournaments {
	rows: ISheetData_Tournament_Tournaments[];
	1: ISheetData_Tournament_Tournaments;
}
declare interface ISheetData_Tournament_Tournaments {
	id: number;
	/** 比赛名称 */
	name: string;
	/** 参与比赛门票Id */
	game_ticket_id: number;
}
//#endregion