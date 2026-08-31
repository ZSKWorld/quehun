/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Marathon {
	/** 活动索引  ---  unique */
	readonly marathon_info: CfgExt<ISheet_Marathon_MarathonInfo>;
	/** 活动分数  ---  group */
	readonly marathon_reward: CfgExtGroup<ISheet_Marathon_MarathonReward>;
	/** 单张麻将牌出现的权重  ---  group */
	readonly marathon_tile_group: CfgExtGroup<ISheet_Marathon_MarathonTileGroup>;
	/** 牌墙生成  ---  group */
	readonly marathon_wall_group: CfgExtGroup<ISheet_Marathon_MarathonWallGroup>;
	/** 关卡内道具权重  ---  group */
	readonly marathon_item_group: CfgExtGroup<ISheet_Marathon_MarathonItemGroup>;
}

//#region marathon_info
declare interface ISheet_Marathon_MarathonInfo {
	readonly [key: string]: ISheetData_Marathon_MarathonInfo;
	readonly 260201: ISheetData_Marathon_MarathonInfo;
}
declare interface ISheetData_Marathon_MarathonInfo extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 一秒多少tick */
	readonly tick: number;
	/** gameover的手牌数 */
	readonly hands_count: number;
	/** 起始倒计时（tick） */
	readonly start_time: number;
	/** fever time 期间速度（两面墙之间tick数） */
	readonly fever_speed: number;
	/** fevertime期间的分数倍率，百分比 */
	readonly fever_time_bonus: number;
	/** 持续墙的面数 */
	readonly fever_time_duration: number;
	/** 一面墙有多少张牌 */
	readonly wall_tile_count: number;
	/** 一面墙最多能有多少张相同牌 */
	readonly wall_max_same_tile: number;
	/** 关卡组 */
	readonly wall_group_id: number;
	/** 牌组 */
	readonly tile_group: number;
	/** 分数 */
	readonly reward_group: number;
	/** 道具 */
	readonly item_group: number;
	/** 胡萝卜id */
	readonly point_item_id: number;
	/** fevertime期间的道具类型 */
	readonly fever_item_type: number;
	/** 训练度id */
	readonly distance_item_id: number;
	/** 单轮游戏每N距离获得1训练度 */
	readonly distance_reward_rate: number;
	/** 单轮游戏获得训练度数量上限 */
	readonly max_distance_reward: number;
	/** 无效牌位置 */
	readonly wall_empty_pos: number[];
}
//#endregion

//#region marathon_reward
declare interface ISheet_Marathon_MarathonReward {
	readonly [key: string]: ISheetData_Marathon_MarathonReward[];
	readonly 3001: ISheetData_Marathon_MarathonReward[];
}
declare interface ISheetData_Marathon_MarathonReward extends ISheetDataBase {
	/** 分数组 */
	readonly group_id: number;
	readonly type: number;
	readonly point: number;
	/** tick每秒30 */
	readonly time: number;
}
//#endregion

//#region marathon_tile_group
declare interface ISheet_Marathon_MarathonTileGroup {
	readonly [key: string]: ISheetData_Marathon_MarathonTileGroup[];
	readonly 2001: ISheetData_Marathon_MarathonTileGroup[];
}
declare interface ISheetData_Marathon_MarathonTileGroup extends ISheetDataBase {
	/** 牌组 */
	readonly group_id: number;
	/** 牌 */
	readonly tile: string;
	/** 基础权重 */
	readonly weight: number;
	/** 福牌权重 */
	readonly fever_weight: number;
}
//#endregion

//#region marathon_wall_group
declare interface ISheet_Marathon_MarathonWallGroup {
	readonly [key: string]: ISheetData_Marathon_MarathonWallGroup[];
	readonly 1001: ISheetData_Marathon_MarathonWallGroup[];
}
declare interface ISheetData_Marathon_MarathonWallGroup extends ISheetDataBase {
	/** 牌墙组 */
	readonly group_id: number;
	/** 下限(闭区间) */
	readonly lower: number;
	/** 上限（闭区间，0表示无穷大） */
	readonly upper: number;
	/** 速度（两面墙之间消耗几个tick） */
	readonly speed: number;
	/** 期间的分数倍率，百分比 */
	readonly speed_bonus: number;
	/** 终局模式，福牌必定不会出现，不使用仓检 */
	readonly final_mode: number;
	/** 福牌额外权重 */
	readonly fever_weight_addition: number;
	/** 福牌相邻牌额外权重 */
	readonly near_fever_weight_addition: number;
	/** 必定出现福牌次数 */
	readonly must_fever_count: number;
	/** 完成检查概率% */
	readonly finish_hands_check: number;
	/** 强仓检概率% */
	readonly strong_hands_check: number;
	/** 弱仓检概率% */
	readonly weak_hands_check: number;
	/** 生成道具概率% */
	readonly item_rate: number;
	/** 道具组 */
	readonly item_group_id: number;
}
//#endregion

//#region marathon_item_group
declare interface ISheet_Marathon_MarathonItemGroup {
	readonly [key: string]: ISheetData_Marathon_MarathonItemGroup[];
	readonly 4001: ISheetData_Marathon_MarathonItemGroup[];
	readonly 4002: ISheetData_Marathon_MarathonItemGroup[];
	readonly 4003: ISheetData_Marathon_MarathonItemGroup[];
}
declare interface ISheetData_Marathon_MarathonItemGroup extends ISheetDataBase {
	/** 道具组 */
	readonly group_id: number;
	/** 道具类型 */
	readonly type: number;
	/** 权重 */
	readonly weight: number;
}
//#endregion