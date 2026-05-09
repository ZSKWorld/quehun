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
	/** mmo-buff-保底机制  ---  group */
	mmo_buff_banned: CfgExtGroup<ISheet_Mmo_MmoBuffBanned>;
	/** mmo-buff-掉落升级机制  ---  group */
	mmo_buff_replace: CfgExtGroup<ISheet_Mmo_MmoBuffReplace>;
	/** mmo支援奖励  ---  group */
	mmo_support: CfgExtGroup<ISheet_Mmo_MmoSupport>;
	/** mmo各武器动画tick  ---  group */
	mmo_weapon_type: CfgExtGroup<ISheet_Mmo_MmoWeaponType>;
	/** mmo天赋战力  ---  group */
	mmo_team_talent: CfgExtGroup<ISheet_Mmo_MmoTeamTalent>;
}

//#region mmo_activity
declare interface ISheet_Mmo_MmoActivity {
	[key: string]: ISheetData_Mmo_MmoActivity;
	260401: ISheetData_Mmo_MmoActivity;
}
declare interface ISheetData_Mmo_MmoActivity extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 装备最大数量 */
	equipment_bag_max: number;
	/** 随机合成需要装备数量 */
	random_equipment_count: number;
	/** 指定合成需要的装备数量 */
	appoint_equipment_count: number;
	/** 初始关卡id */
	initial_level_id: number;
	/** 成功后几秒下一关 */
	next_level_time: number;
	/** 1秒多少tick */
	tick: number;
	/** 倒计时小于多少tick变红 */
	total_tick_red: number;
}
//#endregion

//#region mmo_character
declare interface ISheet_Mmo_MmoCharacter {
	[key: string]: ISheetData_Mmo_MmoCharacter[];
	260401: ISheetData_Mmo_MmoCharacter[];
}
declare interface ISheetData_Mmo_MmoCharacter extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 角色id */
	character_id: number;
	/** 基础生命值 */
	hp: number;
	/** 攻击力 */
	atk: number;
	/** 暴击率% */
	critical_rate: number;
	/** 暴击倍率% */
	critical_damage: number;
	/** 仇恨权重，优先攻击权重高的 */
	aggro: number;
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
declare interface ISheetData_Mmo_MmoEnemy extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 敌人id */
	enemy_id: number;
	/** 生命值 */
	hp: number;
	/** 攻击力 */
	atk: number;
	/** 暴击率% */
	critical_rate: number;
	/** 暴击倍率% */
	critical_damage: number;
	/** 行动顺序 */
	action_seq: number;
	/** spine名字 */
	res_name: string;
	/** 装备列表 */
	equipment_list: string;
}
//#endregion

