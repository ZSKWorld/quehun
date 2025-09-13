declare interface ITable_Simulation {
	sim_v2_info: ISheet_Simulation_SimV2Info;
	sim_v2_round: ISheet_Simulation_SimV2Round;
	sim_v2_character: ISheet_Simulation_SimV2Character;
	sim_v2_roll: ISheet_Simulation_SimV2Roll;
	sim_v2_event: ISheet_Simulation_SimV2Event;
	sim_v2_trigger: ISheet_Simulation_SimV2Trigger;
	sim_v2_selection: ISheet_Simulation_SimV2Selection;
	sim_v2_effect: ISheet_Simulation_SimV2Effect;
	sim_v2_selection_result: ISheet_Simulation_SimV2SelectionResult;
	sim_v2_buff: ISheet_Simulation_SimV2Buff;
	sim_v2_upgrade: ISheet_Simulation_SimV2Upgrade;
	sim_v2_story: ISheet_Simulation_SimV2Story;
	sim_v2_reward: ISheet_Simulation_SimV2Reward;
}

//#region sim_v2_info --- unique
declare interface ISheet_Simulation_SimV2Info {
	rows: ISheetData_Simulation_SimV2Info[];
	250401: ISheetData_Simulation_SimV2Info;
}
declare interface ISheetData_Simulation_SimV2Info {
	/** 绑定activity表的活动 */
	activity_id: number;
	/** 玩家控制角色一姬（200001） */
	player_chara_id: number;
	/** 本次雀斗大会使用的事件组 */
	event_group_id: number;
	/** 养成数值变动-失败 */
	train_result_fail: number;
	/** 养成数值变动-成功 */
	train_result_normal: number;
	/** 养成数值变动-大成功 */
	train_result_great: number;
	/** 五维数值的封顶上限 */
	train_cap: number;
	/** 发现听牌后放铳调整 */
	find_ting_adj: number;
	/** 2位马点 */
	shunweima_2: number;
	/** 3位马点 */
	shunweima_3: number;
	/** 4位马点 */
	shunweima_4: number;
	/** 对局事件的余牌cd */
	match_event_cd: number;
	/** 显示箭头的buff */
	show_arrow_buff: string;
	/** 描述内{0}正数需要加+的buff */
	add_sub_buff: string;
	/** 描述内{0}填特性名，{1}填加成值，{1}正数需要加+ */
	attribute_add_buff: string;
	/** 单加减号值_自摸和牌 */
	arrow_amount_12001: number;
	/** 单加减号值_放铳概率 */
	arrow_amount_12002: number;
	/** 单加减号值_副露倾向 */
	arrow_amount_12004: number;
	/** 单加减号值_向听推进速度 */
	arrow_amount_12005: number;
	/** 单加减号值_对手向听推进速度 */
	arrow_amount_12014: number;
}
//#endregion

//#region sim_v2_round --- group
declare interface ISheet_Simulation_SimV2Round {
	rows: ISheetData_Simulation_SimV2Round[];
	250401: ISheetData_Simulation_SimV2Round[];
}
declare interface ISheetData_Simulation_SimV2Round {
	/** 绑定activity表的活动 */
	activity_id: number;
	/** 回合数（1-50） */
	round_id: number;
	/** 1=养成 2=比赛 */
	round_type: number;
}
//#endregion

//#region sim_v2_character --- group
declare interface ISheet_Simulation_SimV2Character {
	rows: ISheetData_Simulation_SimV2Character[];
	250401: ISheetData_Simulation_SimV2Character[];
}
declare interface ISheetData_Simulation_SimV2Character {
	/** 绑定activity表的活动 */
	activity_id: number;
	/** 角色id */
	id: number;
	/** 运气 */
	luk: number;
	/** 技术 */
	tec: number;
	/** 洞察 */
	ins: number;
	/** 直觉 */
	int: number;
	/** 智谋 */
	res: number;
	/** 排行榜分数 */
	leaderboard_score: number;
	/** 出现回合数 */
	show_round: string;
}
//#endregion

//#region sim_v2_roll --- group
declare interface ISheet_Simulation_SimV2Roll {
	rows: ISheetData_Simulation_SimV2Roll[];
	25040101: ISheetData_Simulation_SimV2Roll[];
}
declare interface ISheetData_Simulation_SimV2Roll {
	/** 事件组ID */
	event_group_id: number;
	/** 事件（注释） */
	name: number;
	/** 值 */
	value: number;
	/** 权重（万分制） */
	weight: number;
}
//#endregion

//#region sim_v2_event --- group
declare interface ISheet_Simulation_SimV2Event {
	rows: ISheetData_Simulation_SimV2Event[];
	25040101: ISheetData_Simulation_SimV2Event[];
	25040153: ISheetData_Simulation_SimV2Event[];
}
declare interface ISheetData_Simulation_SimV2Event {
	/** 雀斗大会事件组 */
	event_group_id: number;
	/** 单个事件id */
	event_id: number;
	/** 事件标题str_event */
	event_title: number;
	/** 事件描述str_event */
	event_desc: number;
	/** 触发时点 */
	type: number;
	/** 冷却回合数 */
	cd_round: number;
	/** 触发概率 */
	trigger_rate: number;
	/** 触发优先级 */
	trigger_sort: number;
	/** 触发条件id（且） */
	trigger: number[];
}
//#endregion

