declare interface ITable_Season {
	/** unique */
	season: CfgExt<ISheet_Season_Season>;
	/** unique */
	level_ticket: CfgExt<ISheet_Season_LevelTicket>;
	/** group */
	level_ticket_pool: CfgExt<ISheet_Season_LevelTicketPool>;
	/** group */
	ticket_retry: CfgExt<ISheet_Season_TicketRetry>;
	/** group */
	season_reward: CfgExt<ISheet_Season_SeasonReward>;
}

//#region season
declare interface ISheet_Season_Season {
	1001: ISheetData_Season_Season;
}
declare interface ISheetData_Season_Season {
	id: number;
	/** 开始时间 */
	start_time: string;
	/** 结束时间 */
	end_time: string;
	/** 消失不显示时间 */
	disappear_time: string;
	/** 匹配房id */
	match_mode: number;
	/** 课题券池 */
	level_ticket_pool: number;
	/** 再发行ID */
	ticket_retry: number;
	/** 积分道具ID */
	point_item_id: number;
	/** 敲章消耗积分 */
	point_consume: number;
	/** 赛季名 */
	desc_chs: string;
	/** 赛季名 */
	desc_chs_t: string;
	/** 赛季名 */
	desc_jp: string;
	/** 赛季名 */
	desc_en: string;
	/** 赛季名 */
	desc_kr: string;
	/** 桌类型 */
	desktop_type: number;
}
//#endregion

