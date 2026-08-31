/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Season {
	/** unique */
	readonly season: CfgExt<ISheet_Season_Season>;
	/** unique */
	readonly level_ticket: CfgExt<ISheet_Season_LevelTicket>;
	/** group */
	readonly level_ticket_pool: CfgExtGroup<ISheet_Season_LevelTicketPool>;
	/** group */
	readonly ticket_retry: CfgExtGroup<ISheet_Season_TicketRetry>;
	/** group */
	readonly season_reward: CfgExtGroup<ISheet_Season_SeasonReward>;
}

//#region season
declare interface ISheet_Season_Season {
	readonly [key: string]: ISheetData_Season_Season;
	readonly 1001: ISheetData_Season_Season;
}
declare interface ISheetData_Season_Season extends ISheetDataBase {
	readonly id: number;
	/** 开始时间 */
	readonly start_time: string;
	/** 结束时间 */
	readonly end_time: string;
	/** 消失不显示时间 */
	readonly disappear_time: string;
	/** 匹配房id */
	readonly match_mode: number;
	/** 课题券池 */
	readonly level_ticket_pool: number;
	/** 再发行ID */
	readonly ticket_retry: number;
	/** 积分道具ID */
	readonly point_item_id: number;
	/** 敲章消耗积分 */
	readonly point_consume: number;
	/** 赛季名 */
	readonly desc_chs: string;
	/** 赛季名 */
	readonly desc_chs_t: string;
	/** 赛季名 */
	readonly desc_jp: string;
	/** 赛季名 */
	readonly desc_en: string;
	/** 赛季名 */
	readonly desc_kr: string;
	/** 桌类型 */
	readonly desktop_type: number;
}
//#endregion