//#region sim_v2_trigger --- unique
declare interface ISheet_Simulation_SimV2Trigger {
	rows: ISheetData_Simulation_SimV2Trigger[];
	9001002: ISheetData_Simulation_SimV2Trigger;
	9001013: ISheetData_Simulation_SimV2Trigger;
	9002055: ISheetData_Simulation_SimV2Trigger;
	9002057: ISheetData_Simulation_SimV2Trigger;
	9002066: ISheetData_Simulation_SimV2Trigger;
	9002095: ISheetData_Simulation_SimV2Trigger;
	9006001: ISheetData_Simulation_SimV2Trigger;
	9006002: ISheetData_Simulation_SimV2Trigger;
	9006003: ISheetData_Simulation_SimV2Trigger;
	9006004: ISheetData_Simulation_SimV2Trigger;
	9006005: ISheetData_Simulation_SimV2Trigger;
	9006006: ISheetData_Simulation_SimV2Trigger;
	9006007: ISheetData_Simulation_SimV2Trigger;
	9006008: ISheetData_Simulation_SimV2Trigger;
	9006009: ISheetData_Simulation_SimV2Trigger;
	9006010: ISheetData_Simulation_SimV2Trigger;
	9006011: ISheetData_Simulation_SimV2Trigger;
	9006012: ISheetData_Simulation_SimV2Trigger;
	9006013: ISheetData_Simulation_SimV2Trigger;
	9006014: ISheetData_Simulation_SimV2Trigger;
	9006015: ISheetData_Simulation_SimV2Trigger;
	9006016: ISheetData_Simulation_SimV2Trigger;
	9006017: ISheetData_Simulation_SimV2Trigger;
	9006018: ISheetData_Simulation_SimV2Trigger;
	9006019: ISheetData_Simulation_SimV2Trigger;
	9006020: ISheetData_Simulation_SimV2Trigger;
	9006021: ISheetData_Simulation_SimV2Trigger;
	9006022: ISheetData_Simulation_SimV2Trigger;
	9006023: ISheetData_Simulation_SimV2Trigger;
	9006024: ISheetData_Simulation_SimV2Trigger;
	9006025: ISheetData_Simulation_SimV2Trigger;
	9006026: ISheetData_Simulation_SimV2Trigger;
	9006027: ISheetData_Simulation_SimV2Trigger;
	9006028: ISheetData_Simulation_SimV2Trigger;
	9006029: ISheetData_Simulation_SimV2Trigger;
	9006030: ISheetData_Simulation_SimV2Trigger;
	9006031: ISheetData_Simulation_SimV2Trigger;
	9006032: ISheetData_Simulation_SimV2Trigger;
	9006033: ISheetData_Simulation_SimV2Trigger;
	9006034: ISheetData_Simulation_SimV2Trigger;
	9006035: ISheetData_Simulation_SimV2Trigger;
	9006036: ISheetData_Simulation_SimV2Trigger;
	9006037: ISheetData_Simulation_SimV2Trigger;
	9006038: ISheetData_Simulation_SimV2Trigger;
	9006039: ISheetData_Simulation_SimV2Trigger;
	9006040: ISheetData_Simulation_SimV2Trigger;
	9006041: ISheetData_Simulation_SimV2Trigger;
	9006042: ISheetData_Simulation_SimV2Trigger;
	9006043: ISheetData_Simulation_SimV2Trigger;
	9006044: ISheetData_Simulation_SimV2Trigger;
	9006045: ISheetData_Simulation_SimV2Trigger;
	9006046: ISheetData_Simulation_SimV2Trigger;
	9006047: ISheetData_Simulation_SimV2Trigger;
	9006048: ISheetData_Simulation_SimV2Trigger;
	9006049: ISheetData_Simulation_SimV2Trigger;
	9006050: ISheetData_Simulation_SimV2Trigger;
	9006051: ISheetData_Simulation_SimV2Trigger;
	9006052: ISheetData_Simulation_SimV2Trigger;
	9006053: ISheetData_Simulation_SimV2Trigger;
	9006054: ISheetData_Simulation_SimV2Trigger;
	9006055: ISheetData_Simulation_SimV2Trigger;
	9006056: ISheetData_Simulation_SimV2Trigger;
	9006057: ISheetData_Simulation_SimV2Trigger;
	9006058: ISheetData_Simulation_SimV2Trigger;
	9006059: ISheetData_Simulation_SimV2Trigger;
	9006060: ISheetData_Simulation_SimV2Trigger;
	9006061: ISheetData_Simulation_SimV2Trigger;
	9006062: ISheetData_Simulation_SimV2Trigger;
	9006063: ISheetData_Simulation_SimV2Trigger;
	9006064: ISheetData_Simulation_SimV2Trigger;
	9006065: ISheetData_Simulation_SimV2Trigger;
	9006066: ISheetData_Simulation_SimV2Trigger;
	9006067: ISheetData_Simulation_SimV2Trigger;
	9006068: ISheetData_Simulation_SimV2Trigger;
	9006069: ISheetData_Simulation_SimV2Trigger;
	9006070: ISheetData_Simulation_SimV2Trigger;
	9006071: ISheetData_Simulation_SimV2Trigger;
	9006072: ISheetData_Simulation_SimV2Trigger;
	9006073: ISheetData_Simulation_SimV2Trigger;
	9006074: ISheetData_Simulation_SimV2Trigger;
	9006075: ISheetData_Simulation_SimV2Trigger;
	9006076: ISheetData_Simulation_SimV2Trigger;
	9006077: ISheetData_Simulation_SimV2Trigger;
	9006078: ISheetData_Simulation_SimV2Trigger;
	9006079: ISheetData_Simulation_SimV2Trigger;
	9006080: ISheetData_Simulation_SimV2Trigger;
	9006081: ISheetData_Simulation_SimV2Trigger;
	9006082: ISheetData_Simulation_SimV2Trigger;
	9006083: ISheetData_Simulation_SimV2Trigger;
	9006084: ISheetData_Simulation_SimV2Trigger;
	9006085: ISheetData_Simulation_SimV2Trigger;
	9006086: ISheetData_Simulation_SimV2Trigger;
	9006087: ISheetData_Simulation_SimV2Trigger;
	9006088: ISheetData_Simulation_SimV2Trigger;
	9006089: ISheetData_Simulation_SimV2Trigger;
	9006090: ISheetData_Simulation_SimV2Trigger;
	9006091: ISheetData_Simulation_SimV2Trigger;
	9006092: ISheetData_Simulation_SimV2Trigger;
	9006093: ISheetData_Simulation_SimV2Trigger;
	9006094: ISheetData_Simulation_SimV2Trigger;
	9006095: ISheetData_Simulation_SimV2Trigger;
	9006096: ISheetData_Simulation_SimV2Trigger;
	9006097: ISheetData_Simulation_SimV2Trigger;
	9006098: ISheetData_Simulation_SimV2Trigger;
	9006099: ISheetData_Simulation_SimV2Trigger;
	9006100: ISheetData_Simulation_SimV2Trigger;
	9102044: ISheetData_Simulation_SimV2Trigger;
	9102048: ISheetData_Simulation_SimV2Trigger;
	9102049: ISheetData_Simulation_SimV2Trigger;
	9102050: ISheetData_Simulation_SimV2Trigger;
	9102062: ISheetData_Simulation_SimV2Trigger;
	9102067: ISheetData_Simulation_SimV2Trigger;
	9102077: ISheetData_Simulation_SimV2Trigger;
	9102081: ISheetData_Simulation_SimV2Trigger;
	9102086: ISheetData_Simulation_SimV2Trigger;
	9102089: ISheetData_Simulation_SimV2Trigger;
	9102094: ISheetData_Simulation_SimV2Trigger;
	9102098: ISheetData_Simulation_SimV2Trigger;
	9103045: ISheetData_Simulation_SimV2Trigger;
	9103047: ISheetData_Simulation_SimV2Trigger;
	9103055: ISheetData_Simulation_SimV2Trigger;
	9103059: ISheetData_Simulation_SimV2Trigger;
	9103080: ISheetData_Simulation_SimV2Trigger;
	9103085: ISheetData_Simulation_SimV2Trigger;
	9103096: ISheetData_Simulation_SimV2Trigger;
	9104045: ISheetData_Simulation_SimV2Trigger;
	9104060: ISheetData_Simulation_SimV2Trigger;
	9104061: ISheetData_Simulation_SimV2Trigger;
	9104068: ISheetData_Simulation_SimV2Trigger;
	9104075: ISheetData_Simulation_SimV2Trigger;
	9105045: ISheetData_Simulation_SimV2Trigger;
	9105046: ISheetData_Simulation_SimV2Trigger;
	9105082: ISheetData_Simulation_SimV2Trigger;
	9105093: ISheetData_Simulation_SimV2Trigger;
	9105100: ISheetData_Simulation_SimV2Trigger;
	9106045: ISheetData_Simulation_SimV2Trigger;
	9106046: ISheetData_Simulation_SimV2Trigger;
	9106053: ISheetData_Simulation_SimV2Trigger;
	9106068: ISheetData_Simulation_SimV2Trigger;
	9106077: ISheetData_Simulation_SimV2Trigger;
	9106092: ISheetData_Simulation_SimV2Trigger;
	9107046: ISheetData_Simulation_SimV2Trigger;
	9107093: ISheetData_Simulation_SimV2Trigger;
	9107096: ISheetData_Simulation_SimV2Trigger;
	9107100: ISheetData_Simulation_SimV2Trigger;
	9111047: ISheetData_Simulation_SimV2Trigger;
	9111048: ISheetData_Simulation_SimV2Trigger;
	9111049: ISheetData_Simulation_SimV2Trigger;
	9111050: ISheetData_Simulation_SimV2Trigger;
	9111069: ISheetData_Simulation_SimV2Trigger;
	9112047: ISheetData_Simulation_SimV2Trigger;
	9112048: ISheetData_Simulation_SimV2Trigger;
	9112065: ISheetData_Simulation_SimV2Trigger;
	9112068: ISheetData_Simulation_SimV2Trigger;
	9112069: ISheetData_Simulation_SimV2Trigger;
	9112070: ISheetData_Simulation_SimV2Trigger;
	9112076: ISheetData_Simulation_SimV2Trigger;
	9112080: ISheetData_Simulation_SimV2Trigger;
	9112084: ISheetData_Simulation_SimV2Trigger;
	9112093: ISheetData_Simulation_SimV2Trigger;
	9112099: ISheetData_Simulation_SimV2Trigger;
	9113057: ISheetData_Simulation_SimV2Trigger;
	9113058: ISheetData_Simulation_SimV2Trigger;
	9113071: ISheetData_Simulation_SimV2Trigger;
	9113073: ISheetData_Simulation_SimV2Trigger;
	9113075: ISheetData_Simulation_SimV2Trigger;
	9113083: ISheetData_Simulation_SimV2Trigger;
	9113088: ISheetData_Simulation_SimV2Trigger;
	9114052: ISheetData_Simulation_SimV2Trigger;
	9115050: ISheetData_Simulation_SimV2Trigger;
	9115071: ISheetData_Simulation_SimV2Trigger;
	9115073: ISheetData_Simulation_SimV2Trigger;
	9115075: ISheetData_Simulation_SimV2Trigger;
	9115083: ISheetData_Simulation_SimV2Trigger;
	9115089: ISheetData_Simulation_SimV2Trigger;
	9115098: ISheetData_Simulation_SimV2Trigger;
	9116098: ISheetData_Simulation_SimV2Trigger;
	9117049: ISheetData_Simulation_SimV2Trigger;
	9117050: ISheetData_Simulation_SimV2Trigger;
	9117067: ISheetData_Simulation_SimV2Trigger;
	9117070: ISheetData_Simulation_SimV2Trigger;
	9117075: ISheetData_Simulation_SimV2Trigger;
	9117091: ISheetData_Simulation_SimV2Trigger;
	9117094: ISheetData_Simulation_SimV2Trigger;
	9117095: ISheetData_Simulation_SimV2Trigger;
	9117099: ISheetData_Simulation_SimV2Trigger;
	9118051: ISheetData_Simulation_SimV2Trigger;
	9119072: ISheetData_Simulation_SimV2Trigger;
	9119092: ISheetData_Simulation_SimV2Trigger;
	9121050: ISheetData_Simulation_SimV2Trigger;
	9124054: ISheetData_Simulation_SimV2Trigger;
	9126062: ISheetData_Simulation_SimV2Trigger;
	9126087: ISheetData_Simulation_SimV2Trigger;
	9127060: ISheetData_Simulation_SimV2Trigger;
	9127063: ISheetData_Simulation_SimV2Trigger;
	9127064: ISheetData_Simulation_SimV2Trigger;
}
declare interface ISheetData_Simulation_SimV2Trigger {
	/** 触发条件每个一行 */
	trigger_id: number;
	/** 列举所有用到的条件type */
	type: number;
	/** 参数0 */
	param: string[];
}
//#endregion

