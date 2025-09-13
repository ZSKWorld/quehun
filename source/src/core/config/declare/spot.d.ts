declare interface ITable_Spot {
	/** 剧情表  ---  group */
	spot: CfgExt<ISheet_Spot_Spot>;
	/** 奖励表  ---  unique */
	rewards: CfgExt<ISheet_Spot_Rewards>;
	/** 活动剧情表  ---  unique */
	event: CfgExt<ISheet_Spot_Event>;
	/** 卫星角色增量表  ---  unique */
	character_spot: CfgExt<ISheet_Spot_CharacterSpot>;
	/** 卫星角色及特殊皮肤增量表  ---  unique */
	skin_spot: CfgExt<ISheet_Spot_SkinSpot>;
	/** 编辑器用到的音效id列表  ---  unique */
	audio_spot: CfgExt<ISheet_Spot_AudioSpot>;
}

//#region spot
declare interface ISheet_Spot_Spot {
	200001: ISheetData_Spot_Spot[];
	200002: ISheetData_Spot_Spot[];
	200003: ISheetData_Spot_Spot[];
	200004: ISheetData_Spot_Spot[];
	200005: ISheetData_Spot_Spot[];
	200006: ISheetData_Spot_Spot[];
	200007: ISheetData_Spot_Spot[];
	200008: ISheetData_Spot_Spot[];
	200013: ISheetData_Spot_Spot[];
	200014: ISheetData_Spot_Spot[];
	200016: ISheetData_Spot_Spot[];
	200017: ISheetData_Spot_Spot[];
	200018: ISheetData_Spot_Spot[];
	200020: ISheetData_Spot_Spot[];
	200021: ISheetData_Spot_Spot[];
	200022: ISheetData_Spot_Spot[];
	200025: ISheetData_Spot_Spot[];
	200094: ISheetData_Spot_Spot[];
}
declare interface ISheetData_Spot_Spot {
	/** 角色ID */
	id: number;
	/** 剧情id */
	unique_id: number;
	/** 剧情类型 */
	type: number;
	/** 剧情名字 */
	name_chs: string;
	name_chs_t: string;
	/** 剧情名字JP */
	name_jp: string;
	/** 剧情名字en */
	name_en: string;
	/** 剧情名字kr */
	name_kr: string;
	/** 解锁条件 */
	level_limit: number;
	/** 缔结契约 */
	is_married: number;
	/** 解锁文字 */
	lock_tips_chs: string;
	lock_tips_chs_t: string;
	/** 解锁文字JP */
	lock_tips_jp: string;
	/** 解锁文字EN */
	lock_tips_en: string;
	/** 解锁文字kr */
	lock_tips_kr: string;
	/** 排序 */
	queque: number;
	/** 文本剧情的内容CH */
	content_chs: string;
	content_chs_t: string;
	/** 文本剧情的内容JP */
	content_jp: string;
	/** 文本剧情的内容En */
	content_en: string;
	/** 文本剧情的内容kr */
	content_kr: string;
	/** 交互剧情的路径 */
	content_path: string;
	/** 结局奖励id */
	jieju: number[];
}
//#endregion