//#region level_ticket
declare interface ISheet_Season_LevelTicket {
	readonly [key: string]: ISheetData_Season_LevelTicket;
	readonly 100001: ISheetData_Season_LevelTicket;
	readonly 100002: ISheetData_Season_LevelTicket;
	readonly 100003: ISheetData_Season_LevelTicket;
	readonly 100004: ISheetData_Season_LevelTicket;
	readonly 100005: ISheetData_Season_LevelTicket;
	readonly 100006: ISheetData_Season_LevelTicket;
	readonly 100007: ISheetData_Season_LevelTicket;
	readonly 100008: ISheetData_Season_LevelTicket;
	readonly 100009: ISheetData_Season_LevelTicket;
	readonly 100010: ISheetData_Season_LevelTicket;
	readonly 100011: ISheetData_Season_LevelTicket;
	readonly 100012: ISheetData_Season_LevelTicket;
	readonly 100013: ISheetData_Season_LevelTicket;
	readonly 100014: ISheetData_Season_LevelTicket;
	readonly 100015: ISheetData_Season_LevelTicket;
	readonly 100016: ISheetData_Season_LevelTicket;
	readonly 100017: ISheetData_Season_LevelTicket;
	readonly 100018: ISheetData_Season_LevelTicket;
	readonly 100019: ISheetData_Season_LevelTicket;
	readonly 100020: ISheetData_Season_LevelTicket;
	readonly 100021: ISheetData_Season_LevelTicket;
	readonly 100022: ISheetData_Season_LevelTicket;
	readonly 100023: ISheetData_Season_LevelTicket;
	readonly 100024: ISheetData_Season_LevelTicket;
	readonly 100025: ISheetData_Season_LevelTicket;
	readonly 100026: ISheetData_Season_LevelTicket;
	readonly 100027: ISheetData_Season_LevelTicket;
	readonly 100028: ISheetData_Season_LevelTicket;
	readonly 100029: ISheetData_Season_LevelTicket;
	readonly 100030: ISheetData_Season_LevelTicket;
	readonly 100031: ISheetData_Season_LevelTicket;
	readonly 100032: ISheetData_Season_LevelTicket;
	readonly 100033: ISheetData_Season_LevelTicket;
	readonly 100034: ISheetData_Season_LevelTicket;
	readonly 100035: ISheetData_Season_LevelTicket;
	readonly 100036: ISheetData_Season_LevelTicket;
	readonly 100037: ISheetData_Season_LevelTicket;
	readonly 100038: ISheetData_Season_LevelTicket;
	readonly 100039: ISheetData_Season_LevelTicket;
	readonly 100040: ISheetData_Season_LevelTicket;
	readonly 100041: ISheetData_Season_LevelTicket;
	readonly 100042: ISheetData_Season_LevelTicket;
	readonly 100043: ISheetData_Season_LevelTicket;
	readonly 100044: ISheetData_Season_LevelTicket;
	readonly 100045: ISheetData_Season_LevelTicket;
	readonly 100046: ISheetData_Season_LevelTicket;
	readonly 100047: ISheetData_Season_LevelTicket;
	readonly 100048: ISheetData_Season_LevelTicket;
	readonly 100049: ISheetData_Season_LevelTicket;
	readonly 100050: ISheetData_Season_LevelTicket;
	readonly 100051: ISheetData_Season_LevelTicket;
	readonly 100052: ISheetData_Season_LevelTicket;
	readonly 100053: ISheetData_Season_LevelTicket;
	readonly 100054: ISheetData_Season_LevelTicket;
	readonly 100055: ISheetData_Season_LevelTicket;
	readonly 100056: ISheetData_Season_LevelTicket;
	readonly 100057: ISheetData_Season_LevelTicket;
	readonly 100058: ISheetData_Season_LevelTicket;
	readonly 100059: ISheetData_Season_LevelTicket;
	readonly 100060: ISheetData_Season_LevelTicket;
	readonly 100061: ISheetData_Season_LevelTicket;
	readonly 100062: ISheetData_Season_LevelTicket;
	readonly 100063: ISheetData_Season_LevelTicket;
	readonly 100064: ISheetData_Season_LevelTicket;
	readonly 100065: ISheetData_Season_LevelTicket;
	readonly 100066: ISheetData_Season_LevelTicket;
	readonly 100067: ISheetData_Season_LevelTicket;
	readonly 100068: ISheetData_Season_LevelTicket;
	readonly 100069: ISheetData_Season_LevelTicket;
	readonly 100070: ISheetData_Season_LevelTicket;
	readonly 100071: ISheetData_Season_LevelTicket;
	readonly 100072: ISheetData_Season_LevelTicket;
	readonly 100073: ISheetData_Season_LevelTicket;
	readonly 100074: ISheetData_Season_LevelTicket;
	readonly 100075: ISheetData_Season_LevelTicket;
	readonly 100076: ISheetData_Season_LevelTicket;
	readonly 100077: ISheetData_Season_LevelTicket;
	readonly 100078: ISheetData_Season_LevelTicket;
	readonly 100079: ISheetData_Season_LevelTicket;
	readonly 100080: ISheetData_Season_LevelTicket;
	readonly 100081: ISheetData_Season_LevelTicket;
	readonly 100082: ISheetData_Season_LevelTicket;
	readonly 100083: ISheetData_Season_LevelTicket;
	readonly 100084: ISheetData_Season_LevelTicket;
	readonly 100085: ISheetData_Season_LevelTicket;
	readonly 100086: ISheetData_Season_LevelTicket;
	readonly 100087: ISheetData_Season_LevelTicket;
	readonly 100088: ISheetData_Season_LevelTicket;
	readonly 100089: ISheetData_Season_LevelTicket;
	readonly 100090: ISheetData_Season_LevelTicket;
	readonly 100091: ISheetData_Season_LevelTicket;
	readonly 100092: ISheetData_Season_LevelTicket;
	readonly 100100: ISheetData_Season_LevelTicket;
	readonly 100101: ISheetData_Season_LevelTicket;
	readonly 100102: ISheetData_Season_LevelTicket;
	readonly 100103: ISheetData_Season_LevelTicket;
	readonly 100104: ISheetData_Season_LevelTicket;
	readonly 100105: ISheetData_Season_LevelTicket;
	readonly 100106: ISheetData_Season_LevelTicket;
	readonly 100107: ISheetData_Season_LevelTicket;
	readonly 100108: ISheetData_Season_LevelTicket;
	readonly 100109: ISheetData_Season_LevelTicket;
	readonly 100110: ISheetData_Season_LevelTicket;
	readonly 100111: ISheetData_Season_LevelTicket;
	readonly 100112: ISheetData_Season_LevelTicket;
	readonly 100113: ISheetData_Season_LevelTicket;
	readonly 100114: ISheetData_Season_LevelTicket;
	readonly 100115: ISheetData_Season_LevelTicket;
	readonly 100116: ISheetData_Season_LevelTicket;
	readonly 100117: ISheetData_Season_LevelTicket;
	readonly 100118: ISheetData_Season_LevelTicket;
	readonly 100119: ISheetData_Season_LevelTicket;
	readonly 100120: ISheetData_Season_LevelTicket;
	readonly 100121: ISheetData_Season_LevelTicket;
	readonly 100122: ISheetData_Season_LevelTicket;
	readonly 100123: ISheetData_Season_LevelTicket;
	readonly 100124: ISheetData_Season_LevelTicket;
	readonly 100125: ISheetData_Season_LevelTicket;
	readonly 100126: ISheetData_Season_LevelTicket;
	readonly 100127: ISheetData_Season_LevelTicket;
	readonly 100128: ISheetData_Season_LevelTicket;
	readonly 100129: ISheetData_Season_LevelTicket;
	readonly 100130: ISheetData_Season_LevelTicket;
	readonly 100131: ISheetData_Season_LevelTicket;
	readonly 100132: ISheetData_Season_LevelTicket;
}
declare interface ISheetData_Season_LevelTicket extends ISheetDataBase {
	/** 课题券ID */
	readonly id: number;
	/** 难度 */
	readonly level: number;
	/** 最大对局数 */
	readonly game_count: number;
	/** 权重 */
	readonly weight: number;
	/** 课题券任务 */
	readonly task: number[];
	readonly reward: string;
}
//#endregion

