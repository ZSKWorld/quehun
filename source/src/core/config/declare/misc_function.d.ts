declare interface ITable_MiscFunction {
	daily_sign_in: ISheet_MiscFunction_DailySignIn;
}

//#region daily_sign_in --- unique
declare interface ISheet_MiscFunction_DailySignIn {
	rows: ISheetData_MiscFunction_DailySignIn[];
	1: ISheetData_MiscFunction_DailySignIn;
	2: ISheetData_MiscFunction_DailySignIn;
	3: ISheetData_MiscFunction_DailySignIn;
	4: ISheetData_MiscFunction_DailySignIn;
	5: ISheetData_MiscFunction_DailySignIn;
	6: ISheetData_MiscFunction_DailySignIn;
	7: ISheetData_MiscFunction_DailySignIn;
}
declare interface ISheetData_MiscFunction_DailySignIn {
	/** 天数 1-7 */
	id: number;
	/** 奖励Id */
	reward_id: number;
	/** 奖励数量 */
	reward_count: number;
}
//#endregion