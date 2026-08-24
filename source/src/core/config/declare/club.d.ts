/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Club {
	/** 初始化状态  ---  unique */
	club_info: CfgExt<ISheet_Club_ClubInfo>;
	/** 等待区升级  ---  group */
	club_wait_zone_upgrade: CfgExtGroup<ISheet_Club_ClubWaitZoneUpgrade>;
	/** 店员配置  ---  group */
	club_character: CfgExtGroup<ISheet_Club_ClubCharacter>;
	/** 店员技能  ---  unique */
	club_character_skill: CfgExt<ISheet_Club_ClubCharacterSkill>;
	/** 关卡配置  ---  group */
	club_level: CfgExtGroup<ISheet_Club_ClubLevel>;
	/** 关卡时刻表配置  ---  group */
	club_level_schedule: CfgExtGroup<ISheet_Club_ClubLevelSchedule>;
	/** 顾客配置  ---  unique */
	club_customer: CfgExt<ISheet_Club_ClubCustomer>;
	/** 顾客效果配置  ---  unique */
	club_customer_skill: CfgExt<ISheet_Club_ClubCustomerSkill>;
	/** 关卡顾客刷新池配置  ---  unique */
	club_customer_pool: CfgExt<ISheet_Club_ClubCustomerPool>;
	/** 突发事件  ---  unique */
	club_event: CfgExt<ISheet_Club_ClubEvent>;
	/** 突发事件效果  ---  unique */
	club_event_effect: CfgExt<ISheet_Club_ClubEventEffect>;
	/** 突发事件番数  ---  unique */
	club_event_fan: CfgExt<ISheet_Club_ClubEventFan>;
	/** 顾客心情  ---  unique */
	club_emoji: CfgExt<ISheet_Club_ClubEmoji>;
	/** 标签配置  ---  unique */
	club_tag: CfgExt<ISheet_Club_ClubTag>;
	/** 小费显示配置  ---  unique */
	club_tip: CfgExt<ISheet_Club_ClubTip>;
	/** 房间配置  ---  group */
	club_room: CfgExtGroup<ISheet_Club_ClubRoom>;
	/** 桌台费升级  ---  group */
	club_desktop_fee_upgrade: CfgExtGroup<ISheet_Club_ClubDesktopFeeUpgrade>;
	/** 桌台数量升级  ---  group */
	club_desktop_count_upgrade: CfgExtGroup<ISheet_Club_ClubDesktopCountUpgrade>;
}

//#region club_info
declare interface ISheet_Club_ClubInfo {
	[key: string]: ISheetData_Club_ClubInfo;
	260801: ISheetData_Club_ClubInfo;
}
declare interface ISheetData_Club_ClubInfo extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 初始待客区时间 */
	init_wait_time: number;
	/** 待客区升级id */
	wait_zone_upgrade: number;
	/** 初始关卡等级 */
	init_level: number;
	/** 心情波动下界(闭) */
	init_moodmin: number;
	/** 心情波动上界(闭) */
	init_moodmax: number;
	/** 标签导致的心情波动值 */
	tag_mood: number;
	/** 游戏分钟对应现实时间（ticks） */
	ticks_per_minute: number;
	/** 基础对局时长 */
	init_battle_time: number;
	/** 最少对局时长 */
	battle_time_min: number;
	/** 单轮游戏总时长 */
	game_total_time: number;
	/** 停止进客时间 */
	game_hurry_time: number;
	/** 心情判断时间间隔 */
	mood_judge_time: number;
	/** 突发事件判断时间间隔 */
	event_judge_time: number;
	/** 小费消失时间 */
	tip_disappear_time: number;
	/** 突发事件判断概率（百分比） */
	event_rate: number;
	/** 听牌问答听牌概率（百分比） */
	tenpai_rate: number;
	/** 距离结束前不再发生事件的时间 */
	event_idle_time: number;
}
//#endregion