//#region rewards
declare interface ISheet_Spot_Rewards {
	300041: ISheetData_Spot_Rewards;
	300042: ISheetData_Spot_Rewards;
	300051: ISheetData_Spot_Rewards;
	300052: ISheetData_Spot_Rewards;
	300061: ISheetData_Spot_Rewards;
	300062: ISheetData_Spot_Rewards;
	400041: ISheetData_Spot_Rewards;
	400042: ISheetData_Spot_Rewards;
	400051: ISheetData_Spot_Rewards;
	400052: ISheetData_Spot_Rewards;
	400053: ISheetData_Spot_Rewards;
	400061: ISheetData_Spot_Rewards;
	400062: ISheetData_Spot_Rewards;
	500041: ISheetData_Spot_Rewards;
	500042: ISheetData_Spot_Rewards;
	500051: ISheetData_Spot_Rewards;
	500052: ISheetData_Spot_Rewards;
	500053: ISheetData_Spot_Rewards;
	500061: ISheetData_Spot_Rewards;
	500062: ISheetData_Spot_Rewards;
	500063: ISheetData_Spot_Rewards;
	600041: ISheetData_Spot_Rewards;
	600042: ISheetData_Spot_Rewards;
	600051: ISheetData_Spot_Rewards;
	600052: ISheetData_Spot_Rewards;
	600053: ISheetData_Spot_Rewards;
	600061: ISheetData_Spot_Rewards;
	600062: ISheetData_Spot_Rewards;
	600063: ISheetData_Spot_Rewards;
	700011: ISheetData_Spot_Rewards;
	700012: ISheetData_Spot_Rewards;
	700021: ISheetData_Spot_Rewards;
	700022: ISheetData_Spot_Rewards;
	700031: ISheetData_Spot_Rewards;
	700032: ISheetData_Spot_Rewards;
	700033: ISheetData_Spot_Rewards;
	800041: ISheetData_Spot_Rewards;
	800042: ISheetData_Spot_Rewards;
	800043: ISheetData_Spot_Rewards;
	800051: ISheetData_Spot_Rewards;
	800052: ISheetData_Spot_Rewards;
	800053: ISheetData_Spot_Rewards;
	800061: ISheetData_Spot_Rewards;
	800062: ISheetData_Spot_Rewards;
	800063: ISheetData_Spot_Rewards;
	1000041: ISheetData_Spot_Rewards;
	1000042: ISheetData_Spot_Rewards;
	1000043: ISheetData_Spot_Rewards;
	1000051: ISheetData_Spot_Rewards;
	1000052: ISheetData_Spot_Rewards;
	1000061: ISheetData_Spot_Rewards;
	1000062: ISheetData_Spot_Rewards;
	1300041: ISheetData_Spot_Rewards;
	1300042: ISheetData_Spot_Rewards;
	1300043: ISheetData_Spot_Rewards;
	1300051: ISheetData_Spot_Rewards;
	1300052: ISheetData_Spot_Rewards;
	1300061: ISheetData_Spot_Rewards;
	1300062: ISheetData_Spot_Rewards;
	1400041: ISheetData_Spot_Rewards;
	1400042: ISheetData_Spot_Rewards;
	1400051: ISheetData_Spot_Rewards;
	1400052: ISheetData_Spot_Rewards;
	1400053: ISheetData_Spot_Rewards;
	1400061: ISheetData_Spot_Rewards;
	1400062: ISheetData_Spot_Rewards;
	1600041: ISheetData_Spot_Rewards;
	1600042: ISheetData_Spot_Rewards;
	1600051: ISheetData_Spot_Rewards;
	1600052: ISheetData_Spot_Rewards;
	1600061: ISheetData_Spot_Rewards;
	1600062: ISheetData_Spot_Rewards;
	1600063: ISheetData_Spot_Rewards;
	1700041: ISheetData_Spot_Rewards;
	1700042: ISheetData_Spot_Rewards;
	1700051: ISheetData_Spot_Rewards;
	1700052: ISheetData_Spot_Rewards;
	1700053: ISheetData_Spot_Rewards;
	1700061: ISheetData_Spot_Rewards;
	1700062: ISheetData_Spot_Rewards;
	1800041: ISheetData_Spot_Rewards;
	1800042: ISheetData_Spot_Rewards;
	1800051: ISheetData_Spot_Rewards;
	1800052: ISheetData_Spot_Rewards;
	1800053: ISheetData_Spot_Rewards;
	1800061: ISheetData_Spot_Rewards;
	1800062: ISheetData_Spot_Rewards;
	2000041: ISheetData_Spot_Rewards;
	2000042: ISheetData_Spot_Rewards;
	2000051: ISheetData_Spot_Rewards;
	2000052: ISheetData_Spot_Rewards;
	2000061: ISheetData_Spot_Rewards;
	2000062: ISheetData_Spot_Rewards;
	2100041: ISheetData_Spot_Rewards;
	2100042: ISheetData_Spot_Rewards;
	2100051: ISheetData_Spot_Rewards;
	2100052: ISheetData_Spot_Rewards;
	2100061: ISheetData_Spot_Rewards;
	2100062: ISheetData_Spot_Rewards;
	2100063: ISheetData_Spot_Rewards;
	2200041: ISheetData_Spot_Rewards;
	2200042: ISheetData_Spot_Rewards;
	2200051: ISheetData_Spot_Rewards;
	2200052: ISheetData_Spot_Rewards;
	2200061: ISheetData_Spot_Rewards;
	2200062: ISheetData_Spot_Rewards;
	2500041: ISheetData_Spot_Rewards;
	2500042: ISheetData_Spot_Rewards;
	2500043: ISheetData_Spot_Rewards;
	2500051: ISheetData_Spot_Rewards;
	2500052: ISheetData_Spot_Rewards;
	2500061: ISheetData_Spot_Rewards;
	2500062: ISheetData_Spot_Rewards;
	2500063: ISheetData_Spot_Rewards;
	9400041: ISheetData_Spot_Rewards;
	9400042: ISheetData_Spot_Rewards;
	9400051: ISheetData_Spot_Rewards;
	9400052: ISheetData_Spot_Rewards;
	9400061: ISheetData_Spot_Rewards;
	9400062: ISheetData_Spot_Rewards;
	20000041: ISheetData_Spot_Rewards;
	20000042: ISheetData_Spot_Rewards;
	20000051: ISheetData_Spot_Rewards;
	20000052: ISheetData_Spot_Rewards;
	20000053: ISheetData_Spot_Rewards;
	20000061: ISheetData_Spot_Rewards;
	20000062: ISheetData_Spot_Rewards;
}
declare interface ISheetData_Spot_Rewards {
	/** 奖励ID */
	id: number;
	/** 结局种类1好 2普通 3坏 */
	type: number;
	/** 获得条件 */
	content_chs: string;
	content_chs_t: string;
	content_jp: string;
	content_en: string;
	content_kr: string;
	/** 奖励物品 */
	reward: string;
}
//#endregion