//#region sim_v2_selection --- group
declare interface ISheet_Simulation_SimV2Selection {
	rows: ISheetData_Simulation_SimV2Selection[];
	1001: ISheetData_Simulation_SimV2Selection[];
	1002: ISheetData_Simulation_SimV2Selection[];
	1003: ISheetData_Simulation_SimV2Selection[];
	1004: ISheetData_Simulation_SimV2Selection[];
	1005: ISheetData_Simulation_SimV2Selection[];
	1006: ISheetData_Simulation_SimV2Selection[];
	1007: ISheetData_Simulation_SimV2Selection[];
	1008: ISheetData_Simulation_SimV2Selection[];
	1009: ISheetData_Simulation_SimV2Selection[];
	1010: ISheetData_Simulation_SimV2Selection[];
	1011: ISheetData_Simulation_SimV2Selection[];
	1012: ISheetData_Simulation_SimV2Selection[];
	1013: ISheetData_Simulation_SimV2Selection[];
	1014: ISheetData_Simulation_SimV2Selection[];
	1015: ISheetData_Simulation_SimV2Selection[];
	1016: ISheetData_Simulation_SimV2Selection[];
	1017: ISheetData_Simulation_SimV2Selection[];
	1018: ISheetData_Simulation_SimV2Selection[];
	1019: ISheetData_Simulation_SimV2Selection[];
	1020: ISheetData_Simulation_SimV2Selection[];
	1021: ISheetData_Simulation_SimV2Selection[];
	1022: ISheetData_Simulation_SimV2Selection[];
	1023: ISheetData_Simulation_SimV2Selection[];
	1024: ISheetData_Simulation_SimV2Selection[];
	1025: ISheetData_Simulation_SimV2Selection[];
	1026: ISheetData_Simulation_SimV2Selection[];
	1027: ISheetData_Simulation_SimV2Selection[];
	1028: ISheetData_Simulation_SimV2Selection[];
	1029: ISheetData_Simulation_SimV2Selection[];
	1030: ISheetData_Simulation_SimV2Selection[];
	1031: ISheetData_Simulation_SimV2Selection[];
	1032: ISheetData_Simulation_SimV2Selection[];
	1033: ISheetData_Simulation_SimV2Selection[];
	1034: ISheetData_Simulation_SimV2Selection[];
	1035: ISheetData_Simulation_SimV2Selection[];
	1036: ISheetData_Simulation_SimV2Selection[];
	1037: ISheetData_Simulation_SimV2Selection[];
	1038: ISheetData_Simulation_SimV2Selection[];
	1039: ISheetData_Simulation_SimV2Selection[];
	1040: ISheetData_Simulation_SimV2Selection[];
	1041: ISheetData_Simulation_SimV2Selection[];
	1042: ISheetData_Simulation_SimV2Selection[];
	1043: ISheetData_Simulation_SimV2Selection[];
	1044: ISheetData_Simulation_SimV2Selection[];
	1045: ISheetData_Simulation_SimV2Selection[];
	1046: ISheetData_Simulation_SimV2Selection[];
	1047: ISheetData_Simulation_SimV2Selection[];
	1048: ISheetData_Simulation_SimV2Selection[];
	1049: ISheetData_Simulation_SimV2Selection[];
	1050: ISheetData_Simulation_SimV2Selection[];
	1051: ISheetData_Simulation_SimV2Selection[];
	1052: ISheetData_Simulation_SimV2Selection[];
	1053: ISheetData_Simulation_SimV2Selection[];
	1054: ISheetData_Simulation_SimV2Selection[];
	1055: ISheetData_Simulation_SimV2Selection[];
	1056: ISheetData_Simulation_SimV2Selection[];
	1057: ISheetData_Simulation_SimV2Selection[];
	1058: ISheetData_Simulation_SimV2Selection[];
	1059: ISheetData_Simulation_SimV2Selection[];
	1060: ISheetData_Simulation_SimV2Selection[];
	1061: ISheetData_Simulation_SimV2Selection[];
	1062: ISheetData_Simulation_SimV2Selection[];
	1063: ISheetData_Simulation_SimV2Selection[];
	1064: ISheetData_Simulation_SimV2Selection[];
	1065: ISheetData_Simulation_SimV2Selection[];
	1066: ISheetData_Simulation_SimV2Selection[];
	1067: ISheetData_Simulation_SimV2Selection[];
	1068: ISheetData_Simulation_SimV2Selection[];
	1069: ISheetData_Simulation_SimV2Selection[];
	1070: ISheetData_Simulation_SimV2Selection[];
	1071: ISheetData_Simulation_SimV2Selection[];
	1072: ISheetData_Simulation_SimV2Selection[];
	1073: ISheetData_Simulation_SimV2Selection[];
	1074: ISheetData_Simulation_SimV2Selection[];
	1075: ISheetData_Simulation_SimV2Selection[];
	1076: ISheetData_Simulation_SimV2Selection[];
	1077: ISheetData_Simulation_SimV2Selection[];
	1078: ISheetData_Simulation_SimV2Selection[];
	1079: ISheetData_Simulation_SimV2Selection[];
	1080: ISheetData_Simulation_SimV2Selection[];
	1081: ISheetData_Simulation_SimV2Selection[];
	1082: ISheetData_Simulation_SimV2Selection[];
	1083: ISheetData_Simulation_SimV2Selection[];
	1084: ISheetData_Simulation_SimV2Selection[];
	1085: ISheetData_Simulation_SimV2Selection[];
	1086: ISheetData_Simulation_SimV2Selection[];
	1087: ISheetData_Simulation_SimV2Selection[];
	1088: ISheetData_Simulation_SimV2Selection[];
	1089: ISheetData_Simulation_SimV2Selection[];
	1090: ISheetData_Simulation_SimV2Selection[];
	1091: ISheetData_Simulation_SimV2Selection[];
	1092: ISheetData_Simulation_SimV2Selection[];
	1093: ISheetData_Simulation_SimV2Selection[];
	1094: ISheetData_Simulation_SimV2Selection[];
	1095: ISheetData_Simulation_SimV2Selection[];
	1096: ISheetData_Simulation_SimV2Selection[];
	1097: ISheetData_Simulation_SimV2Selection[];
	1098: ISheetData_Simulation_SimV2Selection[];
	1099: ISheetData_Simulation_SimV2Selection[];
	1100: ISheetData_Simulation_SimV2Selection[];
}
declare interface ISheetData_Simulation_SimV2Selection {
	/** 单个事件ID */
	event_id: number;
	/** 选项ID */
	selection_id: number;
	/** 选项内容，str_event */
	selection_desc: number;
	/** 1固定显示，2持有特性显示，3持有特性消失 */
	type: number;
	/** 检查五维（1或2种） */
	check: string[];
	/** 特性id */
	args: number[];
}
//#endregion

//#region sim_v2_effect --- unique
declare interface ISheet_Simulation_SimV2Effect {
	rows: ISheetData_Simulation_SimV2Effect[];
	9001: ISheetData_Simulation_SimV2Effect;
	9002: ISheetData_Simulation_SimV2Effect;
	9003: ISheetData_Simulation_SimV2Effect;
	9004: ISheetData_Simulation_SimV2Effect;
	9005: ISheetData_Simulation_SimV2Effect;
	9006: ISheetData_Simulation_SimV2Effect;
	9007: ISheetData_Simulation_SimV2Effect;
	9008: ISheetData_Simulation_SimV2Effect;
	9009: ISheetData_Simulation_SimV2Effect;
	9010: ISheetData_Simulation_SimV2Effect;
	9011: ISheetData_Simulation_SimV2Effect;
	9012: ISheetData_Simulation_SimV2Effect;
	9013: ISheetData_Simulation_SimV2Effect;
	9014: ISheetData_Simulation_SimV2Effect;
	9015: ISheetData_Simulation_SimV2Effect;
	9016: ISheetData_Simulation_SimV2Effect;
	9017: ISheetData_Simulation_SimV2Effect;
	9018: ISheetData_Simulation_SimV2Effect;
	9019: ISheetData_Simulation_SimV2Effect;
	9020: ISheetData_Simulation_SimV2Effect;
}
declare interface ISheetData_Simulation_SimV2Effect {
	/** 特性ID */
	effect_id: number;
	/** 运气（1-10000） */
	luk: number;
	/** 技术 */
	tec: number;
	/** 洞察 */
	ins: number;
	/** 直觉 */
	int: number;
	/** 智谋 */
	res: number;
	/** 特性名str/event */
	effect_title: number;
	/** 特性描述str/event */
	effect_desc: number;
}
//#endregion