//#region club_wait_zone_upgrade
declare interface ISheet_Club_ClubWaitZoneUpgrade {
	[key: string]: ISheetData_Club_ClubWaitZoneUpgrade[];
	1001: ISheetData_Club_ClubWaitZoneUpgrade[];
}
declare interface ISheetData_Club_ClubWaitZoneUpgrade extends ISheetDataBase {
	id: number;
	/** 等级 */
	level: number;
	/** 额外等待时间 */
	additional_wait_time: number;
	/** 对应数值 */
	display_value: number;
	/** 升级价格 */
	price: string;
}
//#endregion

//#region club_character
declare interface ISheet_Club_ClubCharacter {
	[key: string]: ISheetData_Club_ClubCharacter[];
	260801: ISheetData_Club_ClubCharacter[];
}
declare interface ISheetData_Club_ClubCharacter extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 店员id */
	id: number;
	/** 对应角色id */
	name: number;
	/** 店员图标 */
	icon: string;
	/** 店员图 */
	image: string;
	/** 对应任务id */
	period_task_id: number;
	/** 初始是否解锁，0-初始解锁，1-初始不解锁 */
	init_locked: number;
	/** 雀力 */
	power: number;
	/** 初始标签 */
	init_tags: number[];
	/** 升级解锁标签 */
	locked_tags: number[];
	/** 特殊技能 */
	skills: number[];
	/** 技能名str/event */
	skill_name: number;
	/** 技能描述str/event */
	skill_desc: number;
	/** 雀力升级增长雀力 */
	power_upgrade: number;
	/** 雀力升级价格 */
	power_upgrade_price: string;
	/** 标签解锁价格 */
	tag_upgrade_price: string;
	/** 最大雀力 */
	max_power: number;
}
//#endregion

//#region club_character_skill
declare interface ISheet_Club_ClubCharacterSkill {
	[key: string]: ISheetData_Club_ClubCharacterSkill;
	30011: ISheetData_Club_ClubCharacterSkill;
	30021: ISheetData_Club_ClubCharacterSkill;
	30031: ISheetData_Club_ClubCharacterSkill;
	30041: ISheetData_Club_ClubCharacterSkill;
	30051: ISheetData_Club_ClubCharacterSkill;
	30061: ISheetData_Club_ClubCharacterSkill;
	30071: ISheetData_Club_ClubCharacterSkill;
	30081: ISheetData_Club_ClubCharacterSkill;
	30091: ISheetData_Club_ClubCharacterSkill;
	30101: ISheetData_Club_ClubCharacterSkill;
	30111: ISheetData_Club_ClubCharacterSkill;
	30121: ISheetData_Club_ClubCharacterSkill;
	30131: ISheetData_Club_ClubCharacterSkill;
	30141: ISheetData_Club_ClubCharacterSkill;
	30151: ISheetData_Club_ClubCharacterSkill;
	30161: ISheetData_Club_ClubCharacterSkill;
}
declare interface ISheetData_Club_ClubCharacterSkill extends ISheetDataBase {
	id: number;
	/** 类型 */
	type: number;
	/** 技能cd（游戏时间） */
	cold_down_time: number;
	/** 参数 */
	args: number[];
}
//#endregion

//#region club_level
declare interface ISheet_Club_ClubLevel {
	[key: string]: ISheetData_Club_ClubLevel[];
	260801: ISheetData_Club_ClubLevel[];
}
declare interface ISheetData_Club_ClubLevel extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 关卡等级 */
	level_id: number;
	/** 下一关等级 */
	next_level_id: number;
	/** 关卡名 */
	level_name: number;
	/** 客流 */
	customer_count: number;
	/** 要求收入 */
	income_require: number;
	/** 每日新闻标题文本 */
	event_title: number;
	/** 每日新闻描述文本 */
	event_desc: number;
	/** 关卡时长 */
	total_time: number;
	/** 客流池 */
	customer_pool: number;
	/** 顾客到店时刻表 */
	level_schedule: number;
	/** 事件金币倍率 */
	event_effect_rate: number;
	/** 奖励 */
	reward: string;
}
//#endregion

