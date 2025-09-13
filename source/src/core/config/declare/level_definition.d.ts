declare interface ITable_LevelDefinition {
	level_definition: ISheet_LevelDefinition_LevelDefinition;
	character: ISheet_LevelDefinition_Character;
	trail: ISheet_LevelDefinition_Trail;
	top_rank: ISheet_LevelDefinition_TopRank;
}

//#region level_definition --- unique
declare interface ISheet_LevelDefinition_LevelDefinition {
	rows: ISheetData_LevelDefinition_LevelDefinition[];
	10101: ISheetData_LevelDefinition_LevelDefinition;
	10102: ISheetData_LevelDefinition_LevelDefinition;
	10103: ISheetData_LevelDefinition_LevelDefinition;
	10201: ISheetData_LevelDefinition_LevelDefinition;
	10202: ISheetData_LevelDefinition_LevelDefinition;
	10203: ISheetData_LevelDefinition_LevelDefinition;
	10301: ISheetData_LevelDefinition_LevelDefinition;
	10302: ISheetData_LevelDefinition_LevelDefinition;
	10303: ISheetData_LevelDefinition_LevelDefinition;
	10401: ISheetData_LevelDefinition_LevelDefinition;
	10402: ISheetData_LevelDefinition_LevelDefinition;
	10403: ISheetData_LevelDefinition_LevelDefinition;
	10501: ISheetData_LevelDefinition_LevelDefinition;
	10502: ISheetData_LevelDefinition_LevelDefinition;
	10503: ISheetData_LevelDefinition_LevelDefinition;
	10601: ISheetData_LevelDefinition_LevelDefinition;
	10701: ISheetData_LevelDefinition_LevelDefinition;
	10702: ISheetData_LevelDefinition_LevelDefinition;
	10703: ISheetData_LevelDefinition_LevelDefinition;
	10704: ISheetData_LevelDefinition_LevelDefinition;
	10705: ISheetData_LevelDefinition_LevelDefinition;
	10706: ISheetData_LevelDefinition_LevelDefinition;
	10707: ISheetData_LevelDefinition_LevelDefinition;
	10708: ISheetData_LevelDefinition_LevelDefinition;
	10709: ISheetData_LevelDefinition_LevelDefinition;
	10710: ISheetData_LevelDefinition_LevelDefinition;
	10711: ISheetData_LevelDefinition_LevelDefinition;
	10712: ISheetData_LevelDefinition_LevelDefinition;
	10713: ISheetData_LevelDefinition_LevelDefinition;
	10714: ISheetData_LevelDefinition_LevelDefinition;
	10715: ISheetData_LevelDefinition_LevelDefinition;
	10716: ISheetData_LevelDefinition_LevelDefinition;
	10717: ISheetData_LevelDefinition_LevelDefinition;
	10718: ISheetData_LevelDefinition_LevelDefinition;
	10719: ISheetData_LevelDefinition_LevelDefinition;
	10720: ISheetData_LevelDefinition_LevelDefinition;
	20101: ISheetData_LevelDefinition_LevelDefinition;
	20102: ISheetData_LevelDefinition_LevelDefinition;
	20103: ISheetData_LevelDefinition_LevelDefinition;
	20201: ISheetData_LevelDefinition_LevelDefinition;
	20202: ISheetData_LevelDefinition_LevelDefinition;
	20203: ISheetData_LevelDefinition_LevelDefinition;
	20301: ISheetData_LevelDefinition_LevelDefinition;
	20302: ISheetData_LevelDefinition_LevelDefinition;
	20303: ISheetData_LevelDefinition_LevelDefinition;
	20401: ISheetData_LevelDefinition_LevelDefinition;
	20402: ISheetData_LevelDefinition_LevelDefinition;
	20403: ISheetData_LevelDefinition_LevelDefinition;
	20501: ISheetData_LevelDefinition_LevelDefinition;
	20502: ISheetData_LevelDefinition_LevelDefinition;
	20503: ISheetData_LevelDefinition_LevelDefinition;
	20601: ISheetData_LevelDefinition_LevelDefinition;
	20701: ISheetData_LevelDefinition_LevelDefinition;
	20702: ISheetData_LevelDefinition_LevelDefinition;
	20703: ISheetData_LevelDefinition_LevelDefinition;
	20704: ISheetData_LevelDefinition_LevelDefinition;
	20705: ISheetData_LevelDefinition_LevelDefinition;
	20706: ISheetData_LevelDefinition_LevelDefinition;
	20707: ISheetData_LevelDefinition_LevelDefinition;
	20708: ISheetData_LevelDefinition_LevelDefinition;
	20709: ISheetData_LevelDefinition_LevelDefinition;
	20710: ISheetData_LevelDefinition_LevelDefinition;
	20711: ISheetData_LevelDefinition_LevelDefinition;
	20712: ISheetData_LevelDefinition_LevelDefinition;
	20713: ISheetData_LevelDefinition_LevelDefinition;
	20714: ISheetData_LevelDefinition_LevelDefinition;
	20715: ISheetData_LevelDefinition_LevelDefinition;
	20716: ISheetData_LevelDefinition_LevelDefinition;
	20717: ISheetData_LevelDefinition_LevelDefinition;
	20718: ISheetData_LevelDefinition_LevelDefinition;
	20719: ISheetData_LevelDefinition_LevelDefinition;
	20720: ISheetData_LevelDefinition_LevelDefinition;
}
declare interface ISheetData_LevelDefinition_LevelDefinition {
	id: number;
	type: number;
	primary_level: number;
	secondary_level: number;
	init_point: number;
	end_point: number;
	primary_icon: string;
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	full_name_chs: string;
	full_name_chs_t: string;
	full_name_jp: string;
	full_name_en: string;
	full_name_kr: string;
	can_degrade: number;
	can_upgrade: number;
	can_getpoint: number;
	/** 东风场4位扣分 */
	rankpt1: number;
	/** 南风场4位扣分 */
	rankpt2: number;
	/** top_rank规则的id */
	top_rank_id: number;
}
//#endregion

