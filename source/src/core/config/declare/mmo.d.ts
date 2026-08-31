/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Mmo {
	/** mmo活动信息  ---  unique */
	readonly mmo_activity: CfgExt<ISheet_Mmo_MmoActivity>;
	/** mmo角色  ---  group */
	readonly mmo_character: CfgExtGroup<ISheet_Mmo_MmoCharacter>;
	/** mmo敌人  ---  group */
	readonly mmo_enemy: CfgExtGroup<ISheet_Mmo_MmoEnemy>;
	/** mmo装备  ---  group */
	readonly mmo_equipment: CfgExtGroup<ISheet_Mmo_MmoEquipment>;
	/** mmo装备效果  ---  unique */
	readonly mmo_equipment_buff: CfgExt<ISheet_Mmo_MmoEquipmentBuff>;
	/** mmo关卡  ---  group */
	readonly mmo_level: CfgExtGroup<ISheet_Mmo_MmoLevel>;
	/** mmonpc  ---  group */
	readonly mmo_npc: CfgExtGroup<ISheet_Mmo_MmoNpc>;
	/** mmo-buff-保底机制  ---  group */
	readonly mmo_buff_banned: CfgExtGroup<ISheet_Mmo_MmoBuffBanned>;
	/** mmo-buff-掉落升级机制  ---  group */
	readonly mmo_buff_replace: CfgExtGroup<ISheet_Mmo_MmoBuffReplace>;
	/** mmo支援奖励  ---  group */
	readonly mmo_support: CfgExtGroup<ISheet_Mmo_MmoSupport>;
	/** mmo各武器动画tick  ---  group */
	readonly mmo_weapon_type: CfgExtGroup<ISheet_Mmo_MmoWeaponType>;
	/** mmo天赋战力  ---  group */
	readonly mmo_team_talent: CfgExtGroup<ISheet_Mmo_MmoTeamTalent>;
}

//#region mmo_activity
declare interface ISheet_Mmo_MmoActivity {
	readonly [key: string]: ISheetData_Mmo_MmoActivity;
	readonly 260401: ISheetData_Mmo_MmoActivity;
}
declare interface ISheetData_Mmo_MmoActivity extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 装备最大数量 */
	readonly equipment_bag_max: number;
	/** 随机合成需要装备数量 */
	readonly random_equipment_count: number;
	/** 指定合成需要的装备数量 */
	readonly appoint_equipment_count: number;
	/** 初始关卡id */
	readonly initial_level_id: number;
	/** 成功后几秒下一关 */
	readonly next_level_time: number;
	/** 1秒多少tick */
	readonly tick: number;
	/** 倒计时小于多少tick变红 */
	readonly total_tick_red: number;
}
//#endregion

//#region mmo_character
declare interface ISheet_Mmo_MmoCharacter {
	readonly [key: string]: ISheetData_Mmo_MmoCharacter[];
	readonly 260401: ISheetData_Mmo_MmoCharacter[];
}
declare interface ISheetData_Mmo_MmoCharacter extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 角色id */
	readonly character_id: number;
	/** 基础生命值 */
	readonly hp: number;
	/** 攻击力 */
	readonly atk: number;
	/** 暴击率% */
	readonly critical_rate: number;
	/** 暴击倍率% */
	readonly critical_damage: number;
	/** 仇恨权重，优先攻击权重高的 */
	readonly aggro: number;
	/** 行动顺序 */
	readonly action_seq: number;
	/** 专武类型 */
	readonly weapon_type: number;
	/** 初始装备列表 */
	readonly init_equipment: string;
	/** 职业名称 */
	readonly job_name: number;
	/** 职业描述 */
	readonly job_desc: number;
	/** spine名字 */
	readonly res_name: string;
}
//#endregion

//#region mmo_enemy
declare interface ISheet_Mmo_MmoEnemy {
	readonly [key: string]: ISheetData_Mmo_MmoEnemy[];
	readonly 260401: ISheetData_Mmo_MmoEnemy[];
}
declare interface ISheetData_Mmo_MmoEnemy extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 敌人id */
	readonly enemy_id: number;
	/** 生命值 */
	readonly hp: number;
	/** 攻击力 */
	readonly atk: number;
	/** 暴击率% */
	readonly critical_rate: number;
	/** 暴击倍率% */
	readonly critical_damage: number;
	/** 行动顺序 */
	readonly action_seq: number;
	/** spine名字 */
	readonly res_name: string;
	/** 装备列表 */
	readonly equipment_list: string;
}
//#endregion

