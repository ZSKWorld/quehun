/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Mmo {
	/** mmo活动信息  ---  unique */
	mmo_activity: CfgExt<ISheet_Mmo_MmoActivity>;
	/** mmo角色  ---  group */
	mmo_character: CfgExtGroup<ISheet_Mmo_MmoCharacter>;
	/** mmo敌人  ---  group */
	mmo_enemy: CfgExtGroup<ISheet_Mmo_MmoEnemy>;
	/** mmo装备  ---  group */
	mmo_equipment: CfgExtGroup<ISheet_Mmo_MmoEquipment>;
	/** mmo装备效果  ---  unique */
	mmo_equipment_buff: CfgExt<ISheet_Mmo_MmoEquipmentBuff>;
	/** mmo关卡  ---  group */
	mmo_level: CfgExtGroup<ISheet_Mmo_MmoLevel>;
	/** mmonpc  ---  group */
	mmo_npc: CfgExtGroup<ISheet_Mmo_MmoNpc>;
}

//#region mmo_activity
declare interface ISheet_Mmo_MmoActivity {
	[key: string]: ISheetData_Mmo_MmoActivity;
	260401: ISheetData_Mmo_MmoActivity;
}
declare interface ISheetData_Mmo_MmoActivity {
	/** 活动id */
	activity_id: number;
	/** 装备最大数量 */
	equipment_bag_max: number;
	/** 随机合成需要装备数量 */
	random_equipment_count: number;
	/** 指定合成需要的装备数量 */
	appoint_equipment_count: number;
}
//#endregion

//#region mmo_character
declare interface ISheet_Mmo_MmoCharacter {
	[key: string]: ISheetData_Mmo_MmoCharacter[];
	260401: ISheetData_Mmo_MmoCharacter[];
}
declare interface ISheetData_Mmo_MmoCharacter {
	/** 活动id */
	activity_id: number;
	/** 角色id */
	character_id: number;
	/** 基础生命值 */
	hp: number;
	/** 攻击力 */
	atk: number;
	/** 暴击率 */
	critical_rate: number;
	/** 暴击倍率 */
	critical_damage: number;
	/** 行动时间 */
	action_tick: number;
	/** 行动顺序 */
	action_seq: number;
	/** 专武类型 */
	weapon_type: number;
	/** 初始装备列表 */
	init_equipment: string;
	/** 职业名称 */
	job_name: number;
	/** 职业描述 */
	job_desc: number;
	/** spine名字 */
	res_name: string;
}
//#endregion

//#region mmo_enemy
declare interface ISheet_Mmo_MmoEnemy {
	[key: string]: ISheetData_Mmo_MmoEnemy[];
	260401: ISheetData_Mmo_MmoEnemy[];
}
declare interface ISheetData_Mmo_MmoEnemy {
	/** 活动id */
	activity_id: number;
	/** 敌人id */
	enemy_id: number;
	/** 生命值 */
	hp: number;
	/** 攻击力 */
	atk: number;
	/** 暴击率 */
	critical_rate: number;
	/** 暴击倍率 */
	critical_damage: number;
	/** 行动时间 */
	action_tick: number;
	/** 行动顺序，数字越小越先动 */
	action_seq: number;
	/** 装备列表 */
	equipment_list: string;
	/** spine名字 */
	res_name: string;
}
//#endregion

//#region mmo_equipment
declare interface ISheet_Mmo_MmoEquipment {
	[key: string]: ISheetData_Mmo_MmoEquipment[];
	260401: ISheetData_Mmo_MmoEquipment[];
}
declare interface ISheetData_Mmo_MmoEquipment {
	/** 活动id */
	activity_id: number;
	/** 对应function_item表的道具id */
	item_id: number;
	/** 装备类型 */
	type: number;
	/** 稀有度 */
	rarity: number;
	/** 攻击加固定值 */
	atk_fixed: number;
	/** 攻击加百分比 */
	atk_rate: number;
	/** 暴击率 */
	critical_rate: number;
	/** 暴击伤害加固定值 */
	critical_damage_fixed: number;
	/** 暴击伤害加百分比 */
	critical_damage_rate: number;
	/** 血量加固定值 */
	hp_fixed: number;
	/** 血量加百分比 */
	hp_rate: number;
	/** 治疗转化率 */
	heal_rate: number;
	/** 装备特殊效果 */
	buff_list: string;
	/** 战力值 */
	power: number;
	/** 皮肤部件前缀名 */
	attachment_pre_name: string;
}
//#endregion

//#region mmo_equipment_buff
declare interface ISheet_Mmo_MmoEquipmentBuff {
	[key: string]: ISheetData_Mmo_MmoEquipmentBuff;
	1001: ISheetData_Mmo_MmoEquipmentBuff;
	1002: ISheetData_Mmo_MmoEquipmentBuff;
	1003: ISheetData_Mmo_MmoEquipmentBuff;
	1004: ISheetData_Mmo_MmoEquipmentBuff;
	1005: ISheetData_Mmo_MmoEquipmentBuff;
}
declare interface ISheetData_Mmo_MmoEquipmentBuff {
	/** buffid */
	buff_id: number;
	/** buff类型 */
	type: number;
	/** 参数0 */
	args: number[];
	/** 装备效果描述 */
	equipment_buff_desc: number;
}
//#endregion

//#region mmo_level
declare interface ISheet_Mmo_MmoLevel {
	[key: string]: ISheetData_Mmo_MmoLevel[];
	260401: ISheetData_Mmo_MmoLevel[];
}
declare interface ISheetData_Mmo_MmoLevel {
	/** 活动id */
	activity_id: number;
	/** 关卡id */
	level_id: number;
	/** 下一关卡id */
	next_level: number;
	/** 敌人id */
	enemy_id: number;
	/** 奖励 */
	reward: string;
	/** 解锁日 */
	unlock_day: number;
	/** 闯关消耗 */
	consume: string;
	/** 倒计时 */
	total_tick: number;
	/** 人数上限 */
	team_max_count: number;
	/** 背景素材 */
	background: string;
}
//#endregion

//#region mmo_npc
declare interface ISheet_Mmo_MmoNpc {
	[key: string]: ISheetData_Mmo_MmoNpc[];
	260401: ISheetData_Mmo_MmoNpc[];
}
declare interface ISheetData_Mmo_MmoNpc {
	/** 活动id */
	activity_id: number;
	/** npcid */
	npc_id: number;
	/** 职业 */
	character_id: number;
	/** 装备列表 */
	equipment_list: string;
	/** 随机时段 */
	accessible_days: string;
	/** npc名称,str/event */
	npc_name: number;
}
//#endregion