//#region event
declare interface ISheet_Spot_Event {
	118201: ISheetData_Spot_Event;
	118202: ISheetData_Spot_Event;
	118203: ISheetData_Spot_Event;
	118204: ISheetData_Spot_Event;
	118205: ISheetData_Spot_Event;
	118206: ISheetData_Spot_Event;
	123401: ISheetData_Spot_Event;
	123402: ISheetData_Spot_Event;
	22040701: ISheetData_Spot_Event;
	22040702: ISheetData_Spot_Event;
	22040703: ISheetData_Spot_Event;
	22110601: ISheetData_Spot_Event;
	22110602: ISheetData_Spot_Event;
	22110603: ISheetData_Spot_Event;
	23040701: ISheetData_Spot_Event;
	23040702: ISheetData_Spot_Event;
	23040703: ISheetData_Spot_Event;
	23111601: ISheetData_Spot_Event;
	23111602: ISheetData_Spot_Event;
	23111603: ISheetData_Spot_Event;
	23111604: ISheetData_Spot_Event;
	24040101: ISheetData_Spot_Event;
	24040102: ISheetData_Spot_Event;
	24040103: ISheetData_Spot_Event;
	24040104: ISheetData_Spot_Event;
	24040105: ISheetData_Spot_Event;
}
declare interface ISheetData_Spot_Event {
	/** 唯一id */
	id: number;
	/** 活动ID */
	activity_id: number;
	/** 解锁道具id */
	key_item_id: number;
	/** 解限所需数量，0为不限制 */
	key_amount: number;
	/** 解锁基础任务id */
	unlock_task_id: number;
	/** 排序从小到大 */
	sort: number;
	/** 交互剧情的解锁时间 */
	unlock_time: string;
	/** 交互剧情的路径 */
	content_path: string;
	/** 标题 */
	title_chs: string;
	title_chs_t: string;
	title_jp: string;
	title_en: string;
	title_kr: string;
	/** 副标题 */
	subtitle_chs: string;
	subtitle_chs_t: string;
	subtitle_jp: string;
	subtitle_en: string;
	subtitle_kr: string;
	/** 简介 */
	content_chs: string;
	content_chs_t: string;
	content_jp: string;
	content_en: string;
	content_kr: string;
	/** 分支1id */
	ending_id: number[];
	/** 封面图 */
	ending_res: string;
}
//#endregion