//#region mmo_equipment
declare interface ISheet_Mmo_MmoEquipment {
	readonly [key: string]: ISheetData_Mmo_MmoEquipment[];
	readonly 260401: ISheetData_Mmo_MmoEquipment[];
}
declare interface ISheetData_Mmo_MmoEquipment extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 对应function_item表的道具id */
	readonly item_id: number;
	/** 装备类型 */
	readonly type: number;
	/** 武器类型 */
	readonly weapon_type_id: number;
	/** 稀有度 */
	readonly rarity: number;
	/** 攻击加固定值 */
	readonly atk_fixed: number;
	/** 攻击加百分比 */
	readonly atk_rate: number;
	/** 暴击率 */
	readonly critical_rate: number;
	/** 暴击伤害加固定值 */
	readonly critical_damage_fixed: number;
	/** 暴击伤害加百分比 */
	readonly critical_damage_rate: number;
	/** 血量加固定值 */
	readonly hp_fixed: number;
	/** 血量加百分比 */
	readonly hp_rate: number;
	/** 治疗转化率 */
	readonly heal_rate: number;
	/** 装备特殊效果 */
	readonly buff_list: string;
	/** 战力值 */
	readonly power: number;
	/** 皮肤部件前缀名 */
	readonly attachment_pre_name: string[];
}
//#endregion

//#region mmo_equipment_buff
declare interface ISheet_Mmo_MmoEquipmentBuff {
	readonly [key: string]: ISheetData_Mmo_MmoEquipmentBuff;
	readonly 1001: ISheetData_Mmo_MmoEquipmentBuff;
	readonly 1002: ISheetData_Mmo_MmoEquipmentBuff;
	readonly 1003: ISheetData_Mmo_MmoEquipmentBuff;
	readonly 1004: ISheetData_Mmo_MmoEquipmentBuff;
	readonly 1005: ISheetData_Mmo_MmoEquipmentBuff;
}
declare interface ISheetData_Mmo_MmoEquipmentBuff extends ISheetDataBase {
	/** buffid */
	readonly buff_id: number;
	/** buff类型 */
	readonly type: number;
	/** 参数0 */
	readonly args: number[];
	/** 装备效果描述 */
	readonly equipment_buff_desc: number;
}
//#endregion

//#region mmo_level
declare interface ISheet_Mmo_MmoLevel {
	readonly [key: string]: ISheetData_Mmo_MmoLevel[];
	readonly 260401: ISheetData_Mmo_MmoLevel[];
}
declare interface ISheetData_Mmo_MmoLevel extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 关卡id */
	readonly level_id: number;
	/** 下一关卡id */
	readonly next_level: number;
	/** 敌人id */
	readonly enemy_id: number;
	/** 奖励 */
	readonly reward: string;
	/** 解锁日 */
	readonly unlock_day: number;
	/** 闯关消耗 */
	readonly consume: string;
	/** 倒计时 */
	readonly total_tick: number;
	/** 人数上限 */
	readonly team_max_count: number;
	/** 背景素材 */
	readonly background: string;
	/** 推荐战力 */
	readonly recommend_power: number;
}
//#endregion

//#region mmo_npc
declare interface ISheet_Mmo_MmoNpc {
	readonly [key: string]: ISheetData_Mmo_MmoNpc[];
	readonly 260401: ISheetData_Mmo_MmoNpc[];
}
declare interface ISheetData_Mmo_MmoNpc extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** npcid */
	readonly npc_id: number;
	/** 职业 */
	readonly character_id: number;
	/** 装备列表 */
	readonly equipment_list: string;
	/** 随机时段 */
	readonly accessible_days: string;
	/** npc名称,str/event */
	readonly npc_name: number;
}
//#endregion

//#region mmo_buff_banned
declare interface ISheet_Mmo_MmoBuffBanned {
	readonly [key: string]: ISheetData_Mmo_MmoBuffBanned[];
	readonly 101: ISheetData_Mmo_MmoBuffBanned[];
	readonly 102: ISheetData_Mmo_MmoBuffBanned[];
}
declare interface ISheetData_Mmo_MmoBuffBanned extends ISheetDataBase {
	readonly id: number;
	/** 禁用的稀有度 */
	readonly ban_rare: number;
}
//#endregion

//#region mmo_buff_replace
declare interface ISheet_Mmo_MmoBuffReplace {
	readonly [key: string]: ISheetData_Mmo_MmoBuffReplace[];
	readonly 1001: ISheetData_Mmo_MmoBuffReplace[];
}
declare interface ISheetData_Mmo_MmoBuffReplace extends ISheetDataBase {
	readonly id: number;
	/** 从物品id */
	readonly item_id: number;
	/** 替换为物品id */
	readonly replace_id: number;
}
//#endregion

