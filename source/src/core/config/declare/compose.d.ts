declare interface ITable_Compose {
	/** unique */
	characompose: CfgExt<ISheet_Compose_Characompose>;
}

//#region characompose
declare interface ISheet_Compose_Characompose {
	1: ISheetData_Compose_Characompose;
}
declare interface ISheetData_Compose_Characompose {
	id: number;
	/** 碎片id */
	item_id: number;
	/** 碎片数量 */
	item_num: number;
	/** 对应角色id */
	chara_id: number;
}
//#endregion