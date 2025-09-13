declare interface ITable_Desktop {
	matchmode: ISheet_Desktop_Matchmode;
	chest: ISheet_Desktop_Chest;
	settings: ISheet_Desktop_Settings;
	field_spell: ISheet_Desktop_FieldSpell;
	friend_room: ISheet_Desktop_FriendRoom;
	tour_preset_rule: ISheet_Desktop_TourPresetRule;
}

//#region matchmode --- unique
declare interface ISheet_Desktop_Matchmode {
	rows: ISheetData_Desktop_Matchmode[];
	1: ISheetData_Desktop_Matchmode;
	2: ISheetData_Desktop_Matchmode;
	3: ISheetData_Desktop_Matchmode;
	4: ISheetData_Desktop_Matchmode;
	5: ISheetData_Desktop_Matchmode;
	6: ISheetData_Desktop_Matchmode;
	7: ISheetData_Desktop_Matchmode;
	8: ISheetData_Desktop_Matchmode;
	9: ISheetData_Desktop_Matchmode;
	10: ISheetData_Desktop_Matchmode;
	11: ISheetData_Desktop_Matchmode;
	12: ISheetData_Desktop_Matchmode;
	13: ISheetData_Desktop_Matchmode;
	14: ISheetData_Desktop_Matchmode;
	15: ISheetData_Desktop_Matchmode;
	16: ISheetData_Desktop_Matchmode;
	17: ISheetData_Desktop_Matchmode;
	18: ISheetData_Desktop_Matchmode;
	19: ISheetData_Desktop_Matchmode;
	20: ISheetData_Desktop_Matchmode;
	21: ISheetData_Desktop_Matchmode;
	22: ISheetData_Desktop_Matchmode;
	23: ISheetData_Desktop_Matchmode;
	24: ISheetData_Desktop_Matchmode;
	25: ISheetData_Desktop_Matchmode;
	26: ISheetData_Desktop_Matchmode;
	29: ISheetData_Desktop_Matchmode;
	30: ISheetData_Desktop_Matchmode;
	31: ISheetData_Desktop_Matchmode;
	32: ISheetData_Desktop_Matchmode;
	33: ISheetData_Desktop_Matchmode;
	34: ISheetData_Desktop_Matchmode;
	35: ISheetData_Desktop_Matchmode;
	36: ISheetData_Desktop_Matchmode;
	37: ISheetData_Desktop_Matchmode;
	38: ISheetData_Desktop_Matchmode;
	39: ISheetData_Desktop_Matchmode;
	40: ISheetData_Desktop_Matchmode;
	41: ISheetData_Desktop_Matchmode;
	42: ISheetData_Desktop_Matchmode;
	43: ISheetData_Desktop_Matchmode;
	44: ISheetData_Desktop_Matchmode;
	45: ISheetData_Desktop_Matchmode;
	46: ISheetData_Desktop_Matchmode;
	47: ISheetData_Desktop_Matchmode;
	48: ISheetData_Desktop_Matchmode;
	49: ISheetData_Desktop_Matchmode;
	50: ISheetData_Desktop_Matchmode;
	51: ISheetData_Desktop_Matchmode;
	52: ISheetData_Desktop_Matchmode;
}
declare interface ISheetData_Desktop_Matchmode {
	/** 匹配ID */
	id: number;
	/** 是否开放 */
	is_open: number;
	/** 匹配组别，相同的可以同时多个匹配 */
	match_group: number;
	/** 匹配类型 */
	type: number;
	/** 活动ID */
	activity_id: number;
	/** 开启古役 */
	open_guyi: number;
	/** 开启宝牌宝牌宝牌模式 */
	dora3_mode: number;
	/** 开启配牌open模式 */
	begin_open_mode: number;
	/** 开启目玉模式 */
	muyu_mode: number;
	/** 开启血战到底模式 */
	xuezhan_mode: number;
	/** 开启川麻模式 */
	chuanma_mode: number;
	/** 开启换三张模式 */
	huanzhang_mode: number;
	/** 三透牌模式 */
	jiuchao_mode: number;
	/** 暗牌模式 */
	reveal_discard: number;
	/** 暗牌模式 */
	field_spell_mode: number;
	/** 占星模式 */
	zhanxing_mode: number;
	/** 天命模式 */
	tianming_mode: number;
	/** 咏唱模式 */
	yongchang_mode: number;
	/** 魂之一击模式 */
	hunzhiyiji_mode: number;
	/** 万象修罗 */
	wanxiangxiuluo_mode: number;
	/** 背水之战 */
	beishuizhizhan_mode: number;
	/** 匹配房间 */
	room: number;
	/** 对局模式 */
	mode: number;
	/** 是否结算 */
	can_sumup: number;
	room_name_chs: string;
	room_name_chs_t: string;
	room_name_jp: string;
	room_name_en: string;
	room_name_kr: string;
	/** 拼接规则 */
	str_rule: string;
	/** 规则文本小图 */
	interval_image: string;
	/** 图片 */
	rule_images: string[];
	/** 金币下限 */
	glimit_floor: number;
	/** 金币上限 */
	glimit_ceil: number;
	/** 入场金额 */
	gcarry: number;
	/** 兑换比例 */
	exchange_rate: number;
	/** 1位段位分 */
	levelpoint1: number;
	/** 2位段位分 */
	levelpoint2: number;
	/** 3位段位分 */
	levelpoint3: number;
	/** 4位段位分 */
	levelpoint4: number;
	/** 渔点 */
	fish_point: number;
	/** 起始配点 */
	init_point: number;
	/** 返场点数 */
	back_point: number;
	/** 精算点数 */
	count_point: number;
	/** 顺位补偿1 */
	buchang: number[];
	/** 准入段位限制 */
	level_limit: number;
	/** 准入段位限制3 */
	level_limit_ceil: number;
	/** 场代 */
	tip: number;
	/** 好感度 */
	friendship: number;
	/** 宝箱ID */
	chest_id: number;
	/** 宝箱经验增加 */
	chest_exp_add: number[];
	/** 是否开启等级匹配 */
	level_match: number;
	/** 等级匹配范围 */
	level_match_range: number;
	/** 等级匹配最高等级 */
	level_match_max: number;
}
//#endregion