//#region mmo_equipment
declare interface ISheet_Mmo_MmoEquipment {
	[key: string]: ISheetData_Mmo_MmoEquipment[];
	260401: ISheetData_Mmo_MmoEquipment[];
}
declare interface ISheetData_Mmo_MmoEquipment extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 对应function_item表的道具id */
	item_id: number;
	/** 装备类型 */
	type: number;
	/** 武器类型 */
	weapon_type_id: number;
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
	attachment_pre_name: string[];
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
declare interface ISheetData_Mmo_MmoEquipmentBuff extends ISheetDataBase {
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
declare interface ISheetData_Mmo_MmoLevel extends ISheetDataBase {
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
	/** 推荐战力 */
	recommend_power: number;
}
//#endregion

//#region mmo_npc
declare interface ISheet_Mmo_MmoNpc {
	[key: string]: ISheetData_Mmo_MmoNpc[];
	260401: ISheetData_Mmo_MmoNpc[];
}
declare interface ISheetData_Mmo_MmoNpc extends ISheetDataBase {
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

//#region mmo_buff_banned
declare interface ISheet_Mmo_MmoBuffBanned {
	[key: string]: ISheetData_Mmo_MmoBuffBanned[];
	101: ISheetData_Mmo_MmoBuffBanned[];
	102: ISheetData_Mmo_MmoBuffBanned[];
}
declare interface ISheetData_Mmo_MmoBuffBanned extends ISheetDataBase {
	id: number;
	/** 禁用的稀有度 */
	ban_rare: number;
}
//#endregion

//#region mmo_buff_replace
declare interface ISheet_Mmo_MmoBuffReplace {
	[key: string]: ISheetData_Mmo_MmoBuffReplace[];
	1001: ISheetData_Mmo_MmoBuffReplace[];
}
declare interface ISheetData_Mmo_MmoBuffReplace extends ISheetDataBase {
	id: number;
	/** 从物品id */
	item_id: number;
	/** 替换为物品id */
	replace_id: number;
}
//#endregion

//#region mmo_support
declare interface ISheet_Mmo_MmoSupport {
	[key: string]: ISheetData_Mmo_MmoSupport[];
	260401: ISheetData_Mmo_MmoSupport[];
}
declare interface ISheetData_Mmo_MmoSupport extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 支援数下限，闭区间 */
	support_count_range: number[];
	/** 奖励 */
	reward: string;
}
//#endregion

//#region mmo_weapon_type
declare interface ISheet_Mmo_MmoWeaponType {
	[key: string]: ISheetData_Mmo_MmoWeaponType[];
	260401: ISheetData_Mmo_MmoWeaponType[];
}
declare interface ISheetData_Mmo_MmoWeaponType extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 武器类型 */
	weapon_type_id: number;
	/** 攻击动画 */
	attack_tick: number;
	/** 攻击后摇 */
	attack_recovery_tick: number;
	/** 受击动画 */
	hit_tick: number;
	/** 移动动画 */
	move_tick: number;
	/** 移动回程动画 */
	back_tick: number;
	/** 治疗动画 */
	cure_tick: number;
	/** 治疗后摇 */
	cure_recovery_tick: number;
	/** 动画种类 */
	anim_type: number;
	/** 处理手持类型 */
	hand_type: number;
	/** 是否是反击攻击 */
	counter_attack: number;
	/** 攻击距离，0近战，1远程 */
	attack_distance: number;
	/** attack2目标挂点 */
	attack2_target: number;
	/** attack2攻击delay */
	attack2_tick: number;
	/** 受击位置 */
	hit_effect_param: string;
	/** 死亡特效 */
	die_effect_param: string;
	/** 死亡动画 */
	die_tick: number;
	/** spine名字 */
	res_name: string;
	/** 移动音效 */
	audio_move: string;
	/** 受击音效 */
	audio_hit: string;
	/** 倒地音效 */
	audio_down: string;
	/** 倒地延迟 */
	down_delay: number;
	/** 死亡消散 */
	audio_die: string;
	/** 攻击音效lv0 */
	audio_attack_lv0: string;
	/** 攻击音效lv0延迟 */
	attack_lv0_delay: number;
	/** 攻击音效lv1 */
	audio_attack_lv1: string;
	/** 攻击音效lv1延迟 */
	attack_lv1_delay: number;
	/** 攻击音效lv2 */
	audio_attack_lv2: string;
	/** 攻击音效lv1延迟 */
	attack_lv2_delay: number;
	/** 攻击音效lv3 */
	audio_attack_lv3: string;
	/** 攻击音效lv1延迟 */
	attack_lv3_delay: number;
	/** 治疗音效 */
	audio_heal: string;
	/** 移动音效 */
	audio_move_speed2: string;
	/** 受击音效 */
	audio_hit_speed2: string;
	/** 倒地音效 */
	audio_down_speed2: string;
	/** 死亡消散 */
	audio_die_speed2: string;
	/** 攻击音效lv0_倍速2 */
	audio_attack_lv0_speed2: string;
	/** 攻击音效lv1_倍速2 */
	audio_attack_lv1_speed2: string;
	/** 攻击音效lv2_倍速2 */
	audio_attack_lv2_speed2: string;
	/** 攻击音效lv3_倍速2 */
	audio_attack_lv3_speed2: string;
	/** 治疗音效 */
	audio_heal_speed2: string;
}
//#endregion

//#region mmo_team_talent
declare interface ISheet_Mmo_MmoTeamTalent {
	[key: string]: ISheetData_Mmo_MmoTeamTalent[];
	260404: ISheetData_Mmo_MmoTeamTalent[];
}
declare interface ISheetData_Mmo_MmoTeamTalent extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** buffid */
	buff_id: number;
	/** buff等级 */
	buff_level: number;
	/** 武器类型id */
	weapon_type_id: string;
	/** 战力值 */
	power: number;
}
//#endregion