//#region level_ticket_pool
declare interface ISheet_Season_LevelTicketPool {
	readonly [key: string]: ISheetData_Season_LevelTicketPool[];
	readonly 100101: ISheetData_Season_LevelTicketPool[];
}
declare interface ISheetData_Season_LevelTicketPool extends ISheetDataBase {
	/** 课题券池ID */
	readonly pool_id: number;
	/** 等级下限 */
	readonly level_lower: number;
	/** 等级上限 */
	readonly level_upper: number;
	/** 课题券难度 */
	readonly ticket_level: number;
}
//#endregion

//#region ticket_retry
declare interface ISheet_Season_TicketRetry {
	readonly [key: string]: ISheetData_Season_TicketRetry[];
	readonly 100102: ISheetData_Season_TicketRetry[];
}
declare interface ISheetData_Season_TicketRetry extends ISheetDataBase {
	/** 组别id */
	readonly group_id: number;
	/** 次数 */
	readonly count: number;
	/** 花费铜币 */
	readonly cost: number;
}
//#endregion

//#region season_reward
declare interface ISheet_Season_SeasonReward {
	readonly [key: string]: ISheetData_Season_SeasonReward[];
	readonly 1001: ISheetData_Season_SeasonReward[];
}
declare interface ISheetData_Season_SeasonReward extends ISheetDataBase {
	/** 赛季ID */
	readonly season_id: number;
	/** 排名下限 */
	readonly rank_lower: number;
	/** 排名上限 */
	readonly rank_upper: number;
	/** 奖励列表 */
	readonly rewards: string;
}
//#endregion