//#region club_level_schedule
declare interface ISheet_Club_ClubLevelSchedule {
	[key: string]: ISheetData_Club_ClubLevelSchedule[];
	26080901: ISheetData_Club_ClubLevelSchedule[];
	26080902: ISheetData_Club_ClubLevelSchedule[];
	26080903: ISheetData_Club_ClubLevelSchedule[];
	26080904: ISheetData_Club_ClubLevelSchedule[];
	26080905: ISheetData_Club_ClubLevelSchedule[];
	26080906: ISheetData_Club_ClubLevelSchedule[];
	26080907: ISheetData_Club_ClubLevelSchedule[];
	26080908: ISheetData_Club_ClubLevelSchedule[];
	26080909: ISheetData_Club_ClubLevelSchedule[];
	26080910: ISheetData_Club_ClubLevelSchedule[];
	26080911: ISheetData_Club_ClubLevelSchedule[];
	26080912: ISheetData_Club_ClubLevelSchedule[];
	26080913: ISheetData_Club_ClubLevelSchedule[];
	26080914: ISheetData_Club_ClubLevelSchedule[];
	26080915: ISheetData_Club_ClubLevelSchedule[];
	26080916: ISheetData_Club_ClubLevelSchedule[];
	26080917: ISheetData_Club_ClubLevelSchedule[];
	26080918: ISheetData_Club_ClubLevelSchedule[];
	26080919: ISheetData_Club_ClubLevelSchedule[];
	26080920: ISheetData_Club_ClubLevelSchedule[];
	26080921: ISheetData_Club_ClubLevelSchedule[];
	26080922: ISheetData_Club_ClubLevelSchedule[];
	26080923: ISheetData_Club_ClubLevelSchedule[];
	26080924: ISheetData_Club_ClubLevelSchedule[];
	26080925: ISheetData_Club_ClubLevelSchedule[];
	26080926: ISheetData_Club_ClubLevelSchedule[];
	26080927: ISheetData_Club_ClubLevelSchedule[];
	26080928: ISheetData_Club_ClubLevelSchedule[];
	26080929: ISheetData_Club_ClubLevelSchedule[];
	26080930: ISheetData_Club_ClubLevelSchedule[];
	26080931: ISheetData_Club_ClubLevelSchedule[];
	26080932: ISheetData_Club_ClubLevelSchedule[];
	26080933: ISheetData_Club_ClubLevelSchedule[];
	26080934: ISheetData_Club_ClubLevelSchedule[];
	26080935: ISheetData_Club_ClubLevelSchedule[];
	26080936: ISheetData_Club_ClubLevelSchedule[];
	26080937: ISheetData_Club_ClubLevelSchedule[];
	26080938: ISheetData_Club_ClubLevelSchedule[];
	26080939: ISheetData_Club_ClubLevelSchedule[];
	26080940: ISheetData_Club_ClubLevelSchedule[];
}
declare interface ISheetData_Club_ClubLevelSchedule extends ISheetDataBase {
	/** 时刻表id */
	club_level_schedule_id: number;
	/** 开始后多少游戏分钟，区间生效 */
	time: number;
	/** 客流权重 */
	customer_weight: number;
}
//#endregion

