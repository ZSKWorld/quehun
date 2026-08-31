/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Club {
	/** 初始化状态  ---  unique */
	readonly club_info: CfgExt<ISheet_Club_ClubInfo>;
	/** 等待区升级  ---  group */
	readonly club_wait_zone_upgrade: CfgExtGroup<ISheet_Club_ClubWaitZoneUpgrade>;
	/** 店员配置  ---  group */
	readonly club_character: CfgExtGroup<ISheet_Club_ClubCharacter>;
	/** 店员技能  ---  unique */
	readonly club_character_skill: CfgExt<ISheet_Club_ClubCharacterSkill>;
	/** 关卡配置  ---  group */
	readonly club_level: CfgExtGroup<ISheet_Club_ClubLevel>;
	/** 关卡时刻表配置  ---  group */
	readonly club_level_schedule: CfgExtGroup<ISheet_Club_ClubLevelSchedule>;
	/** 顾客配置  ---  unique */
	readonly club_customer: CfgExt<ISheet_Club_ClubCustomer>;
	/** 顾客效果配置  ---  unique */
	readonly club_customer_skill: CfgExt<ISheet_Club_ClubCustomerSkill>;
	/** 关卡顾客刷新池配置  ---  unique */
	readonly club_customer_pool: CfgExt<ISheet_Club_ClubCustomerPool>;
	/** 突发事件  ---  unique */
	readonly club_event: CfgExt<ISheet_Club_ClubEvent>;
	/** 突发事件效果  ---  unique */
	readonly club_event_effect: CfgExt<ISheet_Club_ClubEventEffect>;
	/** 突发事件番数  ---  unique */
	readonly club_event_fan: CfgExt<ISheet_Club_ClubEventFan>;
	/** 顾客心情  ---  unique */
	readonly club_emoji: CfgExt<ISheet_Club_ClubEmoji>;
	/** 标签配置  ---  unique */
	readonly club_tag: CfgExt<ISheet_Club_ClubTag>;
	/** 小费显示配置  ---  unique */
	readonly club_tip: CfgExt<ISheet_Club_ClubTip>;
	/** 房间配置  ---  group */
	readonly club_room: CfgExtGroup<ISheet_Club_ClubRoom>;
	/** 桌台费升级  ---  group */
	readonly club_desktop_fee_upgrade: CfgExtGroup<ISheet_Club_ClubDesktopFeeUpgrade>;
	/** 桌台数量升级  ---  group */
	readonly club_desktop_count_upgrade: CfgExtGroup<ISheet_Club_ClubDesktopCountUpgrade>;
}

//#region club_info
declare interface ISheet_Club_ClubInfo {
	readonly [key: string]: ISheetData_Club_ClubInfo;
	readonly 260801: ISheetData_Club_ClubInfo;
}
declare interface ISheetData_Club_ClubInfo extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 初始待客区时间 */
	readonly init_wait_time: number;
	/** 待客区升级id */
	readonly wait_zone_upgrade: number;
	/** 初始关卡等级 */
	readonly init_level: number;
	/** 心情波动下界(闭) */
	readonly init_moodmin: number;
	/** 心情波动上界(闭) */
	readonly init_moodmax: number;
	/** 标签导致的心情波动值 */
	readonly tag_mood: number;
	/** 游戏分钟对应现实时间（ticks） */
	readonly ticks_per_minute: number;
	/** 基础对局时长 */
	readonly init_battle_time: number;
	/** 最少对局时长 */
	readonly battle_time_min: number;
	/** 单轮游戏总时长 */
	readonly game_total_time: number;
	/** 停止进客时间 */
	readonly game_hurry_time: number;
	/** 心情判断时间间隔 */
	readonly mood_judge_time: number;
	/** 突发事件判断时间间隔 */
	readonly event_judge_time: number;
	/** 小费消失时间 */
	readonly tip_disappear_time: number;
	/** 突发事件判断概率（百分比） */
	readonly event_rate: number;
	/** 听牌问答听牌概率（百分比） */
	readonly tenpai_rate: number;
	/** 距离结束前不再发生事件的时间 */
	readonly event_idle_time: number;
}
//#endregion

