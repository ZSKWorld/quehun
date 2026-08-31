/** This script is generated automatically, Please do not any modify! */

declare interface ITable_LevelDefinition {
	/** unique */
	readonly level_definition: CfgExt<ISheet_LevelDefinition_LevelDefinition>;
	/** 角色通用等级表  ---  group */
	readonly character: CfgExtGroup<ISheet_LevelDefinition_Character>;
	/** 试炼头像对应表  ---  unique */
	readonly trail: CfgExt<ISheet_LevelDefinition_Trail>;
	/** 顺位分变动表  ---  group */
	readonly top_rank: CfgExtGroup<ISheet_LevelDefinition_TopRank>;
}

//#region level_definition
declare interface ISheet_LevelDefinition_LevelDefinition {
	readonly [key: string]: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10101: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10102: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10103: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10201: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10202: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10203: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10301: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10302: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10303: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10401: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10402: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10403: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10501: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10502: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10503: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10601: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10701: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10702: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10703: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10704: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10705: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10706: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10707: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10708: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10709: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10710: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10711: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10712: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10713: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10714: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10715: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10716: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10717: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10718: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10719: ISheetData_LevelDefinition_LevelDefinition;
	readonly 10720: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20101: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20102: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20103: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20201: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20202: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20203: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20301: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20302: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20303: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20401: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20402: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20403: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20501: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20502: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20503: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20601: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20701: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20702: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20703: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20704: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20705: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20706: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20707: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20708: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20709: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20710: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20711: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20712: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20713: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20714: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20715: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20716: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20717: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20718: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20719: ISheetData_LevelDefinition_LevelDefinition;
	readonly 20720: ISheetData_LevelDefinition_LevelDefinition;
}
declare interface ISheetData_LevelDefinition_LevelDefinition extends ISheetDataBase {
	readonly id: number;
	readonly type: number;
	readonly primary_level: number;
	readonly secondary_level: number;
	readonly init_point: number;
	readonly end_point: number;
	readonly primary_icon: string;
	readonly name_chs: string;
	readonly name_chs_t: string;
	readonly name_jp: string;
	readonly name_en: string;
	readonly name_kr: string;
	readonly full_name_chs: string;
	readonly full_name_chs_t: string;
	readonly full_name_jp: string;
	readonly full_name_en: string;
	readonly full_name_kr: string;
	readonly can_degrade: number;
	readonly can_upgrade: number;
	readonly can_getpoint: number;
	/** 东风场4位扣分 */
	readonly rankpt1: number;
	/** 南风场4位扣分 */
	readonly rankpt2: number;
	/** top_rank规则的id */
	readonly top_rank_id: number;
}
//#endregion

//#region character
declare interface ISheet_LevelDefinition_Character {
	readonly [key: string]: ISheetData_LevelDefinition_Character[];
	readonly 0: ISheetData_LevelDefinition_Character[];
	readonly 200052: ISheetData_LevelDefinition_Character[];
	readonly 200061: ISheetData_LevelDefinition_Character[];
	readonly 200076: ISheetData_LevelDefinition_Character[];
	readonly 200095: ISheetData_LevelDefinition_Character[];
	readonly 20000112: ISheetData_LevelDefinition_Character[];
	readonly 20000121: ISheetData_LevelDefinition_Character[];
}
declare interface ISheetData_LevelDefinition_Character extends ISheetDataBase {
	readonly level: number;
	readonly character_id: number;
	/** 经验槽 */
	readonly exp: number;
	/** 升级好感后的奖励道具 */
	readonly reward: string;
	/** 升级后说的话 */
	readonly unlock_says: number;
	/** 解锁时的描述 */
	readonly unlock_desc_chs: string;
	readonly unlock_desc_chs_t: string;
	readonly unlock_desc_jp: string;
	readonly unlock_desc_en: string;
	readonly unlock_desc_kr: string;
}
//#endregion

//#region trail
declare interface ISheet_LevelDefinition_Trail {
	readonly [key: string]: ISheetData_LevelDefinition_Trail;
	readonly 1: ISheetData_LevelDefinition_Trail;
	readonly 2: ISheetData_LevelDefinition_Trail;
	readonly 3: ISheetData_LevelDefinition_Trail;
	readonly 4: ISheetData_LevelDefinition_Trail;
	readonly 5: ISheetData_LevelDefinition_Trail;
	readonly 6: ISheetData_LevelDefinition_Trail;
	readonly 7: ISheetData_LevelDefinition_Trail;
	readonly 8: ISheetData_LevelDefinition_Trail;
	readonly 9: ISheetData_LevelDefinition_Trail;
	readonly 10: ISheetData_LevelDefinition_Trail;
	readonly 11: ISheetData_LevelDefinition_Trail;
	readonly 12: ISheetData_LevelDefinition_Trail;
	readonly 13: ISheetData_LevelDefinition_Trail;
}
declare interface ISheetData_LevelDefinition_Trail extends ISheetDataBase {
	readonly id: number;
	/** 初始等级 */
	readonly init_level: number;
	/** 截止等级 */
	readonly end_level: number;
	/** 图标 */
	readonly trail_icon: number;
	/** 火数 */
	readonly trail_fire: number;
}
//#endregion

//#region top_rank
declare interface ISheet_LevelDefinition_TopRank {
	readonly [key: string]: ISheetData_LevelDefinition_TopRank[];
	readonly 1001: ISheetData_LevelDefinition_TopRank[];
}
declare interface ISheetData_LevelDefinition_TopRank extends ISheetDataBase {
	readonly id: number;
	/** 第一名获得pt */
	readonly rank_pt: number[];
	/** 巅峰对决第一名 */
	readonly top_rank_pt: number[];
	readonly mode: number;
}
//#endregion