/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Desktop {
	/** unique */
	readonly matchmode: CfgExt<ISheet_Desktop_Matchmode>;
	/** 比赛宝箱  ---  unique */
	readonly chest: CfgExt<ISheet_Desktop_Chest>;
	/** 简单设定字段  ---  unique */
	readonly settings: CfgExt<ISheet_Desktop_Settings>;
	/** unique */
	readonly field_spell: CfgExt<ISheet_Desktop_FieldSpell>;
	/** unique */
	readonly friend_room: CfgExt<ISheet_Desktop_FriendRoom>;
	/** 创建比赛的预设规则  ---  unique */
	readonly tour_preset_rule: CfgExt<ISheet_Desktop_TourPresetRule>;
}

//#region matchmode
declare interface ISheet_Desktop_Matchmode {
	readonly [key: string]: ISheetData_Desktop_Matchmode;
	readonly 1: ISheetData_Desktop_Matchmode;
	readonly 2: ISheetData_Desktop_Matchmode;
	readonly 3: ISheetData_Desktop_Matchmode;
	readonly 4: ISheetData_Desktop_Matchmode;
	readonly 5: ISheetData_Desktop_Matchmode;
	readonly 6: ISheetData_Desktop_Matchmode;
	readonly 7: ISheetData_Desktop_Matchmode;
	readonly 8: ISheetData_Desktop_Matchmode;
	readonly 9: ISheetData_Desktop_Matchmode;
	readonly 10: ISheetData_Desktop_Matchmode;
	readonly 11: ISheetData_Desktop_Matchmode;
	readonly 12: ISheetData_Desktop_Matchmode;
	readonly 13: ISheetData_Desktop_Matchmode;
	readonly 14: ISheetData_Desktop_Matchmode;
	readonly 15: ISheetData_Desktop_Matchmode;
	readonly 16: ISheetData_Desktop_Matchmode;
	readonly 17: ISheetData_Desktop_Matchmode;
	readonly 18: ISheetData_Desktop_Matchmode;
	readonly 19: ISheetData_Desktop_Matchmode;
	readonly 20: ISheetData_Desktop_Matchmode;
	readonly 21: ISheetData_Desktop_Matchmode;
	readonly 22: ISheetData_Desktop_Matchmode;
	readonly 23: ISheetData_Desktop_Matchmode;
	readonly 24: ISheetData_Desktop_Matchmode;
	readonly 25: ISheetData_Desktop_Matchmode;
	readonly 26: ISheetData_Desktop_Matchmode;
	readonly 29: ISheetData_Desktop_Matchmode;
	readonly 30: ISheetData_Desktop_Matchmode;
	readonly 31: ISheetData_Desktop_Matchmode;
	readonly 32: ISheetData_Desktop_Matchmode;
	readonly 33: ISheetData_Desktop_Matchmode;
	readonly 34: ISheetData_Desktop_Matchmode;
	readonly 35: ISheetData_Desktop_Matchmode;
	readonly 36: ISheetData_Desktop_Matchmode;
	readonly 37: ISheetData_Desktop_Matchmode;
	readonly 38: ISheetData_Desktop_Matchmode;
	readonly 39: ISheetData_Desktop_Matchmode;
	readonly 40: ISheetData_Desktop_Matchmode;
	readonly 41: ISheetData_Desktop_Matchmode;
	readonly 42: ISheetData_Desktop_Matchmode;
	readonly 43: ISheetData_Desktop_Matchmode;
	readonly 44: ISheetData_Desktop_Matchmode;
	readonly 45: ISheetData_Desktop_Matchmode;
	readonly 46: ISheetData_Desktop_Matchmode;
	readonly 47: ISheetData_Desktop_Matchmode;
	readonly 48: ISheetData_Desktop_Matchmode;
	readonly 49: ISheetData_Desktop_Matchmode;
	readonly 50: ISheetData_Desktop_Matchmode;
	readonly 51: ISheetData_Desktop_Matchmode;
	readonly 52: ISheetData_Desktop_Matchmode;
	readonly 53: ISheetData_Desktop_Matchmode;
	readonly 54: ISheetData_Desktop_Matchmode;
}
declare interface ISheetData_Desktop_Matchmode extends ISheetDataBase {
	/** 匹配ID */
	readonly id: number;
	/** 是否开放 */
	readonly is_open: number;
	/** 匹配组别，相同的可以同时多个匹配 */
	readonly match_group: number;
	/** 匹配类型 */
	readonly type: number;
	/** 活动ID */
	readonly activity_id: number;
	/** 开启古役 */
	readonly open_guyi: number;
	/** 开启宝牌宝牌宝牌模式 */
	readonly dora3_mode: number;
	/** 开启配牌open模式 */
	readonly begin_open_mode: number;
	/** 开启目玉模式 */
	readonly muyu_mode: number;
	/** 开启血战到底模式 */
	readonly xuezhan_mode: number;
	/** 开启川麻模式 */
	readonly chuanma_mode: number;
	/** 开启换三张模式 */
	readonly huanzhang_mode: number;
	/** 三透牌模式 */
	readonly jiuchao_mode: number;
	/** 暗牌模式 */
	readonly reveal_discard: number;
	/** 暗牌模式 */
	readonly field_spell_mode: number;
	/** 占星模式 */
	readonly zhanxing_mode: number;
	/** 天命模式 */
	readonly tianming_mode: number;
	/** 咏唱模式 */
	readonly yongchang_mode: number;
	/** 魂之一击模式 */
	readonly hunzhiyiji_mode: number;
	/** 万象修罗 */
	readonly wanxiangxiuluo_mode: number;
	/** 背水之战 */
	readonly beishuizhizhan_mode: number;
	/** 下克上 */
	readonly xiakeshang_mode: number;
	/** 强夺之战 */
	readonly qiangduozhizhan_mode: number;
	/** 匹配房间 */
	readonly room: number;
	/** 对局模式 */
	readonly mode: number;
	/** 是否结算 */
	readonly can_sumup: number;
	readonly room_name_chs: string;
	readonly room_name_chs_t: string;
	readonly room_name_jp: string;
	readonly room_name_en: string;
	readonly room_name_kr: string;
	/** 拼接规则 */
	readonly str_rule: string;
	/** 规则文本小图 */
	readonly interval_image: string;
	/** 图片 */
	readonly rule_images: string[];
	/** 金币下限 */
	readonly glimit_floor: number;
	/** 金币上限 */
	readonly glimit_ceil: number;
	/** 入场金额 */
	readonly gcarry: number;
	/** 兑换比例 */
	readonly exchange_rate: number;
	/** 1位段位分 */
	readonly levelpoint1: number;
	/** 2位段位分 */
	readonly levelpoint2: number;
	/** 3位段位分 */
	readonly levelpoint3: number;
	/** 4位段位分 */
	readonly levelpoint4: number;
	/** 渔点 */
	readonly fish_point: number;
	/** 起始配点 */
	readonly init_point: number;
	/** 返场点数 */
	readonly back_point: number;
	/** 精算点数 */
	readonly count_point: number;
	/** 顺位补偿1 */
	readonly buchang: number[];
	/** 准入段位限制 */
	readonly level_limit: number;
	/** 准入段位限制3 */
	readonly level_limit_ceil: number;
	/** 场代 */
	readonly tip: number;
	/** 好感度 */
	readonly friendship: number;
	/** 宝箱ID */
	readonly chest_id: number;
	/** 宝箱经验增加 */
	readonly chest_exp_add: number[];
	/** 是否开启等级匹配 */
	readonly level_match: number;
	/** 等级匹配范围 */
	readonly level_match_range: number;
	/** 等级匹配最高等级 */
	readonly level_match_max: number;
}
//#endregion