//#region club_wait_zone_upgrade
declare interface ISheet_Club_ClubWaitZoneUpgrade {
	readonly [key: string]: ISheetData_Club_ClubWaitZoneUpgrade[];
	readonly 1001: ISheetData_Club_ClubWaitZoneUpgrade[];
}
declare interface ISheetData_Club_ClubWaitZoneUpgrade extends ISheetDataBase {
	readonly id: number;
	/** 等级 */
	readonly level: number;
	/** 额外等待时间 */
	readonly additional_wait_time: number;
	/** 对应数值 */
	readonly display_value: number;
	/** 升级价格 */
	readonly price: string;
}
//#endregion

//#region club_character
declare interface ISheet_Club_ClubCharacter {
	readonly [key: string]: ISheetData_Club_ClubCharacter[];
	readonly 260801: ISheetData_Club_ClubCharacter[];
}
declare interface ISheetData_Club_ClubCharacter extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 店员id */
	readonly id: number;
	/** 对应角色id */
	readonly name: number;
	/** 店员图标 */
	readonly icon: string;
	/** 店员图 */
	readonly image: string;
	/** 对应任务id */
	readonly period_task_id: number;
	/** 初始是否解锁，0-初始解锁，1-初始不解锁 */
	readonly init_locked: number;
	/** 雀力 */
	readonly power: number;
	/** 初始标签 */
	readonly init_tags: number[];
	/** 升级解锁标签 */
	readonly locked_tags: number[];
	/** 特殊技能 */
	readonly skills: number[];
	/** 技能名str/event */
	readonly skill_name: number;
	/** 技能描述str/event */
	readonly skill_desc: number;
	/** 雀力升级增长雀力 */
	readonly power_upgrade: number;
	/** 雀力升级价格 */
	readonly power_upgrade_price: string;
	/** 标签解锁价格 */
	readonly tag_upgrade_price: string;
	/** 最大雀力 */
	readonly max_power: number;
}
//#endregion

//#region club_character_skill
declare interface ISheet_Club_ClubCharacterSkill {
	readonly [key: string]: ISheetData_Club_ClubCharacterSkill;
	readonly 30011: ISheetData_Club_ClubCharacterSkill;
	readonly 30021: ISheetData_Club_ClubCharacterSkill;
	readonly 30031: ISheetData_Club_ClubCharacterSkill;
	readonly 30041: ISheetData_Club_ClubCharacterSkill;
	readonly 30051: ISheetData_Club_ClubCharacterSkill;
	readonly 30061: ISheetData_Club_ClubCharacterSkill;
	readonly 30071: ISheetData_Club_ClubCharacterSkill;
	readonly 30081: ISheetData_Club_ClubCharacterSkill;
	readonly 30091: ISheetData_Club_ClubCharacterSkill;
	readonly 30101: ISheetData_Club_ClubCharacterSkill;
	readonly 30111: ISheetData_Club_ClubCharacterSkill;
	readonly 30121: ISheetData_Club_ClubCharacterSkill;
	readonly 30131: ISheetData_Club_ClubCharacterSkill;
	readonly 30141: ISheetData_Club_ClubCharacterSkill;
	readonly 30151: ISheetData_Club_ClubCharacterSkill;
	readonly 30161: ISheetData_Club_ClubCharacterSkill;
}
declare interface ISheetData_Club_ClubCharacterSkill extends ISheetDataBase {
	readonly id: number;
	/** 类型 */
	readonly type: number;
	/** 技能cd（游戏时间） */
	readonly cold_down_time: number;
	/** 参数 */
	readonly args: number[];
}
//#endregion

//#region club_level
declare interface ISheet_Club_ClubLevel {
	readonly [key: string]: ISheetData_Club_ClubLevel[];
	readonly 260801: ISheetData_Club_ClubLevel[];
}
declare interface ISheetData_Club_ClubLevel extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 关卡等级 */
	readonly level_id: number;
	/** 下一关等级 */
	readonly next_level_id: number;
	/** 关卡名 */
	readonly level_name: number;
	/** 客流 */
	readonly customer_count: number;
	/** 要求收入 */
	readonly income_require: number;
	/** 每日新闻标题文本 */
	readonly event_title: number;
	/** 每日新闻描述文本 */
	readonly event_desc: number;
	/** 关卡时长 */
	readonly total_time: number;
	/** 客流池 */
	readonly customer_pool: number;
	/** 顾客到店时刻表 */
	readonly level_schedule: number;
	/** 事件金币倍率 */
	readonly event_effect_rate: number;
	/** 奖励 */
	readonly reward: string;
}
//#endregion