//#region club_customer
declare interface ISheet_Club_ClubCustomer {
	[key: string]: ISheetData_Club_ClubCustomer;
	3501: ISheetData_Club_ClubCustomer;
	3502: ISheetData_Club_ClubCustomer;
	3503: ISheetData_Club_ClubCustomer;
	3504: ISheetData_Club_ClubCustomer;
	3505: ISheetData_Club_ClubCustomer;
	3506: ISheetData_Club_ClubCustomer;
	3507: ISheetData_Club_ClubCustomer;
	3508: ISheetData_Club_ClubCustomer;
	3509: ISheetData_Club_ClubCustomer;
	3510: ISheetData_Club_ClubCustomer;
	3511: ISheetData_Club_ClubCustomer;
	3512: ISheetData_Club_ClubCustomer;
	3513: ISheetData_Club_ClubCustomer;
	3514: ISheetData_Club_ClubCustomer;
	3515: ISheetData_Club_ClubCustomer;
	3516: ISheetData_Club_ClubCustomer;
	3517: ISheetData_Club_ClubCustomer;
	3518: ISheetData_Club_ClubCustomer;
}
declare interface ISheetData_Club_ClubCustomer extends ISheetDataBase {
	/** 顾客id */
	id: number;
	/** 顾客名str/event */
	name: number;
	/** 顾客图标 */
	icon: string[];
	/** 顾客图 */
	image: string[];
	/** 耐心值下界 */
	patience: number[];
	/** 雀力值下界 */
	power: number[];
	/** 标签 */
	tags: number[];
	/** 心情波动下界(闭) */
	moodmin: number;
	/** 心情波动上界(闭) */
	moodmax: number;
	/** 所属房间id */
	room_type: number;
	/** 特殊能力 */
	skills: number[];
	/** 能力文本str/event */
	skills_desc: number;
	/** 雀力描述文本 */
	power_desc: number;
	/** 支付倍率 */
	payment_rate: number;
	/** 绑定刷新数量 */
	bind_count: number;
	/** 小费 */
	tip: number;
}
//#endregion

//#region club_customer_skill
declare interface ISheet_Club_ClubCustomerSkill {
	[key: string]: ISheetData_Club_ClubCustomerSkill;
	35051: ISheetData_Club_ClubCustomerSkill;
	35081: ISheetData_Club_ClubCustomerSkill;
	35091: ISheetData_Club_ClubCustomerSkill;
	35101: ISheetData_Club_ClubCustomerSkill;
	35111: ISheetData_Club_ClubCustomerSkill;
	35121: ISheetData_Club_ClubCustomerSkill;
	35131: ISheetData_Club_ClubCustomerSkill;
	35132: ISheetData_Club_ClubCustomerSkill;
	35141: ISheetData_Club_ClubCustomerSkill;
	35151: ISheetData_Club_ClubCustomerSkill;
	35161: ISheetData_Club_ClubCustomerSkill;
	35171: ISheetData_Club_ClubCustomerSkill;
	35172: ISheetData_Club_ClubCustomerSkill;
	35181: ISheetData_Club_ClubCustomerSkill;
}
declare interface ISheetData_Club_ClubCustomerSkill extends ISheetDataBase {
	id: number;
	/** 类型 */
	type: number;
	/** 参数 */
	args: number[];
}
//#endregion

//#region club_customer_pool
declare interface ISheet_Club_ClubCustomerPool {
	[key: string]: ISheetData_Club_ClubCustomerPool;
	26080011: ISheetData_Club_ClubCustomerPool;
	26080021: ISheetData_Club_ClubCustomerPool;
	26080031: ISheetData_Club_ClubCustomerPool;
	26080041: ISheetData_Club_ClubCustomerPool;
	26080051: ISheetData_Club_ClubCustomerPool;
	26080061: ISheetData_Club_ClubCustomerPool;
	26080071: ISheetData_Club_ClubCustomerPool;
	26080081: ISheetData_Club_ClubCustomerPool;
	26080091: ISheetData_Club_ClubCustomerPool;
	26080101: ISheetData_Club_ClubCustomerPool;
	26080111: ISheetData_Club_ClubCustomerPool;
	26080121: ISheetData_Club_ClubCustomerPool;
	26080131: ISheetData_Club_ClubCustomerPool;
	26080141: ISheetData_Club_ClubCustomerPool;
	26080151: ISheetData_Club_ClubCustomerPool;
	26080161: ISheetData_Club_ClubCustomerPool;
	26080171: ISheetData_Club_ClubCustomerPool;
	26080181: ISheetData_Club_ClubCustomerPool;
	26080191: ISheetData_Club_ClubCustomerPool;
	26080201: ISheetData_Club_ClubCustomerPool;
	26080211: ISheetData_Club_ClubCustomerPool;
	26080221: ISheetData_Club_ClubCustomerPool;
	26080231: ISheetData_Club_ClubCustomerPool;
	26080241: ISheetData_Club_ClubCustomerPool;
	26080251: ISheetData_Club_ClubCustomerPool;
	26080261: ISheetData_Club_ClubCustomerPool;
	26080271: ISheetData_Club_ClubCustomerPool;
	26080281: ISheetData_Club_ClubCustomerPool;
	26080291: ISheetData_Club_ClubCustomerPool;
	26080301: ISheetData_Club_ClubCustomerPool;
	26080311: ISheetData_Club_ClubCustomerPool;
	26080321: ISheetData_Club_ClubCustomerPool;
	26080331: ISheetData_Club_ClubCustomerPool;
	26080341: ISheetData_Club_ClubCustomerPool;
	26080351: ISheetData_Club_ClubCustomerPool;
	26080361: ISheetData_Club_ClubCustomerPool;
	26080371: ISheetData_Club_ClubCustomerPool;
	26080381: ISheetData_Club_ClubCustomerPool;
	26080391: ISheetData_Club_ClubCustomerPool;
	26080401: ISheetData_Club_ClubCustomerPool;
}
declare interface ISheetData_Club_ClubCustomerPool extends ISheetDataBase {
	/** 池子id */
	id: number;
	/** 顾客id */
	customer_id: number[];
	/** 随机权重 */
	weight: number[];
}
//#endregion