//#region sim_v2_selection_result --- group
declare interface ISheet_Simulation_SimV2SelectionResult {
	rows: ISheetData_Simulation_SimV2SelectionResult[];
	100101: ISheetData_Simulation_SimV2SelectionResult[];
	100102: ISheetData_Simulation_SimV2SelectionResult[];
	100103: ISheetData_Simulation_SimV2SelectionResult[];
	100104: ISheetData_Simulation_SimV2SelectionResult[];
	100201: ISheetData_Simulation_SimV2SelectionResult[];
	100202: ISheetData_Simulation_SimV2SelectionResult[];
	100203: ISheetData_Simulation_SimV2SelectionResult[];
	100204: ISheetData_Simulation_SimV2SelectionResult[];
	100301: ISheetData_Simulation_SimV2SelectionResult[];
	100302: ISheetData_Simulation_SimV2SelectionResult[];
	100303: ISheetData_Simulation_SimV2SelectionResult[];
	100304: ISheetData_Simulation_SimV2SelectionResult[];
	100401: ISheetData_Simulation_SimV2SelectionResult[];
	100402: ISheetData_Simulation_SimV2SelectionResult[];
	100403: ISheetData_Simulation_SimV2SelectionResult[];
	100404: ISheetData_Simulation_SimV2SelectionResult[];
	100501: ISheetData_Simulation_SimV2SelectionResult[];
	100502: ISheetData_Simulation_SimV2SelectionResult[];
	100503: ISheetData_Simulation_SimV2SelectionResult[];
	100504: ISheetData_Simulation_SimV2SelectionResult[];
	100505: ISheetData_Simulation_SimV2SelectionResult[];
	100601: ISheetData_Simulation_SimV2SelectionResult[];
	100602: ISheetData_Simulation_SimV2SelectionResult[];
	100603: ISheetData_Simulation_SimV2SelectionResult[];
	100604: ISheetData_Simulation_SimV2SelectionResult[];
	100701: ISheetData_Simulation_SimV2SelectionResult[];
	100702: ISheetData_Simulation_SimV2SelectionResult[];
	100703: ISheetData_Simulation_SimV2SelectionResult[];
	100704: ISheetData_Simulation_SimV2SelectionResult[];
	100705: ISheetData_Simulation_SimV2SelectionResult[];
	100801: ISheetData_Simulation_SimV2SelectionResult[];
	100802: ISheetData_Simulation_SimV2SelectionResult[];
	100803: ISheetData_Simulation_SimV2SelectionResult[];
	100804: ISheetData_Simulation_SimV2SelectionResult[];
	100901: ISheetData_Simulation_SimV2SelectionResult[];
	100902: ISheetData_Simulation_SimV2SelectionResult[];
	100903: ISheetData_Simulation_SimV2SelectionResult[];
	100904: ISheetData_Simulation_SimV2SelectionResult[];
	100905: ISheetData_Simulation_SimV2SelectionResult[];
	101001: ISheetData_Simulation_SimV2SelectionResult[];
	101002: ISheetData_Simulation_SimV2SelectionResult[];
	101003: ISheetData_Simulation_SimV2SelectionResult[];
	101004: ISheetData_Simulation_SimV2SelectionResult[];
	101101: ISheetData_Simulation_SimV2SelectionResult[];
	101102: ISheetData_Simulation_SimV2SelectionResult[];
	101103: ISheetData_Simulation_SimV2SelectionResult[];
	101104: ISheetData_Simulation_SimV2SelectionResult[];
	101201: ISheetData_Simulation_SimV2SelectionResult[];
	101202: ISheetData_Simulation_SimV2SelectionResult[];
	101203: ISheetData_Simulation_SimV2SelectionResult[];
	101204: ISheetData_Simulation_SimV2SelectionResult[];
	101205: ISheetData_Simulation_SimV2SelectionResult[];
	101301: ISheetData_Simulation_SimV2SelectionResult[];
	101302: ISheetData_Simulation_SimV2SelectionResult[];
	101304: ISheetData_Simulation_SimV2SelectionResult[];
	101305: ISheetData_Simulation_SimV2SelectionResult[];
	101401: ISheetData_Simulation_SimV2SelectionResult[];
	101402: ISheetData_Simulation_SimV2SelectionResult[];
	101403: ISheetData_Simulation_SimV2SelectionResult[];
	101404: ISheetData_Simulation_SimV2SelectionResult[];
	101405: ISheetData_Simulation_SimV2SelectionResult[];
	101501: ISheetData_Simulation_SimV2SelectionResult[];
	101502: ISheetData_Simulation_SimV2SelectionResult[];
	101503: ISheetData_Simulation_SimV2SelectionResult[];
	101504: ISheetData_Simulation_SimV2SelectionResult[];
	101505: ISheetData_Simulation_SimV2SelectionResult[];
	101601: ISheetData_Simulation_SimV2SelectionResult[];
	101602: ISheetData_Simulation_SimV2SelectionResult[];
	101603: ISheetData_Simulation_SimV2SelectionResult[];
	101604: ISheetData_Simulation_SimV2SelectionResult[];
	101605: ISheetData_Simulation_SimV2SelectionResult[];
	101701: ISheetData_Simulation_SimV2SelectionResult[];
	101702: ISheetData_Simulation_SimV2SelectionResult[];
	101703: ISheetData_Simulation_SimV2SelectionResult[];
	101704: ISheetData_Simulation_SimV2SelectionResult[];
	101705: ISheetData_Simulation_SimV2SelectionResult[];
	101801: ISheetData_Simulation_SimV2SelectionResult[];
	101802: ISheetData_Simulation_SimV2SelectionResult[];
	101803: ISheetData_Simulation_SimV2SelectionResult[];
	101804: ISheetData_Simulation_SimV2SelectionResult[];
	101901: ISheetData_Simulation_SimV2SelectionResult[];
	101902: ISheetData_Simulation_SimV2SelectionResult[];
	101903: ISheetData_Simulation_SimV2SelectionResult[];
	101904: ISheetData_Simulation_SimV2SelectionResult[];
	101905: ISheetData_Simulation_SimV2SelectionResult[];
	102001: ISheetData_Simulation_SimV2SelectionResult[];
	102002: ISheetData_Simulation_SimV2SelectionResult[];
	102003: ISheetData_Simulation_SimV2SelectionResult[];
	102004: ISheetData_Simulation_SimV2SelectionResult[];
	102005: ISheetData_Simulation_SimV2SelectionResult[];
	102101: ISheetData_Simulation_SimV2SelectionResult[];
	102102: ISheetData_Simulation_SimV2SelectionResult[];
	102103: ISheetData_Simulation_SimV2SelectionResult[];
	102104: ISheetData_Simulation_SimV2SelectionResult[];
	102201: ISheetData_Simulation_SimV2SelectionResult[];
	102202: ISheetData_Simulation_SimV2SelectionResult[];
	102203: ISheetData_Simulation_SimV2SelectionResult[];
	102204: ISheetData_Simulation_SimV2SelectionResult[];
	102301: ISheetData_Simulation_SimV2SelectionResult[];
	102302: ISheetData_Simulation_SimV2SelectionResult[];
	102303: ISheetData_Simulation_SimV2SelectionResult[];
	102304: ISheetData_Simulation_SimV2SelectionResult[];
	102305: ISheetData_Simulation_SimV2SelectionResult[];
	102401: ISheetData_Simulation_SimV2SelectionResult[];
	102402: ISheetData_Simulation_SimV2SelectionResult[];
	102403: ISheetData_Simulation_SimV2SelectionResult[];
	102404: ISheetData_Simulation_SimV2SelectionResult[];
	102405: ISheetData_Simulation_SimV2SelectionResult[];
	102501: ISheetData_Simulation_SimV2SelectionResult[];
	102502: ISheetData_Simulation_SimV2SelectionResult[];
	102503: ISheetData_Simulation_SimV2SelectionResult[];
	102504: ISheetData_Simulation_SimV2SelectionResult[];
	102505: ISheetData_Simulation_SimV2SelectionResult[];
	102601: ISheetData_Simulation_SimV2SelectionResult[];
	102602: ISheetData_Simulation_SimV2SelectionResult[];
	102603: ISheetData_Simulation_SimV2SelectionResult[];
	102604: ISheetData_Simulation_SimV2SelectionResult[];
	102701: ISheetData_Simulation_SimV2SelectionResult[];
	102702: ISheetData_Simulation_SimV2SelectionResult[];
	102703: ISheetData_Simulation_SimV2SelectionResult[];
	102704: ISheetData_Simulation_SimV2SelectionResult[];
	102801: ISheetData_Simulation_SimV2SelectionResult[];
	102802: ISheetData_Simulation_SimV2SelectionResult[];
	102804: ISheetData_Simulation_SimV2SelectionResult[];
	102901: ISheetData_Simulation_SimV2SelectionResult[];
	102902: ISheetData_Simulation_SimV2SelectionResult[];
	102904: ISheetData_Simulation_SimV2SelectionResult[];
	102905: ISheetData_Simulation_SimV2SelectionResult[];
	103001: ISheetData_Simulation_SimV2SelectionResult[];
	103002: ISheetData_Simulation_SimV2SelectionResult[];
	103003: ISheetData_Simulation_SimV2SelectionResult[];
	103004: ISheetData_Simulation_SimV2SelectionResult[];
	103005: ISheetData_Simulation_SimV2SelectionResult[];
	103101: ISheetData_Simulation_SimV2SelectionResult[];
	103102: ISheetData_Simulation_SimV2SelectionResult[];
	103103: ISheetData_Simulation_SimV2SelectionResult[];
	103104: ISheetData_Simulation_SimV2SelectionResult[];
	103105: ISheetData_Simulation_SimV2SelectionResult[];
	103201: ISheetData_Simulation_SimV2SelectionResult[];
	103202: ISheetData_Simulation_SimV2SelectionResult[];
	103203: ISheetData_Simulation_SimV2SelectionResult[];
	103204: ISheetData_Simulation_SimV2SelectionResult[];
	103205: ISheetData_Simulation_SimV2SelectionResult[];
	103301: ISheetData_Simulation_SimV2SelectionResult[];
	103302: ISheetData_Simulation_SimV2SelectionResult[];
	103303: ISheetData_Simulation_SimV2SelectionResult[];
	103304: ISheetData_Simulation_SimV2SelectionResult[];
	103305: ISheetData_Simulation_SimV2SelectionResult[];
	103401: ISheetData_Simulation_SimV2SelectionResult[];
	103402: ISheetData_Simulation_SimV2SelectionResult[];
	103404: ISheetData_Simulation_SimV2SelectionResult[];
	103405: ISheetData_Simulation_SimV2SelectionResult[];
	103501: ISheetData_Simulation_SimV2SelectionResult[];
	103502: ISheetData_Simulation_SimV2SelectionResult[];
	103503: ISheetData_Simulation_SimV2SelectionResult[];
	103504: ISheetData_Simulation_SimV2SelectionResult[];
	103601: ISheetData_Simulation_SimV2SelectionResult[];
	103602: ISheetData_Simulation_SimV2SelectionResult[];
	103603: ISheetData_Simulation_SimV2SelectionResult[];
	103604: ISheetData_Simulation_SimV2SelectionResult[];
	103701: ISheetData_Simulation_SimV2SelectionResult[];
	103702: ISheetData_Simulation_SimV2SelectionResult[];
	103703: ISheetData_Simulation_SimV2SelectionResult[];
	103704: ISheetData_Simulation_SimV2SelectionResult[];
	103705: ISheetData_Simulation_SimV2SelectionResult[];
	103801: ISheetData_Simulation_SimV2SelectionResult[];
	103802: ISheetData_Simulation_SimV2SelectionResult[];
	103803: ISheetData_Simulation_SimV2SelectionResult[];
	103804: ISheetData_Simulation_SimV2SelectionResult[];
	103901: ISheetData_Simulation_SimV2SelectionResult[];
	103902: ISheetData_Simulation_SimV2SelectionResult[];
	103903: ISheetData_Simulation_SimV2SelectionResult[];
	103904: ISheetData_Simulation_SimV2SelectionResult[];
	103905: ISheetData_Simulation_SimV2SelectionResult[];
	104001: ISheetData_Simulation_SimV2SelectionResult[];
	104002: ISheetData_Simulation_SimV2SelectionResult[];
	104003: ISheetData_Simulation_SimV2SelectionResult[];
	104004: ISheetData_Simulation_SimV2SelectionResult[];
	104005: ISheetData_Simulation_SimV2SelectionResult[];
	104101: ISheetData_Simulation_SimV2SelectionResult[];
	104102: ISheetData_Simulation_SimV2SelectionResult[];
	104103: ISheetData_Simulation_SimV2SelectionResult[];
	104104: ISheetData_Simulation_SimV2SelectionResult[];
	104105: ISheetData_Simulation_SimV2SelectionResult[];
	104201: ISheetData_Simulation_SimV2SelectionResult[];
	104202: ISheetData_Simulation_SimV2SelectionResult[];
	104203: ISheetData_Simulation_SimV2SelectionResult[];
	104204: ISheetData_Simulation_SimV2SelectionResult[];
	104205: ISheetData_Simulation_SimV2SelectionResult[];
	104301: ISheetData_Simulation_SimV2SelectionResult[];
	104302: ISheetData_Simulation_SimV2SelectionResult[];
	104303: ISheetData_Simulation_SimV2SelectionResult[];
	104304: ISheetData_Simulation_SimV2SelectionResult[];
	104305: ISheetData_Simulation_SimV2SelectionResult[];
	104401: ISheetData_Simulation_SimV2SelectionResult[];
	104402: ISheetData_Simulation_SimV2SelectionResult[];
	104404: ISheetData_Simulation_SimV2SelectionResult[];
	104501: ISheetData_Simulation_SimV2SelectionResult[];
	104502: ISheetData_Simulation_SimV2SelectionResult[];
	104503: ISheetData_Simulation_SimV2SelectionResult[];
	104504: ISheetData_Simulation_SimV2SelectionResult[];
	104601: ISheetData_Simulation_SimV2SelectionResult[];
	104602: ISheetData_Simulation_SimV2SelectionResult[];
	104603: ISheetData_Simulation_SimV2SelectionResult[];
	104604: ISheetData_Simulation_SimV2SelectionResult[];
	104701: ISheetData_Simulation_SimV2SelectionResult[];
	104702: ISheetData_Simulation_SimV2SelectionResult[];
	104703: ISheetData_Simulation_SimV2SelectionResult[];
	104801: ISheetData_Simulation_SimV2SelectionResult[];
	104802: ISheetData_Simulation_SimV2SelectionResult[];
	104804: ISheetData_Simulation_SimV2SelectionResult[];
	104901: ISheetData_Simulation_SimV2SelectionResult[];
	104902: ISheetData_Simulation_SimV2SelectionResult[];
	104904: ISheetData_Simulation_SimV2SelectionResult[];
	105001: ISheetData_Simulation_SimV2SelectionResult[];
	105003: ISheetData_Simulation_SimV2SelectionResult[];
	105004: ISheetData_Simulation_SimV2SelectionResult[];
	105005: ISheetData_Simulation_SimV2SelectionResult[];
	105101: ISheetData_Simulation_SimV2SelectionResult[];
	105102: ISheetData_Simulation_SimV2SelectionResult[];
	105103: ISheetData_Simulation_SimV2SelectionResult[];
	105104: ISheetData_Simulation_SimV2SelectionResult[];
	105201: ISheetData_Simulation_SimV2SelectionResult[];
	105202: ISheetData_Simulation_SimV2SelectionResult[];
	105203: ISheetData_Simulation_SimV2SelectionResult[];
	105301: ISheetData_Simulation_SimV2SelectionResult[];
	105302: ISheetData_Simulation_SimV2SelectionResult[];
	105304: ISheetData_Simulation_SimV2SelectionResult[];
	105401: ISheetData_Simulation_SimV2SelectionResult[];
	105402: ISheetData_Simulation_SimV2SelectionResult[];
	105403: ISheetData_Simulation_SimV2SelectionResult[];
	105501: ISheetData_Simulation_SimV2SelectionResult[];
	105502: ISheetData_Simulation_SimV2SelectionResult[];
	105504: ISheetData_Simulation_SimV2SelectionResult[];
	105601: ISheetData_Simulation_SimV2SelectionResult[];
	105602: ISheetData_Simulation_SimV2SelectionResult[];
	105604: ISheetData_Simulation_SimV2SelectionResult[];
	105701: ISheetData_Simulation_SimV2SelectionResult[];
	105702: ISheetData_Simulation_SimV2SelectionResult[];
	105704: ISheetData_Simulation_SimV2SelectionResult[];
	105801: ISheetData_Simulation_SimV2SelectionResult[];
	105802: ISheetData_Simulation_SimV2SelectionResult[];
	105804: ISheetData_Simulation_SimV2SelectionResult[];
	105901: ISheetData_Simulation_SimV2SelectionResult[];
	105902: ISheetData_Simulation_SimV2SelectionResult[];
	105903: ISheetData_Simulation_SimV2SelectionResult[];
	105904: ISheetData_Simulation_SimV2SelectionResult[];
	106001: ISheetData_Simulation_SimV2SelectionResult[];
	106002: ISheetData_Simulation_SimV2SelectionResult[];
	106101: ISheetData_Simulation_SimV2SelectionResult[];
	106102: ISheetData_Simulation_SimV2SelectionResult[];
	106103: ISheetData_Simulation_SimV2SelectionResult[];
	106104: ISheetData_Simulation_SimV2SelectionResult[];
	106201: ISheetData_Simulation_SimV2SelectionResult[];
	106202: ISheetData_Simulation_SimV2SelectionResult[];
	106203: ISheetData_Simulation_SimV2SelectionResult[];
	106301: ISheetData_Simulation_SimV2SelectionResult[];
	106302: ISheetData_Simulation_SimV2SelectionResult[];
	106304: ISheetData_Simulation_SimV2SelectionResult[];
	106401: ISheetData_Simulation_SimV2SelectionResult[];
	106402: ISheetData_Simulation_SimV2SelectionResult[];
	106404: ISheetData_Simulation_SimV2SelectionResult[];
	106501: ISheetData_Simulation_SimV2SelectionResult[];
	106502: ISheetData_Simulation_SimV2SelectionResult[];
	106504: ISheetData_Simulation_SimV2SelectionResult[];
	106601: ISheetData_Simulation_SimV2SelectionResult[];
	106602: ISheetData_Simulation_SimV2SelectionResult[];
	106603: ISheetData_Simulation_SimV2SelectionResult[];
	106604: ISheetData_Simulation_SimV2SelectionResult[];
	106701: ISheetData_Simulation_SimV2SelectionResult[];
	106702: ISheetData_Simulation_SimV2SelectionResult[];
	106703: ISheetData_Simulation_SimV2SelectionResult[];
	106801: ISheetData_Simulation_SimV2SelectionResult[];
	106802: ISheetData_Simulation_SimV2SelectionResult[];
	106803: ISheetData_Simulation_SimV2SelectionResult[];
	106901: ISheetData_Simulation_SimV2SelectionResult[];
	106902: ISheetData_Simulation_SimV2SelectionResult[];
	106904: ISheetData_Simulation_SimV2SelectionResult[];
	107001: ISheetData_Simulation_SimV2SelectionResult[];
	107002: ISheetData_Simulation_SimV2SelectionResult[];
	107003: ISheetData_Simulation_SimV2SelectionResult[];
	107101: ISheetData_Simulation_SimV2SelectionResult[];
	107102: ISheetData_Simulation_SimV2SelectionResult[];
	107103: ISheetData_Simulation_SimV2SelectionResult[];
	107201: ISheetData_Simulation_SimV2SelectionResult[];
	107202: ISheetData_Simulation_SimV2SelectionResult[];
	107203: ISheetData_Simulation_SimV2SelectionResult[];
	107301: ISheetData_Simulation_SimV2SelectionResult[];
	107302: ISheetData_Simulation_SimV2SelectionResult[];
	107303: ISheetData_Simulation_SimV2SelectionResult[];
	107401: ISheetData_Simulation_SimV2SelectionResult[];
	107402: ISheetData_Simulation_SimV2SelectionResult[];
	107403: ISheetData_Simulation_SimV2SelectionResult[];
	107501: ISheetData_Simulation_SimV2SelectionResult[];
	107502: ISheetData_Simulation_SimV2SelectionResult[];
	107504: ISheetData_Simulation_SimV2SelectionResult[];
	107601: ISheetData_Simulation_SimV2SelectionResult[];
	107602: ISheetData_Simulation_SimV2SelectionResult[];
	107603: ISheetData_Simulation_SimV2SelectionResult[];
	107701: ISheetData_Simulation_SimV2SelectionResult[];
	107702: ISheetData_Simulation_SimV2SelectionResult[];
	107704: ISheetData_Simulation_SimV2SelectionResult[];
	107801: ISheetData_Simulation_SimV2SelectionResult[];
	107802: ISheetData_Simulation_SimV2SelectionResult[];
	107803: ISheetData_Simulation_SimV2SelectionResult[];
	107901: ISheetData_Simulation_SimV2SelectionResult[];
	107902: ISheetData_Simulation_SimV2SelectionResult[];
	107903: ISheetData_Simulation_SimV2SelectionResult[];
	108001: ISheetData_Simulation_SimV2SelectionResult[];
	108002: ISheetData_Simulation_SimV2SelectionResult[];
	108003: ISheetData_Simulation_SimV2SelectionResult[];
	108004: ISheetData_Simulation_SimV2SelectionResult[];
	108101: ISheetData_Simulation_SimV2SelectionResult[];
	108102: ISheetData_Simulation_SimV2SelectionResult[];
	108103: ISheetData_Simulation_SimV2SelectionResult[];
	108104: ISheetData_Simulation_SimV2SelectionResult[];
	108201: ISheetData_Simulation_SimV2SelectionResult[];
	108202: ISheetData_Simulation_SimV2SelectionResult[];
	108203: ISheetData_Simulation_SimV2SelectionResult[];
	108301: ISheetData_Simulation_SimV2SelectionResult[];
	108302: ISheetData_Simulation_SimV2SelectionResult[];
	108303: ISheetData_Simulation_SimV2SelectionResult[];
	108401: ISheetData_Simulation_SimV2SelectionResult[];
	108402: ISheetData_Simulation_SimV2SelectionResult[];
	108403: ISheetData_Simulation_SimV2SelectionResult[];
	108501: ISheetData_Simulation_SimV2SelectionResult[];
	108502: ISheetData_Simulation_SimV2SelectionResult[];
	108503: ISheetData_Simulation_SimV2SelectionResult[];
	108601: ISheetData_Simulation_SimV2SelectionResult[];
	108602: ISheetData_Simulation_SimV2SelectionResult[];
	108604: ISheetData_Simulation_SimV2SelectionResult[];
	108701: ISheetData_Simulation_SimV2SelectionResult[];
	108702: ISheetData_Simulation_SimV2SelectionResult[];
	108704: ISheetData_Simulation_SimV2SelectionResult[];
	108801: ISheetData_Simulation_SimV2SelectionResult[];
	108802: ISheetData_Simulation_SimV2SelectionResult[];
	108803: ISheetData_Simulation_SimV2SelectionResult[];
	108804: ISheetData_Simulation_SimV2SelectionResult[];
	108901: ISheetData_Simulation_SimV2SelectionResult[];
	108902: ISheetData_Simulation_SimV2SelectionResult[];
	108903: ISheetData_Simulation_SimV2SelectionResult[];
	108904: ISheetData_Simulation_SimV2SelectionResult[];
	109001: ISheetData_Simulation_SimV2SelectionResult[];
	109002: ISheetData_Simulation_SimV2SelectionResult[];
	109003: ISheetData_Simulation_SimV2SelectionResult[];
	109004: ISheetData_Simulation_SimV2SelectionResult[];
	109101: ISheetData_Simulation_SimV2SelectionResult[];
	109102: ISheetData_Simulation_SimV2SelectionResult[];
	109104: ISheetData_Simulation_SimV2SelectionResult[];
	109201: ISheetData_Simulation_SimV2SelectionResult[];
	109202: ISheetData_Simulation_SimV2SelectionResult[];
	109203: ISheetData_Simulation_SimV2SelectionResult[];
	109204: ISheetData_Simulation_SimV2SelectionResult[];
	109301: ISheetData_Simulation_SimV2SelectionResult[];
	109302: ISheetData_Simulation_SimV2SelectionResult[];
	109304: ISheetData_Simulation_SimV2SelectionResult[];
	109401: ISheetData_Simulation_SimV2SelectionResult[];
	109402: ISheetData_Simulation_SimV2SelectionResult[];
	109403: ISheetData_Simulation_SimV2SelectionResult[];
	109501: ISheetData_Simulation_SimV2SelectionResult[];
	109502: ISheetData_Simulation_SimV2SelectionResult[];
	109504: ISheetData_Simulation_SimV2SelectionResult[];
	109601: ISheetData_Simulation_SimV2SelectionResult[];
	109602: ISheetData_Simulation_SimV2SelectionResult[];
	109701: ISheetData_Simulation_SimV2SelectionResult[];
	109702: ISheetData_Simulation_SimV2SelectionResult[];
	109704: ISheetData_Simulation_SimV2SelectionResult[];
	109801: ISheetData_Simulation_SimV2SelectionResult[];
	109802: ISheetData_Simulation_SimV2SelectionResult[];
	109804: ISheetData_Simulation_SimV2SelectionResult[];
	109901: ISheetData_Simulation_SimV2SelectionResult[];
	109902: ISheetData_Simulation_SimV2SelectionResult[];
	109904: ISheetData_Simulation_SimV2SelectionResult[];
	110001: ISheetData_Simulation_SimV2SelectionResult[];
	110002: ISheetData_Simulation_SimV2SelectionResult[];
	110004: ISheetData_Simulation_SimV2SelectionResult[];
}
declare interface ISheetData_Simulation_SimV2SelectionResult {
	/** 选项id组，每个结果配置一行 */
	selection_id: number;
	/** 结果id */
	selection_result_id: number;
	/** 结果分类1=大成功，2=成功，3=普通 */
	selection_result_type: number;
	/** 这个结果的初始权重 */
	initial_weight: number;
	/** 五维变动-运气 */
	luk: number;
	/** 技术 */
	tec: number;
	/** 洞察 */
	ins: number;
	/** 直觉 */
	int: number;
	/** 智谋 */
	res: number;
	/** 此结果会获得的特性id */
	effect: number[];
	/** 如果是对局事件，此结果会获得的对局buff（种类多） */
	buff: number[];
}
//#endregion