//#region chest
declare interface ISheet_Desktop_Chest {
	readonly [key: string]: ISheetData_Desktop_Chest;
	readonly 1: ISheetData_Desktop_Chest;
	readonly 2: ISheetData_Desktop_Chest;
	readonly 3: ISheetData_Desktop_Chest;
	readonly 4: ISheetData_Desktop_Chest;
	readonly 5: ISheetData_Desktop_Chest;
}
declare interface ISheetData_Desktop_Chest extends ISheetDataBase {
	/** 宝箱ID */
	readonly id: number;
	/** 经验条长度 */
	readonly exp_step: number;
	/** 宝箱名字 */
	readonly name_chs: string;
	readonly name_chs_t: string;
	readonly name_jp: string;
	readonly name_en: string;
	readonly name_kr: string;
	/** 宝箱图标 */
	readonly icon: string;
	/** 奖池id */
	readonly reward_pool: number;
	/** 抽取数量 */
	readonly select_count: number;
	/** 是否可以重复 */
	readonly repeated: number;
}
//#endregion

//#region settings
declare interface ISheet_Desktop_Settings {
	readonly [key: string]: ISheetData_Desktop_Settings;
	readonly account_friendship_bar_length: ISheetData_Desktop_Settings;
	readonly account_friendship_bar_reward_id: ISheetData_Desktop_Settings;
}
declare interface ISheetData_Desktop_Settings extends ISheetDataBase {
	readonly key: string;
	readonly int_value: number;
}
//#endregion