//#region level_ticket
declare interface ISheet_Season_LevelTicket {
	100001: ISheetData_Season_LevelTicket;
	100002: ISheetData_Season_LevelTicket;
	100003: ISheetData_Season_LevelTicket;
	100004: ISheetData_Season_LevelTicket;
	100005: ISheetData_Season_LevelTicket;
	100006: ISheetData_Season_LevelTicket;
	100007: ISheetData_Season_LevelTicket;
	100008: ISheetData_Season_LevelTicket;
	100009: ISheetData_Season_LevelTicket;
	100010: ISheetData_Season_LevelTicket;
	100011: ISheetData_Season_LevelTicket;
	100012: ISheetData_Season_LevelTicket;
	100013: ISheetData_Season_LevelTicket;
	100014: ISheetData_Season_LevelTicket;
	100015: ISheetData_Season_LevelTicket;
	100016: ISheetData_Season_LevelTicket;
	100017: ISheetData_Season_LevelTicket;
	100018: ISheetData_Season_LevelTicket;
	100019: ISheetData_Season_LevelTicket;
	100020: ISheetData_Season_LevelTicket;
	100021: ISheetData_Season_LevelTicket;
	100022: ISheetData_Season_LevelTicket;
	100023: ISheetData_Season_LevelTicket;
	100024: ISheetData_Season_LevelTicket;
	100025: ISheetData_Season_LevelTicket;
	100026: ISheetData_Season_LevelTicket;
	100027: ISheetData_Season_LevelTicket;
	100028: ISheetData_Season_LevelTicket;
	100029: ISheetData_Season_LevelTicket;
	100030: ISheetData_Season_LevelTicket;
	100031: ISheetData_Season_LevelTicket;
	100032: ISheetData_Season_LevelTicket;
	100033: ISheetData_Season_LevelTicket;
	100034: ISheetData_Season_LevelTicket;
	100035: ISheetData_Season_LevelTicket;
	100036: ISheetData_Season_LevelTicket;
	100037: ISheetData_Season_LevelTicket;
	100038: ISheetData_Season_LevelTicket;
	100039: ISheetData_Season_LevelTicket;
	100040: ISheetData_Season_LevelTicket;
	100041: ISheetData_Season_LevelTicket;
	100042: ISheetData_Season_LevelTicket;
	100043: ISheetData_Season_LevelTicket;
	100044: ISheetData_Season_LevelTicket;
	100045: ISheetData_Season_LevelTicket;
	100046: ISheetData_Season_LevelTicket;
	100047: ISheetData_Season_LevelTicket;
	100048: ISheetData_Season_LevelTicket;
	100049: ISheetData_Season_LevelTicket;
	100050: ISheetData_Season_LevelTicket;
	100051: ISheetData_Season_LevelTicket;
	100052: ISheetData_Season_LevelTicket;
	100053: ISheetData_Season_LevelTicket;
	100054: ISheetData_Season_LevelTicket;
	100055: ISheetData_Season_LevelTicket;
	100056: ISheetData_Season_LevelTicket;
	100057: ISheetData_Season_LevelTicket;
	100058: ISheetData_Season_LevelTicket;
	100059: ISheetData_Season_LevelTicket;
	100060: ISheetData_Season_LevelTicket;
	100061: ISheetData_Season_LevelTicket;
	100062: ISheetData_Season_LevelTicket;
	100063: ISheetData_Season_LevelTicket;
	100064: ISheetData_Season_LevelTicket;
	100065: ISheetData_Season_LevelTicket;
	100066: ISheetData_Season_LevelTicket;
	100067: ISheetData_Season_LevelTicket;
	100068: ISheetData_Season_LevelTicket;
	100069: ISheetData_Season_LevelTicket;
	100070: ISheetData_Season_LevelTicket;
	100071: ISheetData_Season_LevelTicket;
	100072: ISheetData_Season_LevelTicket;
	100073: ISheetData_Season_LevelTicket;
	100074: ISheetData_Season_LevelTicket;
	100075: ISheetData_Season_LevelTicket;
	100076: ISheetData_Season_LevelTicket;
	100077: ISheetData_Season_LevelTicket;
	100078: ISheetData_Season_LevelTicket;
	100079: ISheetData_Season_LevelTicket;
	100080: ISheetData_Season_LevelTicket;
	100081: ISheetData_Season_LevelTicket;
	100082: ISheetData_Season_LevelTicket;
	100083: ISheetData_Season_LevelTicket;
	100084: ISheetData_Season_LevelTicket;
	100085: ISheetData_Season_LevelTicket;
	100086: ISheetData_Season_LevelTicket;
	100087: ISheetData_Season_LevelTicket;
	100088: ISheetData_Season_LevelTicket;
	100089: ISheetData_Season_LevelTicket;
	100090: ISheetData_Season_LevelTicket;
	100091: ISheetData_Season_LevelTicket;
	100092: ISheetData_Season_LevelTicket;
	100100: ISheetData_Season_LevelTicket;
	100101: ISheetData_Season_LevelTicket;
	100102: ISheetData_Season_LevelTicket;
	100103: ISheetData_Season_LevelTicket;
	100104: ISheetData_Season_LevelTicket;
	100105: ISheetData_Season_LevelTicket;
	100106: ISheetData_Season_LevelTicket;
	100107: ISheetData_Season_LevelTicket;
	100108: ISheetData_Season_LevelTicket;
	100109: ISheetData_Season_LevelTicket;
	100110: ISheetData_Season_LevelTicket;
	100111: ISheetData_Season_LevelTicket;
	100112: ISheetData_Season_LevelTicket;
	100113: ISheetData_Season_LevelTicket;
	100114: ISheetData_Season_LevelTicket;
	100115: ISheetData_Season_LevelTicket;
	100116: ISheetData_Season_LevelTicket;
	100117: ISheetData_Season_LevelTicket;
	100118: ISheetData_Season_LevelTicket;
	100119: ISheetData_Season_LevelTicket;
	100120: ISheetData_Season_LevelTicket;
	100121: ISheetData_Season_LevelTicket;
	100122: ISheetData_Season_LevelTicket;
	100123: ISheetData_Season_LevelTicket;
	100124: ISheetData_Season_LevelTicket;
	100125: ISheetData_Season_LevelTicket;
	100126: ISheetData_Season_LevelTicket;
	100127: ISheetData_Season_LevelTicket;
	100128: ISheetData_Season_LevelTicket;
	100129: ISheetData_Season_LevelTicket;
	100130: ISheetData_Season_LevelTicket;
	100131: ISheetData_Season_LevelTicket;
	100132: ISheetData_Season_LevelTicket;
}
declare interface ISheetData_Season_LevelTicket {
	/** 课题券ID */
	id: number;
	/** 难度 */
	level: number;
	/** 最大对局数 */
	game_count: number;
	/** 权重 */
	weight: number;
	/** 课题券任务 */
	task: number[];
	reward: string;
}
//#endregion

//#region level_ticket_pool
declare interface ISheet_Season_LevelTicketPool {
	100101: ISheetData_Season_LevelTicketPool[];
}
declare interface ISheetData_Season_LevelTicketPool {
	/** 课题券池ID */
	pool_id: number;
	/** 等级下限 */
	level_lower: number;
	/** 等级上限 */
	level_upper: number;
	/** 课题券难度 */
	ticket_level: number;
}
//#endregion

//#region ticket_retry
declare interface ISheet_Season_TicketRetry {
	100102: ISheetData_Season_TicketRetry[];
}
declare interface ISheetData_Season_TicketRetry {
	/** 组别id */
	group_id: number;
	/** 次数 */
	count: number;
	/** 花费铜币 */
	cost: number;
}
//#endregion

//#region season_reward
declare interface ISheet_Season_SeasonReward {
	1001: ISheetData_Season_SeasonReward[];
}
declare interface ISheetData_Season_SeasonReward {
	/** 赛季ID */
	season_id: number;
	/** 排名下限 */
	rank_lower: number;
	/** 排名上限 */
	rank_upper: number;
	/** 奖励列表 */
	rewards: string;
}
//#endregion