//#region character_spot
declare interface ISheet_Spot_CharacterSpot {
	20000104: ISheetData_Spot_CharacterSpot;
	20000105: ISheetData_Spot_CharacterSpot;
	20009998: ISheetData_Spot_CharacterSpot;
	20009999: ISheetData_Spot_CharacterSpot;
}
declare interface ISheetData_Spot_CharacterSpot {
	id: number;
	/** 递增 数字大的在后 */
	sort: number;
	/** 名称 */
	name_chs: string;
	/** 名称 */
	name_chs2: string;
	name_chs_t: string;
	name_chs_t2: string;
	name_jp: string;
	name_jp2: string;
	name_en: string;
	name_kr: string;
	/** 是否开放 */
	open: number;
	/** 初始皮肤 */
	init_skin: number;
	/** 满羁绊皮肤 */
	full_fetter_skin: number;
	/** 默认手 */
	hand: number;
	/** 喜好 */
	favorite: number;
	/** 5星突破材料 1-8 */
	star_5_material: string;
	/** 5星突破铜币消耗 */
	star_5_cost: number;
	/** 是否可缔结契约 */
	can_marry: number;
	/** 重复兑换物品ID */
	exchange_item_id: number;
	/** 重复兑换物品数量 */
	exchange_item_num: number;
	/** 表情 */
	emo: string;
	/** 语音库 */
	sound: number;
	/** 声音音效修正 */
	sound_volume: number;
	/** 性别,1女，2:男 */
	sex: number;
	/** 身高 */
	desc_stature_chs: string;
	/** 身高 */
	desc_stature_chs_t: string;
	desc_stature_jp: string;
	desc_stature_en: string;
	desc_stature_kr: string;
	/** 生日 */
	desc_birth_chs: string;
	desc_birth_chs_t: string;
	desc_birth_jp: string;
	desc_birth_en: string;
	desc_birth_kr: string;
	/** 年龄 */
	desc_age_chs: string;
	desc_age_chs_t: string;
	desc_age_jp: string;
	desc_age_en: string;
	desc_age_kr: string;
	/** 血型 */
	desc_bloodtype_chs: string;
	/** 血型 */
	desc_bloodtype_chs_t: string;
	/** 血型 */
	desc_bloodtype_jp: string;
	/** 血型 */
	desc_bloodtype_en: string;
	/** 血型 */
	desc_bloodtype_kr: string;
	/** 声优 */
	desc_cv_chs: string;
	desc_cv_chs_t: string;
	desc_cv_jp: string;
	desc_cv_en: string;
	desc_cv_kr: string;
	/** 爱好 */
	desc_hobby_chs: string;
	desc_hobby_chs_t: string;
	desc_hobby_jp: string;
	desc_hobby_en: string;
	desc_hobby_kr: string;
	/** 档案描述 */
	desc_chs: string;
	desc_item_chs: string;
	desc_chs_t: string;
	desc_item_chs_t: string;
	desc_jp: string;
	desc_item_jp: string;
	desc_en: string;
	desc_item_en: string;
	desc_kr: string;
	desc_item_kr: string;
	/** 联动标记，12的生日=年级，其他的不替换 */
	collaboration: number;
	/** 皮肤库 */
	skin_lib: number[];
	/** UR标记 */
	ur: number;
	/** 默认自带和牌 */
	ur_ron: number;
	/** 默认自带立直 */
	ur_liqi: number;
	ur_cutin: string;
	/** 期间限定雀士标签 */
	limited: number;
	/** 抽卡界面固定在左侧 */
	treasure_sp: number;
}
//#endregion