//#region club_event
declare interface ISheet_Club_ClubEvent {
	[key: string]: ISheetData_Club_ClubEvent;
	4001: ISheetData_Club_ClubEvent;
	4002: ISheetData_Club_ClubEvent;
	4003: ISheetData_Club_ClubEvent;
	4004: ISheetData_Club_ClubEvent;
	4005: ISheetData_Club_ClubEvent;
	4006: ISheetData_Club_ClubEvent;
	4007: ISheetData_Club_ClubEvent;
	4008: ISheetData_Club_ClubEvent;
	4009: ISheetData_Club_ClubEvent;
	4010: ISheetData_Club_ClubEvent;
	4011: ISheetData_Club_ClubEvent;
	4012: ISheetData_Club_ClubEvent;
	4013: ISheetData_Club_ClubEvent;
	4014: ISheetData_Club_ClubEvent;
	4015: ISheetData_Club_ClubEvent;
	4016: ISheetData_Club_ClubEvent;
	4017: ISheetData_Club_ClubEvent;
	4018: ISheetData_Club_ClubEvent;
	4019: ISheetData_Club_ClubEvent;
	4020: ISheetData_Club_ClubEvent;
	4021: ISheetData_Club_ClubEvent;
	4022: ISheetData_Club_ClubEvent;
	4023: ISheetData_Club_ClubEvent;
}
declare interface ISheetData_Club_ClubEvent extends ISheetDataBase {
	/** 事件id */
	id: number;
	/** 事件类型 */
	type: number;
	/** 刷新权重 */
	weight: number;
	/** 限制顾客类型 */
	custom_limit: string;
	/** 事件标题str/event */
	title: number;
	/** 事件描述str/event */
	desc: number;
	/** 选项描述str/event */
	selection_desc: number[];
	/** 结果描述str/event */
	result_desc: number[];
	/** 效果id */
	result_effect_id: number[];
}
//#endregion

//#region club_event_effect
declare interface ISheet_Club_ClubEventEffect {
	[key: string]: ISheetData_Club_ClubEventEffect;
	4501: ISheetData_Club_ClubEventEffect;
	4502: ISheetData_Club_ClubEventEffect;
	4503: ISheetData_Club_ClubEventEffect;
	4504: ISheetData_Club_ClubEventEffect;
	4505: ISheetData_Club_ClubEventEffect;
	4506: ISheetData_Club_ClubEventEffect;
	4507: ISheetData_Club_ClubEventEffect;
	4508: ISheetData_Club_ClubEventEffect;
	4509: ISheetData_Club_ClubEventEffect;
	4510: ISheetData_Club_ClubEventEffect;
	4511: ISheetData_Club_ClubEventEffect;
}
declare interface ISheetData_Club_ClubEventEffect extends ISheetDataBase {
	/** 效果id */
	id: number;
	/** 效果类型 */
	type: number;
	/** 效果正面性 */
	positivity: number;
	/** 效果描述 */
	result_desc: number;
	args: number[];
}
//#endregion