//#region club_level_schedule
declare interface ISheet_Club_ClubLevelSchedule {
	readonly [key: string]: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080901: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080902: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080903: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080904: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080905: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080906: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080907: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080908: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080909: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080910: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080911: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080912: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080913: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080914: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080915: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080916: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080917: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080918: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080919: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080920: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080921: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080922: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080923: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080924: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080925: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080926: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080927: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080928: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080929: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080930: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080931: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080932: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080933: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080934: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080935: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080936: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080937: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080938: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080939: ISheetData_Club_ClubLevelSchedule[];
	readonly 26080940: ISheetData_Club_ClubLevelSchedule[];
}
declare interface ISheetData_Club_ClubLevelSchedule extends ISheetDataBase {
	/** 时刻表id */
	readonly club_level_schedule_id: number;
	/** 开始后多少游戏分钟，区间生效 */
	readonly time: number;
	/** 客流权重 */
	readonly customer_weight: number;
}
//#endregion

//#region club_customer
declare interface ISheet_Club_ClubCustomer {
	readonly [key: string]: ISheetData_Club_ClubCustomer;
	readonly 3501: ISheetData_Club_ClubCustomer;
	readonly 3502: ISheetData_Club_ClubCustomer;
	readonly 3503: ISheetData_Club_ClubCustomer;
	readonly 3504: ISheetData_Club_ClubCustomer;
	readonly 3505: ISheetData_Club_ClubCustomer;
	readonly 3506: ISheetData_Club_ClubCustomer;
	readonly 3507: ISheetData_Club_ClubCustomer;
	readonly 3508: ISheetData_Club_ClubCustomer;
	readonly 3509: ISheetData_Club_ClubCustomer;
	readonly 3510: ISheetData_Club_ClubCustomer;
	readonly 3511: ISheetData_Club_ClubCustomer;
	readonly 3512: ISheetData_Club_ClubCustomer;
	readonly 3513: ISheetData_Club_ClubCustomer;
	readonly 3514: ISheetData_Club_ClubCustomer;
	readonly 3515: ISheetData_Club_ClubCustomer;
	readonly 3516: ISheetData_Club_ClubCustomer;
	readonly 3517: ISheetData_Club_ClubCustomer;
	readonly 3518: ISheetData_Club_ClubCustomer;
}
declare interface ISheetData_Club_ClubCustomer extends ISheetDataBase {
	/** 顾客id */
	readonly id: number;
	/** 顾客名str/event */
	readonly name: number;
	/** 顾客图标 */
	readonly icon: string[];
	/** 顾客图 */
	readonly image: string[];
	/** 耐心值下界 */
	readonly patience: number[];
	/** 雀力值下界 */
	readonly power: number[];
	/** 标签 */
	readonly tags: number[];
	/** 心情波动下界(闭) */
	readonly moodmin: number;
	/** 心情波动上界(闭) */
	readonly moodmax: number;
	/** 所属房间id */
	readonly room_type: number;
	/** 特殊能力 */
	readonly skills: number[];
	/** 能力文本str/event */
	readonly skills_desc: number;
	/** 雀力描述文本 */
	readonly power_desc: number;
	/** 支付倍率 */
	readonly payment_rate: number;
	/** 绑定刷新数量 */
	readonly bind_count: number;
	/** 小费 */
	readonly tip: number;
}
//#endregion