//#region chest --- unique
declare interface ISheet_Desktop_Chest {
	rows: ISheetData_Desktop_Chest[];
	1: ISheetData_Desktop_Chest;
	2: ISheetData_Desktop_Chest;
	3: ISheetData_Desktop_Chest;
	4: ISheetData_Desktop_Chest;
	5: ISheetData_Desktop_Chest;
}
declare interface ISheetData_Desktop_Chest {
	/** 宝箱ID */
	id: number;
	/** 经验条长度 */
	exp_step: number;
	/** 宝箱名字 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 宝箱图标 */
	icon: string;
	/** 奖池id */
	reward_pool: number;
	/** 抽取数量 */
	select_count: number;
	/** 是否可以重复 */
	repeated: number;
}
//#endregion

//#region settings --- kv
declare interface ISheet_Desktop_Settings {
	rows: ISheetData_Desktop_Settings[];
	account_friendship_bar_length: ISheetData_Desktop_Settings;
	account_friendship_bar_reward_id: ISheetData_Desktop_Settings;
}
declare interface ISheetData_Desktop_Settings {
	key: string;
	int_value: number;
}
//#endregion

//#region field_spell --- unique
declare interface ISheet_Desktop_FieldSpell {
	rows: ISheetData_Desktop_FieldSpell[];
	1: ISheetData_Desktop_FieldSpell;
	2: ISheetData_Desktop_FieldSpell;
	3: ISheetData_Desktop_FieldSpell;
	4: ISheetData_Desktop_FieldSpell;
	5: ISheetData_Desktop_FieldSpell;
	100: ISheetData_Desktop_FieldSpell;
	200: ISheetData_Desktop_FieldSpell;
	300: ISheetData_Desktop_FieldSpell;
	400: ISheetData_Desktop_FieldSpell;
	500: ISheetData_Desktop_FieldSpell;
	10000: ISheetData_Desktop_FieldSpell;
	20000: ISheetData_Desktop_FieldSpell;
	30000: ISheetData_Desktop_FieldSpell;
	40000: ISheetData_Desktop_FieldSpell;
	50000: ISheetData_Desktop_FieldSpell;
}
declare interface ISheetData_Desktop_FieldSpell {
	/** 位置，取值范围[1,3] */
	field: number;
	/** id值，取值范围[1,5] */
	id: number;
	/** 随机权重 */
	weight: number;
	/** 前端用字段 */
	cardname: string;
	/** 前端排序用卡编号 */
	sord_card_id: number;
}
//#endregion

//#region friend_room --- unique
declare interface ISheet_Desktop_FriendRoom {
	rows: ISheetData_Desktop_FriendRoom[];
	1: ISheetData_Desktop_FriendRoom;
	2: ISheetData_Desktop_FriendRoom;
	3: ISheetData_Desktop_FriendRoom;
	4: ISheetData_Desktop_FriendRoom;
	5: ISheetData_Desktop_FriendRoom;
	6: ISheetData_Desktop_FriendRoom;
	7: ISheetData_Desktop_FriendRoom;
	8: ISheetData_Desktop_FriendRoom;
	9: ISheetData_Desktop_FriendRoom;
	10: ISheetData_Desktop_FriendRoom;
	11: ISheetData_Desktop_FriendRoom;
	12: ISheetData_Desktop_FriendRoom;
	13: ISheetData_Desktop_FriendRoom;
	14: ISheetData_Desktop_FriendRoom;
	15: ISheetData_Desktop_FriendRoom;
}
declare interface ISheetData_Desktop_FriendRoom {
	/** 友人房模式 */
	id: number;
	/** 对应activity_room,三人四人无 */
	pre_rule: string;
	/** 数字小的在前 */
	sort: number;
	/** 对局名 */
	str_name: string;
	/** 拼接规则 */
	str_rule: string;
	/** 创建时允许玩家配置局数 */
	set_jushu: number;
	/** 图片 */
	rule_images: string[];
}
//#endregion

//#region tour_preset_rule --- unique
declare interface ISheet_Desktop_TourPresetRule {
	rows: ISheetData_Desktop_TourPresetRule[];
	1: ISheetData_Desktop_TourPresetRule;
	2: ISheetData_Desktop_TourPresetRule;
	3: ISheetData_Desktop_TourPresetRule;
	4: ISheetData_Desktop_TourPresetRule;
	5: ISheetData_Desktop_TourPresetRule;
	6: ISheetData_Desktop_TourPresetRule;
	7: ISheetData_Desktop_TourPresetRule;
	101: ISheetData_Desktop_TourPresetRule;
}
declare interface ISheetData_Desktop_TourPresetRule {
	id: number;
	/** 预设规则名的strID */
	preset_rule: number;
	/** 默认初始点数 */
	params: number[];
}
//#endregion