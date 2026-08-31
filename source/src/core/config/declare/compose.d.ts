/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Compose {
	/** unique */
	readonly characompose: CfgExt<ISheet_Compose_Characompose>;
}

//#region characompose
declare interface ISheet_Compose_Characompose {
	readonly [key: string]: ISheetData_Compose_Characompose;
	readonly 1: ISheetData_Compose_Characompose;
}
declare interface ISheetData_Compose_Characompose extends ISheetDataBase {
	readonly id: number;
	/** 碎片id */
	readonly item_id: number;
	/** 碎片数量 */
	readonly item_num: number;
	/** 对应角色id */
	readonly chara_id: number;
}
//#endregion