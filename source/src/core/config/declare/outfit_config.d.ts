/** This script is generated automatically, Please do not any modify! */

declare interface ITable_OutfitConfig {
	/** 和牌特效  ---  unique */
	readonly ron: CfgExt<ISheet_OutfitConfig_Ron>;
	/** 立直特效  ---  unique */
	readonly liqi: CfgExt<ISheet_OutfitConfig_Liqi>;
	/** 立直棒  ---  unique */
	readonly effect_liqi: CfgExt<ISheet_OutfitConfig_EffectLiqi>;
	/** 鸣牌指示  ---  unique */
	readonly mpzs: CfgExt<ISheet_OutfitConfig_Mpzs>;
	/** 桌布  ---  unique */
	readonly tablecloth: CfgExt<ISheet_OutfitConfig_Tablecloth>;
	/** 牌背  ---  unique */
	readonly mjp: CfgExt<ISheet_OutfitConfig_Mjp>;
	/** 牌面  ---  unique */
	readonly mjpface: CfgExt<ISheet_OutfitConfig_Mjpface>;
	/** 头像框  ---  unique */
	readonly headframe: CfgExt<ISheet_OutfitConfig_Headframe>;
	/** 手  ---  unique */
	readonly hand: CfgExt<ISheet_OutfitConfig_Hand>;
}

//#region ron
declare interface ISheet_OutfitConfig_Ron {
	readonly [key: string]: ISheetData_OutfitConfig_Ron;
	readonly 300001: ISheetData_OutfitConfig_Ron;
	readonly 305215: ISheetData_OutfitConfig_Ron;
	readonly 305217: ISheetData_OutfitConfig_Ron;
	readonly 305219: ISheetData_OutfitConfig_Ron;
	readonly 305223: ISheetData_OutfitConfig_Ron;
	readonly 308011: ISheetData_OutfitConfig_Ron;
	readonly 308026: ISheetData_OutfitConfig_Ron;
	readonly 308041: ISheetData_OutfitConfig_Ron;
	readonly 30520006: ISheetData_OutfitConfig_Ron;
	readonly 30520007: ISheetData_OutfitConfig_Ron;
	readonly 30520009: ISheetData_OutfitConfig_Ron;
	readonly 30520013: ISheetData_OutfitConfig_Ron;
}
declare interface ISheetData_OutfitConfig_Ron extends ISheetDataBase {
	/** 道具id */
	readonly id: number;
	/** 是含有全屏特效，1有，0无 */
	readonly is_fullscreen: number;
	/** 牌层级恢复时间 */
	readonly queue_change_delay: number;
}
//#endregion

//#region liqi
declare interface ISheet_OutfitConfig_Liqi {
	readonly [key: string]: ISheetData_OutfitConfig_Liqi;
	readonly 308048: ISheetData_OutfitConfig_Liqi;
}
declare interface ISheetData_OutfitConfig_Liqi extends ISheetDataBase {
	/** 道具id */
	readonly id: number;
	/** 部分方向隐藏特效 */
	readonly hide_direction: string;
}
//#endregion

//#region effect_liqi
declare interface ISheet_OutfitConfig_EffectLiqi {
	readonly [key: string]: ISheetData_OutfitConfig_EffectLiqi;
}
declare interface ISheetData_OutfitConfig_EffectLiqi extends ISheetDataBase {
	/** 道具id */
	readonly id: number;
}
//#endregion

//#region mpzs
declare interface ISheet_OutfitConfig_Mpzs {
	readonly [key: string]: ISheetData_OutfitConfig_Mpzs;
}
declare interface ISheetData_OutfitConfig_Mpzs extends ISheetDataBase {
	/** 道具id */
	readonly id: number;
}
//#endregion

//#region tablecloth
declare interface ISheet_OutfitConfig_Tablecloth {
	readonly [key: string]: ISheetData_OutfitConfig_Tablecloth;
}
declare interface ISheetData_OutfitConfig_Tablecloth extends ISheetDataBase {
	/** 道具id */
	readonly id: number;
}
//#endregion

//#region mjp
declare interface ISheet_OutfitConfig_Mjp {
	readonly [key: string]: ISheetData_OutfitConfig_Mjp;
}
declare interface ISheetData_OutfitConfig_Mjp extends ISheetDataBase {
	/** 道具id */
	readonly id: number;
}
//#endregion

//#region mjpface
declare interface ISheet_OutfitConfig_Mjpface {
	readonly [key: string]: ISheetData_OutfitConfig_Mjpface;
}
declare interface ISheetData_OutfitConfig_Mjpface extends ISheetDataBase {
	/** 道具id */
	readonly id: number;
}
//#endregion

//#region headframe
declare interface ISheet_OutfitConfig_Headframe {
	readonly [key: string]: ISheetData_OutfitConfig_Headframe;
}
declare interface ISheetData_OutfitConfig_Headframe extends ISheetDataBase {
	/** 道具id */
	readonly id: number;
}
//#endregion

//#region hand
declare interface ISheet_OutfitConfig_Hand {
	readonly [key: string]: ISheetData_OutfitConfig_Hand;
}
declare interface ISheetData_OutfitConfig_Hand extends ISheetDataBase {
	/** 道具id */
	readonly id: number;
}
//#endregion