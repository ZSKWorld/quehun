declare interface ITable_Character {
	emoji: ISheet_Character_Emoji;
	cutin: ISheet_Character_Cutin;
	skin: ISheet_Character_Skin;
}

//#region emoji --- group
declare interface ISheet_Character_Emoji {
	rows: ISheetData_Character_Emoji[];
	200001: ISheetData_Character_Emoji[];
	200002: ISheetData_Character_Emoji[];
	200003: ISheetData_Character_Emoji[];
	200004: ISheetData_Character_Emoji[];
	200005: ISheetData_Character_Emoji[];
	200006: ISheetData_Character_Emoji[];
	200007: ISheetData_Character_Emoji[];
	200008: ISheetData_Character_Emoji[];
	200009: ISheetData_Character_Emoji[];
	200010: ISheetData_Character_Emoji[];
	200011: ISheetData_Character_Emoji[];
	200012: ISheetData_Character_Emoji[];
	200013: ISheetData_Character_Emoji[];
	200014: ISheetData_Character_Emoji[];
	200015: ISheetData_Character_Emoji[];
	200016: ISheetData_Character_Emoji[];
	200017: ISheetData_Character_Emoji[];
	200018: ISheetData_Character_Emoji[];
	200019: ISheetData_Character_Emoji[];
	200020: ISheetData_Character_Emoji[];
	200021: ISheetData_Character_Emoji[];
	200022: ISheetData_Character_Emoji[];
	200023: ISheetData_Character_Emoji[];
	200024: ISheetData_Character_Emoji[];
	200025: ISheetData_Character_Emoji[];
	200026: ISheetData_Character_Emoji[];
	200027: ISheetData_Character_Emoji[];
	200028: ISheetData_Character_Emoji[];
	200029: ISheetData_Character_Emoji[];
	200030: ISheetData_Character_Emoji[];
	200031: ISheetData_Character_Emoji[];
	200032: ISheetData_Character_Emoji[];
	200033: ISheetData_Character_Emoji[];
	200034: ISheetData_Character_Emoji[];
	200035: ISheetData_Character_Emoji[];
	200036: ISheetData_Character_Emoji[];
	200037: ISheetData_Character_Emoji[];
	200038: ISheetData_Character_Emoji[];
	200039: ISheetData_Character_Emoji[];
	200040: ISheetData_Character_Emoji[];
	200041: ISheetData_Character_Emoji[];
	200042: ISheetData_Character_Emoji[];
	200043: ISheetData_Character_Emoji[];
	200044: ISheetData_Character_Emoji[];
	200045: ISheetData_Character_Emoji[];
	200046: ISheetData_Character_Emoji[];
	200047: ISheetData_Character_Emoji[];
	200048: ISheetData_Character_Emoji[];
	200049: ISheetData_Character_Emoji[];
	200050: ISheetData_Character_Emoji[];
	200051: ISheetData_Character_Emoji[];
	200052: ISheetData_Character_Emoji[];
	200053: ISheetData_Character_Emoji[];
	200054: ISheetData_Character_Emoji[];
	200055: ISheetData_Character_Emoji[];
	200056: ISheetData_Character_Emoji[];
	200057: ISheetData_Character_Emoji[];
	200058: ISheetData_Character_Emoji[];
	200059: ISheetData_Character_Emoji[];
	200060: ISheetData_Character_Emoji[];
	200061: ISheetData_Character_Emoji[];
	200062: ISheetData_Character_Emoji[];
	200063: ISheetData_Character_Emoji[];
	200064: ISheetData_Character_Emoji[];
	200065: ISheetData_Character_Emoji[];
	200066: ISheetData_Character_Emoji[];
	200067: ISheetData_Character_Emoji[];
	200068: ISheetData_Character_Emoji[];
	200069: ISheetData_Character_Emoji[];
	200070: ISheetData_Character_Emoji[];
	200071: ISheetData_Character_Emoji[];
	200072: ISheetData_Character_Emoji[];
	200073: ISheetData_Character_Emoji[];
	200074: ISheetData_Character_Emoji[];
	200075: ISheetData_Character_Emoji[];
	200076: ISheetData_Character_Emoji[];
	200077: ISheetData_Character_Emoji[];
	200078: ISheetData_Character_Emoji[];
	200079: ISheetData_Character_Emoji[];
	200080: ISheetData_Character_Emoji[];
	200081: ISheetData_Character_Emoji[];
	200082: ISheetData_Character_Emoji[];
	200083: ISheetData_Character_Emoji[];
	200084: ISheetData_Character_Emoji[];
	200085: ISheetData_Character_Emoji[];
	200086: ISheetData_Character_Emoji[];
	200087: ISheetData_Character_Emoji[];
	200088: ISheetData_Character_Emoji[];
	200089: ISheetData_Character_Emoji[];
	200090: ISheetData_Character_Emoji[];
	200091: ISheetData_Character_Emoji[];
	200092: ISheetData_Character_Emoji[];
	200093: ISheetData_Character_Emoji[];
	200094: ISheetData_Character_Emoji[];
	200095: ISheetData_Character_Emoji[];
	200096: ISheetData_Character_Emoji[];
	200097: ISheetData_Character_Emoji[];
	200098: ISheetData_Character_Emoji[];
	200099: ISheetData_Character_Emoji[];
	20000100: ISheetData_Character_Emoji[];
	20000101: ISheetData_Character_Emoji[];
	20000102: ISheetData_Character_Emoji[];
	20000103: ISheetData_Character_Emoji[];
	20000106: ISheetData_Character_Emoji[];
	20000107: ISheetData_Character_Emoji[];
	20000108: ISheetData_Character_Emoji[];
	20000109: ISheetData_Character_Emoji[];
	20000110: ISheetData_Character_Emoji[];
	20000111: ISheetData_Character_Emoji[];
	20000112: ISheetData_Character_Emoji[];
}
declare interface ISheetData_Character_Emoji {
	/** 角色ID */
	charid: number;
	/** 表情ID */
	sub_id: number;
	/** 解锁条件描述 */
	unlock_desc_chs: string;
	unlock_desc_chs_t: string;
	unlock_desc_jp: string;
	unlock_desc_en: string;
	unlock_desc_kr: string;
	type: number;
	/** 特效表情的资源名字 */
	view: string;
	/** audio_id */
	audio: number;
	/** 解锁后描述 */
	after_unlock_desc_chs: string;
	after_unlock_desc_chs_t: string;
	after_unlock_desc_jp: string;
	after_unlock_desc_en: string;
	after_unlock_desc_kr: string;
	/** 解锁类型 */
	unlock_type: number;
	/** 解锁参数 */
	unlock_param: number[];
}
//#endregion

