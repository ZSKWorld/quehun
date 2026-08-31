/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Shoot {
	/** 主表  ---  unique */
	readonly shoot_info: CfgExt<ISheet_Shoot_ShootInfo>;
	/** 关卡配置  ---  group */
	readonly shoot_mission: CfgExtGroup<ISheet_Shoot_ShootMission>;
	/** 敌人配置  ---  group */
	readonly shoot_enemy: CfgExtGroup<ISheet_Shoot_ShootEnemy>;
	/** 奖励组  ---  group */
	readonly shoot_reward: CfgExtGroup<ISheet_Shoot_ShootReward>;
}

//#region shoot_info
declare interface ISheet_Shoot_ShootInfo {
	readonly [key: string]: ISheetData_Shoot_ShootInfo;
	readonly 251101: ISheetData_Shoot_ShootInfo;
}
declare interface ISheetData_Shoot_ShootInfo extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 关卡组id */
	readonly missions_group_id: number;
	/** 关卡总数 */
	readonly level_count: number;
	/** 子弹道具 */
	readonly bullet_item_id: number;
}
//#endregion

//#region shoot_mission
declare interface ISheet_Shoot_ShootMission {
	readonly [key: string]: ISheetData_Shoot_ShootMission[];
	readonly 101: ISheetData_Shoot_ShootMission[];
}
declare interface ISheetData_Shoot_ShootMission extends ISheetDataBase {
	/** 关卡配置组 */
	readonly group_id: number;
	/** 关卡 */
	readonly level: number;
	/** 敌人组 */
	readonly enemy_group_id: number;
}
//#endregion

//#region shoot_enemy
declare interface ISheet_Shoot_ShootEnemy {
	readonly [key: string]: ISheetData_Shoot_ShootEnemy[];
	readonly 1011: ISheetData_Shoot_ShootEnemy[];
	readonly 1012: ISheetData_Shoot_ShootEnemy[];
	readonly 1013: ISheetData_Shoot_ShootEnemy[];
}
declare interface ISheetData_Shoot_ShootEnemy extends ISheetDataBase {
	/** 敌人配置组 */
	readonly group_id: number;
	/** 敌人id独立 */
	readonly enemy_id: number;
	/** 敌人生命值 */
	readonly hp: number;
	/** 奖励组 */
	readonly reward_group_id: number;
	/** 敌人初始坐标 */
	readonly x: number;
	/** 敌人所处高度，3最高 */
	readonly y: number;
	/** 敌人宽度 */
	readonly width: number;
}
//#endregion

//#region shoot_reward
declare interface ISheet_Shoot_ShootReward {
	readonly [key: string]: ISheetData_Shoot_ShootReward[];
	readonly 101101: ISheetData_Shoot_ShootReward[];
	readonly 101102: ISheetData_Shoot_ShootReward[];
	readonly 101103: ISheetData_Shoot_ShootReward[];
	readonly 101201: ISheetData_Shoot_ShootReward[];
	readonly 101202: ISheetData_Shoot_ShootReward[];
	readonly 101203: ISheetData_Shoot_ShootReward[];
	readonly 101301: ISheetData_Shoot_ShootReward[];
	readonly 101302: ISheetData_Shoot_ShootReward[];
	readonly 101303: ISheetData_Shoot_ShootReward[];
}
declare interface ISheetData_Shoot_ShootReward extends ISheetDataBase {
	/** 道具奖励组 */
	readonly group_id: number;
	/** 奖励id唯一 */
	readonly reward_id: number;
	/** 奖励内容，道具id-个数 */
	readonly reward: string;
	/** 奖励等级，3最高1最低 */
	readonly reward_level: number;
	/** 星星数 */
	readonly star_num: number;
	/** 合并等级，同一level内数字小的靠前 */
	readonly reward_merge: number;
	/** 活动id */
	readonly activity_id: number;
}
//#endregion