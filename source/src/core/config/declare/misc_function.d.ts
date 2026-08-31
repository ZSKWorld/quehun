/** This script is generated automatically, Please do not any modify! */

declare interface ITable_MiscFunction {
	/** 每日签到  ---  unique */
	readonly daily_sign_in: CfgExt<ISheet_MiscFunction_DailySignIn>;
}

//#region daily_sign_in
declare interface ISheet_MiscFunction_DailySignIn {
	readonly [key: string]: ISheetData_MiscFunction_DailySignIn;
	readonly 1: ISheetData_MiscFunction_DailySignIn;
	readonly 2: ISheetData_MiscFunction_DailySignIn;
	readonly 3: ISheetData_MiscFunction_DailySignIn;
	readonly 4: ISheetData_MiscFunction_DailySignIn;
	readonly 5: ISheetData_MiscFunction_DailySignIn;
	readonly 6: ISheetData_MiscFunction_DailySignIn;
	readonly 7: ISheetData_MiscFunction_DailySignIn;
}
declare interface ISheetData_MiscFunction_DailySignIn extends ISheetDataBase {
	/** 天数 1-7 */
	readonly id: number;
	/** 奖励Id */
	readonly reward_id: number;
	/** 奖励数量 */
	readonly reward_count: number;
}
//#endregion