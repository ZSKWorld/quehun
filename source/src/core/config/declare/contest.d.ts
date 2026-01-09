/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Contest {
	/** unique */
	contest: CfgExt<ISheet_Contest_Contest>;
}

//#region contest
declare interface ISheet_Contest_Contest {
	[key: string]: ISheetData_Contest_Contest;
	contest_create_price: ISheetData_Contest_Contest;
}
declare interface ISheetData_Contest_Contest {
	id: string;
	int_value: number;
}
//#endregion