//#region skin_spot
declare interface ISheet_Spot_SkinSpot {
	401899: ISheetData_Spot_SkinSpot;
	404699: ISheetData_Spot_SkinSpot;
	409199: ISheetData_Spot_SkinSpot;
	40010401: ISheetData_Spot_SkinSpot;
	40010501: ISheetData_Spot_SkinSpot;
	40999801: ISheetData_Spot_SkinSpot;
	40999901: ISheetData_Spot_SkinSpot;
}
declare interface ISheetData_Spot_SkinSpot {
	id: number;
	/** 是不是原皮 */
	type: number;
	/** 名称 */
	name_chs: string;
	name_chs_t: string;
	name_jp: string;
	name_en: string;
	name_kr: string;
	/** 描述 */
	desc_chs: string;
	/** 描述 */
	desc_chs_t: string;
	desc_jp: string;
	desc_en: string;
	desc_kr: string;
	/** 角色id索引 */
	character_id: number;
	/** 未解锁的提示 */
	lock_tips_chs: string;
	lock_tips_chs_t: string;
	lock_tips_jp: string;
	lock_tips_en: string;
	lock_tips_kr: string;
	/** 文件夹路径 */
	path: string;
	/** 重复兑换物品ID */
	exchange_item_id: number;
	/** 重复兑换物品数量 */
	exchange_item_num: number;
	/** 立绘朝向1左0右 */
	direction: number;
	/** 和服不可翻转 */
	no_reverse: number;
	/** 全局禁止反转，针对特殊角色 */
	lock_reverse: number;
	/** 剧情用偏移 */
	offset_x: number;
	/** 剧情用偏移 */
	offset_y: number;
	/** 剧情用偏移 */
	spot_scale: string;
	/** 生效时间，此服务端时间后才开始展示 */
	effective_time: string;
	/** 大厅偏移数据 */
	lobby_offset: string;
	/** 偏移数据 */
	liaoshe_offset: string;
	/** 偏移数据 */
	shop_offset: string;
	/** 偏移数据 */
	win_offset: string;
	/** 偏移数据 */
	gameend_offset: string;
	/** 偏移数据 */
	starup_offset: string;
	/** 偏移数据 */
	treasure_offset: string;
	/** 偏移数据 */
	ck_full_0_offset: string;
	/** 偏移数据 */
	ck_full_1_offset: string;
	/** 偏移数据 */
	ck_full_2_offset: string;
	/** 偏移数据 */
	ck_full_3_offset: string;
	/** 偏移数据 */
	ck_full_single_offset: string;
	/** 偏移数据 */
	ck_half_0_offset: string;
	/** 偏移数据 */
	ck_half_1_offset: string;
	/** 偏移数据 */
	ck_half_2_offset: string;
	/** 偏移数据 */
	ck_half_3_offset: string;
	/** 偏移数据 */
	ck_half_single_offset: string;
	smallhead_x: number;
	smallhead_y: number;
	smallhead_width: number;
	full_x: number;
	full_y: number;
	full_width: number;
	full_height: number;
	half_x: number;
	half_y: number;
	half_width: number;
	half_height: number;
	spine_type: number;
	spine_width: number;
	spine_height: number;
	pivot_x: number;
	pivot_y: number;
	idle: string;
	/** 三项span动画时间 */
	greeting: number;
	celebrate: number;
	click: number;
	greeting_init: number;
	click2: number;
	celebrate_idle: number;
	illust_data: string;
}
//#endregion