//#region sim_v2_buff --- unique
declare interface ISheet_Simulation_SimV2Buff {
	rows: ISheetData_Simulation_SimV2Buff[];
	10440111: ISheetData_Simulation_SimV2Buff;
	10440121: ISheetData_Simulation_SimV2Buff;
	10440211: ISheetData_Simulation_SimV2Buff;
	10440221: ISheetData_Simulation_SimV2Buff;
	10440411: ISheetData_Simulation_SimV2Buff;
	10450111: ISheetData_Simulation_SimV2Buff;
	10450112: ISheetData_Simulation_SimV2Buff;
	10450211: ISheetData_Simulation_SimV2Buff;
	10450212: ISheetData_Simulation_SimV2Buff;
	10450311: ISheetData_Simulation_SimV2Buff;
	10450411: ISheetData_Simulation_SimV2Buff;
	10450412: ISheetData_Simulation_SimV2Buff;
	10450413: ISheetData_Simulation_SimV2Buff;
	10460111: ISheetData_Simulation_SimV2Buff;
	10460112: ISheetData_Simulation_SimV2Buff;
	10460211: ISheetData_Simulation_SimV2Buff;
	10460212: ISheetData_Simulation_SimV2Buff;
	10460311: ISheetData_Simulation_SimV2Buff;
	10460312: ISheetData_Simulation_SimV2Buff;
	10460411: ISheetData_Simulation_SimV2Buff;
	10460412: ISheetData_Simulation_SimV2Buff;
	10460413: ISheetData_Simulation_SimV2Buff;
	10470111: ISheetData_Simulation_SimV2Buff;
	10470112: ISheetData_Simulation_SimV2Buff;
	10470211: ISheetData_Simulation_SimV2Buff;
	10470311: ISheetData_Simulation_SimV2Buff;
	10470312: ISheetData_Simulation_SimV2Buff;
	10480111: ISheetData_Simulation_SimV2Buff;
	10480112: ISheetData_Simulation_SimV2Buff;
	10480211: ISheetData_Simulation_SimV2Buff;
	10480212: ISheetData_Simulation_SimV2Buff;
	10480411: ISheetData_Simulation_SimV2Buff;
	10480412: ISheetData_Simulation_SimV2Buff;
	10480413: ISheetData_Simulation_SimV2Buff;
	10490111: ISheetData_Simulation_SimV2Buff;
	10490112: ISheetData_Simulation_SimV2Buff;
	10490211: ISheetData_Simulation_SimV2Buff;
	10490212: ISheetData_Simulation_SimV2Buff;
	10490213: ISheetData_Simulation_SimV2Buff;
	10490411: ISheetData_Simulation_SimV2Buff;
	10490412: ISheetData_Simulation_SimV2Buff;
	10490413: ISheetData_Simulation_SimV2Buff;
	10500111: ISheetData_Simulation_SimV2Buff;
	10500112: ISheetData_Simulation_SimV2Buff;
	10500311: ISheetData_Simulation_SimV2Buff;
	10500321: ISheetData_Simulation_SimV2Buff;
	10500411: ISheetData_Simulation_SimV2Buff;
	10500511: ISheetData_Simulation_SimV2Buff;
	10500512: ISheetData_Simulation_SimV2Buff;
	10510111: ISheetData_Simulation_SimV2Buff;
	10510112: ISheetData_Simulation_SimV2Buff;
	10510211: ISheetData_Simulation_SimV2Buff;
	10510212: ISheetData_Simulation_SimV2Buff;
	10510213: ISheetData_Simulation_SimV2Buff;
	10510221: ISheetData_Simulation_SimV2Buff;
	10510222: ISheetData_Simulation_SimV2Buff;
	10510223: ISheetData_Simulation_SimV2Buff;
	10510311: ISheetData_Simulation_SimV2Buff;
	10510312: ISheetData_Simulation_SimV2Buff;
	10510321: ISheetData_Simulation_SimV2Buff;
	10510411: ISheetData_Simulation_SimV2Buff;
	10510412: ISheetData_Simulation_SimV2Buff;
	10520111: ISheetData_Simulation_SimV2Buff;
	10520121: ISheetData_Simulation_SimV2Buff;
	10520211: ISheetData_Simulation_SimV2Buff;
	10520212: ISheetData_Simulation_SimV2Buff;
	10520221: ISheetData_Simulation_SimV2Buff;
	10520222: ISheetData_Simulation_SimV2Buff;
	10520311: ISheetData_Simulation_SimV2Buff;
	10520312: ISheetData_Simulation_SimV2Buff;
	10530111: ISheetData_Simulation_SimV2Buff;
	10530121: ISheetData_Simulation_SimV2Buff;
	10530211: ISheetData_Simulation_SimV2Buff;
	10530221: ISheetData_Simulation_SimV2Buff;
	10530411: ISheetData_Simulation_SimV2Buff;
	10540111: ISheetData_Simulation_SimV2Buff;
	10540121: ISheetData_Simulation_SimV2Buff;
	10540211: ISheetData_Simulation_SimV2Buff;
	10540221: ISheetData_Simulation_SimV2Buff;
	10540311: ISheetData_Simulation_SimV2Buff;
	10540321: ISheetData_Simulation_SimV2Buff;
	10550111: ISheetData_Simulation_SimV2Buff;
	10550211: ISheetData_Simulation_SimV2Buff;
	10550212: ISheetData_Simulation_SimV2Buff;
	10550411: ISheetData_Simulation_SimV2Buff;
	10550412: ISheetData_Simulation_SimV2Buff;
	10560111: ISheetData_Simulation_SimV2Buff;
	10560121: ISheetData_Simulation_SimV2Buff;
	10560211: ISheetData_Simulation_SimV2Buff;
	10560221: ISheetData_Simulation_SimV2Buff;
	10560411: ISheetData_Simulation_SimV2Buff;
	10560412: ISheetData_Simulation_SimV2Buff;
	10570111: ISheetData_Simulation_SimV2Buff;
	10570121: ISheetData_Simulation_SimV2Buff;
	10570122: ISheetData_Simulation_SimV2Buff;
	10570211: ISheetData_Simulation_SimV2Buff;
	10570411: ISheetData_Simulation_SimV2Buff;
	10570412: ISheetData_Simulation_SimV2Buff;
	10580111: ISheetData_Simulation_SimV2Buff;
	10580121: ISheetData_Simulation_SimV2Buff;
	10580211: ISheetData_Simulation_SimV2Buff;
	10580411: ISheetData_Simulation_SimV2Buff;
	10590111: ISheetData_Simulation_SimV2Buff;
	10590112: ISheetData_Simulation_SimV2Buff;
	10590211: ISheetData_Simulation_SimV2Buff;
	10590212: ISheetData_Simulation_SimV2Buff;
	10590311: ISheetData_Simulation_SimV2Buff;
	10590321: ISheetData_Simulation_SimV2Buff;
	10590411: ISheetData_Simulation_SimV2Buff;
	10600111: ISheetData_Simulation_SimV2Buff;
	10600121: ISheetData_Simulation_SimV2Buff;
	10600211: ISheetData_Simulation_SimV2Buff;
	10600221: ISheetData_Simulation_SimV2Buff;
	10610111: ISheetData_Simulation_SimV2Buff;
	10610121: ISheetData_Simulation_SimV2Buff;
	10610211: ISheetData_Simulation_SimV2Buff;
	10610311: ISheetData_Simulation_SimV2Buff;
	10610312: ISheetData_Simulation_SimV2Buff;
	10610321: ISheetData_Simulation_SimV2Buff;
	10610411: ISheetData_Simulation_SimV2Buff;
	10610412: ISheetData_Simulation_SimV2Buff;
	10620111: ISheetData_Simulation_SimV2Buff;
	10620121: ISheetData_Simulation_SimV2Buff;
	10620122: ISheetData_Simulation_SimV2Buff;
	10620211: ISheetData_Simulation_SimV2Buff;
	10620221: ISheetData_Simulation_SimV2Buff;
	10620222: ISheetData_Simulation_SimV2Buff;
	10620311: ISheetData_Simulation_SimV2Buff;
	10630111: ISheetData_Simulation_SimV2Buff;
	10630121: ISheetData_Simulation_SimV2Buff;
	10630211: ISheetData_Simulation_SimV2Buff;
	10630221: ISheetData_Simulation_SimV2Buff;
	10630411: ISheetData_Simulation_SimV2Buff;
	10630412: ISheetData_Simulation_SimV2Buff;
	10640111: ISheetData_Simulation_SimV2Buff;
	10640121: ISheetData_Simulation_SimV2Buff;
	10640211: ISheetData_Simulation_SimV2Buff;
	10640221: ISheetData_Simulation_SimV2Buff;
	10640411: ISheetData_Simulation_SimV2Buff;
	10650111: ISheetData_Simulation_SimV2Buff;
	10650112: ISheetData_Simulation_SimV2Buff;
	10650121: ISheetData_Simulation_SimV2Buff;
	10650122: ISheetData_Simulation_SimV2Buff;
	10650211: ISheetData_Simulation_SimV2Buff;
	10650212: ISheetData_Simulation_SimV2Buff;
	10650221: ISheetData_Simulation_SimV2Buff;
	10650222: ISheetData_Simulation_SimV2Buff;
	10650411: ISheetData_Simulation_SimV2Buff;
	10660111: ISheetData_Simulation_SimV2Buff;
	10660112: ISheetData_Simulation_SimV2Buff;
	10660121: ISheetData_Simulation_SimV2Buff;
	10660122: ISheetData_Simulation_SimV2Buff;
	10660211: ISheetData_Simulation_SimV2Buff;
	10660212: ISheetData_Simulation_SimV2Buff;
	10660221: ISheetData_Simulation_SimV2Buff;
	10660222: ISheetData_Simulation_SimV2Buff;
	10660311: ISheetData_Simulation_SimV2Buff;
	10660411: ISheetData_Simulation_SimV2Buff;
	10660412: ISheetData_Simulation_SimV2Buff;
	10670111: ISheetData_Simulation_SimV2Buff;
	10670112: ISheetData_Simulation_SimV2Buff;
	10670211: ISheetData_Simulation_SimV2Buff;
	10670221: ISheetData_Simulation_SimV2Buff;
	10670311: ISheetData_Simulation_SimV2Buff;
	10670312: ISheetData_Simulation_SimV2Buff;
	10670321: ISheetData_Simulation_SimV2Buff;
	10680111: ISheetData_Simulation_SimV2Buff;
	10680112: ISheetData_Simulation_SimV2Buff;
	10680121: ISheetData_Simulation_SimV2Buff;
	10680122: ISheetData_Simulation_SimV2Buff;
	10680211: ISheetData_Simulation_SimV2Buff;
	10680212: ISheetData_Simulation_SimV2Buff;
	10680221: ISheetData_Simulation_SimV2Buff;
	10680222: ISheetData_Simulation_SimV2Buff;
	10680311: ISheetData_Simulation_SimV2Buff;
	10680312: ISheetData_Simulation_SimV2Buff;
	10690111: ISheetData_Simulation_SimV2Buff;
	10690112: ISheetData_Simulation_SimV2Buff;
	10690121: ISheetData_Simulation_SimV2Buff;
	10690122: ISheetData_Simulation_SimV2Buff;
	10690211: ISheetData_Simulation_SimV2Buff;
	10690212: ISheetData_Simulation_SimV2Buff;
	10690221: ISheetData_Simulation_SimV2Buff;
	10690411: ISheetData_Simulation_SimV2Buff;
	10690412: ISheetData_Simulation_SimV2Buff;
	10700111: ISheetData_Simulation_SimV2Buff;
	10700112: ISheetData_Simulation_SimV2Buff;
	10700113: ISheetData_Simulation_SimV2Buff;
	10700121: ISheetData_Simulation_SimV2Buff;
	10700122: ISheetData_Simulation_SimV2Buff;
	10700211: ISheetData_Simulation_SimV2Buff;
	10700212: ISheetData_Simulation_SimV2Buff;
	10700213: ISheetData_Simulation_SimV2Buff;
	10700311: ISheetData_Simulation_SimV2Buff;
	10700321: ISheetData_Simulation_SimV2Buff;
	10700322: ISheetData_Simulation_SimV2Buff;
	10710111: ISheetData_Simulation_SimV2Buff;
	10710121: ISheetData_Simulation_SimV2Buff;
	10710122: ISheetData_Simulation_SimV2Buff;
	10710211: ISheetData_Simulation_SimV2Buff;
	10710311: ISheetData_Simulation_SimV2Buff;
	10710312: ISheetData_Simulation_SimV2Buff;
	10710321: ISheetData_Simulation_SimV2Buff;
	10720111: ISheetData_Simulation_SimV2Buff;
	10720121: ISheetData_Simulation_SimV2Buff;
	10720211: ISheetData_Simulation_SimV2Buff;
	10720212: ISheetData_Simulation_SimV2Buff;
	10720221: ISheetData_Simulation_SimV2Buff;
	10720311: ISheetData_Simulation_SimV2Buff;
	10720312: ISheetData_Simulation_SimV2Buff;
	10730111: ISheetData_Simulation_SimV2Buff;
	10730121: ISheetData_Simulation_SimV2Buff;
	10730211: ISheetData_Simulation_SimV2Buff;
	10730212: ISheetData_Simulation_SimV2Buff;
	10730221: ISheetData_Simulation_SimV2Buff;
	10730222: ISheetData_Simulation_SimV2Buff;
	10730311: ISheetData_Simulation_SimV2Buff;
	10730312: ISheetData_Simulation_SimV2Buff;
	10740111: ISheetData_Simulation_SimV2Buff;
	10740121: ISheetData_Simulation_SimV2Buff;
	10740122: ISheetData_Simulation_SimV2Buff;
	10740211: ISheetData_Simulation_SimV2Buff;
	10740311: ISheetData_Simulation_SimV2Buff;
	10740312: ISheetData_Simulation_SimV2Buff;
	10740321: ISheetData_Simulation_SimV2Buff;
	10740322: ISheetData_Simulation_SimV2Buff;
	10750111: ISheetData_Simulation_SimV2Buff;
	10750121: ISheetData_Simulation_SimV2Buff;
	10750211: ISheetData_Simulation_SimV2Buff;
	10750212: ISheetData_Simulation_SimV2Buff;
	10750213: ISheetData_Simulation_SimV2Buff;
	10750221: ISheetData_Simulation_SimV2Buff;
	10750222: ISheetData_Simulation_SimV2Buff;
	10750223: ISheetData_Simulation_SimV2Buff;
	10750411: ISheetData_Simulation_SimV2Buff;
	10750412: ISheetData_Simulation_SimV2Buff;
	10750413: ISheetData_Simulation_SimV2Buff;
	10760111: ISheetData_Simulation_SimV2Buff;
	10760211: ISheetData_Simulation_SimV2Buff;
	10760221: ISheetData_Simulation_SimV2Buff;
	10760311: ISheetData_Simulation_SimV2Buff;
	10760321: ISheetData_Simulation_SimV2Buff;
	10770111: ISheetData_Simulation_SimV2Buff;
	10770211: ISheetData_Simulation_SimV2Buff;
	10770411: ISheetData_Simulation_SimV2Buff;
	10780111: ISheetData_Simulation_SimV2Buff;
	10780211: ISheetData_Simulation_SimV2Buff;
	10780212: ISheetData_Simulation_SimV2Buff;
	10780311: ISheetData_Simulation_SimV2Buff;
	10790111: ISheetData_Simulation_SimV2Buff;
	10790121: ISheetData_Simulation_SimV2Buff;
	10790211: ISheetData_Simulation_SimV2Buff;
	10790311: ISheetData_Simulation_SimV2Buff;
	10790321: ISheetData_Simulation_SimV2Buff;
	10800111: ISheetData_Simulation_SimV2Buff;
	10800112: ISheetData_Simulation_SimV2Buff;
	10800121: ISheetData_Simulation_SimV2Buff;
	10800122: ISheetData_Simulation_SimV2Buff;
	10800211: ISheetData_Simulation_SimV2Buff;
	10800221: ISheetData_Simulation_SimV2Buff;
	10800311: ISheetData_Simulation_SimV2Buff;
	10800312: ISheetData_Simulation_SimV2Buff;
	10800411: ISheetData_Simulation_SimV2Buff;
	10800412: ISheetData_Simulation_SimV2Buff;
	10810111: ISheetData_Simulation_SimV2Buff;
	10810121: ISheetData_Simulation_SimV2Buff;
	10810211: ISheetData_Simulation_SimV2Buff;
	10810311: ISheetData_Simulation_SimV2Buff;
	10810312: ISheetData_Simulation_SimV2Buff;
	10810321: ISheetData_Simulation_SimV2Buff;
	10810322: ISheetData_Simulation_SimV2Buff;
	10810411: ISheetData_Simulation_SimV2Buff;
	10810412: ISheetData_Simulation_SimV2Buff;
	10820111: ISheetData_Simulation_SimV2Buff;
	10820112: ISheetData_Simulation_SimV2Buff;
	10820121: ISheetData_Simulation_SimV2Buff;
	10820122: ISheetData_Simulation_SimV2Buff;
	10820211: ISheetData_Simulation_SimV2Buff;
	10820311: ISheetData_Simulation_SimV2Buff;
	10820321: ISheetData_Simulation_SimV2Buff;
	10830111: ISheetData_Simulation_SimV2Buff;
	10830112: ISheetData_Simulation_SimV2Buff;
	10830211: ISheetData_Simulation_SimV2Buff;
	10830212: ISheetData_Simulation_SimV2Buff;
	10830221: ISheetData_Simulation_SimV2Buff;
	10830222: ISheetData_Simulation_SimV2Buff;
	10830311: ISheetData_Simulation_SimV2Buff;
	10830321: ISheetData_Simulation_SimV2Buff;
	10840111: ISheetData_Simulation_SimV2Buff;
	10840211: ISheetData_Simulation_SimV2Buff;
	10840212: ISheetData_Simulation_SimV2Buff;
	10840221: ISheetData_Simulation_SimV2Buff;
	10840311: ISheetData_Simulation_SimV2Buff;
	10840321: ISheetData_Simulation_SimV2Buff;
	10840322: ISheetData_Simulation_SimV2Buff;
	10850111: ISheetData_Simulation_SimV2Buff;
	10850121: ISheetData_Simulation_SimV2Buff;
	10850122: ISheetData_Simulation_SimV2Buff;
	10850211: ISheetData_Simulation_SimV2Buff;
	10850311: ISheetData_Simulation_SimV2Buff;
	10850312: ISheetData_Simulation_SimV2Buff;
	10850321: ISheetData_Simulation_SimV2Buff;
	10850322: ISheetData_Simulation_SimV2Buff;
	10860111: ISheetData_Simulation_SimV2Buff;
	10860112: ISheetData_Simulation_SimV2Buff;
	10860121: ISheetData_Simulation_SimV2Buff;
	10860122: ISheetData_Simulation_SimV2Buff;
	10860211: ISheetData_Simulation_SimV2Buff;
	10860212: ISheetData_Simulation_SimV2Buff;
	10860221: ISheetData_Simulation_SimV2Buff;
	10860222: ISheetData_Simulation_SimV2Buff;
	10860411: ISheetData_Simulation_SimV2Buff;
	10870111: ISheetData_Simulation_SimV2Buff;
	10870121: ISheetData_Simulation_SimV2Buff;
	10870211: ISheetData_Simulation_SimV2Buff;
	10870221: ISheetData_Simulation_SimV2Buff;
	10870222: ISheetData_Simulation_SimV2Buff;
	10870411: ISheetData_Simulation_SimV2Buff;
	10880111: ISheetData_Simulation_SimV2Buff;
	10880112: ISheetData_Simulation_SimV2Buff;
	10880121: ISheetData_Simulation_SimV2Buff;
	10880211: ISheetData_Simulation_SimV2Buff;
	10880221: ISheetData_Simulation_SimV2Buff;
	10880311: ISheetData_Simulation_SimV2Buff;
	10880312: ISheetData_Simulation_SimV2Buff;
	10880411: ISheetData_Simulation_SimV2Buff;
	10890111: ISheetData_Simulation_SimV2Buff;
	10890121: ISheetData_Simulation_SimV2Buff;
	10890211: ISheetData_Simulation_SimV2Buff;
	10890221: ISheetData_Simulation_SimV2Buff;
	10890311: ISheetData_Simulation_SimV2Buff;
	10890411: ISheetData_Simulation_SimV2Buff;
	10890412: ISheetData_Simulation_SimV2Buff;
	10900111: ISheetData_Simulation_SimV2Buff;
	10900121: ISheetData_Simulation_SimV2Buff;
	10900211: ISheetData_Simulation_SimV2Buff;
	10900221: ISheetData_Simulation_SimV2Buff;
	10900311: ISheetData_Simulation_SimV2Buff;
	10900411: ISheetData_Simulation_SimV2Buff;
	10910111: ISheetData_Simulation_SimV2Buff;
	10910211: ISheetData_Simulation_SimV2Buff;
	10910221: ISheetData_Simulation_SimV2Buff;
	10910222: ISheetData_Simulation_SimV2Buff;
	10910411: ISheetData_Simulation_SimV2Buff;
	10910412: ISheetData_Simulation_SimV2Buff;
	10920111: ISheetData_Simulation_SimV2Buff;
	10920121: ISheetData_Simulation_SimV2Buff;
	10920211: ISheetData_Simulation_SimV2Buff;
	10920311: ISheetData_Simulation_SimV2Buff;
	10920312: ISheetData_Simulation_SimV2Buff;
	10920321: ISheetData_Simulation_SimV2Buff;
	10920322: ISheetData_Simulation_SimV2Buff;
	10920411: ISheetData_Simulation_SimV2Buff;
	10930111: ISheetData_Simulation_SimV2Buff;
	10930211: ISheetData_Simulation_SimV2Buff;
	10930221: ISheetData_Simulation_SimV2Buff;
	10930222: ISheetData_Simulation_SimV2Buff;
	10930411: ISheetData_Simulation_SimV2Buff;
	10930412: ISheetData_Simulation_SimV2Buff;
	10940111: ISheetData_Simulation_SimV2Buff;
	10940112: ISheetData_Simulation_SimV2Buff;
	10940121: ISheetData_Simulation_SimV2Buff;
	10940122: ISheetData_Simulation_SimV2Buff;
	10940211: ISheetData_Simulation_SimV2Buff;
	10940212: ISheetData_Simulation_SimV2Buff;
	10940221: ISheetData_Simulation_SimV2Buff;
	10940311: ISheetData_Simulation_SimV2Buff;
	10940312: ISheetData_Simulation_SimV2Buff;
	10950111: ISheetData_Simulation_SimV2Buff;
	10950112: ISheetData_Simulation_SimV2Buff;
	10950121: ISheetData_Simulation_SimV2Buff;
	10950211: ISheetData_Simulation_SimV2Buff;
	10950212: ISheetData_Simulation_SimV2Buff;
	10950221: ISheetData_Simulation_SimV2Buff;
	10950411: ISheetData_Simulation_SimV2Buff;
	10960111: ISheetData_Simulation_SimV2Buff;
	10960121: ISheetData_Simulation_SimV2Buff;
	10960211: ISheetData_Simulation_SimV2Buff;
	10960221: ISheetData_Simulation_SimV2Buff;
	10970111: ISheetData_Simulation_SimV2Buff;
	10970121: ISheetData_Simulation_SimV2Buff;
	10970211: ISheetData_Simulation_SimV2Buff;
	10970221: ISheetData_Simulation_SimV2Buff;
	10970411: ISheetData_Simulation_SimV2Buff;
	10980111: ISheetData_Simulation_SimV2Buff;
	10980121: ISheetData_Simulation_SimV2Buff;
	10980211: ISheetData_Simulation_SimV2Buff;
	10980221: ISheetData_Simulation_SimV2Buff;
	10980411: ISheetData_Simulation_SimV2Buff;
	10990111: ISheetData_Simulation_SimV2Buff;
	10990121: ISheetData_Simulation_SimV2Buff;
	10990211: ISheetData_Simulation_SimV2Buff;
	10990212: ISheetData_Simulation_SimV2Buff;
	10990221: ISheetData_Simulation_SimV2Buff;
	10990222: ISheetData_Simulation_SimV2Buff;
	10990411: ISheetData_Simulation_SimV2Buff;
	10990412: ISheetData_Simulation_SimV2Buff;
	11000111: ISheetData_Simulation_SimV2Buff;
	11000112: ISheetData_Simulation_SimV2Buff;
	11000121: ISheetData_Simulation_SimV2Buff;
	11000122: ISheetData_Simulation_SimV2Buff;
	11000211: ISheetData_Simulation_SimV2Buff;
	11000212: ISheetData_Simulation_SimV2Buff;
	11000221: ISheetData_Simulation_SimV2Buff;
	11000222: ISheetData_Simulation_SimV2Buff;
	11000411: ISheetData_Simulation_SimV2Buff;
}
declare interface ISheetData_Simulation_SimV2Buff {
	/** 对局结果，每种1行 */
	buff_id: number;
	/** buff的结果页显示文本，str_event */
	buff_result_desc: number;
	/** buff的说明文本，str_event */
	buff_desc: number;
	/** type */
	type: number;
	/** 比赛事件的生效时间，0当局1下局 */
	match_effect: number;
	/** 需要引入的其他参数用 */
	param: string[];
}
//#endregion

