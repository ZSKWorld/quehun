/** This script is generated automatically, Please do not any modify! */

declare interface ITable_AbMatch {
	/** unique */
	readonly match_info: CfgExt<ISheet_AbMatch_MatchInfo>;
	/** group */
	readonly point: CfgExtGroup<ISheet_AbMatch_Point>;
	/** group */
	readonly reward_seq: CfgExtGroup<ISheet_AbMatch_RewardSeq>;
	/** group */
	readonly consume_seq: CfgExtGroup<ISheet_AbMatch_ConsumeSeq>;
}

//#region match_info
declare interface ISheet_AbMatch_MatchInfo {
	readonly [key: string]: ISheetData_AbMatch_MatchInfo;
	readonly 1001: ISheetData_AbMatch_MatchInfo;
	readonly 1002: ISheetData_AbMatch_MatchInfo;
	readonly 1003: ISheetData_AbMatch_MatchInfo;
	readonly 1004: ISheetData_AbMatch_MatchInfo;
	readonly 1005: ISheetData_AbMatch_MatchInfo;
}
declare interface ISheetData_AbMatch_MatchInfo extends ISheetDataBase {
	readonly id: number;
	readonly ab_match_activity_id: number;
	readonly match_activity_id: number;
	readonly desktop_id_list: string;
	/** 每次买入的消耗id */
	readonly consume_id: number;
	/** 买入条件 */
	readonly buy_in_condition: string;
	/** 邮件补发奖品编号 */
	readonly mail_template_id: number;
	/** 单次买入对局数 */
	readonly max_match_count: number;
	readonly reward_id: number;
	readonly point_id: number;
	readonly match_level: number;
	/** 优先级，优先进入满足买入条件的优先级高的组别 */
	readonly priority: number;
}
//#endregion

//#region point
declare interface ISheet_AbMatch_Point {
	readonly [key: string]: ISheetData_AbMatch_Point[];
	readonly 4001: ISheetData_AbMatch_Point[];
	readonly 4002: ISheetData_AbMatch_Point[];
	readonly 4003: ISheetData_AbMatch_Point[];
	readonly 4004: ISheetData_AbMatch_Point[];
	readonly 4005: ISheetData_AbMatch_Point[];
}
declare interface ISheetData_AbMatch_Point extends ISheetDataBase {
	readonly id: number;
	readonly rank: number;
	readonly desktop_id_list: string;
	readonly point: number;
}
//#endregion

//#region reward_seq
declare interface ISheet_AbMatch_RewardSeq {
	readonly [key: string]: ISheetData_AbMatch_RewardSeq[];
	readonly 5001: ISheetData_AbMatch_RewardSeq[];
	readonly 5002: ISheetData_AbMatch_RewardSeq[];
	readonly 5003: ISheetData_AbMatch_RewardSeq[];
	readonly 5004: ISheetData_AbMatch_RewardSeq[];
	readonly 5005: ISheetData_AbMatch_RewardSeq[];
}
declare interface ISheetData_AbMatch_RewardSeq extends ISheetDataBase {
	readonly id: number;
	readonly point_lower: number;
	readonly point_upper: number;
	readonly reward: string;
	readonly chest_mark: number;
}
//#endregion

//#region consume_seq
declare interface ISheet_AbMatch_ConsumeSeq {
	readonly [key: string]: ISheetData_AbMatch_ConsumeSeq[];
	readonly 9001: ISheetData_AbMatch_ConsumeSeq[];
	readonly 9002: ISheetData_AbMatch_ConsumeSeq[];
	readonly 9003: ISheetData_AbMatch_ConsumeSeq[];
}
declare interface ISheetData_AbMatch_ConsumeSeq extends ISheetDataBase {
	readonly id: number;
	readonly match_count: number;
	readonly item_id: number;
	readonly item_count: number;
}
//#endregion