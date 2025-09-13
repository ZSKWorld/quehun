declare interface ITable_Contest {
	/** kv */
	contest: CfgExt<ISheet_Contest_Contest>;
}

//#region contest
declare interface ISheet_Contest_Contest {
	contest_create_price: ISheetData_Contest_Contest;
}
declare interface ISheetData_Contest_Contest {
	id: string;
	int_value: number;
}
//#endregion