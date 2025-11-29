declare interface ITable_Shoot {
	/** 主表  ---  unique */
	shoot_info: CfgExt<ISheet_Shoot_ShootInfo>;
	/** 关卡配置  ---  group */
	shoot_mission: CfgExtGroup<ISheet_Shoot_ShootMission>;
	/** 敌人配置  ---  group */
	shoot_enemy: CfgExtGroup<ISheet_Shoot_ShootEnemy>;
	/** 奖励组  ---  group */
	shoot_reward: CfgExtGroup<ISheet_Shoot_ShootReward>;
}

//#region shoot_info
declare interface ISheet_Shoot_ShootInfo {
	[key: string]: ISheetData_Shoot_ShootInfo;
	251101: ISheetData_Shoot_ShootInfo;
}
declare interface ISheetData_Shoot_ShootInfo {
	/** 活动id */
	activity_id: number;
	/** 关卡组id */
	missions_group_id: number;
	/** 关卡总数 */
	level_count: number;
	/** 子弹道具 */
	bullet_item_id: number;
}
//#endregion

//#region shoot_mission
declare interface ISheet_Shoot_ShootMission {
	[key: string]: ISheetData_Shoot_ShootMission[];
	101: ISheetData_Shoot_ShootMission[];
}
declare interface ISheetData_Shoot_ShootMission {
	/** 关卡配置组 */
	group_id: number;
	/** 关卡 */
	level: number;
	/** 敌人组 */
	enemy_group_id: number;
}
//#endregion

//#region shoot_enemy
declare interface ISheet_Shoot_ShootEnemy {
	[key: string]: ISheetData_Shoot_ShootEnemy[];
	1011: ISheetData_Shoot_ShootEnemy[];
	1012: ISheetData_Shoot_ShootEnemy[];
	1013: ISheetData_Shoot_ShootEnemy[];
}
declare interface ISheetData_Shoot_ShootEnemy {
	/** 敌人配置组 */
	group_id: number;
	/** 敌人id独立 */
	enemy_id: number;
	/** 敌人生命值 */
	hp: number;
	/** 奖励组 */
	reward_group_id: number;
	/** 敌人初始坐标 */
	x: number;
	/** 敌人所处高度，3最高 */
	y: number;
	/** 敌人宽度 */
	width: number;
}
//#endregion

//#region shoot_reward
declare interface ISheet_Shoot_ShootReward {
	[key: string]: ISheetData_Shoot_ShootReward[];
	101101: ISheetData_Shoot_ShootReward[];
	101102: ISheetData_Shoot_ShootReward[];
	101103: ISheetData_Shoot_ShootReward[];
	101201: ISheetData_Shoot_ShootReward[];
	101202: ISheetData_Shoot_ShootReward[];
	101203: ISheetData_Shoot_ShootReward[];
	101301: ISheetData_Shoot_ShootReward[];
	101302: ISheetData_Shoot_ShootReward[];
	101303: ISheetData_Shoot_ShootReward[];
}
declare interface ISheetData_Shoot_ShootReward {
	/** 道具奖励组 */
	group_id: number;
	/** 奖励id唯一 */
	reward_id: number;
	/** 奖励内容，道具id-个数 */
	reward: string;
	/** 奖励等级，3最高1最低 */
	reward_level: number;
	/** 星星数 */
	star_num: number;
	/** 合并等级，同一level内数字小的靠前 */
	reward_merge: number;
	/** 活动id */
	activity_id: number;
}
//#endregion