//#region club_customer_skill
declare interface ISheet_Club_ClubCustomerSkill {
	readonly [key: string]: ISheetData_Club_ClubCustomerSkill;
	readonly 35051: ISheetData_Club_ClubCustomerSkill;
	readonly 35081: ISheetData_Club_ClubCustomerSkill;
	readonly 35091: ISheetData_Club_ClubCustomerSkill;
	readonly 35101: ISheetData_Club_ClubCustomerSkill;
	readonly 35111: ISheetData_Club_ClubCustomerSkill;
	readonly 35121: ISheetData_Club_ClubCustomerSkill;
	readonly 35131: ISheetData_Club_ClubCustomerSkill;
	readonly 35132: ISheetData_Club_ClubCustomerSkill;
	readonly 35141: ISheetData_Club_ClubCustomerSkill;
	readonly 35151: ISheetData_Club_ClubCustomerSkill;
	readonly 35161: ISheetData_Club_ClubCustomerSkill;
	readonly 35171: ISheetData_Club_ClubCustomerSkill;
	readonly 35172: ISheetData_Club_ClubCustomerSkill;
	readonly 35181: ISheetData_Club_ClubCustomerSkill;
}
declare interface ISheetData_Club_ClubCustomerSkill extends ISheetDataBase {
	readonly id: number;
	/** 类型 */
	readonly type: number;
	/** 参数 */
	readonly args: number[];
}
//#endregion

//#region club_customer_pool
declare interface ISheet_Club_ClubCustomerPool {
	readonly [key: string]: ISheetData_Club_ClubCustomerPool;
	readonly 26080011: ISheetData_Club_ClubCustomerPool;
	readonly 26080021: ISheetData_Club_ClubCustomerPool;
	readonly 26080031: ISheetData_Club_ClubCustomerPool;
	readonly 26080041: ISheetData_Club_ClubCustomerPool;
	readonly 26080051: ISheetData_Club_ClubCustomerPool;
	readonly 26080061: ISheetData_Club_ClubCustomerPool;
	readonly 26080071: ISheetData_Club_ClubCustomerPool;
	readonly 26080081: ISheetData_Club_ClubCustomerPool;
	readonly 26080091: ISheetData_Club_ClubCustomerPool;
	readonly 26080101: ISheetData_Club_ClubCustomerPool;
	readonly 26080111: ISheetData_Club_ClubCustomerPool;
	readonly 26080121: ISheetData_Club_ClubCustomerPool;
	readonly 26080131: ISheetData_Club_ClubCustomerPool;
	readonly 26080141: ISheetData_Club_ClubCustomerPool;
	readonly 26080151: ISheetData_Club_ClubCustomerPool;
	readonly 26080161: ISheetData_Club_ClubCustomerPool;
	readonly 26080171: ISheetData_Club_ClubCustomerPool;
	readonly 26080181: ISheetData_Club_ClubCustomerPool;
	readonly 26080191: ISheetData_Club_ClubCustomerPool;
	readonly 26080201: ISheetData_Club_ClubCustomerPool;
	readonly 26080211: ISheetData_Club_ClubCustomerPool;
	readonly 26080221: ISheetData_Club_ClubCustomerPool;
	readonly 26080231: ISheetData_Club_ClubCustomerPool;
	readonly 26080241: ISheetData_Club_ClubCustomerPool;
	readonly 26080251: ISheetData_Club_ClubCustomerPool;
	readonly 26080261: ISheetData_Club_ClubCustomerPool;
	readonly 26080271: ISheetData_Club_ClubCustomerPool;
	readonly 26080281: ISheetData_Club_ClubCustomerPool;
	readonly 26080291: ISheetData_Club_ClubCustomerPool;
	readonly 26080301: ISheetData_Club_ClubCustomerPool;
	readonly 26080311: ISheetData_Club_ClubCustomerPool;
	readonly 26080321: ISheetData_Club_ClubCustomerPool;
	readonly 26080331: ISheetData_Club_ClubCustomerPool;
	readonly 26080341: ISheetData_Club_ClubCustomerPool;
	readonly 26080351: ISheetData_Club_ClubCustomerPool;
	readonly 26080361: ISheetData_Club_ClubCustomerPool;
	readonly 26080371: ISheetData_Club_ClubCustomerPool;
	readonly 26080381: ISheetData_Club_ClubCustomerPool;
	readonly 26080391: ISheetData_Club_ClubCustomerPool;
	readonly 26080401: ISheetData_Club_ClubCustomerPool;
}
declare interface ISheetData_Club_ClubCustomerPool extends ISheetDataBase {
	/** 池子id */
	readonly id: number;
	/** 顾客id */
	readonly customer_id: number[];
	/** 随机权重 */
	readonly weight: number[];
}
//#endregion