//#region club_event_fan
declare interface ISheet_Club_ClubEventFan {
	[key: string]: ISheetData_Club_ClubEventFan;
	1: ISheetData_Club_ClubEventFan;
	2: ISheetData_Club_ClubEventFan;
	3: ISheetData_Club_ClubEventFan;
	4: ISheetData_Club_ClubEventFan;
	5: ISheetData_Club_ClubEventFan;
	6: ISheetData_Club_ClubEventFan;
	7: ISheetData_Club_ClubEventFan;
	8: ISheetData_Club_ClubEventFan;
	9: ISheetData_Club_ClubEventFan;
	10: ISheetData_Club_ClubEventFan;
	11: ISheetData_Club_ClubEventFan;
	12: ISheetData_Club_ClubEventFan;
	13: ISheetData_Club_ClubEventFan;
	14: ISheetData_Club_ClubEventFan;
	15: ISheetData_Club_ClubEventFan;
	16: ISheetData_Club_ClubEventFan;
	17: ISheetData_Club_ClubEventFan;
	18: ISheetData_Club_ClubEventFan;
	19: ISheetData_Club_ClubEventFan;
	20: ISheetData_Club_ClubEventFan;
	21: ISheetData_Club_ClubEventFan;
	22: ISheetData_Club_ClubEventFan;
	23: ISheetData_Club_ClubEventFan;
	24: ISheetData_Club_ClubEventFan;
	25: ISheetData_Club_ClubEventFan;
	26: ISheetData_Club_ClubEventFan;
	27: ISheetData_Club_ClubEventFan;
	28: ISheetData_Club_ClubEventFan;
	29: ISheetData_Club_ClubEventFan;
	30: ISheetData_Club_ClubEventFan;
	35: ISheetData_Club_ClubEventFan;
	36: ISheetData_Club_ClubEventFan;
	37: ISheetData_Club_ClubEventFan;
	38: ISheetData_Club_ClubEventFan;
	39: ISheetData_Club_ClubEventFan;
	40: ISheetData_Club_ClubEventFan;
	41: ISheetData_Club_ClubEventFan;
	42: ISheetData_Club_ClubEventFan;
	43: ISheetData_Club_ClubEventFan;
	44: ISheetData_Club_ClubEventFan;
	45: ISheetData_Club_ClubEventFan;
	47: ISheetData_Club_ClubEventFan;
	48: ISheetData_Club_ClubEventFan;
	49: ISheetData_Club_ClubEventFan;
	50: ISheetData_Club_ClubEventFan;
}
declare interface ISheetData_Club_ClubEventFan extends ISheetDataBase {
	/** 番种id */
	id: number;
	/** 门前清番数 */
	val: number;
	/** str/event的番名，0为普通番 */
	name: number;
}
//#endregion

//#region club_emoji
declare interface ISheet_Club_ClubEmoji {
	[key: string]: ISheetData_Club_ClubEmoji;
	1: ISheetData_Club_ClubEmoji;
	2: ISheetData_Club_ClubEmoji;
	3: ISheetData_Club_ClubEmoji;
	4: ISheetData_Club_ClubEmoji;
	5: ISheetData_Club_ClubEmoji;
	6: ISheetData_Club_ClubEmoji;
	7: ISheetData_Club_ClubEmoji;
}
declare interface ISheetData_Club_ClubEmoji extends ISheetDataBase {
	/** 表情id */
	id: number;
	/** 心情下界（闭） */
	mood: number[];
	/** 情绪倍率 */
	mood_rate: number;
	/** 小费掉落倍率 */
	tip_rate: number;
	/** 有店员小费掉落倍率 */
	tip_assistant_rate: number;
	/** 图标路径 */
	icon: string;
}
//#endregion

