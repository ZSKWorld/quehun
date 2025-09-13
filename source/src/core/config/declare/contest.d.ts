declare interface ITable_Contest {
	contest: ISheet_Contest_Contest;
}

//#region contest --- kv
declare interface ISheet_Contest_Contest {
	rows: ISheetData_Contest_Contest[];
	contest_create_price: ISheetData_Contest_Contest;
}
declare interface ISheetData_Contest_Contest {
	id: string;
	int_value: number;
}
//#endregion