//#region club_event
declare interface ISheet_Club_ClubEvent {
	readonly [key: string]: ISheetData_Club_ClubEvent;
	readonly 4001: ISheetData_Club_ClubEvent;
	readonly 4002: ISheetData_Club_ClubEvent;
	readonly 4003: ISheetData_Club_ClubEvent;
	readonly 4004: ISheetData_Club_ClubEvent;
	readonly 4005: ISheetData_Club_ClubEvent;
	readonly 4006: ISheetData_Club_ClubEvent;
	readonly 4007: ISheetData_Club_ClubEvent;
	readonly 4008: ISheetData_Club_ClubEvent;
	readonly 4009: ISheetData_Club_ClubEvent;
	readonly 4010: ISheetData_Club_ClubEvent;
	readonly 4011: ISheetData_Club_ClubEvent;
	readonly 4012: ISheetData_Club_ClubEvent;
	readonly 4013: ISheetData_Club_ClubEvent;
	readonly 4014: ISheetData_Club_ClubEvent;
	readonly 4015: ISheetData_Club_ClubEvent;
	readonly 4016: ISheetData_Club_ClubEvent;
	readonly 4017: ISheetData_Club_ClubEvent;
	readonly 4018: ISheetData_Club_ClubEvent;
	readonly 4019: ISheetData_Club_ClubEvent;
	readonly 4020: ISheetData_Club_ClubEvent;
	readonly 4021: ISheetData_Club_ClubEvent;
	readonly 4022: ISheetData_Club_ClubEvent;
	readonly 4023: ISheetData_Club_ClubEvent;
}
declare interface ISheetData_Club_ClubEvent extends ISheetDataBase {
	/** 事件id */
	readonly id: number;
	/** 事件类型 */
	readonly type: number;
	/** 刷新权重 */
	readonly weight: number;
	/** 限制顾客类型 */
	readonly custom_limit: string;
	/** 事件标题str/event */
	readonly title: number;
	/** 事件描述str/event */
	readonly desc: number;
	/** 选项描述str/event */
	readonly selection_desc: number[];
	/** 结果描述str/event */
	readonly result_desc: number[];
	/** 效果id */
	readonly result_effect_id: number[];
}
//#endregion

//#region club_event_effect
declare interface ISheet_Club_ClubEventEffect {
	readonly [key: string]: ISheetData_Club_ClubEventEffect;
	readonly 4501: ISheetData_Club_ClubEventEffect;
	readonly 4502: ISheetData_Club_ClubEventEffect;
	readonly 4503: ISheetData_Club_ClubEventEffect;
	readonly 4504: ISheetData_Club_ClubEventEffect;
	readonly 4505: ISheetData_Club_ClubEventEffect;
	readonly 4506: ISheetData_Club_ClubEventEffect;
	readonly 4507: ISheetData_Club_ClubEventEffect;
	readonly 4508: ISheetData_Club_ClubEventEffect;
	readonly 4509: ISheetData_Club_ClubEventEffect;
	readonly 4510: ISheetData_Club_ClubEventEffect;
	readonly 4511: ISheetData_Club_ClubEventEffect;
}
declare interface ISheetData_Club_ClubEventEffect extends ISheetDataBase {
	/** 效果id */
	readonly id: number;
	/** 效果类型 */
	readonly type: number;
	/** 效果正面性 */
	readonly positivity: number;
	/** 效果描述 */
	readonly result_desc: number;
	readonly args: number[];
}
//#endregion

