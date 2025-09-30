declare interface ITable_QuestCrew {
	/** 任务小队活动信息  ---  unique */
	qc_info: CfgExt<ISheet_QuestCrew_QcInfo>;
	/** 任务小队角色池  ---  group */
	qc_character_pool: CfgExtGroup<ISheet_QuestCrew_QcCharacterPool>;
	/** 任务小队角色特性  ---  unique */
	qc_effect: CfgExt<ISheet_QuestCrew_QcEffect>;
	/** 任务小队任务池  ---  group */
	qc_quest_pool: CfgExtGroup<ISheet_QuestCrew_QcQuestPool>;
}

//#region qc_info
declare interface ISheet_QuestCrew_QcInfo {
	[key: string]: ISheetData_QuestCrew_QcInfo;
	251001: ISheetData_QuestCrew_QcInfo;
}
declare interface ISheetData_QuestCrew_QcInfo {
	/** 活动ID */
	id: number;
	/** 角色池id */
	character_pool_id: number;
	/** 委托池id */
	quest_pool_id: number;
	/** 刷新商店价格 */
	refresh_market_price: string;
	/** 人才中心角色数量 */
	market_count: number;
	/** 角色回满体力价格 */
	character_charging_price: string;
	/** 大成功体力减免系数，百分数 */
	great_success_effect_ceo: number;
	/** 大成功需要的属性值系数，百分数 */
	great_success_ceo: number;
	/** 初始赠送员工 */
	init_character_id: number[];
}
//#endregion

//#region qc_character_pool
declare interface ISheet_QuestCrew_QcCharacterPool {
	[key: string]: ISheetData_QuestCrew_QcCharacterPool[];
	1001: ISheetData_QuestCrew_QcCharacterPool[];
}
declare interface ISheetData_QuestCrew_QcCharacterPool {
	/** 角色池 */
	id: number;
	/** 角色ID */
	character_id: number;
	/** 体力值 */
	sta: number;
	/** 力量值 */
	str: number;
	/** 速度值 */
	spd: number;
	/** 运气值 */
	luc: number;
	/** 特性 */
	effect: number;
	/** 是否在雇佣池中 */
	show_in_market: number;
	/** 雇佣价格 */
	hiring_price: string;
	/** 雀魂雀士角色ID */
	item_id: number;
	/** 员工名str/event */
	name: number;
	/** 特性描述文str/event */
	skill: number;
	/** npc素材编号0001-0016 */
	npc_code: string;
	/** 前端变动展示 */
	display_change: number;
}
//#endregion

//#region qc_effect
declare interface ISheet_QuestCrew_QcEffect {
	[key: string]: ISheetData_QuestCrew_QcEffect;
	10001: ISheetData_QuestCrew_QcEffect;
	10002: ISheetData_QuestCrew_QcEffect;
	10003: ISheetData_QuestCrew_QcEffect;
	10004: ISheetData_QuestCrew_QcEffect;
	10005: ISheetData_QuestCrew_QcEffect;
	10006: ISheetData_QuestCrew_QcEffect;
	10007: ISheetData_QuestCrew_QcEffect;
	10008: ISheetData_QuestCrew_QcEffect;
	10009: ISheetData_QuestCrew_QcEffect;
	10010: ISheetData_QuestCrew_QcEffect;
	10011: ISheetData_QuestCrew_QcEffect;
	10012: ISheetData_QuestCrew_QcEffect;
	10013: ISheetData_QuestCrew_QcEffect;
	10014: ISheetData_QuestCrew_QcEffect;
	10015: ISheetData_QuestCrew_QcEffect;
	10016: ISheetData_QuestCrew_QcEffect;
	10017: ISheetData_QuestCrew_QcEffect;
	10018: ISheetData_QuestCrew_QcEffect;
	10019: ISheetData_QuestCrew_QcEffect;
	10020: ISheetData_QuestCrew_QcEffect;
	10021: ISheetData_QuestCrew_QcEffect;
	10022: ISheetData_QuestCrew_QcEffect;
	10023: ISheetData_QuestCrew_QcEffect;
	10024: ISheetData_QuestCrew_QcEffect;
	10025: ISheetData_QuestCrew_QcEffect;
	10026: ISheetData_QuestCrew_QcEffect;
	10027: ISheetData_QuestCrew_QcEffect;
	10028: ISheetData_QuestCrew_QcEffect;
	10029: ISheetData_QuestCrew_QcEffect;
	10030: ISheetData_QuestCrew_QcEffect;
	10031: ISheetData_QuestCrew_QcEffect;
	10032: ISheetData_QuestCrew_QcEffect;
	10033: ISheetData_QuestCrew_QcEffect;
	10034: ISheetData_QuestCrew_QcEffect;
}
declare interface ISheetData_QuestCrew_QcEffect {
	/** 特性ID */
	id: number;
	/** 特性类型 */
	type: number;
	/** 参数 */
	args: number[];
}
//#endregion

//#region qc_quest_pool
declare interface ISheet_QuestCrew_QcQuestPool {
	[key: string]: ISheetData_QuestCrew_QcQuestPool[];
	2001: ISheetData_QuestCrew_QcQuestPool[];
}
declare interface ISheetData_QuestCrew_QcQuestPool {
	/** 委托池id */
	id: number;
	/** 委托ID */
	quest_id: number;
	/** 委托排序从小到大 */
	sort: number;
	/** 委托种类 */
	type: number;
	/** 需求力量 */
	str: number;
	/** 需求速度 */
	spd: number;
	/** 需求运气 */
	luc: number;
	/** 解锁日，0表示活动开始日 */
	unlock_days: number;
	/** 消耗体力值 */
	consume: number;
	/** 赠送qc_character的id */
	rewards: number;
	/** 委托人种类 */
	client: number;
	/** 雀魂雀士id */
	character_id: number;
	/** 委托人名str/event */
	client_name: number;
	/** 委托描述文str/event */
	quest_desc: number;
	/** npc素材编号0001-0016 */
	npc_code: string;
}
//#endregion