//#region audio_spot
declare interface ISheet_Spot_AudioSpot {
	101: ISheetData_Spot_AudioSpot;
	102: ISheetData_Spot_AudioSpot;
	103: ISheetData_Spot_AudioSpot;
	104: ISheetData_Spot_AudioSpot;
	105: ISheetData_Spot_AudioSpot;
	106: ISheetData_Spot_AudioSpot;
	107: ISheetData_Spot_AudioSpot;
	108: ISheetData_Spot_AudioSpot;
	109: ISheetData_Spot_AudioSpot;
	110: ISheetData_Spot_AudioSpot;
	111: ISheetData_Spot_AudioSpot;
	112: ISheetData_Spot_AudioSpot;
	113: ISheetData_Spot_AudioSpot;
	114: ISheetData_Spot_AudioSpot;
	115: ISheetData_Spot_AudioSpot;
	116: ISheetData_Spot_AudioSpot;
	117: ISheetData_Spot_AudioSpot;
	118: ISheetData_Spot_AudioSpot;
	119: ISheetData_Spot_AudioSpot;
	120: ISheetData_Spot_AudioSpot;
	121: ISheetData_Spot_AudioSpot;
	122: ISheetData_Spot_AudioSpot;
	123: ISheetData_Spot_AudioSpot;
	124: ISheetData_Spot_AudioSpot;
	125: ISheetData_Spot_AudioSpot;
	126: ISheetData_Spot_AudioSpot;
	127: ISheetData_Spot_AudioSpot;
	128: ISheetData_Spot_AudioSpot;
	129: ISheetData_Spot_AudioSpot;
	130: ISheetData_Spot_AudioSpot;
	131: ISheetData_Spot_AudioSpot;
	132: ISheetData_Spot_AudioSpot;
	133: ISheetData_Spot_AudioSpot;
	134: ISheetData_Spot_AudioSpot;
	135: ISheetData_Spot_AudioSpot;
	136: ISheetData_Spot_AudioSpot;
	137: ISheetData_Spot_AudioSpot;
	138: ISheetData_Spot_AudioSpot;
	139: ISheetData_Spot_AudioSpot;
	140: ISheetData_Spot_AudioSpot;
	141: ISheetData_Spot_AudioSpot;
	142: ISheetData_Spot_AudioSpot;
	143: ISheetData_Spot_AudioSpot;
	144: ISheetData_Spot_AudioSpot;
	145: ISheetData_Spot_AudioSpot;
	146: ISheetData_Spot_AudioSpot;
	147: ISheetData_Spot_AudioSpot;
	148: ISheetData_Spot_AudioSpot;
	149: ISheetData_Spot_AudioSpot;
	150: ISheetData_Spot_AudioSpot;
	151: ISheetData_Spot_AudioSpot;
	152: ISheetData_Spot_AudioSpot;
	153: ISheetData_Spot_AudioSpot;
	154: ISheetData_Spot_AudioSpot;
	155: ISheetData_Spot_AudioSpot;
	156: ISheetData_Spot_AudioSpot;
	157: ISheetData_Spot_AudioSpot;
	158: ISheetData_Spot_AudioSpot;
	159: ISheetData_Spot_AudioSpot;
	160: ISheetData_Spot_AudioSpot;
	161: ISheetData_Spot_AudioSpot;
	162: ISheetData_Spot_AudioSpot;
	163: ISheetData_Spot_AudioSpot;
	164: ISheetData_Spot_AudioSpot;
	165: ISheetData_Spot_AudioSpot;
	166: ISheetData_Spot_AudioSpot;
	167: ISheetData_Spot_AudioSpot;
	168: ISheetData_Spot_AudioSpot;
	169: ISheetData_Spot_AudioSpot;
	170: ISheetData_Spot_AudioSpot;
	171: ISheetData_Spot_AudioSpot;
	172: ISheetData_Spot_AudioSpot;
	173: ISheetData_Spot_AudioSpot;
	174: ISheetData_Spot_AudioSpot;
	175: ISheetData_Spot_AudioSpot;
	176: ISheetData_Spot_AudioSpot;
	177: ISheetData_Spot_AudioSpot;
	178: ISheetData_Spot_AudioSpot;
	179: ISheetData_Spot_AudioSpot;
	180: ISheetData_Spot_AudioSpot;
	181: ISheetData_Spot_AudioSpot;
	1001: ISheetData_Spot_AudioSpot;
	1002: ISheetData_Spot_AudioSpot;
	6001: ISheetData_Spot_AudioSpot;
	6002: ISheetData_Spot_AudioSpot;
	6003: ISheetData_Spot_AudioSpot;
	6004: ISheetData_Spot_AudioSpot;
	10001: ISheetData_Spot_AudioSpot;
	10002: ISheetData_Spot_AudioSpot;
	10003: ISheetData_Spot_AudioSpot;
	10004: ISheetData_Spot_AudioSpot;
	10005: ISheetData_Spot_AudioSpot;
	10006: ISheetData_Spot_AudioSpot;
	10007: ISheetData_Spot_AudioSpot;
	10008: ISheetData_Spot_AudioSpot;
	10009: ISheetData_Spot_AudioSpot;
	10010: ISheetData_Spot_AudioSpot;
	10011: ISheetData_Spot_AudioSpot;
	10012: ISheetData_Spot_AudioSpot;
	10013: ISheetData_Spot_AudioSpot;
	10014: ISheetData_Spot_AudioSpot;
	10015: ISheetData_Spot_AudioSpot;
	10016: ISheetData_Spot_AudioSpot;
	10017: ISheetData_Spot_AudioSpot;
	10018: ISheetData_Spot_AudioSpot;
	10019: ISheetData_Spot_AudioSpot;
	20001: ISheetData_Spot_AudioSpot;
	20002: ISheetData_Spot_AudioSpot;
	20003: ISheetData_Spot_AudioSpot;
	20004: ISheetData_Spot_AudioSpot;
	20005: ISheetData_Spot_AudioSpot;
}
declare interface ISheetData_Spot_AudioSpot {
	id: number;
	/** 路径 */
	path: string;
	/** 声音长度 */
	time_length: number;
	/** 音效名称 */
	str: string;
	/** 编辑器用的音乐音效，0=se，1=bgm，2=环境音 */
	type: number;
}
//#endregion