//#region sim_v2_upgrade --- unique
declare interface ISheet_Simulation_SimV2Upgrade {
	rows: ISheetData_Simulation_SimV2Upgrade[];
	250401: ISheetData_Simulation_SimV2Upgrade;
}
declare interface ISheetData_Simulation_SimV2Upgrade {
	/** 活动id */
	activity_id: number;
	/** 一个升级点对应属性点个数 */
	skill_point: number;
	/** 单维属性加点上限 */
	limit: number;
	/** 对应道具id */
	item_id: number;
}
//#endregion

//#region sim_v2_story --- group
declare interface ISheet_Simulation_SimV2Story {
	rows: ISheetData_Simulation_SimV2Story[];
	250401: ISheetData_Simulation_SimV2Story[];
}
declare interface ISheetData_Simulation_SimV2Story {
	/** 绑定activity表的活动 */
	activity_id: number;
	story_id: number;
	/** 触发类型 */
	trigger_type: number;
	/** 触发几率 */
	weight: number;
	/** 文字描述 */
	str_id: number;
	args: number[];
}
//#endregion

//#region sim_v2_reward --- group
declare interface ISheet_Simulation_SimV2Reward {
	rows: ISheetData_Simulation_SimV2Reward[];
	250401: ISheetData_Simulation_SimV2Reward[];
}
declare interface ISheetData_Simulation_SimV2Reward {
	/** 绑定activity表的活动 */
	activity_id: number;
	/** 排位 1-4 */
	rank: number;
	/** 能力值加点 */
	ability: number;
	/** 随机获得特性个数 */
	random_effect: number;
}
//#endregion