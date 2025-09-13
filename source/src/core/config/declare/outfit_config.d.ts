declare interface ITable_OutfitConfig {
	ron: ISheet_OutfitConfig_Ron;
	liqi: ISheet_OutfitConfig_Liqi;
	effect_liqi: ISheet_OutfitConfig_EffectLiqi;
	mpzs: ISheet_OutfitConfig_Mpzs;
	tablecloth: ISheet_OutfitConfig_Tablecloth;
	mjp: ISheet_OutfitConfig_Mjp;
	mjpface: ISheet_OutfitConfig_Mjpface;
	headframe: ISheet_OutfitConfig_Headframe;
	hand: ISheet_OutfitConfig_Hand;
}

//#region ron --- unique
declare interface ISheet_OutfitConfig_Ron {
	rows: ISheetData_OutfitConfig_Ron[];
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

//#region liqi --- unique
declare interface ISheet_OutfitConfig_Liqi {
	rows: ISheetData_OutfitConfig_Liqi[];
	uint32: ISheetData_OutfitConfig_Liqi;
}
declare interface ISheetData_OutfitConfig_Liqi {
	/** 道具id */
	id: number;
}
//#endregion

//#region effect_liqi --- unique
declare interface ISheet_OutfitConfig_EffectLiqi {
	rows: ISheetData_OutfitConfig_EffectLiqi[];
	uint32: ISheetData_OutfitConfig_EffectLiqi;
}
declare interface ISheetData_OutfitConfig_EffectLiqi {
	/** 道具id */
	id: number;
}
//#endregion

//#region mpzs --- unique
declare interface ISheet_OutfitConfig_Mpzs {
	rows: ISheetData_OutfitConfig_Mpzs[];
	uint32: ISheetData_OutfitConfig_Mpzs;
}
declare interface ISheetData_OutfitConfig_Mpzs {
	/** 道具id */
	id: number;
}
//#endregion

//#region tablecloth --- unique
declare interface ISheet_OutfitConfig_Tablecloth {
	rows: ISheetData_OutfitConfig_Tablecloth[];
	uint32: ISheetData_OutfitConfig_Tablecloth;
}
declare interface ISheetData_OutfitConfig_Tablecloth {
	/** 道具id */
	id: number;
}
//#endregion

//#region mjp --- unique
declare interface ISheet_OutfitConfig_Mjp {
	rows: ISheetData_OutfitConfig_Mjp[];
	uint32: ISheetData_OutfitConfig_Mjp;
}
declare interface ISheetData_OutfitConfig_Mjp {
	/** 道具id */
	id: number;
}
//#endregion

//#region mjpface --- unique
declare interface ISheet_OutfitConfig_Mjpface {
	rows: ISheetData_OutfitConfig_Mjpface[];
	uint32: ISheetData_OutfitConfig_Mjpface;
}
declare interface ISheetData_OutfitConfig_Mjpface {
	/** 道具id */
	id: number;
}
//#endregion

//#region headframe --- unique
declare interface ISheet_OutfitConfig_Headframe {
	rows: ISheetData_OutfitConfig_Headframe[];
	uint32: ISheetData_OutfitConfig_Headframe;
}
declare interface ISheetData_OutfitConfig_Headframe {
	/** 道具id */
	id: number;
}
//#endregion

//#region hand --- unique
declare interface ISheet_OutfitConfig_Hand {
	rows: ISheetData_OutfitConfig_Hand[];
	uint32: ISheetData_OutfitConfig_Hand;
}
declare interface ISheetData_OutfitConfig_Hand {
	/** 道具id */
	id: number;
}
//#endregion