//#region character --- group
declare interface ISheet_LevelDefinition_Character {
	rows: ISheetData_LevelDefinition_Character[];
	200052: ISheetData_LevelDefinition_Character[];
	200061: ISheetData_LevelDefinition_Character[];
	200076: ISheetData_LevelDefinition_Character[];
	200095: ISheetData_LevelDefinition_Character[];
	20000112: ISheetData_LevelDefinition_Character[];
}
declare interface ISheetData_LevelDefinition_Character {
	level: number;
	character_id: number;
	/** 经验槽 */
	exp: number;
	/** 升级好感后的奖励道具 */
	reward: string;
	/** 升级后说的话 */
	unlock_says: number;
	/** 解锁时的描述 */
	unlock_desc_chs: string;
	unlock_desc_chs_t: string;
	unlock_desc_jp: string;
	unlock_desc_en: string;
	unlock_desc_kr: string;
}
//#endregion

//#region trail --- unique
declare interface ISheet_LevelDefinition_Trail {
	rows: ISheetData_LevelDefinition_Trail[];
	1: ISheetData_LevelDefinition_Trail;
	2: ISheetData_LevelDefinition_Trail;
	3: ISheetData_LevelDefinition_Trail;
	4: ISheetData_LevelDefinition_Trail;
	5: ISheetData_LevelDefinition_Trail;
	6: ISheetData_LevelDefinition_Trail;
	7: ISheetData_LevelDefinition_Trail;
	8: ISheetData_LevelDefinition_Trail;
	9: ISheetData_LevelDefinition_Trail;
	10: ISheetData_LevelDefinition_Trail;
	11: ISheetData_LevelDefinition_Trail;
	12: ISheetData_LevelDefinition_Trail;
	13: ISheetData_LevelDefinition_Trail;
}
declare interface ISheetData_LevelDefinition_Trail {
	id: number;
	/** 初始等级 */
	init_level: number;
	/** 截止等级 */
	end_level: number;
	/** 图标 */
	trail_icon: number;
	/** 火数 */
	trail_fire: number;
}
//#endregion

//#region top_rank --- group
declare interface ISheet_LevelDefinition_TopRank {
	rows: ISheetData_LevelDefinition_TopRank[];
	1001: ISheetData_LevelDefinition_TopRank[];
}
declare interface ISheetData_LevelDefinition_TopRank {
	id: number;
	/** 第一名获得pt */
	rank_pt: number[];
	/** 巅峰对决第一名 */
	top_rank_pt: number[];
	mode: number;
}
//#endregion