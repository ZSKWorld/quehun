declare interface ITable_Tutorial {
	/** unique */
	init: CfgExt<ISheet_Tutorial_Init>;
	/** group */
	step: CfgExt<ISheet_Tutorial_Step>;
}

//#region init
declare interface ISheet_Tutorial_Init {
	1: ISheetData_Tutorial_Init;
	2: ISheetData_Tutorial_Init;
	3: ISheetData_Tutorial_Init;
	4: ISheetData_Tutorial_Init;
}
declare interface ISheetData_Tutorial_Init {
	/** 1-4章 */
	episode_id: number;
	/** 宝牌指示牌 */
	dora: string;
	/** 四家的头像(东-南-西-北) */
	rival: string;
	/** 四家的初始点数 */
	init_score: string;
	/** 四家牌河，格式：1m,2m,.....3m;1m,2m,.....3m;1m,2m,.....3m;1m,2m,.....3m */
	paihe: string;
	/** 场（0-1） */
	chang: number;
	/** 局（0-3） */
	ju: number;
	/** 0本场，可以写死0 */
	benchang: number;
	/** 第一回合谁开始打，默认0东家 */
	first_position: number;
	/** 本局主视角的方位 */
	view_position: number;
	/** 主视角的初始配牌 */
	start_shoupai: string;
	/** 初始鸣牌（如果有的话） */
	start_ming: string;
	/** 主视角的和牌型 */
	end_shoupai: string;
	/** 和牌时显示 */
	end_ming: string;
	/** 和牌后的报菜名 */
	end_yaku: string;
	/** 里宝牌指示牌（如果有） */
	ura_dora: string;
	/** 符数 */
	end_fu: number;
	/** 和牌点数 */
	hu_score: number;
	/** 收取下家-对家-上家点数 */
	flow_score: string;
}
//#endregion

//#region step
declare interface ISheet_Tutorial_Step {
	1: ISheetData_Tutorial_Step[];
	2: ISheetData_Tutorial_Step[];
	3: ISheetData_Tutorial_Step[];
	4: ISheetData_Tutorial_Step[];
}
declare interface ISheetData_Tutorial_Step {
	/** 章节1234 */
	episode_id: number;
	/** 唯一步骤id */
	id: number;
	/** 0123=东一局的东南西北 */
	seat: number;
	/** 0=摸牌，1=打牌，2=吃牌 3=碰牌，4=暗杠，7=立直 8=自摸，9=荣和， 999= 无action，1000=结束文本 */
	act_type: number;
	/** 行动的额外参数 */
	act_param: string;
	/** 听的牌，逗号分隔 */
	tingpai_param: string;
	/** 1=振听，空/0=没振 */
	is_zhenting: number;
	/** 0=底部文本，1=顶部文本 */
	str_type: number;
	/** 教学文本，可能连续播放 */
	str_id: number;
	/** 1=UI手牌高亮 */
	view_ui_hand: number;
	/** 教学图路径，可能为空 */
	pic_path: string;
	/** 哪些吃碰按钮会出现，2=吃，3=碰，7=立直，8=自摸和，9 = 荣和，4=暗杠，5=明杠，6=加杠 */
	button_show: string;
	/** 点了按钮后，手牌中哪些牌被移除例5m,6m */
	button_pai: string;
	/** 玩家行为，0=无行为，1=选按钮, 2=选牌,3=选红色标记，4=选余牌，5=选自风指示，6=选宝牌指示区域
 */
	player_act: number;
	/** 参数 */
	player_param: string;
}
//#endregion