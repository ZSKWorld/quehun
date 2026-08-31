/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Snowball {
	/** 打雪仗活动信息  ---  unique */
	readonly snowball_activity: CfgExt<ISheet_Snowball_SnowballActivity>;
	/** 打雪仗攻击模组  ---  group */
	readonly snowball_attack_group: CfgExtGroup<ISheet_Snowball_SnowballAttackGroup>;
	/** 打雪仗怪物池  ---  group */
	readonly snowball_monster_group: CfgExtGroup<ISheet_Snowball_SnowballMonsterGroup>;
	/** 打雪仗buff-玩家  ---  group */
	readonly player_snowball_buff: CfgExtGroup<ISheet_Snowball_PlayerSnowballBuff>;
	/** 打雪仗buff-怪物  ---  group */
	readonly monster_snowball_buff: CfgExtGroup<ISheet_Snowball_MonsterSnowballBuff>;
	/** 打雪仗等级  ---  unique */
	readonly snowball_attack_level: CfgExt<ISheet_Snowball_SnowballAttackLevel>;
}

//#region snowball_activity
declare interface ISheet_Snowball_SnowballActivity {
	readonly [key: string]: ISheetData_Snowball_SnowballActivity;
	readonly 251201: ISheetData_Snowball_SnowballActivity;
}
declare interface ISheetData_Snowball_SnowballActivity extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 怪物组 */
	readonly monster_group: number;
	/** 玩家基础攻击模组 */
	readonly player_attack_group: number;
	/** 敌人基础攻击模组 */
	readonly monster_attack_group: number;
	/** 玩家/怪基础血量 */
	readonly hp: number;
	/** 玩家/怪基础蓝量 */
	readonly mp: number;
	/** 玩家暴击率百分比 */
	readonly player_luk: number;
	/** 玩家暴击倍率 */
	readonly critical_hit: number;
	/** 蓝量恢复（tick） */
	readonly mp_recover: number;
	/** 一秒多少tick */
	readonly tick: number;
	/** 玩家素材 */
	readonly player_id: string;
	/** 技能升级道具 */
	readonly skill_item: number;
	/** 连续攻击时的雪球间隔（tick） */
	readonly attack_interval: number;
	/** 玩家攻击前摇 */
	readonly player_attack_delay: number;
	/** 玩家身高 */
	readonly player_height: number;
	/** 玩家进场音效 */
	readonly audio_enter: string;
	/** 玩家受击音效 */
	readonly audio_hit: string;
	/** 玩家胜利音效 */
	readonly audio_win: string;
	/** 玩家失败音效 */
	readonly audio_die: string;
}
//#endregion

//#region snowball_attack_group
declare interface ISheet_Snowball_SnowballAttackGroup {
	readonly [key: string]: ISheetData_Snowball_SnowballAttackGroup[];
	readonly 251201: ISheetData_Snowball_SnowballAttackGroup[];
	readonly 251202: ISheetData_Snowball_SnowballAttackGroup[];
}
declare interface ISheetData_Snowball_SnowballAttackGroup extends ISheetDataBase {
	readonly group_id: number;
	/** 弹道0下、1中、2上 */
	readonly track: number;
	/** 弹道飞行时间（tick） */
	readonly flight_time: number;
	/** 攻击力 */
	readonly atk: number;
	/** 蓝量消耗 */
	readonly mp_consume: number;
	/** cd时间（tick） */
	readonly cd: number;
	/** 雪球名 */
	readonly snowball_name_str: number;
}
//#endregion

//#region snowball_monster_group
declare interface ISheet_Snowball_SnowballMonsterGroup {
	readonly [key: string]: ISheetData_Snowball_SnowballMonsterGroup[];
	readonly 2512001: ISheetData_Snowball_SnowballMonsterGroup[];
}
declare interface ISheetData_Snowball_SnowballMonsterGroup extends ISheetDataBase {
	readonly group_id: number;
	/** 关卡 */
	readonly level: number;
	/** 下一关卡 */
	readonly next_level: number;
	/** 怪类型 */
	readonly type: number;
	/** 关卡名 */
	readonly chapters: string;
	/** 关卡奖励 */
	readonly reward: string;
	/** 0普通1突出 */
	readonly node_mark: number;
	/** 敌人素材 */
	readonly boss_id: string;
	/** 对应str/event */
	readonly name_str_id: number;
	/** 回合时长（tick） */
	readonly round_time: number;
	/** 解锁日期 */
	readonly unlock_day: number;
	/** 入场前摇 */
	readonly enter_delay: number;
	/** 攻击前摇 */
	readonly attack_delay: number;
	/** 怪物身高 */
	readonly monster_height: number;
	/** 死亡特效偏移 */
	readonly dead_offset: number;
	/** 进场音效 */
	readonly audio_enter: string;
	/** 受击音效 */
	readonly audio_hit: string;
	/** 胜利音效 */
	readonly audio_win: string;
	/** 失败音效 */
	readonly audio_die: string;
}
//#endregion

//#region player_snowball_buff
declare interface ISheet_Snowball_PlayerSnowballBuff {
	readonly [key: string]: ISheetData_Snowball_PlayerSnowballBuff[];
	readonly 251201: ISheetData_Snowball_PlayerSnowballBuff[];
}
declare interface ISheetData_Snowball_PlayerSnowballBuff extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** buffid */
	readonly buff_id: number;
	/** 等级 */
	readonly level: number;
	/** 下一等级 */
	readonly next_level_id: number;
	/** 下0中1上2血量3 */
	readonly type: number;
	/** 血量增加的值，上中下雪球填attack_level_id */
	readonly effect: number;
	/** 解锁关卡 */
	readonly unlock: number;
	/** 自动获得 */
	readonly auto: number;
	/** 升到该级价格 */
	readonly price: number;
}
//#endregion

//#region monster_snowball_buff
declare interface ISheet_Snowball_MonsterSnowballBuff {
	readonly [key: string]: ISheetData_Snowball_MonsterSnowballBuff[];
	readonly 251201: ISheetData_Snowball_MonsterSnowballBuff[];
}
declare interface ISheetData_Snowball_MonsterSnowballBuff extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
}
//#endregion

//#region snowball_attack_level
declare interface ISheet_Snowball_SnowballAttackLevel {
	readonly [key: string]: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512011: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512012: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512013: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512014: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512021: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512022: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512023: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512024: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512031: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512032: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512033: ISheetData_Snowball_SnowballAttackLevel;
	readonly 2512034: ISheetData_Snowball_SnowballAttackLevel;
}
declare interface ISheetData_Snowball_SnowballAttackLevel extends ISheetDataBase {
	readonly attack_level_id: number;
	/** 单次投掷额外增加数 */
	readonly snowball_count: number;
	/** 蓝量消耗减少 */
	readonly mp_buff: number;
	/** 冷却减少 */
	readonly cd_buff: number;
}
//#endregion