//#region mmo_support
declare interface ISheet_Mmo_MmoSupport {
	readonly [key: string]: ISheetData_Mmo_MmoSupport[];
	readonly 260401: ISheetData_Mmo_MmoSupport[];
}
declare interface ISheetData_Mmo_MmoSupport extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 支援数下限，闭区间 */
	readonly support_count_range: number[];
	/** 奖励 */
	readonly reward: string;
}
//#endregion

//#region mmo_weapon_type
declare interface ISheet_Mmo_MmoWeaponType {
	readonly [key: string]: ISheetData_Mmo_MmoWeaponType[];
	readonly 260401: ISheetData_Mmo_MmoWeaponType[];
}
declare interface ISheetData_Mmo_MmoWeaponType extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 武器类型 */
	readonly weapon_type_id: number;
	/** 攻击动画 */
	readonly attack_tick: number;
	/** 攻击后摇 */
	readonly attack_recovery_tick: number;
	/** 受击动画 */
	readonly hit_tick: number;
	/** 移动动画 */
	readonly move_tick: number;
	/** 移动回程动画 */
	readonly back_tick: number;
	/** 治疗动画 */
	readonly cure_tick: number;
	/** 治疗后摇 */
	readonly cure_recovery_tick: number;
	/** 动画种类 */
	readonly anim_type: number;
	/** 处理手持类型 */
	readonly hand_type: number;
	/** 是否是反击攻击 */
	readonly counter_attack: number;
	/** 攻击距离，0近战，1远程 */
	readonly attack_distance: number;
	/** attack2目标挂点 */
	readonly attack2_target: number;
	/** attack2攻击delay */
	readonly attack2_tick: number;
	/** 受击位置 */
	readonly hit_effect_param: string;
	/** 死亡特效 */
	readonly die_effect_param: string;
	/** 死亡动画 */
	readonly die_tick: number;
	/** spine名字 */
	readonly res_name: string;
	/** 移动音效 */
	readonly audio_move: string;
	/** 受击音效 */
	readonly audio_hit: string;
	/** 倒地音效 */
	readonly audio_down: string;
	/** 倒地延迟 */
	readonly down_delay: number;
	/** 死亡消散 */
	readonly audio_die: string;
	/** 攻击音效lv0 */
	readonly audio_attack_lv0: string;
	/** 攻击音效lv0延迟 */
	readonly attack_lv0_delay: number;
	/** 攻击音效lv1 */
	readonly audio_attack_lv1: string;
	/** 攻击音效lv1延迟 */
	readonly attack_lv1_delay: number;
	/** 攻击音效lv2 */
	readonly audio_attack_lv2: string;
	/** 攻击音效lv1延迟 */
	readonly attack_lv2_delay: number;
	/** 攻击音效lv3 */
	readonly audio_attack_lv3: string;
	/** 攻击音效lv1延迟 */
	readonly attack_lv3_delay: number;
	/** 治疗音效 */
	readonly audio_heal: string;
	/** 移动音效 */
	readonly audio_move_speed2: string;
	/** 受击音效 */
	readonly audio_hit_speed2: string;
	/** 倒地音效 */
	readonly audio_down_speed2: string;
	/** 死亡消散 */
	readonly audio_die_speed2: string;
	/** 攻击音效lv0_倍速2 */
	readonly audio_attack_lv0_speed2: string;
	/** 攻击音效lv1_倍速2 */
	readonly audio_attack_lv1_speed2: string;
	/** 攻击音效lv2_倍速2 */
	readonly audio_attack_lv2_speed2: string;
	/** 攻击音效lv3_倍速2 */
	readonly audio_attack_lv3_speed2: string;
	/** 治疗音效 */
	readonly audio_heal_speed2: string;
}
//#endregion

//#region mmo_team_talent
declare interface ISheet_Mmo_MmoTeamTalent {
	readonly [key: string]: ISheetData_Mmo_MmoTeamTalent[];
	readonly 260404: ISheetData_Mmo_MmoTeamTalent[];
}
declare interface ISheetData_Mmo_MmoTeamTalent extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** buffid */
	readonly buff_id: number;
	/** buff等级 */
	readonly buff_level: number;
	/** 武器类型id */
	readonly weapon_type_id: string;
	/** 战力值 */
	readonly power: number;
}
//#endregion