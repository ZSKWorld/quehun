/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Snowball {
	/** 打雪仗活动信息  ---  unique */
	snowball_activity: CfgExt<ISheet_Snowball_SnowballActivity>;
	/** 打雪仗攻击模组  ---  group */
	snowball_attack_group: CfgExtGroup<ISheet_Snowball_SnowballAttackGroup>;
	/** 打雪仗怪物池  ---  group */
	snowball_monster_group: CfgExtGroup<ISheet_Snowball_SnowballMonsterGroup>;
	/** 打雪仗buff-玩家  ---  group */
	player_snowball_buff: CfgExtGroup<ISheet_Snowball_PlayerSnowballBuff>;
	/** 打雪仗buff-怪物  ---  group */
	monster_snowball_buff: CfgExtGroup<ISheet_Snowball_MonsterSnowballBuff>;
	/** 打雪仗等级  ---  unique */
	snowball_attack_level: CfgExt<ISheet_Snowball_SnowballAttackLevel>;
}

//#region snowball_activity
declare interface ISheet_Snowball_SnowballActivity {
	[key: string]: ISheetData_Snowball_SnowballActivity;
	251201: ISheetData_Snowball_SnowballActivity;
}
declare interface ISheetData_Snowball_SnowballActivity extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 怪物组 */
	monster_group: number;
	/** 玩家基础攻击模组 */
	player_attack_group: number;
	/** 敌人基础攻击模组 */
	monster_attack_group: number;
	/** 玩家/怪基础血量 */
	hp: number;
	/** 玩家/怪基础蓝量 */
	mp: number;
	/** 玩家暴击率百分比 */
	player_luk: number;
	/** 玩家暴击倍率 */
	critical_hit: number;
	/** 蓝量恢复（tick） */
	mp_recover: number;
	/** 一秒多少tick */
	tick: number;
	/** 玩家素材 */
	player_id: string;
	/** 技能升级道具 */
	skill_item: number;
	/** 连续攻击时的雪球间隔（tick） */
	attack_interval: number;
	/** 玩家攻击前摇 */
	player_attack_delay: number;
	/** 玩家身高 */
	player_height: number;
	/** 玩家进场音效 */
	audio_enter: string;
	/** 玩家受击音效 */
	audio_hit: string;
	/** 玩家胜利音效 */
	audio_win: string;
	/** 玩家失败音效 */
	audio_die: string;
}
//#endregion

//#region snowball_attack_group
declare interface ISheet_Snowball_SnowballAttackGroup {
	[key: string]: ISheetData_Snowball_SnowballAttackGroup[];
	251201: ISheetData_Snowball_SnowballAttackGroup[];
	251202: ISheetData_Snowball_SnowballAttackGroup[];
}
declare interface ISheetData_Snowball_SnowballAttackGroup extends ISheetDataBase {
	group_id: number;
	/** 弹道0下、1中、2上 */
	track: number;
	/** 弹道飞行时间（tick） */
	flight_time: number;
	/** 攻击力 */
	atk: number;
	/** 蓝量消耗 */
	mp_consume: number;
	/** cd时间（tick） */
	cd: number;
	/** 雪球名 */
	snowball_name_str: number;
}
//#endregion

//#region snowball_monster_group
declare interface ISheet_Snowball_SnowballMonsterGroup {
	[key: string]: ISheetData_Snowball_SnowballMonsterGroup[];
	2512001: ISheetData_Snowball_SnowballMonsterGroup[];
}
declare interface ISheetData_Snowball_SnowballMonsterGroup extends ISheetDataBase {
	group_id: number;
	/** 关卡 */
	level: number;
	/** 下一关卡 */
	next_level: number;
	/** 怪类型 */
	type: number;
	/** 关卡名 */
	chapters: string;
	/** 关卡奖励 */
	reward: string;
	/** 0普通1突出 */
	node_mark: number;
	/** 敌人素材 */
	boss_id: string;
	/** 对应str/event */
	name_str_id: number;
	/** 回合时长（tick） */
	round_time: number;
	/** 解锁日期 */
	unlock_day: number;
	/** 入场前摇 */
	enter_delay: number;
	/** 攻击前摇 */
	attack_delay: number;
	/** 怪物身高 */
	monster_height: number;
	/** 死亡特效偏移 */
	dead_offset: number;
	/** 进场音效 */
	audio_enter: string;
	/** 受击音效 */
	audio_hit: string;
	/** 胜利音效 */
	audio_win: string;
	/** 失败音效 */
	audio_die: string;
}
//#endregion

//#region player_snowball_buff
declare interface ISheet_Snowball_PlayerSnowballBuff {
	[key: string]: ISheetData_Snowball_PlayerSnowballBuff[];
	251201: ISheetData_Snowball_PlayerSnowballBuff[];
}
declare interface ISheetData_Snowball_PlayerSnowballBuff extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** buffid */
	buff_id: number;
	/** 等级 */
	level: number;
	/** 下一等级 */
	next_level_id: number;
	/** 下0中1上2血量3 */
	type: number;
	/** 血量增加的值，上中下雪球填attack_level_id */
	effect: number;
	/** 解锁关卡 */
	unlock: number;
	/** 自动获得 */
	auto: number;
	/** 升到该级价格 */
	price: number;
}
//#endregion

//#region monster_snowball_buff
declare interface ISheet_Snowball_MonsterSnowballBuff {
	[key: string]: ISheetData_Snowball_MonsterSnowballBuff[];
	251201: ISheetData_Snowball_MonsterSnowballBuff[];
}
declare interface ISheetData_Snowball_MonsterSnowballBuff extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
}
//#endregion

//#region snowball_attack_level
declare interface ISheet_Snowball_SnowballAttackLevel {
	[key: string]: ISheetData_Snowball_SnowballAttackLevel;
	2512011: ISheetData_Snowball_SnowballAttackLevel;
	2512012: ISheetData_Snowball_SnowballAttackLevel;
	2512013: ISheetData_Snowball_SnowballAttackLevel;
	2512014: ISheetData_Snowball_SnowballAttackLevel;
	2512021: ISheetData_Snowball_SnowballAttackLevel;
	2512022: ISheetData_Snowball_SnowballAttackLevel;
	2512023: ISheetData_Snowball_SnowballAttackLevel;
	2512024: ISheetData_Snowball_SnowballAttackLevel;
	2512031: ISheetData_Snowball_SnowballAttackLevel;
	2512032: ISheetData_Snowball_SnowballAttackLevel;
	2512033: ISheetData_Snowball_SnowballAttackLevel;
	2512034: ISheetData_Snowball_SnowballAttackLevel;
}
declare interface ISheetData_Snowball_SnowballAttackLevel extends ISheetDataBase {
	attack_level_id: number;
	/** 单次投掷额外增加数 */
	snowball_count: number;
	/** 蓝量消耗减少 */
	mp_buff: number;
	/** 冷却减少 */
	cd_buff: number;
}
//#endregion