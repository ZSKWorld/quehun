declare interface ITable_OutfitConfig {
	/** 和牌特效  ---  unique */
	ron: CfgExt<ISheet_OutfitConfig_Ron>;
	/** 立直特效  ---  unique */
	liqi: CfgExt<ISheet_OutfitConfig_Liqi>;
	/** 立直棒  ---  unique */
	effect_liqi: CfgExt<ISheet_OutfitConfig_EffectLiqi>;
	/** 鸣牌指示  ---  unique */
	mpzs: CfgExt<ISheet_OutfitConfig_Mpzs>;
	/** 桌布  ---  unique */
	tablecloth: CfgExt<ISheet_OutfitConfig_Tablecloth>;
	/** 牌背  ---  unique */
	mjp: CfgExt<ISheet_OutfitConfig_Mjp>;
	/** 牌面  ---  unique */
	mjpface: CfgExt<ISheet_OutfitConfig_Mjpface>;
	/** 头像框  ---  unique */
	headframe: CfgExt<ISheet_OutfitConfig_Headframe>;
	/** 手  ---  unique */
	hand: CfgExt<ISheet_OutfitConfig_Hand>;
}

//#region ron
declare interface ISheet_OutfitConfig_Ron {
	300001: ISheetData_OutfitConfig_Ron;
	305215: ISheetData_OutfitConfig_Ron;
	305217: ISheetData_OutfitConfig_Ron;
	305219: ISheetData_OutfitConfig_Ron;
	305223: ISheetData_OutfitConfig_Ron;
	308011: ISheetData_OutfitConfig_Ron;
	308026: ISheetData_OutfitConfig_Ron;
	308041: ISheetData_OutfitConfig_Ron;
	30520006: ISheetData_OutfitConfig_Ron;
	30520007: ISheetData_OutfitConfig_Ron;
	30520009: ISheetData_OutfitConfig_Ron;
}
declare interface ISheetData_OutfitConfig_Ron {
	/** 道具id */
	id: number;
	/** 是含有全屏特效，1有，0无 */
	is_fullscreen: number;
	/** 牌层级恢复时间 */
	queue_change_delay: number;
}
//#endregion

//#region liqi
declare interface ISheet_OutfitConfig_Liqi {
	uint32: ISheetData_OutfitConfig_Liqi;
}
declare interface ISheetData_OutfitConfig_Liqi {
	/** 道具id */
	id: number;
}
//#endregion

//#region effect_liqi
declare interface ISheet_OutfitConfig_EffectLiqi {
	uint32: ISheetData_OutfitConfig_EffectLiqi;
}
declare interface ISheetData_OutfitConfig_EffectLiqi {
	/** 道具id */
	id: number;
}
//#endregion

//#region mpzs
declare interface ISheet_OutfitConfig_Mpzs {
	uint32: ISheetData_OutfitConfig_Mpzs;
}
declare interface ISheetData_OutfitConfig_Mpzs {
	/** 道具id */
	id: number;
}
//#endregion

//#region tablecloth
declare interface ISheet_OutfitConfig_Tablecloth {
	uint32: ISheetData_OutfitConfig_Tablecloth;
}
declare interface ISheetData_OutfitConfig_Tablecloth {
	/** 道具id */
	id: number;
}
//#endregion

//#region mjp
declare interface ISheet_OutfitConfig_Mjp {
	uint32: ISheetData_OutfitConfig_Mjp;
}
declare interface ISheetData_OutfitConfig_Mjp {
	/** 道具id */
	id: number;
}
//#endregion

//#region mjpface
declare interface ISheet_OutfitConfig_Mjpface {
	uint32: ISheetData_OutfitConfig_Mjpface;
}
declare interface ISheetData_OutfitConfig_Mjpface {
	/** 道具id */
	id: number;
}
//#endregion

//#region headframe
declare interface ISheet_OutfitConfig_Headframe {
	uint32: ISheetData_OutfitConfig_Headframe;
}
declare interface ISheetData_OutfitConfig_Headframe {
	/** 道具id */
	id: number;
}
//#endregion

//#region hand
declare interface ISheet_OutfitConfig_Hand {
	uint32: ISheetData_OutfitConfig_Hand;
}
declare interface ISheetData_OutfitConfig_Hand {
	/** 道具id */
	id: number;
}
//#endregion