//#region field_spell
declare interface ISheet_Desktop_FieldSpell {
	readonly [key: string]: ISheetData_Desktop_FieldSpell;
	readonly 1: ISheetData_Desktop_FieldSpell;
	readonly 2: ISheetData_Desktop_FieldSpell;
	readonly 3: ISheetData_Desktop_FieldSpell;
	readonly 4: ISheetData_Desktop_FieldSpell;
	readonly 5: ISheetData_Desktop_FieldSpell;
	readonly 100: ISheetData_Desktop_FieldSpell;
	readonly 200: ISheetData_Desktop_FieldSpell;
	readonly 300: ISheetData_Desktop_FieldSpell;
	readonly 400: ISheetData_Desktop_FieldSpell;
	readonly 500: ISheetData_Desktop_FieldSpell;
	readonly 10000: ISheetData_Desktop_FieldSpell;
	readonly 20000: ISheetData_Desktop_FieldSpell;
	readonly 30000: ISheetData_Desktop_FieldSpell;
	readonly 40000: ISheetData_Desktop_FieldSpell;
	readonly 50000: ISheetData_Desktop_FieldSpell;
}
declare interface ISheetData_Desktop_FieldSpell extends ISheetDataBase {
	/** 位置，取值范围[1,3] */
	readonly field: number;
	/** id值，取值范围[1,5] */
	readonly id: number;
	/** 前端用字段 */
	readonly cardname: string;
	/** 前端排序用卡编号 */
	readonly sord_card_id: number;
}
//#endregion

//#region friend_room
declare interface ISheet_Desktop_FriendRoom {
	readonly [key: string]: ISheetData_Desktop_FriendRoom;
	readonly 1: ISheetData_Desktop_FriendRoom;
	readonly 2: ISheetData_Desktop_FriendRoom;
	readonly 3: ISheetData_Desktop_FriendRoom;
	readonly 4: ISheetData_Desktop_FriendRoom;
	readonly 5: ISheetData_Desktop_FriendRoom;
	readonly 6: ISheetData_Desktop_FriendRoom;
	readonly 7: ISheetData_Desktop_FriendRoom;
	readonly 8: ISheetData_Desktop_FriendRoom;
	readonly 9: ISheetData_Desktop_FriendRoom;
	readonly 10: ISheetData_Desktop_FriendRoom;
	readonly 11: ISheetData_Desktop_FriendRoom;
	readonly 12: ISheetData_Desktop_FriendRoom;
	readonly 13: ISheetData_Desktop_FriendRoom;
	readonly 14: ISheetData_Desktop_FriendRoom;
	readonly 15: ISheetData_Desktop_FriendRoom;
	readonly 16: ISheetData_Desktop_FriendRoom;
	readonly 17: ISheetData_Desktop_FriendRoom;
}
declare interface ISheetData_Desktop_FriendRoom extends ISheetDataBase {
	/** 友人房模式 */
	readonly id: number;
	/** 对应activity_room,三人四人无 */
	readonly pre_rule: string;
	/** 数字小的在前 */
	readonly sort: number;
	/** 对局名 */
	readonly str_name: string;
	/** 拼接规则 */
	readonly str_rule: string;
	/** 创建时允许玩家配置局数 */
	readonly set_jushu: number;
	/** 图片 */
	readonly rule_images: string[];
}
//#endregion

//#region tour_preset_rule
declare interface ISheet_Desktop_TourPresetRule {
	readonly [key: string]: ISheetData_Desktop_TourPresetRule;
	readonly 1: ISheetData_Desktop_TourPresetRule;
	readonly 2: ISheetData_Desktop_TourPresetRule;
	readonly 3: ISheetData_Desktop_TourPresetRule;
	readonly 4: ISheetData_Desktop_TourPresetRule;
	readonly 5: ISheetData_Desktop_TourPresetRule;
	readonly 6: ISheetData_Desktop_TourPresetRule;
	readonly 7: ISheetData_Desktop_TourPresetRule;
	readonly 101: ISheetData_Desktop_TourPresetRule;
}
declare interface ISheetData_Desktop_TourPresetRule extends ISheetDataBase {
	readonly id: number;
	/** 预设规则名的strID */
	readonly preset_rule: number;
	/** 默认初始点数 */
	readonly params: number[];
}
//#endregion