//#region club_event_fan
declare interface ISheet_Club_ClubEventFan {
	readonly [key: string]: ISheetData_Club_ClubEventFan;
	readonly 1: ISheetData_Club_ClubEventFan;
	readonly 2: ISheetData_Club_ClubEventFan;
	readonly 3: ISheetData_Club_ClubEventFan;
	readonly 4: ISheetData_Club_ClubEventFan;
	readonly 5: ISheetData_Club_ClubEventFan;
	readonly 6: ISheetData_Club_ClubEventFan;
	readonly 7: ISheetData_Club_ClubEventFan;
	readonly 8: ISheetData_Club_ClubEventFan;
	readonly 9: ISheetData_Club_ClubEventFan;
	readonly 10: ISheetData_Club_ClubEventFan;
	readonly 11: ISheetData_Club_ClubEventFan;
	readonly 12: ISheetData_Club_ClubEventFan;
	readonly 13: ISheetData_Club_ClubEventFan;
	readonly 14: ISheetData_Club_ClubEventFan;
	readonly 15: ISheetData_Club_ClubEventFan;
	readonly 16: ISheetData_Club_ClubEventFan;
	readonly 17: ISheetData_Club_ClubEventFan;
	readonly 18: ISheetData_Club_ClubEventFan;
	readonly 19: ISheetData_Club_ClubEventFan;
	readonly 20: ISheetData_Club_ClubEventFan;
	readonly 21: ISheetData_Club_ClubEventFan;
	readonly 22: ISheetData_Club_ClubEventFan;
	readonly 23: ISheetData_Club_ClubEventFan;
	readonly 24: ISheetData_Club_ClubEventFan;
	readonly 25: ISheetData_Club_ClubEventFan;
	readonly 26: ISheetData_Club_ClubEventFan;
	readonly 27: ISheetData_Club_ClubEventFan;
	readonly 28: ISheetData_Club_ClubEventFan;
	readonly 29: ISheetData_Club_ClubEventFan;
	readonly 30: ISheetData_Club_ClubEventFan;
	readonly 35: ISheetData_Club_ClubEventFan;
	readonly 36: ISheetData_Club_ClubEventFan;
	readonly 37: ISheetData_Club_ClubEventFan;
	readonly 38: ISheetData_Club_ClubEventFan;
	readonly 39: ISheetData_Club_ClubEventFan;
	readonly 40: ISheetData_Club_ClubEventFan;
	readonly 41: ISheetData_Club_ClubEventFan;
	readonly 42: ISheetData_Club_ClubEventFan;
	readonly 43: ISheetData_Club_ClubEventFan;
	readonly 44: ISheetData_Club_ClubEventFan;
	readonly 45: ISheetData_Club_ClubEventFan;
	readonly 47: ISheetData_Club_ClubEventFan;
	readonly 48: ISheetData_Club_ClubEventFan;
	readonly 49: ISheetData_Club_ClubEventFan;
	readonly 50: ISheetData_Club_ClubEventFan;
}
declare interface ISheetData_Club_ClubEventFan extends ISheetDataBase {
	/** 番种id */
	readonly id: number;
	/** 门前清番数 */
	readonly val: number;
	/** str/event的番名，0为普通番 */
	readonly name: number;
}
//#endregion

//#region club_emoji
declare interface ISheet_Club_ClubEmoji {
	readonly [key: string]: ISheetData_Club_ClubEmoji;
	readonly 1: ISheetData_Club_ClubEmoji;
	readonly 2: ISheetData_Club_ClubEmoji;
	readonly 3: ISheetData_Club_ClubEmoji;
	readonly 4: ISheetData_Club_ClubEmoji;
	readonly 5: ISheetData_Club_ClubEmoji;
	readonly 6: ISheetData_Club_ClubEmoji;
	readonly 7: ISheetData_Club_ClubEmoji;
}
declare interface ISheetData_Club_ClubEmoji extends ISheetDataBase {
	/** 表情id */
	readonly id: number;
	/** 心情下界（闭） */
	readonly mood: number[];
	/** 情绪倍率 */
	readonly mood_rate: number;
	/** 小费掉落倍率 */
	readonly tip_rate: number;
	/** 有店员小费掉落倍率 */
	readonly tip_assistant_rate: number;
	/** 图标路径 */
	readonly icon: string;
}
//#endregion

