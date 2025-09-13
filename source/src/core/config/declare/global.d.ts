declare interface ITable_Global {
	/** unique */
	global: CfgExt<ISheet_Global_Global>;
}

//#region global
declare interface ISheet_Global_Global {
	1: ISheetData_Global_Global;
	2: ISheetData_Global_Global;
	3: ISheetData_Global_Global;
	4: ISheetData_Global_Global;
	5: ISheetData_Global_Global;
}
declare interface ISheetData_Global_Global {
	id: number;
	/** 参数 */
	args: string;
}
//#endregion