//#region club_tag
declare interface ISheet_Club_ClubTag {
	[key: string]: ISheetData_Club_ClubTag;
	1: ISheetData_Club_ClubTag;
	2: ISheetData_Club_ClubTag;
	3: ISheetData_Club_ClubTag;
	4: ISheetData_Club_ClubTag;
	5: ISheetData_Club_ClubTag;
	6: ISheetData_Club_ClubTag;
	7: ISheetData_Club_ClubTag;
	8: ISheetData_Club_ClubTag;
	9: ISheetData_Club_ClubTag;
	10: ISheetData_Club_ClubTag;
	11: ISheetData_Club_ClubTag;
}
declare interface ISheetData_Club_ClubTag extends ISheetDataBase {
	/** 标签id */
	id: number;
	/** 标签名 */
	name: number;
	/** 标签对应图片 */
	image: string;
}
//#endregion

//#region club_tip
declare interface ISheet_Club_ClubTip {
	[key: string]: ISheetData_Club_ClubTip;
	1: ISheetData_Club_ClubTip;
	2: ISheetData_Club_ClubTip;
	3: ISheetData_Club_ClubTip;
}
declare interface ISheetData_Club_ClubTip extends ISheetDataBase {
	/** 小费id */
	id: number;
	/** 小费下界（闭） */
	count: number[];
	/** 对应图片 */
	image: string;
	/** 对应数字图片 */
	image_number: string;
}
//#endregion

//#region club_room
declare interface ISheet_Club_ClubRoom {
	[key: string]: ISheetData_Club_ClubRoom[];
	260801: ISheetData_Club_ClubRoom[];
}
declare interface ISheetData_Club_ClubRoom extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 房间id */
	room_id: number;
	/** 房间名str/event */
	room_name: number;
	/** 初始是否解锁，0-解锁 1-不解锁 */
	init_locked: number;
	/** 初始麻将桌数量 */
	init_desktop_count: number;
	/** 最大麻将桌数量 */
	max_desktop_count: number;
	/** 初始台费 */
	init_desktop_fee: number;
	/** 解锁费用 */
	unlock_price: string;
	/** 台费升级id */
	desktop_fee_upgrade_id: number;
	/** 麻将桌数量升级id */
	desktop_count_upgrade: number;
	/** 房间对应正确后的心情波动 */
	room_mood: number;
}
//#endregion

//#region club_desktop_fee_upgrade
declare interface ISheet_Club_ClubDesktopFeeUpgrade {
	[key: string]: ISheetData_Club_ClubDesktopFeeUpgrade[];
	1011: ISheetData_Club_ClubDesktopFeeUpgrade[];
	1012: ISheetData_Club_ClubDesktopFeeUpgrade[];
	1013: ISheetData_Club_ClubDesktopFeeUpgrade[];
}
declare interface ISheetData_Club_ClubDesktopFeeUpgrade extends ISheetDataBase {
	/** 升级id */
	upgrade_id: number;
	/** 等级 */
	level: number;
	/** 额外增加台费 */
	additional_desktop_fee: number;
	/** 升级价格 */
	price: string;
}
//#endregion

//#region club_desktop_count_upgrade
declare interface ISheet_Club_ClubDesktopCountUpgrade {
	[key: string]: ISheetData_Club_ClubDesktopCountUpgrade[];
	1021: ISheetData_Club_ClubDesktopCountUpgrade[];
	1022: ISheetData_Club_ClubDesktopCountUpgrade[];
	1023: ISheetData_Club_ClubDesktopCountUpgrade[];
}
declare interface ISheetData_Club_ClubDesktopCountUpgrade extends ISheetDataBase {
	/** 升级id */
	upgrade_id: number;
	/** 等级 */
	level: number;
	/** 额外麻将数量 */
	additional_desktop_count: number;
	/** 升级价格 */
	price: string;
}
//#endregion