//#region club_tag
declare interface ISheet_Club_ClubTag {
	readonly [key: string]: ISheetData_Club_ClubTag;
	readonly 1: ISheetData_Club_ClubTag;
	readonly 2: ISheetData_Club_ClubTag;
	readonly 3: ISheetData_Club_ClubTag;
	readonly 4: ISheetData_Club_ClubTag;
	readonly 5: ISheetData_Club_ClubTag;
	readonly 6: ISheetData_Club_ClubTag;
	readonly 7: ISheetData_Club_ClubTag;
	readonly 8: ISheetData_Club_ClubTag;
	readonly 9: ISheetData_Club_ClubTag;
	readonly 10: ISheetData_Club_ClubTag;
	readonly 11: ISheetData_Club_ClubTag;
}
declare interface ISheetData_Club_ClubTag extends ISheetDataBase {
	/** 标签id */
	readonly id: number;
	/** 标签名 */
	readonly name: number;
	/** 标签对应图片 */
	readonly image: string;
}
//#endregion

//#region club_tip
declare interface ISheet_Club_ClubTip {
	readonly [key: string]: ISheetData_Club_ClubTip;
	readonly 1: ISheetData_Club_ClubTip;
	readonly 2: ISheetData_Club_ClubTip;
	readonly 3: ISheetData_Club_ClubTip;
}
declare interface ISheetData_Club_ClubTip extends ISheetDataBase {
	/** 小费id */
	readonly id: number;
	/** 小费下界（闭） */
	readonly count: number[];
	/** 对应图片 */
	readonly image: string;
	/** 对应数字图片 */
	readonly image_number: string;
}
//#endregion

//#region club_room
declare interface ISheet_Club_ClubRoom {
	readonly [key: string]: ISheetData_Club_ClubRoom[];
	readonly 260801: ISheetData_Club_ClubRoom[];
}
declare interface ISheetData_Club_ClubRoom extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 房间id */
	readonly room_id: number;
	/** 房间名str/event */
	readonly room_name: number;
	/** 初始是否解锁，0-解锁 1-不解锁 */
	readonly init_locked: number;
	/** 初始麻将桌数量 */
	readonly init_desktop_count: number;
	/** 最大麻将桌数量 */
	readonly max_desktop_count: number;
	/** 初始台费 */
	readonly init_desktop_fee: number;
	/** 解锁费用 */
	readonly unlock_price: string;
	/** 台费升级id */
	readonly desktop_fee_upgrade_id: number;
	/** 麻将桌数量升级id */
	readonly desktop_count_upgrade: number;
	/** 房间对应正确后的心情波动 */
	readonly room_mood: number;
}
//#endregion

//#region club_desktop_fee_upgrade
declare interface ISheet_Club_ClubDesktopFeeUpgrade {
	readonly [key: string]: ISheetData_Club_ClubDesktopFeeUpgrade[];
	readonly 1011: ISheetData_Club_ClubDesktopFeeUpgrade[];
	readonly 1012: ISheetData_Club_ClubDesktopFeeUpgrade[];
	readonly 1013: ISheetData_Club_ClubDesktopFeeUpgrade[];
}
declare interface ISheetData_Club_ClubDesktopFeeUpgrade extends ISheetDataBase {
	/** 升级id */
	readonly upgrade_id: number;
	/** 等级 */
	readonly level: number;
	/** 额外增加台费 */
	readonly additional_desktop_fee: number;
	/** 升级价格 */
	readonly price: string;
}
//#endregion

//#region club_desktop_count_upgrade
declare interface ISheet_Club_ClubDesktopCountUpgrade {
	readonly [key: string]: ISheetData_Club_ClubDesktopCountUpgrade[];
	readonly 1021: ISheetData_Club_ClubDesktopCountUpgrade[];
	readonly 1022: ISheetData_Club_ClubDesktopCountUpgrade[];
	readonly 1023: ISheetData_Club_ClubDesktopCountUpgrade[];
}
declare interface ISheetData_Club_ClubDesktopCountUpgrade extends ISheetDataBase {
	/** 升级id */
	readonly upgrade_id: number;
	/** 等级 */
	readonly level: number;
	/** 额外麻将数量 */
	readonly additional_desktop_count: number;
	/** 升级价格 */
	readonly price: string;
}
//#endregion