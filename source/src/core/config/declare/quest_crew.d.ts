/** This script is generated automatically, Please do not any modify! */

declare interface ITable_QuestCrew {
	/** 任务小队活动信息  ---  unique */
	readonly qc_info: CfgExt<ISheet_QuestCrew_QcInfo>;
	/** 任务小队角色池  ---  group */
	readonly qc_character_pool: CfgExtGroup<ISheet_QuestCrew_QcCharacterPool>;
	/** 任务小队角色特性  ---  unique */
	readonly qc_effect: CfgExt<ISheet_QuestCrew_QcEffect>;
	/** 任务小队任务池  ---  group */
	readonly qc_quest_pool: CfgExtGroup<ISheet_QuestCrew_QcQuestPool>;
}

//#region qc_info
declare interface ISheet_QuestCrew_QcInfo {
	readonly [key: string]: ISheetData_QuestCrew_QcInfo;
	readonly 251001: ISheetData_QuestCrew_QcInfo;
}
declare interface ISheetData_QuestCrew_QcInfo extends ISheetDataBase {
	/** 活动ID */
	readonly id: number;
	/** 角色池id */
	readonly character_pool_id: number;
	/** 委托池id */
	readonly quest_pool_id: number;
	/** 刷新商店价格 */
	readonly refresh_market_price: string;
	/** 人才中心角色数量 */
	readonly market_count: number;
	/** 角色回满体力价格 */
	readonly character_charging_price: string;
	/** 大成功体力减免系数，百分数 */
	readonly great_success_effect_ceo: number;
	/** 大成功需要的属性值系数，百分数 */
	readonly great_success_ceo: number;
	/** 初始赠送员工 */
	readonly init_character_id: number[];
}
//#endregion

//#region qc_character_pool
declare interface ISheet_QuestCrew_QcCharacterPool {
	readonly [key: string]: ISheetData_QuestCrew_QcCharacterPool[];
	readonly 1001: ISheetData_QuestCrew_QcCharacterPool[];
}
declare interface ISheetData_QuestCrew_QcCharacterPool extends ISheetDataBase {
	/** 角色池 */
	readonly id: number;
	/** 角色ID */
	readonly character_id: number;
	/** 体力值 */
	readonly sta: number;
	/** 力量值 */
	readonly str: number;
	/** 速度值 */
	readonly spd: number;
	/** 运气值 */
	readonly luc: number;
	/** 特性 */
	readonly effect: number;
	/** 是否在雇佣池中 */
	readonly show_in_market: number;
	/** 雇佣价格 */
	readonly hiring_price: string;
	/** 雀魂雀士角色ID */
	readonly item_id: number;
	/** 员工名str/event */
	readonly name: number;
	/** 特性描述文str/event */
	readonly skill: number;
	/** npc素材编号0001-0016 */
	readonly npc_code: string;
	/** 前端变动展示 */
	readonly display_change: number;
}
//#endregion

//#region qc_effect
declare interface ISheet_QuestCrew_QcEffect {
	readonly [key: string]: ISheetData_QuestCrew_QcEffect;
	readonly 10001: ISheetData_QuestCrew_QcEffect;
	readonly 10002: ISheetData_QuestCrew_QcEffect;
	readonly 10003: ISheetData_QuestCrew_QcEffect;
	readonly 10004: ISheetData_QuestCrew_QcEffect;
	readonly 10005: ISheetData_QuestCrew_QcEffect;
	readonly 10006: ISheetData_QuestCrew_QcEffect;
	readonly 10007: ISheetData_QuestCrew_QcEffect;
	readonly 10008: ISheetData_QuestCrew_QcEffect;
	readonly 10009: ISheetData_QuestCrew_QcEffect;
	readonly 10010: ISheetData_QuestCrew_QcEffect;
	readonly 10011: ISheetData_QuestCrew_QcEffect;
	readonly 10012: ISheetData_QuestCrew_QcEffect;
	readonly 10013: ISheetData_QuestCrew_QcEffect;
	readonly 10014: ISheetData_QuestCrew_QcEffect;
	readonly 10015: ISheetData_QuestCrew_QcEffect;
	readonly 10016: ISheetData_QuestCrew_QcEffect;
	readonly 10017: ISheetData_QuestCrew_QcEffect;
	readonly 10018: ISheetData_QuestCrew_QcEffect;
	readonly 10019: ISheetData_QuestCrew_QcEffect;
	readonly 10020: ISheetData_QuestCrew_QcEffect;
	readonly 10021: ISheetData_QuestCrew_QcEffect;
	readonly 10022: ISheetData_QuestCrew_QcEffect;
	readonly 10023: ISheetData_QuestCrew_QcEffect;
	readonly 10024: ISheetData_QuestCrew_QcEffect;
	readonly 10025: ISheetData_QuestCrew_QcEffect;
	readonly 10026: ISheetData_QuestCrew_QcEffect;
	readonly 10027: ISheetData_QuestCrew_QcEffect;
	readonly 10028: ISheetData_QuestCrew_QcEffect;
	readonly 10029: ISheetData_QuestCrew_QcEffect;
	readonly 10030: ISheetData_QuestCrew_QcEffect;
	readonly 10031: ISheetData_QuestCrew_QcEffect;
	readonly 10032: ISheetData_QuestCrew_QcEffect;
	readonly 10033: ISheetData_QuestCrew_QcEffect;
	readonly 10034: ISheetData_QuestCrew_QcEffect;
}
declare interface ISheetData_QuestCrew_QcEffect extends ISheetDataBase {
	/** 特性ID */
	readonly id: number;
	/** 特性类型 */
	readonly type: number;
	/** 参数 */
	readonly args: number[];
}
//#endregion

//#region qc_quest_pool
declare interface ISheet_QuestCrew_QcQuestPool {
	readonly [key: string]: ISheetData_QuestCrew_QcQuestPool[];
	readonly 2001: ISheetData_QuestCrew_QcQuestPool[];
}
declare interface ISheetData_QuestCrew_QcQuestPool extends ISheetDataBase {
	/** 委托池id */
	readonly id: number;
	/** 委托ID */
	readonly quest_id: number;
	/** 委托排序从小到大 */
	readonly sort: number;
	/** 委托种类 */
	readonly type: number;
	/** 需求力量 */
	readonly str: number;
	/** 需求速度 */
	readonly spd: number;
	/** 需求运气 */
	readonly luc: number;
	/** 解锁日，0表示活动开始日 */
	readonly unlock_days: number;
	/** 消耗体力值 */
	readonly consume: number;
	/** 赠送qc_character的id */
	readonly rewards: number;
	/** 委托人种类 */
	readonly client: number;
	/** 雀魂雀士id */
	readonly character_id: number;
	/** 委托人名str/event */
	readonly client_name: number;
	/** 委托描述文str/event */
	readonly quest_desc: number;
	/** npc素材编号0001-0016 */
	readonly npc_code: string;
}
//#endregion