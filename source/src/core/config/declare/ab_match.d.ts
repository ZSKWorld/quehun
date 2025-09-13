declare interface ITable_AbMatch {
	match_info: ISheet_AbMatch_MatchInfo;
	point: ISheet_AbMatch_Point;
	reward_seq: ISheet_AbMatch_RewardSeq;
	consume_seq: ISheet_AbMatch_ConsumeSeq;
}

//#region match_info --- unique
declare interface ISheet_AbMatch_MatchInfo {
	rows: ISheetData_AbMatch_MatchInfo[];
	1001: ISheetData_AbMatch_MatchInfo;
	1002: ISheetData_AbMatch_MatchInfo;
	1003: ISheetData_AbMatch_MatchInfo;
	1004: ISheetData_AbMatch_MatchInfo;
	1005: ISheetData_AbMatch_MatchInfo;
}
declare interface ISheetData_AbMatch_MatchInfo {
	id: number;
	ab_match_activity_id: number;
	match_activity_id: number;
	desktop_id_list: string;
	/** 每次买入的消耗id */
	consume_id: number;
	/** 买入条件 */
	buy_in_condition: string;
	/** 邮件补发奖品编号 */
	mail_template_id: number;
	/** 单次买入对局数 */
	max_match_count: number;
	reward_id: number;
	point_id: number;
	match_level: number;
	/** 优先级，优先进入满足买入条件的优先级高的组别 */
	priority: number;
}
//#endregion

//#region point --- group
declare interface ISheet_AbMatch_Point {
	rows: ISheetData_AbMatch_Point[];
	4001: ISheetData_AbMatch_Point[];
	4002: ISheetData_AbMatch_Point[];
	4003: ISheetData_AbMatch_Point[];
	4004: ISheetData_AbMatch_Point[];
	4005: ISheetData_AbMatch_Point[];
}
declare interface ISheetData_AbMatch_Point {
	id: number;
	rank: number;
	desktop_id_list: string;
	point: number;
}
//#endregion

//#region reward_seq --- group
declare interface ISheet_AbMatch_RewardSeq {
	rows: ISheetData_AbMatch_RewardSeq[];
	5001: ISheetData_AbMatch_RewardSeq[];
	5002: ISheetData_AbMatch_RewardSeq[];
	5003: ISheetData_AbMatch_RewardSeq[];
	5004: ISheetData_AbMatch_RewardSeq[];
	5005: ISheetData_AbMatch_RewardSeq[];
}
declare interface ISheetData_AbMatch_RewardSeq {
	id: number;
	point_lower: number;
	point_upper: number;
	reward: string;
	chest_mark: number;
}
//#endregion

//#region consume_seq --- group
declare interface ISheet_AbMatch_ConsumeSeq {
	rows: ISheetData_AbMatch_ConsumeSeq[];
	9001: ISheetData_AbMatch_ConsumeSeq[];
	9002: ISheetData_AbMatch_ConsumeSeq[];
	9003: ISheetData_AbMatch_ConsumeSeq[];
}
declare interface ISheetData_AbMatch_ConsumeSeq {
	id: number;
	match_count: number;
	item_id: number;
	item_count: number;
}
//#endregion