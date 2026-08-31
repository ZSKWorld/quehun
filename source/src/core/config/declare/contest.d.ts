/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Contest {
	/** unique */
	readonly contest: CfgExt<ISheet_Contest_Contest>;
}

//#region contest
declare interface ISheet_Contest_Contest {
	readonly [key: string]: ISheetData_Contest_Contest;
	readonly contest_create_price: ISheetData_Contest_Contest;
}
declare interface ISheetData_Contest_Contest extends ISheetDataBase {
	readonly id: string;
	readonly int_value: number;
}
//#endregion