//#region cutin --- unique
declare interface ISheet_Character_Cutin {
	rows: ISheetData_Character_Cutin[];
	405201: ISheetData_Character_Cutin;
	405202: ISheetData_Character_Cutin;
	406101: ISheetData_Character_Cutin;
	406102: ISheetData_Character_Cutin;
	407601: ISheetData_Character_Cutin;
	407602: ISheetData_Character_Cutin;
	409501: ISheetData_Character_Cutin;
	409502: ISheetData_Character_Cutin;
	40011201: ISheetData_Character_Cutin;
	40011202: ISheetData_Character_Cutin;
	40011203: ISheetData_Character_Cutin;
}
declare interface ISheetData_Character_Cutin {
	/** 皮肤ID */
	skinid: number;
	/** 本体名 */
	cutin_name: string;
	/** 特效 */
	effect: string;
	atlas: string;
	char_x: number;
	char_y: number;
	char_width: number;
	char_height: number;
	type: number;
}
//#endregion

//#region skin --- unique
declare interface ISheet_Character_Skin {
	rows: ISheetData_Character_Skin[];
	400107: ISheetData_Character_Skin;
	400305: ISheetData_Character_Skin;
	400306: ISheetData_Character_Skin;
	400506: ISheetData_Character_Skin;
	400709: ISheetData_Character_Skin;
	400907: ISheetData_Character_Skin;
	401709: ISheetData_Character_Skin;
	401906: ISheetData_Character_Skin;
	401907: ISheetData_Character_Skin;
	402106: ISheetData_Character_Skin;
	402406: ISheetData_Character_Skin;
	402407: ISheetData_Character_Skin;
	402606: ISheetData_Character_Skin;
	403206: ISheetData_Character_Skin;
	403304: ISheetData_Character_Skin;
	403805: ISheetData_Character_Skin;
	404505: ISheetData_Character_Skin;
	404805: ISheetData_Character_Skin;
	405905: ISheetData_Character_Skin;
	405906: ISheetData_Character_Skin;
	406004: ISheetData_Character_Skin;
	406704: ISheetData_Character_Skin;
	406804: ISheetData_Character_Skin;
	409003: ISheetData_Character_Skin;
	409502: ISheetData_Character_Skin;
	40010703: ISheetData_Character_Skin;
	40010803: ISheetData_Character_Skin;
	40010903: ISheetData_Character_Skin;
	40011003: ISheetData_Character_Skin;
	40011103: ISheetData_Character_Skin;
	40011202: ISheetData_Character_Skin;
	40011203: ISheetData_Character_Skin;
}
declare interface ISheetData_Character_Skin {
	/** 皮肤ID */
	skinid: number;
	/** 动皮有几层 */
	spine_layers: number;
	/** 特效只允许存在俩层，每层最多俩，用‘,'分割，前面的是持续存在的，后面是跟对应动画出现的 */
	effects: string[];
	/** 庆祝音效 */
	audio_celebrate: string;
	/** 庆祝待机音效 */
	audio_celebrate_idle: string;
	audio_idle: string;
	/** 打招呼音效 */
	audio_greeting: string;
	/** 点击音效1 */
	audio_click: string;
	/** 点击音效2 */
	audio_click2: string;
	/** 结局界面的胜利动画是否延迟播放 */
	celebrate_delay: number;
}
//#endregion