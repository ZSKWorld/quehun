/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Amulet {
	/** 初始化状态6参数  ---  unique */
	amulet_activity: CfgExt<ISheet_Amulet_AmuletActivity>;
	/** 小关节点  ---  group */
	amulet_node: CfgExtGroup<ISheet_Amulet_AmuletNode>;
	/** 大关配置  ---  group */
	amulet_level: CfgExtGroup<ISheet_Amulet_AmuletLevel>;
	/** 事件随机池  ---  group */
	amulet_map_event: CfgExtGroup<ISheet_Amulet_AmuletMapEvent>;
	/** 角色配置  ---  group */
	amulet_character: CfgExtGroup<ISheet_Amulet_AmuletCharacter>;
	/** 角色牌库配置  ---  group */
	amulet_tile_score_map: CfgExtGroup<ISheet_Amulet_AmuletTileScoreMap>;
	/** 角色对护身符权重影响配置  ---  group */
	amulet_effect_weight: CfgExtGroup<ISheet_Amulet_AmuletEffectWeight>;
	/** 敌人配置  ---  unique */
	amulet_enemy: CfgExt<ISheet_Amulet_AmuletEnemy>;
	/** 敌人技能配置  ---  group */
	amulet_enemy_skill: CfgExtGroup<ISheet_Amulet_AmuletEnemySkill>;
	/** 护身符效果  ---  unique */
	amulet_effect: CfgExt<ISheet_Amulet_AmuletEffect>;
	/** 护身符刷新池  ---  group */
	amulet_pool: CfgExtGroup<ISheet_Amulet_AmuletPool>;
	/** 关键词  ---  unique */
	amulet_tag: CfgExt<ISheet_Amulet_AmuletTag>;
	/** 护身符组合成  ---  unique */
	amulet_effect_group: CfgExt<ISheet_Amulet_AmuletEffectGroup>;
	/** 印章效果  ---  unique */
	amulet_badge: CfgExt<ISheet_Amulet_AmuletBadge>;
	/** 事件-特殊商店  ---  unique */
	amulet_advanced_shop: CfgExt<ISheet_Amulet_AmuletAdvancedShop>;
	/** 事件-特殊商店升级选项  ---  unique */
	amulet_advanced_shop_upgrade: CfgExt<ISheet_Amulet_AmuletAdvancedShopUpgrade>;
	/** 事件-转盘  ---  group */
	amulet_gamble: CfgExtGroup<ISheet_Amulet_AmuletGamble>;
	/** 事件-转盘选项分配权重  ---  group */
	amulet_gamble_group: CfgExtGroup<ISheet_Amulet_AmuletGambleGroup>;
	/** 事件-转盘选项  ---  group */
	amulet_gamble_selection: CfgExtGroup<ISheet_Amulet_AmuletGambleSelection>;
	/** 事件-锻造  ---  group */
	amulet_forge: CfgExtGroup<ISheet_Amulet_AmuletForge>;
	/** 事件-交易条件  ---  unique */
	amulet_trade_item: CfgExt<ISheet_Amulet_AmuletTradeItem>;
	/** 事件-交易奖励  ---  unique */
	amulet_trade_reward: CfgExt<ISheet_Amulet_AmuletTradeReward>;
	/** 事件-篝火  ---  group */
	amulet_bonfire_selection: CfgExtGroup<ISheet_Amulet_AmuletBonfireSelection>;
	/** 事件-传送  ---  unique */
	amulet_transport: CfgExt<ISheet_Amulet_AmuletTransport>;
	/** group */
	amulet_shop_upgrade: CfgExtGroup<ISheet_Amulet_AmuletShopUpgrade>;
	/** 场外升级id  ---  group */
	amulet_upgrade: CfgExtGroup<ISheet_Amulet_AmuletUpgrade>;
	/** BOSSbuff  ---  unique */
	amulet_buff: CfgExt<ISheet_Amulet_AmuletBuff>;
	/** 商店销售卡包内容权重  ---  unique */
	amulet_goods: CfgExt<ISheet_Amulet_AmuletGoods>;
	/** 青云之志算番  ---  unique */
	amulet_fan: CfgExt<ISheet_Amulet_AmuletFan>;
	/** 符文石  ---  unique */
	amulet_rune_stone: CfgExt<ISheet_Amulet_AmuletRuneStone>;
	/** 护身符挑战任务  ---  unique */
	amulet_task: CfgExt<ISheet_Amulet_AmuletTask>;
	/** 大数单位  ---  unique */
	amulet_large_number: CfgExt<ISheet_Amulet_AmuletLargeNumber>;
}

//#region amulet_activity
declare interface ISheet_Amulet_AmuletActivity {
	[key: string]: ISheetData_Amulet_AmuletActivity;
	240801: ISheetData_Amulet_AmuletActivity;
	250111: ISheetData_Amulet_AmuletActivity;
	250811: ISheetData_Amulet_AmuletActivity;
	260511: ISheetData_Amulet_AmuletActivity;
}
declare interface ISheetData_Amulet_AmuletActivity extends ISheetDataBase {
	activity_id: number;
	/** 强化道具编号 */
	skill_item: number;
	/** 初始星币数 */
	init_coin: number;
	/** 商店货架卡包数量 */
	shop_count: number;
	/** 超过该关卡记录对局记录 */
	record_level_id: number;
	/** 关卡节点 */
	record_level_node: number;
	/** 钦定初始护身符功能解锁关卡 */
	book_unlock_level_id: number;
	/** 关卡节点 */
	book_unlock_level_node: number;
	/** 初始免费护身符包id */
	free_effect_goods_id: number;
	/** 商店首次刷新的价格 */
	shop_refresh_coin: number;
	/** 持有护身符最多数量 */
	effect_max_count: number;
	/** 初始宝牌指示牌 */
	init_dora_indicator: number;
	/** 初始换牌次数 */
	init_change_hand: number;
	/** 初始王牌（确定摸不到） */
	init_mount_count: number;
	/** 初始关卡id */
	init_level: number;
	/** 额外商店升级数量 */
	advanced_shop_upgrade_count: number;
}
//#endregion

//#region amulet_node
declare interface ISheet_Amulet_AmuletNode {
	[key: string]: ISheetData_Amulet_AmuletNode[];
	19001: ISheetData_Amulet_AmuletNode[];
	19002: ISheetData_Amulet_AmuletNode[];
	19003: ISheetData_Amulet_AmuletNode[];
	19004: ISheetData_Amulet_AmuletNode[];
	19005: ISheetData_Amulet_AmuletNode[];
	19101: ISheetData_Amulet_AmuletNode[];
	19102: ISheetData_Amulet_AmuletNode[];
	19103: ISheetData_Amulet_AmuletNode[];
	19104: ISheetData_Amulet_AmuletNode[];
	19105: ISheetData_Amulet_AmuletNode[];
	19106: ISheetData_Amulet_AmuletNode[];
	19107: ISheetData_Amulet_AmuletNode[];
	19108: ISheetData_Amulet_AmuletNode[];
	19109: ISheetData_Amulet_AmuletNode[];
	19110: ISheetData_Amulet_AmuletNode[];
	19111: ISheetData_Amulet_AmuletNode[];
	19112: ISheetData_Amulet_AmuletNode[];
	19113: ISheetData_Amulet_AmuletNode[];
	19114: ISheetData_Amulet_AmuletNode[];
	19115: ISheetData_Amulet_AmuletNode[];
	19116: ISheetData_Amulet_AmuletNode[];
	19117: ISheetData_Amulet_AmuletNode[];
	19118: ISheetData_Amulet_AmuletNode[];
	19119: ISheetData_Amulet_AmuletNode[];
	19120: ISheetData_Amulet_AmuletNode[];
	19121: ISheetData_Amulet_AmuletNode[];
	19122: ISheetData_Amulet_AmuletNode[];
	19123: ISheetData_Amulet_AmuletNode[];
	19124: ISheetData_Amulet_AmuletNode[];
	19125: ISheetData_Amulet_AmuletNode[];
	19126: ISheetData_Amulet_AmuletNode[];
	19127: ISheetData_Amulet_AmuletNode[];
	19128: ISheetData_Amulet_AmuletNode[];
	19129: ISheetData_Amulet_AmuletNode[];
	19130: ISheetData_Amulet_AmuletNode[];
	19131: ISheetData_Amulet_AmuletNode[];
	19132: ISheetData_Amulet_AmuletNode[];
	19133: ISheetData_Amulet_AmuletNode[];
	19134: ISheetData_Amulet_AmuletNode[];
	19135: ISheetData_Amulet_AmuletNode[];
	19136: ISheetData_Amulet_AmuletNode[];
	19137: ISheetData_Amulet_AmuletNode[];
	19138: ISheetData_Amulet_AmuletNode[];
	19139: ISheetData_Amulet_AmuletNode[];
	19140: ISheetData_Amulet_AmuletNode[];
	19141: ISheetData_Amulet_AmuletNode[];
	19142: ISheetData_Amulet_AmuletNode[];
	19143: ISheetData_Amulet_AmuletNode[];
	19144: ISheetData_Amulet_AmuletNode[];
	19145: ISheetData_Amulet_AmuletNode[];
	19146: ISheetData_Amulet_AmuletNode[];
	19147: ISheetData_Amulet_AmuletNode[];
	19148: ISheetData_Amulet_AmuletNode[];
	19149: ISheetData_Amulet_AmuletNode[];
	19150: ISheetData_Amulet_AmuletNode[];
	19151: ISheetData_Amulet_AmuletNode[];
	19152: ISheetData_Amulet_AmuletNode[];
	19153: ISheetData_Amulet_AmuletNode[];
	19154: ISheetData_Amulet_AmuletNode[];
	19155: ISheetData_Amulet_AmuletNode[];
	19156: ISheetData_Amulet_AmuletNode[];
	19157: ISheetData_Amulet_AmuletNode[];
	19158: ISheetData_Amulet_AmuletNode[];
	19159: ISheetData_Amulet_AmuletNode[];
	19160: ISheetData_Amulet_AmuletNode[];
	19161: ISheetData_Amulet_AmuletNode[];
	19162: ISheetData_Amulet_AmuletNode[];
	19163: ISheetData_Amulet_AmuletNode[];
	19164: ISheetData_Amulet_AmuletNode[];
	19165: ISheetData_Amulet_AmuletNode[];
	19166: ISheetData_Amulet_AmuletNode[];
	19167: ISheetData_Amulet_AmuletNode[];
	19168: ISheetData_Amulet_AmuletNode[];
	19169: ISheetData_Amulet_AmuletNode[];
	19170: ISheetData_Amulet_AmuletNode[];
	19171: ISheetData_Amulet_AmuletNode[];
	19172: ISheetData_Amulet_AmuletNode[];
	19173: ISheetData_Amulet_AmuletNode[];
	19174: ISheetData_Amulet_AmuletNode[];
	19175: ISheetData_Amulet_AmuletNode[];
	19176: ISheetData_Amulet_AmuletNode[];
	19177: ISheetData_Amulet_AmuletNode[];
	19178: ISheetData_Amulet_AmuletNode[];
	19179: ISheetData_Amulet_AmuletNode[];
	19180: ISheetData_Amulet_AmuletNode[];
	19181: ISheetData_Amulet_AmuletNode[];
	19182: ISheetData_Amulet_AmuletNode[];
	19183: ISheetData_Amulet_AmuletNode[];
	19184: ISheetData_Amulet_AmuletNode[];
	19185: ISheetData_Amulet_AmuletNode[];
	19186: ISheetData_Amulet_AmuletNode[];
	19187: ISheetData_Amulet_AmuletNode[];
	19188: ISheetData_Amulet_AmuletNode[];
	19189: ISheetData_Amulet_AmuletNode[];
	19190: ISheetData_Amulet_AmuletNode[];
	19191: ISheetData_Amulet_AmuletNode[];
	19192: ISheetData_Amulet_AmuletNode[];
	19193: ISheetData_Amulet_AmuletNode[];
	19194: ISheetData_Amulet_AmuletNode[];
	19195: ISheetData_Amulet_AmuletNode[];
	19196: ISheetData_Amulet_AmuletNode[];
	19197: ISheetData_Amulet_AmuletNode[];
	19198: ISheetData_Amulet_AmuletNode[];
	19199: ISheetData_Amulet_AmuletNode[];
	19200: ISheetData_Amulet_AmuletNode[];
	19201: ISheetData_Amulet_AmuletNode[];
	19202: ISheetData_Amulet_AmuletNode[];
	19203: ISheetData_Amulet_AmuletNode[];
	19204: ISheetData_Amulet_AmuletNode[];
	19205: ISheetData_Amulet_AmuletNode[];
	19206: ISheetData_Amulet_AmuletNode[];
	19207: ISheetData_Amulet_AmuletNode[];
	19208: ISheetData_Amulet_AmuletNode[];
	19209: ISheetData_Amulet_AmuletNode[];
	19210: ISheetData_Amulet_AmuletNode[];
	19211: ISheetData_Amulet_AmuletNode[];
	19212: ISheetData_Amulet_AmuletNode[];
	19213: ISheetData_Amulet_AmuletNode[];
	19214: ISheetData_Amulet_AmuletNode[];
	19215: ISheetData_Amulet_AmuletNode[];
	19216: ISheetData_Amulet_AmuletNode[];
	19217: ISheetData_Amulet_AmuletNode[];
	19218: ISheetData_Amulet_AmuletNode[];
	19219: ISheetData_Amulet_AmuletNode[];
	19220: ISheetData_Amulet_AmuletNode[];
	19221: ISheetData_Amulet_AmuletNode[];
	19222: ISheetData_Amulet_AmuletNode[];
	19223: ISheetData_Amulet_AmuletNode[];
	19224: ISheetData_Amulet_AmuletNode[];
	19225: ISheetData_Amulet_AmuletNode[];
	19226: ISheetData_Amulet_AmuletNode[];
	19227: ISheetData_Amulet_AmuletNode[];
	19228: ISheetData_Amulet_AmuletNode[];
	19229: ISheetData_Amulet_AmuletNode[];
	19230: ISheetData_Amulet_AmuletNode[];
	19231: ISheetData_Amulet_AmuletNode[];
	19232: ISheetData_Amulet_AmuletNode[];
	19233: ISheetData_Amulet_AmuletNode[];
	19234: ISheetData_Amulet_AmuletNode[];
	19235: ISheetData_Amulet_AmuletNode[];
	19236: ISheetData_Amulet_AmuletNode[];
	19237: ISheetData_Amulet_AmuletNode[];
	19238: ISheetData_Amulet_AmuletNode[];
	19239: ISheetData_Amulet_AmuletNode[];
	19240: ISheetData_Amulet_AmuletNode[];
	19241: ISheetData_Amulet_AmuletNode[];
	19242: ISheetData_Amulet_AmuletNode[];
	19243: ISheetData_Amulet_AmuletNode[];
	19244: ISheetData_Amulet_AmuletNode[];
	19245: ISheetData_Amulet_AmuletNode[];
	19246: ISheetData_Amulet_AmuletNode[];
	19247: ISheetData_Amulet_AmuletNode[];
	19248: ISheetData_Amulet_AmuletNode[];
	19249: ISheetData_Amulet_AmuletNode[];
	19250: ISheetData_Amulet_AmuletNode[];
	19251: ISheetData_Amulet_AmuletNode[];
	19252: ISheetData_Amulet_AmuletNode[];
	19253: ISheetData_Amulet_AmuletNode[];
	19254: ISheetData_Amulet_AmuletNode[];
	19255: ISheetData_Amulet_AmuletNode[];
	19256: ISheetData_Amulet_AmuletNode[];
	19257: ISheetData_Amulet_AmuletNode[];
	19258: ISheetData_Amulet_AmuletNode[];
	19259: ISheetData_Amulet_AmuletNode[];
	19260: ISheetData_Amulet_AmuletNode[];
	19261: ISheetData_Amulet_AmuletNode[];
	19262: ISheetData_Amulet_AmuletNode[];
	19263: ISheetData_Amulet_AmuletNode[];
	19264: ISheetData_Amulet_AmuletNode[];
	19265: ISheetData_Amulet_AmuletNode[];
	19266: ISheetData_Amulet_AmuletNode[];
	19267: ISheetData_Amulet_AmuletNode[];
	19268: ISheetData_Amulet_AmuletNode[];
	19269: ISheetData_Amulet_AmuletNode[];
	19270: ISheetData_Amulet_AmuletNode[];
	19271: ISheetData_Amulet_AmuletNode[];
	19272: ISheetData_Amulet_AmuletNode[];
	19273: ISheetData_Amulet_AmuletNode[];
	19274: ISheetData_Amulet_AmuletNode[];
	19275: ISheetData_Amulet_AmuletNode[];
	19276: ISheetData_Amulet_AmuletNode[];
	19277: ISheetData_Amulet_AmuletNode[];
	19278: ISheetData_Amulet_AmuletNode[];
	19279: ISheetData_Amulet_AmuletNode[];
	19280: ISheetData_Amulet_AmuletNode[];
	19281: ISheetData_Amulet_AmuletNode[];
	19282: ISheetData_Amulet_AmuletNode[];
	19283: ISheetData_Amulet_AmuletNode[];
	19284: ISheetData_Amulet_AmuletNode[];
	19285: ISheetData_Amulet_AmuletNode[];
	19286: ISheetData_Amulet_AmuletNode[];
	19287: ISheetData_Amulet_AmuletNode[];
	19288: ISheetData_Amulet_AmuletNode[];
	19289: ISheetData_Amulet_AmuletNode[];
	19290: ISheetData_Amulet_AmuletNode[];
	19291: ISheetData_Amulet_AmuletNode[];
	19292: ISheetData_Amulet_AmuletNode[];
	19293: ISheetData_Amulet_AmuletNode[];
	19294: ISheetData_Amulet_AmuletNode[];
	19295: ISheetData_Amulet_AmuletNode[];
	19296: ISheetData_Amulet_AmuletNode[];
	19297: ISheetData_Amulet_AmuletNode[];
	19298: ISheetData_Amulet_AmuletNode[];
	19299: ISheetData_Amulet_AmuletNode[];
}
declare interface ISheetData_Amulet_AmuletNode extends ISheetDataBase {
	id: number;
	/** 节点id */
	node: number;
	/** 地图节点类型 */
	type: number;
	/** 节点名 */
	node_name: string;
	/** 事件随机池 */
	node_sub_id: number;
	/** 战斗生命倍率 */
	hp_rate: string;
	/** 战斗攻击倍率 */
	atk_rate: number;
	/** 过关奖励卡包 */
	pack_reward: string;
	/** 过关星币数量 */
	coin_reward: number;
	/** 游戏通关 */
	clear_mark: number;
	/** 保底卡包,填amulet_goods.id */
	guaranteed_goods: number;
	/** 关卡使用的护身符池 */
	level_amulet_pool: number;
}
//#endregion

//#region amulet_level
declare interface ISheet_Amulet_AmuletLevel {
	[key: string]: ISheetData_Amulet_AmuletLevel[];
	260511: ISheetData_Amulet_AmuletLevel[];
}
declare interface ISheetData_Amulet_AmuletLevel extends ISheetDataBase {
	activity_id: number;
	/** 大关等级 */
	level: number;
	/** 地图节点 */
	node_id: number;
	/** 下一关level */
	next_level: number;
}
//#endregion

//#region amulet_map_event
declare interface ISheet_Amulet_AmuletMapEvent {
	[key: string]: ISheetData_Amulet_AmuletMapEvent[];
	110011: ISheetData_Amulet_AmuletMapEvent[];
	110012: ISheetData_Amulet_AmuletMapEvent[];
	110021: ISheetData_Amulet_AmuletMapEvent[];
	110031: ISheetData_Amulet_AmuletMapEvent[];
	110041: ISheetData_Amulet_AmuletMapEvent[];
	110051: ISheetData_Amulet_AmuletMapEvent[];
	120011: ISheetData_Amulet_AmuletMapEvent[];
}
declare interface ISheetData_Amulet_AmuletMapEvent extends ISheetDataBase {
	id: number;
	/** 事件类型 */
	event_type: number;
	/** str/event事件描述 */
	event_desc: number;
}
//#endregion

//#region amulet_character
declare interface ISheet_Amulet_AmuletCharacter {
	[key: string]: ISheetData_Amulet_AmuletCharacter[];
	260511: ISheetData_Amulet_AmuletCharacter[];
}
declare interface ISheetData_Amulet_AmuletCharacter extends ISheetDataBase {
	activity_id: number;
	/** 角色编号 */
	character_id: number;
	/** 生命值 */
	hp: number;
	/** 牌库初始分数id */
	tile_score_map_id: number;
	/** 重填牌数量 */
	reload_count: number;
	/** 卡池影响权重 */
	effect_weight_id: number;
	/** 解锁物品id(0为直接解锁) */
	unlock_item_id: number;
	/** 初始待摸牌次数 */
	init_desktop_count: number;
	/** 初始待摸牌中，公开的数量 */
	init_open_desktop_count: number;
	/** 初始魂牌数量 */
	init_tian_count: number;
	/** str/event角色名 */
	character_name: number;
}
//#endregion

//#region amulet_tile_score_map
declare interface ISheet_Amulet_AmuletTileScoreMap {
	[key: string]: ISheetData_Amulet_AmuletTileScoreMap[];
	20101: ISheetData_Amulet_AmuletTileScoreMap[];
	20201: ISheetData_Amulet_AmuletTileScoreMap[];
	20301: ISheetData_Amulet_AmuletTileScoreMap[];
	20401: ISheetData_Amulet_AmuletTileScoreMap[];
}
declare interface ISheetData_Amulet_AmuletTileScoreMap extends ISheetDataBase {
	id: number;
	/** 牌类型 */
	tile: string;
	/** 初始分数 */
	score: number;
}
//#endregion

//#region amulet_effect_weight
declare interface ISheet_Amulet_AmuletEffectWeight {
	[key: string]: ISheetData_Amulet_AmuletEffectWeight[];
	20121: ISheetData_Amulet_AmuletEffectWeight[];
	20131: ISheetData_Amulet_AmuletEffectWeight[];
	20141: ISheetData_Amulet_AmuletEffectWeight[];
}
declare interface ISheetData_Amulet_AmuletEffectWeight extends ISheetDataBase {
	id: number;
	/** 护身符id */
	effect_id: number;
}
//#endregion

//#region amulet_enemy
declare interface ISheet_Amulet_AmuletEnemy {
	[key: string]: ISheetData_Amulet_AmuletEnemy;
	3001: ISheetData_Amulet_AmuletEnemy;
	3002: ISheetData_Amulet_AmuletEnemy;
	3003: ISheetData_Amulet_AmuletEnemy;
	3004: ISheetData_Amulet_AmuletEnemy;
	3005: ISheetData_Amulet_AmuletEnemy;
	3011: ISheetData_Amulet_AmuletEnemy;
	3012: ISheetData_Amulet_AmuletEnemy;
	3013: ISheetData_Amulet_AmuletEnemy;
	3014: ISheetData_Amulet_AmuletEnemy;
	3015: ISheetData_Amulet_AmuletEnemy;
	3016: ISheetData_Amulet_AmuletEnemy;
	3017: ISheetData_Amulet_AmuletEnemy;
	3018: ISheetData_Amulet_AmuletEnemy;
	3019: ISheetData_Amulet_AmuletEnemy;
	3020: ISheetData_Amulet_AmuletEnemy;
	3021: ISheetData_Amulet_AmuletEnemy;
	3022: ISheetData_Amulet_AmuletEnemy;
	3023: ISheetData_Amulet_AmuletEnemy;
	3024: ISheetData_Amulet_AmuletEnemy;
	3025: ISheetData_Amulet_AmuletEnemy;
}
declare interface ISheetData_Amulet_AmuletEnemy extends ISheetDataBase {
	/** 敌人编号 */
	id: number;
	/** 敌人类别id */
	boss_id: number;
	/** 生命值 */
	hp: string;
	/** 狂暴牌数量 */
	damage_tile_count: number;
	/** 攻击力 */
	atk: number;
	/** 技能池 */
	skill_pool: number;
	/** boss标记(1为boss，0不是) */
	type: number;
	/** 分组，用于关卡内随机 */
	group: number;
	/** str/event敌人名 */
	enemy_name: number;
}
//#endregion

//#region amulet_enemy_skill
declare interface ISheet_Amulet_AmuletEnemySkill {
	[key: string]: ISheetData_Amulet_AmuletEnemySkill[];
	30111: ISheetData_Amulet_AmuletEnemySkill[];
	30121: ISheetData_Amulet_AmuletEnemySkill[];
	30131: ISheetData_Amulet_AmuletEnemySkill[];
	30141: ISheetData_Amulet_AmuletEnemySkill[];
	30151: ISheetData_Amulet_AmuletEnemySkill[];
	30161: ISheetData_Amulet_AmuletEnemySkill[];
	30171: ISheetData_Amulet_AmuletEnemySkill[];
	30181: ISheetData_Amulet_AmuletEnemySkill[];
}
declare interface ISheetData_Amulet_AmuletEnemySkill extends ISheetDataBase {
	group_id: number;
	/** 敌人buffid */
	buff_id: number;
}
//#endregion

//#region amulet_effect
declare interface ISheet_Amulet_AmuletEffect {
	[key: string]: ISheetData_Amulet_AmuletEffect;
	10: ISheetData_Amulet_AmuletEffect;
	11: ISheetData_Amulet_AmuletEffect;
	20: ISheetData_Amulet_AmuletEffect;
	21: ISheetData_Amulet_AmuletEffect;
	30: ISheetData_Amulet_AmuletEffect;
	31: ISheetData_Amulet_AmuletEffect;
	40: ISheetData_Amulet_AmuletEffect;
	41: ISheetData_Amulet_AmuletEffect;
	50: ISheetData_Amulet_AmuletEffect;
	51: ISheetData_Amulet_AmuletEffect;
	60: ISheetData_Amulet_AmuletEffect;
	61: ISheetData_Amulet_AmuletEffect;
	70: ISheetData_Amulet_AmuletEffect;
	71: ISheetData_Amulet_AmuletEffect;
	80: ISheetData_Amulet_AmuletEffect;
	81: ISheetData_Amulet_AmuletEffect;
	90: ISheetData_Amulet_AmuletEffect;
	91: ISheetData_Amulet_AmuletEffect;
	100: ISheetData_Amulet_AmuletEffect;
	101: ISheetData_Amulet_AmuletEffect;
	110: ISheetData_Amulet_AmuletEffect;
	111: ISheetData_Amulet_AmuletEffect;
	120: ISheetData_Amulet_AmuletEffect;
	121: ISheetData_Amulet_AmuletEffect;
	130: ISheetData_Amulet_AmuletEffect;
	131: ISheetData_Amulet_AmuletEffect;
	140: ISheetData_Amulet_AmuletEffect;
	141: ISheetData_Amulet_AmuletEffect;
	150: ISheetData_Amulet_AmuletEffect;
	151: ISheetData_Amulet_AmuletEffect;
	160: ISheetData_Amulet_AmuletEffect;
	161: ISheetData_Amulet_AmuletEffect;
	170: ISheetData_Amulet_AmuletEffect;
	171: ISheetData_Amulet_AmuletEffect;
	180: ISheetData_Amulet_AmuletEffect;
	181: ISheetData_Amulet_AmuletEffect;
	190: ISheetData_Amulet_AmuletEffect;
	191: ISheetData_Amulet_AmuletEffect;
	200: ISheetData_Amulet_AmuletEffect;
	201: ISheetData_Amulet_AmuletEffect;
	210: ISheetData_Amulet_AmuletEffect;
	211: ISheetData_Amulet_AmuletEffect;
	220: ISheetData_Amulet_AmuletEffect;
	221: ISheetData_Amulet_AmuletEffect;
	230: ISheetData_Amulet_AmuletEffect;
	231: ISheetData_Amulet_AmuletEffect;
	240: ISheetData_Amulet_AmuletEffect;
	241: ISheetData_Amulet_AmuletEffect;
	250: ISheetData_Amulet_AmuletEffect;
	251: ISheetData_Amulet_AmuletEffect;
	260: ISheetData_Amulet_AmuletEffect;
	261: ISheetData_Amulet_AmuletEffect;
	270: ISheetData_Amulet_AmuletEffect;
	271: ISheetData_Amulet_AmuletEffect;
	280: ISheetData_Amulet_AmuletEffect;
	281: ISheetData_Amulet_AmuletEffect;
	290: ISheetData_Amulet_AmuletEffect;
	291: ISheetData_Amulet_AmuletEffect;
	300: ISheetData_Amulet_AmuletEffect;
	301: ISheetData_Amulet_AmuletEffect;
	310: ISheetData_Amulet_AmuletEffect;
	311: ISheetData_Amulet_AmuletEffect;
	320: ISheetData_Amulet_AmuletEffect;
	321: ISheetData_Amulet_AmuletEffect;
	330: ISheetData_Amulet_AmuletEffect;
	331: ISheetData_Amulet_AmuletEffect;
	340: ISheetData_Amulet_AmuletEffect;
	341: ISheetData_Amulet_AmuletEffect;
	350: ISheetData_Amulet_AmuletEffect;
	351: ISheetData_Amulet_AmuletEffect;
	360: ISheetData_Amulet_AmuletEffect;
	361: ISheetData_Amulet_AmuletEffect;
	370: ISheetData_Amulet_AmuletEffect;
	371: ISheetData_Amulet_AmuletEffect;
	380: ISheetData_Amulet_AmuletEffect;
	381: ISheetData_Amulet_AmuletEffect;
	390: ISheetData_Amulet_AmuletEffect;
	391: ISheetData_Amulet_AmuletEffect;
	400: ISheetData_Amulet_AmuletEffect;
	401: ISheetData_Amulet_AmuletEffect;
	410: ISheetData_Amulet_AmuletEffect;
	411: ISheetData_Amulet_AmuletEffect;
	420: ISheetData_Amulet_AmuletEffect;
	421: ISheetData_Amulet_AmuletEffect;
	430: ISheetData_Amulet_AmuletEffect;
	431: ISheetData_Amulet_AmuletEffect;
	440: ISheetData_Amulet_AmuletEffect;
	441: ISheetData_Amulet_AmuletEffect;
	450: ISheetData_Amulet_AmuletEffect;
	451: ISheetData_Amulet_AmuletEffect;
	460: ISheetData_Amulet_AmuletEffect;
	461: ISheetData_Amulet_AmuletEffect;
	470: ISheetData_Amulet_AmuletEffect;
	471: ISheetData_Amulet_AmuletEffect;
	480: ISheetData_Amulet_AmuletEffect;
	481: ISheetData_Amulet_AmuletEffect;
	490: ISheetData_Amulet_AmuletEffect;
	491: ISheetData_Amulet_AmuletEffect;
	500: ISheetData_Amulet_AmuletEffect;
	501: ISheetData_Amulet_AmuletEffect;
	510: ISheetData_Amulet_AmuletEffect;
	511: ISheetData_Amulet_AmuletEffect;
	520: ISheetData_Amulet_AmuletEffect;
	521: ISheetData_Amulet_AmuletEffect;
	530: ISheetData_Amulet_AmuletEffect;
	531: ISheetData_Amulet_AmuletEffect;
	550: ISheetData_Amulet_AmuletEffect;
	551: ISheetData_Amulet_AmuletEffect;
	560: ISheetData_Amulet_AmuletEffect;
	561: ISheetData_Amulet_AmuletEffect;
	570: ISheetData_Amulet_AmuletEffect;
	571: ISheetData_Amulet_AmuletEffect;
	580: ISheetData_Amulet_AmuletEffect;
	581: ISheetData_Amulet_AmuletEffect;
	590: ISheetData_Amulet_AmuletEffect;
	591: ISheetData_Amulet_AmuletEffect;
	600: ISheetData_Amulet_AmuletEffect;
	601: ISheetData_Amulet_AmuletEffect;
	610: ISheetData_Amulet_AmuletEffect;
	611: ISheetData_Amulet_AmuletEffect;
	620: ISheetData_Amulet_AmuletEffect;
	621: ISheetData_Amulet_AmuletEffect;
	630: ISheetData_Amulet_AmuletEffect;
	631: ISheetData_Amulet_AmuletEffect;
	640: ISheetData_Amulet_AmuletEffect;
	641: ISheetData_Amulet_AmuletEffect;
	650: ISheetData_Amulet_AmuletEffect;
	651: ISheetData_Amulet_AmuletEffect;
	660: ISheetData_Amulet_AmuletEffect;
	661: ISheetData_Amulet_AmuletEffect;
	670: ISheetData_Amulet_AmuletEffect;
	671: ISheetData_Amulet_AmuletEffect;
	680: ISheetData_Amulet_AmuletEffect;
	681: ISheetData_Amulet_AmuletEffect;
	690: ISheetData_Amulet_AmuletEffect;
	691: ISheetData_Amulet_AmuletEffect;
	700: ISheetData_Amulet_AmuletEffect;
	701: ISheetData_Amulet_AmuletEffect;
	710: ISheetData_Amulet_AmuletEffect;
	711: ISheetData_Amulet_AmuletEffect;
	720: ISheetData_Amulet_AmuletEffect;
	721: ISheetData_Amulet_AmuletEffect;
	730: ISheetData_Amulet_AmuletEffect;
	731: ISheetData_Amulet_AmuletEffect;
	740: ISheetData_Amulet_AmuletEffect;
	741: ISheetData_Amulet_AmuletEffect;
	750: ISheetData_Amulet_AmuletEffect;
	751: ISheetData_Amulet_AmuletEffect;
	1010: ISheetData_Amulet_AmuletEffect;
	1011: ISheetData_Amulet_AmuletEffect;
	1020: ISheetData_Amulet_AmuletEffect;
	1021: ISheetData_Amulet_AmuletEffect;
	1030: ISheetData_Amulet_AmuletEffect;
	1031: ISheetData_Amulet_AmuletEffect;
	1040: ISheetData_Amulet_AmuletEffect;
	1041: ISheetData_Amulet_AmuletEffect;
	1050: ISheetData_Amulet_AmuletEffect;
	1051: ISheetData_Amulet_AmuletEffect;
	1060: ISheetData_Amulet_AmuletEffect;
	1061: ISheetData_Amulet_AmuletEffect;
	1070: ISheetData_Amulet_AmuletEffect;
	1071: ISheetData_Amulet_AmuletEffect;
	1080: ISheetData_Amulet_AmuletEffect;
	1081: ISheetData_Amulet_AmuletEffect;
	1090: ISheetData_Amulet_AmuletEffect;
	1091: ISheetData_Amulet_AmuletEffect;
	1100: ISheetData_Amulet_AmuletEffect;
	1101: ISheetData_Amulet_AmuletEffect;
	1110: ISheetData_Amulet_AmuletEffect;
	1111: ISheetData_Amulet_AmuletEffect;
	1120: ISheetData_Amulet_AmuletEffect;
	1121: ISheetData_Amulet_AmuletEffect;
	1130: ISheetData_Amulet_AmuletEffect;
	1131: ISheetData_Amulet_AmuletEffect;
	1140: ISheetData_Amulet_AmuletEffect;
	1141: ISheetData_Amulet_AmuletEffect;
	1150: ISheetData_Amulet_AmuletEffect;
	1151: ISheetData_Amulet_AmuletEffect;
	1160: ISheetData_Amulet_AmuletEffect;
	1161: ISheetData_Amulet_AmuletEffect;
	1170: ISheetData_Amulet_AmuletEffect;
	1171: ISheetData_Amulet_AmuletEffect;
	1180: ISheetData_Amulet_AmuletEffect;
	1181: ISheetData_Amulet_AmuletEffect;
	1190: ISheetData_Amulet_AmuletEffect;
	1191: ISheetData_Amulet_AmuletEffect;
	1200: ISheetData_Amulet_AmuletEffect;
	1201: ISheetData_Amulet_AmuletEffect;
	1210: ISheetData_Amulet_AmuletEffect;
	1211: ISheetData_Amulet_AmuletEffect;
	1220: ISheetData_Amulet_AmuletEffect;
	1221: ISheetData_Amulet_AmuletEffect;
	1230: ISheetData_Amulet_AmuletEffect;
	1231: ISheetData_Amulet_AmuletEffect;
	1240: ISheetData_Amulet_AmuletEffect;
	1241: ISheetData_Amulet_AmuletEffect;
	1250: ISheetData_Amulet_AmuletEffect;
	1251: ISheetData_Amulet_AmuletEffect;
	1260: ISheetData_Amulet_AmuletEffect;
	1261: ISheetData_Amulet_AmuletEffect;
	1270: ISheetData_Amulet_AmuletEffect;
	1271: ISheetData_Amulet_AmuletEffect;
	1280: ISheetData_Amulet_AmuletEffect;
	1281: ISheetData_Amulet_AmuletEffect;
	1290: ISheetData_Amulet_AmuletEffect;
	1291: ISheetData_Amulet_AmuletEffect;
	1300: ISheetData_Amulet_AmuletEffect;
	1301: ISheetData_Amulet_AmuletEffect;
	1310: ISheetData_Amulet_AmuletEffect;
	1311: ISheetData_Amulet_AmuletEffect;
	1320: ISheetData_Amulet_AmuletEffect;
	1321: ISheetData_Amulet_AmuletEffect;
	1330: ISheetData_Amulet_AmuletEffect;
	1331: ISheetData_Amulet_AmuletEffect;
	1340: ISheetData_Amulet_AmuletEffect;
	1341: ISheetData_Amulet_AmuletEffect;
	1350: ISheetData_Amulet_AmuletEffect;
	1351: ISheetData_Amulet_AmuletEffect;
	1360: ISheetData_Amulet_AmuletEffect;
	1361: ISheetData_Amulet_AmuletEffect;
	1370: ISheetData_Amulet_AmuletEffect;
	1371: ISheetData_Amulet_AmuletEffect;
	1380: ISheetData_Amulet_AmuletEffect;
	1381: ISheetData_Amulet_AmuletEffect;
	1390: ISheetData_Amulet_AmuletEffect;
	1391: ISheetData_Amulet_AmuletEffect;
	1400: ISheetData_Amulet_AmuletEffect;
	1401: ISheetData_Amulet_AmuletEffect;
	1410: ISheetData_Amulet_AmuletEffect;
	1411: ISheetData_Amulet_AmuletEffect;
	1420: ISheetData_Amulet_AmuletEffect;
	1421: ISheetData_Amulet_AmuletEffect;
	1430: ISheetData_Amulet_AmuletEffect;
	1431: ISheetData_Amulet_AmuletEffect;
	1440: ISheetData_Amulet_AmuletEffect;
	1441: ISheetData_Amulet_AmuletEffect;
	1450: ISheetData_Amulet_AmuletEffect;
	1451: ISheetData_Amulet_AmuletEffect;
	1460: ISheetData_Amulet_AmuletEffect;
	1461: ISheetData_Amulet_AmuletEffect;
	1470: ISheetData_Amulet_AmuletEffect;
	1471: ISheetData_Amulet_AmuletEffect;
	1480: ISheetData_Amulet_AmuletEffect;
	1481: ISheetData_Amulet_AmuletEffect;
	1490: ISheetData_Amulet_AmuletEffect;
	1491: ISheetData_Amulet_AmuletEffect;
	1500: ISheetData_Amulet_AmuletEffect;
	1501: ISheetData_Amulet_AmuletEffect;
	1510: ISheetData_Amulet_AmuletEffect;
	1511: ISheetData_Amulet_AmuletEffect;
	1520: ISheetData_Amulet_AmuletEffect;
	1521: ISheetData_Amulet_AmuletEffect;
	1530: ISheetData_Amulet_AmuletEffect;
	1531: ISheetData_Amulet_AmuletEffect;
	1540: ISheetData_Amulet_AmuletEffect;
	1541: ISheetData_Amulet_AmuletEffect;
	1550: ISheetData_Amulet_AmuletEffect;
	1551: ISheetData_Amulet_AmuletEffect;
	1560: ISheetData_Amulet_AmuletEffect;
	1561: ISheetData_Amulet_AmuletEffect;
	1570: ISheetData_Amulet_AmuletEffect;
	1571: ISheetData_Amulet_AmuletEffect;
	1580: ISheetData_Amulet_AmuletEffect;
	1581: ISheetData_Amulet_AmuletEffect;
	1590: ISheetData_Amulet_AmuletEffect;
	1591: ISheetData_Amulet_AmuletEffect;
	1600: ISheetData_Amulet_AmuletEffect;
	1601: ISheetData_Amulet_AmuletEffect;
	1610: ISheetData_Amulet_AmuletEffect;
	1611: ISheetData_Amulet_AmuletEffect;
	1620: ISheetData_Amulet_AmuletEffect;
	1621: ISheetData_Amulet_AmuletEffect;
	1630: ISheetData_Amulet_AmuletEffect;
	1631: ISheetData_Amulet_AmuletEffect;
	1640: ISheetData_Amulet_AmuletEffect;
	1641: ISheetData_Amulet_AmuletEffect;
	1650: ISheetData_Amulet_AmuletEffect;
	1651: ISheetData_Amulet_AmuletEffect;
	1660: ISheetData_Amulet_AmuletEffect;
	1661: ISheetData_Amulet_AmuletEffect;
	1670: ISheetData_Amulet_AmuletEffect;
	1671: ISheetData_Amulet_AmuletEffect;
	1680: ISheetData_Amulet_AmuletEffect;
	1681: ISheetData_Amulet_AmuletEffect;
	1690: ISheetData_Amulet_AmuletEffect;
	1691: ISheetData_Amulet_AmuletEffect;
	1700: ISheetData_Amulet_AmuletEffect;
	1701: ISheetData_Amulet_AmuletEffect;
	1710: ISheetData_Amulet_AmuletEffect;
	1711: ISheetData_Amulet_AmuletEffect;
	1720: ISheetData_Amulet_AmuletEffect;
	1721: ISheetData_Amulet_AmuletEffect;
	1730: ISheetData_Amulet_AmuletEffect;
	1731: ISheetData_Amulet_AmuletEffect;
	1740: ISheetData_Amulet_AmuletEffect;
	1741: ISheetData_Amulet_AmuletEffect;
	2010: ISheetData_Amulet_AmuletEffect;
	2011: ISheetData_Amulet_AmuletEffect;
	2020: ISheetData_Amulet_AmuletEffect;
	2021: ISheetData_Amulet_AmuletEffect;
	2030: ISheetData_Amulet_AmuletEffect;
	2031: ISheetData_Amulet_AmuletEffect;
	2040: ISheetData_Amulet_AmuletEffect;
	2041: ISheetData_Amulet_AmuletEffect;
	2050: ISheetData_Amulet_AmuletEffect;
	2051: ISheetData_Amulet_AmuletEffect;
	2060: ISheetData_Amulet_AmuletEffect;
	2061: ISheetData_Amulet_AmuletEffect;
	2070: ISheetData_Amulet_AmuletEffect;
	2071: ISheetData_Amulet_AmuletEffect;
	2080: ISheetData_Amulet_AmuletEffect;
	2081: ISheetData_Amulet_AmuletEffect;
	2090: ISheetData_Amulet_AmuletEffect;
	2091: ISheetData_Amulet_AmuletEffect;
	2100: ISheetData_Amulet_AmuletEffect;
	2101: ISheetData_Amulet_AmuletEffect;
	2110: ISheetData_Amulet_AmuletEffect;
	2111: ISheetData_Amulet_AmuletEffect;
	2120: ISheetData_Amulet_AmuletEffect;
	2121: ISheetData_Amulet_AmuletEffect;
	2130: ISheetData_Amulet_AmuletEffect;
	2131: ISheetData_Amulet_AmuletEffect;
	2140: ISheetData_Amulet_AmuletEffect;
	2141: ISheetData_Amulet_AmuletEffect;
	2150: ISheetData_Amulet_AmuletEffect;
	2151: ISheetData_Amulet_AmuletEffect;
	2160: ISheetData_Amulet_AmuletEffect;
	2161: ISheetData_Amulet_AmuletEffect;
	2170: ISheetData_Amulet_AmuletEffect;
	2171: ISheetData_Amulet_AmuletEffect;
	2180: ISheetData_Amulet_AmuletEffect;
	2181: ISheetData_Amulet_AmuletEffect;
	2190: ISheetData_Amulet_AmuletEffect;
	2191: ISheetData_Amulet_AmuletEffect;
	2200: ISheetData_Amulet_AmuletEffect;
	2201: ISheetData_Amulet_AmuletEffect;
	2210: ISheetData_Amulet_AmuletEffect;
	2211: ISheetData_Amulet_AmuletEffect;
	2220: ISheetData_Amulet_AmuletEffect;
	2221: ISheetData_Amulet_AmuletEffect;
	2230: ISheetData_Amulet_AmuletEffect;
	2231: ISheetData_Amulet_AmuletEffect;
	2240: ISheetData_Amulet_AmuletEffect;
	2241: ISheetData_Amulet_AmuletEffect;
	2250: ISheetData_Amulet_AmuletEffect;
	2251: ISheetData_Amulet_AmuletEffect;
	2260: ISheetData_Amulet_AmuletEffect;
	2261: ISheetData_Amulet_AmuletEffect;
	2270: ISheetData_Amulet_AmuletEffect;
	2271: ISheetData_Amulet_AmuletEffect;
	2280: ISheetData_Amulet_AmuletEffect;
	2281: ISheetData_Amulet_AmuletEffect;
	2290: ISheetData_Amulet_AmuletEffect;
	2291: ISheetData_Amulet_AmuletEffect;
	2300: ISheetData_Amulet_AmuletEffect;
	2301: ISheetData_Amulet_AmuletEffect;
	2310: ISheetData_Amulet_AmuletEffect;
	2311: ISheetData_Amulet_AmuletEffect;
	2320: ISheetData_Amulet_AmuletEffect;
	2321: ISheetData_Amulet_AmuletEffect;
	2330: ISheetData_Amulet_AmuletEffect;
	2331: ISheetData_Amulet_AmuletEffect;
	3010: ISheetData_Amulet_AmuletEffect;
	3011: ISheetData_Amulet_AmuletEffect;
	3020: ISheetData_Amulet_AmuletEffect;
	3021: ISheetData_Amulet_AmuletEffect;
	3030: ISheetData_Amulet_AmuletEffect;
	3031: ISheetData_Amulet_AmuletEffect;
	3040: ISheetData_Amulet_AmuletEffect;
	3041: ISheetData_Amulet_AmuletEffect;
	3050: ISheetData_Amulet_AmuletEffect;
	3051: ISheetData_Amulet_AmuletEffect;
	3060: ISheetData_Amulet_AmuletEffect;
	3061: ISheetData_Amulet_AmuletEffect;
	3070: ISheetData_Amulet_AmuletEffect;
	3071: ISheetData_Amulet_AmuletEffect;
	3080: ISheetData_Amulet_AmuletEffect;
	3081: ISheetData_Amulet_AmuletEffect;
	3090: ISheetData_Amulet_AmuletEffect;
	3091: ISheetData_Amulet_AmuletEffect;
	3100: ISheetData_Amulet_AmuletEffect;
	3101: ISheetData_Amulet_AmuletEffect;
	3110: ISheetData_Amulet_AmuletEffect;
	3111: ISheetData_Amulet_AmuletEffect;
	3120: ISheetData_Amulet_AmuletEffect;
	3121: ISheetData_Amulet_AmuletEffect;
	3130: ISheetData_Amulet_AmuletEffect;
	3131: ISheetData_Amulet_AmuletEffect;
	3140: ISheetData_Amulet_AmuletEffect;
	3141: ISheetData_Amulet_AmuletEffect;
	3150: ISheetData_Amulet_AmuletEffect;
	3151: ISheetData_Amulet_AmuletEffect;
	3160: ISheetData_Amulet_AmuletEffect;
	3161: ISheetData_Amulet_AmuletEffect;
	3170: ISheetData_Amulet_AmuletEffect;
	3171: ISheetData_Amulet_AmuletEffect;
	3180: ISheetData_Amulet_AmuletEffect;
	3181: ISheetData_Amulet_AmuletEffect;
	3190: ISheetData_Amulet_AmuletEffect;
	3191: ISheetData_Amulet_AmuletEffect;
	3200: ISheetData_Amulet_AmuletEffect;
	3201: ISheetData_Amulet_AmuletEffect;
	3210: ISheetData_Amulet_AmuletEffect;
	3211: ISheetData_Amulet_AmuletEffect;
	3220: ISheetData_Amulet_AmuletEffect;
	3221: ISheetData_Amulet_AmuletEffect;
	3230: ISheetData_Amulet_AmuletEffect;
	3231: ISheetData_Amulet_AmuletEffect;
	3240: ISheetData_Amulet_AmuletEffect;
	3241: ISheetData_Amulet_AmuletEffect;
	3250: ISheetData_Amulet_AmuletEffect;
	3251: ISheetData_Amulet_AmuletEffect;
	3260: ISheetData_Amulet_AmuletEffect;
	3261: ISheetData_Amulet_AmuletEffect;
	3270: ISheetData_Amulet_AmuletEffect;
	3271: ISheetData_Amulet_AmuletEffect;
	3280: ISheetData_Amulet_AmuletEffect;
	3281: ISheetData_Amulet_AmuletEffect;
	3290: ISheetData_Amulet_AmuletEffect;
	3291: ISheetData_Amulet_AmuletEffect;
	3300: ISheetData_Amulet_AmuletEffect;
	3301: ISheetData_Amulet_AmuletEffect;
	3310: ISheetData_Amulet_AmuletEffect;
	3311: ISheetData_Amulet_AmuletEffect;
	3320: ISheetData_Amulet_AmuletEffect;
	3321: ISheetData_Amulet_AmuletEffect;
	3330: ISheetData_Amulet_AmuletEffect;
	3331: ISheetData_Amulet_AmuletEffect;
	3340: ISheetData_Amulet_AmuletEffect;
	3341: ISheetData_Amulet_AmuletEffect;
	3350: ISheetData_Amulet_AmuletEffect;
	3351: ISheetData_Amulet_AmuletEffect;
	3360: ISheetData_Amulet_AmuletEffect;
	3361: ISheetData_Amulet_AmuletEffect;
	3370: ISheetData_Amulet_AmuletEffect;
	3371: ISheetData_Amulet_AmuletEffect;
	3380: ISheetData_Amulet_AmuletEffect;
	3381: ISheetData_Amulet_AmuletEffect;
	3390: ISheetData_Amulet_AmuletEffect;
	3391: ISheetData_Amulet_AmuletEffect;
	3400: ISheetData_Amulet_AmuletEffect;
	3401: ISheetData_Amulet_AmuletEffect;
	3410: ISheetData_Amulet_AmuletEffect;
	3411: ISheetData_Amulet_AmuletEffect;
	3420: ISheetData_Amulet_AmuletEffect;
	3421: ISheetData_Amulet_AmuletEffect;
	3430: ISheetData_Amulet_AmuletEffect;
	3431: ISheetData_Amulet_AmuletEffect;
	3440: ISheetData_Amulet_AmuletEffect;
	3441: ISheetData_Amulet_AmuletEffect;
	3450: ISheetData_Amulet_AmuletEffect;
	3451: ISheetData_Amulet_AmuletEffect;
	3460: ISheetData_Amulet_AmuletEffect;
	3461: ISheetData_Amulet_AmuletEffect;
	3470: ISheetData_Amulet_AmuletEffect;
	3471: ISheetData_Amulet_AmuletEffect;
	3480: ISheetData_Amulet_AmuletEffect;
	3481: ISheetData_Amulet_AmuletEffect;
	3490: ISheetData_Amulet_AmuletEffect;
	3491: ISheetData_Amulet_AmuletEffect;
	3500: ISheetData_Amulet_AmuletEffect;
	3501: ISheetData_Amulet_AmuletEffect;
	3510: ISheetData_Amulet_AmuletEffect;
	3511: ISheetData_Amulet_AmuletEffect;
	3520: ISheetData_Amulet_AmuletEffect;
	3521: ISheetData_Amulet_AmuletEffect;
	3530: ISheetData_Amulet_AmuletEffect;
	3531: ISheetData_Amulet_AmuletEffect;
	3540: ISheetData_Amulet_AmuletEffect;
	3541: ISheetData_Amulet_AmuletEffect;
	3550: ISheetData_Amulet_AmuletEffect;
	3551: ISheetData_Amulet_AmuletEffect;
	3560: ISheetData_Amulet_AmuletEffect;
	3561: ISheetData_Amulet_AmuletEffect;
	3570: ISheetData_Amulet_AmuletEffect;
	3571: ISheetData_Amulet_AmuletEffect;
	3580: ISheetData_Amulet_AmuletEffect;
	3581: ISheetData_Amulet_AmuletEffect;
	3590: ISheetData_Amulet_AmuletEffect;
	3591: ISheetData_Amulet_AmuletEffect;
	3600: ISheetData_Amulet_AmuletEffect;
	3601: ISheetData_Amulet_AmuletEffect;
	3610: ISheetData_Amulet_AmuletEffect;
	3611: ISheetData_Amulet_AmuletEffect;
	3620: ISheetData_Amulet_AmuletEffect;
	3621: ISheetData_Amulet_AmuletEffect;
	3630: ISheetData_Amulet_AmuletEffect;
	3631: ISheetData_Amulet_AmuletEffect;
	3640: ISheetData_Amulet_AmuletEffect;
	3641: ISheetData_Amulet_AmuletEffect;
	3650: ISheetData_Amulet_AmuletEffect;
	3651: ISheetData_Amulet_AmuletEffect;
	3660: ISheetData_Amulet_AmuletEffect;
	3661: ISheetData_Amulet_AmuletEffect;
	3670: ISheetData_Amulet_AmuletEffect;
	3671: ISheetData_Amulet_AmuletEffect;
	3680: ISheetData_Amulet_AmuletEffect;
	3681: ISheetData_Amulet_AmuletEffect;
	3690: ISheetData_Amulet_AmuletEffect;
	3691: ISheetData_Amulet_AmuletEffect;
	3700: ISheetData_Amulet_AmuletEffect;
	3701: ISheetData_Amulet_AmuletEffect;
	3710: ISheetData_Amulet_AmuletEffect;
	3711: ISheetData_Amulet_AmuletEffect;
	3720: ISheetData_Amulet_AmuletEffect;
	3721: ISheetData_Amulet_AmuletEffect;
	3730: ISheetData_Amulet_AmuletEffect;
	3731: ISheetData_Amulet_AmuletEffect;
	3740: ISheetData_Amulet_AmuletEffect;
	3741: ISheetData_Amulet_AmuletEffect;
	3750: ISheetData_Amulet_AmuletEffect;
	3751: ISheetData_Amulet_AmuletEffect;
	3760: ISheetData_Amulet_AmuletEffect;
	3761: ISheetData_Amulet_AmuletEffect;
	3770: ISheetData_Amulet_AmuletEffect;
	3771: ISheetData_Amulet_AmuletEffect;
	3780: ISheetData_Amulet_AmuletEffect;
	3781: ISheetData_Amulet_AmuletEffect;
	3790: ISheetData_Amulet_AmuletEffect;
	3791: ISheetData_Amulet_AmuletEffect;
	3800: ISheetData_Amulet_AmuletEffect;
	3801: ISheetData_Amulet_AmuletEffect;
	3810: ISheetData_Amulet_AmuletEffect;
	3811: ISheetData_Amulet_AmuletEffect;
	3820: ISheetData_Amulet_AmuletEffect;
	3821: ISheetData_Amulet_AmuletEffect;
	3830: ISheetData_Amulet_AmuletEffect;
	3831: ISheetData_Amulet_AmuletEffect;
	3840: ISheetData_Amulet_AmuletEffect;
	3841: ISheetData_Amulet_AmuletEffect;
	3850: ISheetData_Amulet_AmuletEffect;
	3851: ISheetData_Amulet_AmuletEffect;
	3860: ISheetData_Amulet_AmuletEffect;
	3861: ISheetData_Amulet_AmuletEffect;
	3870: ISheetData_Amulet_AmuletEffect;
	3871: ISheetData_Amulet_AmuletEffect;
	3880: ISheetData_Amulet_AmuletEffect;
	3881: ISheetData_Amulet_AmuletEffect;
}
declare interface ISheetData_Amulet_AmuletEffect extends ISheetDataBase {
	/** 护身符id */
	id: number;
	/** 是否允许钦定(1可以,0不行) */
	book_enabled: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	deprecated: number;
	/** 区分权重隐藏标签{,分隔} */
	group: string;
	/** 1=秘籍，2=梅兰竹菊, 3=海盗，4=小鬼 */
	effect_group: number;
	/** 在商店中是否必定有印章 */
	shop_badge: number;
	/** 已有升级卡时是否依旧可以在卡包中出现 */
	duplicate_enabled: number;
	/** 升级后的卡 */
	upgrade: number;
	/** 珍贵度，1SSR，2SR，3R，4N */
	rarity: number;
	/** 商店买入价格 */
	price: number;
	/** 是否允许出售1-可以，0-不行 */
	can_sell: number;
	/** 商店出售价格 */
	sell_price: number;
	/** str/event卡名 */
	name: number;
	/** str/event效果 */
	desc: number;
	/** 卡图 */
	card_image: string;
	/** 角标 */
	card_remark: number;
	/** 前端无成长进度时的初始值 */
	init_param_view: number[];
	args: number[];
	tag_id: number[];
}
//#endregion

//#region amulet_pool
declare interface ISheet_Amulet_AmuletPool {
	[key: string]: ISheetData_Amulet_AmuletPool[];
	25011101: ISheetData_Amulet_AmuletPool[];
	25011102: ISheetData_Amulet_AmuletPool[];
	25011103: ISheetData_Amulet_AmuletPool[];
	25081101: ISheetData_Amulet_AmuletPool[];
	25081102: ISheetData_Amulet_AmuletPool[];
	25081103: ISheetData_Amulet_AmuletPool[];
	26051101: ISheetData_Amulet_AmuletPool[];
	26051102: ISheetData_Amulet_AmuletPool[];
	26051103: ISheetData_Amulet_AmuletPool[];
}
declare interface ISheetData_Amulet_AmuletPool extends ISheetDataBase {
	/** 护身符池id */
	level_amulet_pool_id: number;
	/** 护身符id */
	amulet_id: number;
}
//#endregion

//#region amulet_tag
declare interface ISheet_Amulet_AmuletTag {
	[key: string]: ISheetData_Amulet_AmuletTag;
	25084001: ISheetData_Amulet_AmuletTag;
	25084002: ISheetData_Amulet_AmuletTag;
	25084003: ISheetData_Amulet_AmuletTag;
	25084004: ISheetData_Amulet_AmuletTag;
	25084005: ISheetData_Amulet_AmuletTag;
	25084006: ISheetData_Amulet_AmuletTag;
	25084007: ISheetData_Amulet_AmuletTag;
	25084008: ISheetData_Amulet_AmuletTag;
	25084009: ISheetData_Amulet_AmuletTag;
	25084010: ISheetData_Amulet_AmuletTag;
	25084011: ISheetData_Amulet_AmuletTag;
	25084012: ISheetData_Amulet_AmuletTag;
	25084013: ISheetData_Amulet_AmuletTag;
	25084014: ISheetData_Amulet_AmuletTag;
	25084015: ISheetData_Amulet_AmuletTag;
	25084016: ISheetData_Amulet_AmuletTag;
	25084017: ISheetData_Amulet_AmuletTag;
	25084018: ISheetData_Amulet_AmuletTag;
	25084019: ISheetData_Amulet_AmuletTag;
	25084020: ISheetData_Amulet_AmuletTag;
	25084021: ISheetData_Amulet_AmuletTag;
	25084022: ISheetData_Amulet_AmuletTag;
	25084023: ISheetData_Amulet_AmuletTag;
	25084024: ISheetData_Amulet_AmuletTag;
	25084025: ISheetData_Amulet_AmuletTag;
	26054001: ISheetData_Amulet_AmuletTag;
	26054002: ISheetData_Amulet_AmuletTag;
	26054003: ISheetData_Amulet_AmuletTag;
	26054004: ISheetData_Amulet_AmuletTag;
	26054005: ISheetData_Amulet_AmuletTag;
	26054006: ISheetData_Amulet_AmuletTag;
	26054007: ISheetData_Amulet_AmuletTag;
	26054008: ISheetData_Amulet_AmuletTag;
	26054009: ISheetData_Amulet_AmuletTag;
}
declare interface ISheetData_Amulet_AmuletTag extends ISheetDataBase {
	/** 关键词id */
	tag_id: number;
	/** str/event关键词名 */
	tag_name: number;
	/** str/event关键词描述 */
	tag_desc: number;
}
//#endregion

//#region amulet_effect_group
declare interface ISheet_Amulet_AmuletEffectGroup {
	[key: string]: ISheetData_Amulet_AmuletEffectGroup;
	1: ISheetData_Amulet_AmuletEffectGroup;
	2: ISheetData_Amulet_AmuletEffectGroup;
}
declare interface ISheetData_Amulet_AmuletEffectGroup extends ISheetDataBase {
	/** 护身符组id */
	id: number;
	/** 融合后护身符id */
	merge_card: number;
}
//#endregion

//#region amulet_badge
declare interface ISheet_Amulet_AmuletBadge {
	[key: string]: ISheetData_Amulet_AmuletBadge;
	600010: ISheetData_Amulet_AmuletBadge;
	600020: ISheetData_Amulet_AmuletBadge;
	600030: ISheetData_Amulet_AmuletBadge;
	600040: ISheetData_Amulet_AmuletBadge;
	600050: ISheetData_Amulet_AmuletBadge;
	600060: ISheetData_Amulet_AmuletBadge;
	600070: ISheetData_Amulet_AmuletBadge;
	600080: ISheetData_Amulet_AmuletBadge;
	600090: ISheetData_Amulet_AmuletBadge;
	600100: ISheetData_Amulet_AmuletBadge;
	600110: ISheetData_Amulet_AmuletBadge;
	600120: ISheetData_Amulet_AmuletBadge;
	600130: ISheetData_Amulet_AmuletBadge;
	600140: ISheetData_Amulet_AmuletBadge;
	600150: ISheetData_Amulet_AmuletBadge;
	600160: ISheetData_Amulet_AmuletBadge;
	600170: ISheetData_Amulet_AmuletBadge;
	600180: ISheetData_Amulet_AmuletBadge;
	600190: ISheetData_Amulet_AmuletBadge;
	600200: ISheetData_Amulet_AmuletBadge;
	600210: ISheetData_Amulet_AmuletBadge;
	600220: ISheetData_Amulet_AmuletBadge;
	600230: ISheetData_Amulet_AmuletBadge;
	600240: ISheetData_Amulet_AmuletBadge;
	600250: ISheetData_Amulet_AmuletBadge;
	600260: ISheetData_Amulet_AmuletBadge;
	600270: ISheetData_Amulet_AmuletBadge;
	600280: ISheetData_Amulet_AmuletBadge;
	600290: ISheetData_Amulet_AmuletBadge;
	600300: ISheetData_Amulet_AmuletBadge;
	600310: ISheetData_Amulet_AmuletBadge;
}
declare interface ISheetData_Amulet_AmuletBadge extends ISheetDataBase {
	/** 印章id */
	id: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	deprecated: number;
	/** 可以被覆盖或删除 */
	coverable: number;
	/** 商店刷新权重 */
	weight: number;
	/** 档位，1铜，2银，3金 */
	rarity: number;
	/** 印章体积，0普通1大 */
	volume: number;
	/** str/event印章名 */
	badge_name: number;
	/** str/event效果 */
	badge_desc: number;
	/** 印章图 */
	badge_image: string;
	args: number[];
}
//#endregion

//#region amulet_advanced_shop
declare interface ISheet_Amulet_AmuletAdvancedShop {
	[key: string]: ISheetData_Amulet_AmuletAdvancedShop;
	260511: ISheetData_Amulet_AmuletAdvancedShop;
}
declare interface ISheetData_Amulet_AmuletAdvancedShop extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 刷新价格系数（百分比） */
	refresh_price_rate: number;
	/** 初始刷新价格 */
	shop_refresh_coin: number;
	/** 护身符商品=卡包结果 */
	effect_goods_pack: number;
}
//#endregion

//#region amulet_advanced_shop_upgrade
declare interface ISheet_Amulet_AmuletAdvancedShopUpgrade {
	[key: string]: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	1: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	2: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	3: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	4: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	5: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	6: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	7: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	8: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	9: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	10: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	11: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	12: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	13: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	14: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	15: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	16: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	17: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	18: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	19: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	20: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
}
declare interface ISheetData_Amulet_AmuletAdvancedShopUpgrade extends ISheetDataBase {
	/** 升级 id */
	id: number;
	/** 类型 */
	type: number;
	/** str/event选项描述 */
	selection_desc: number[];
	/** 购买价格 */
	price: number;
	/** 显示数值 */
	display_value: number;
	args: number[];
}
//#endregion

//#region amulet_gamble
declare interface ISheet_Amulet_AmuletGamble {
	[key: string]: ISheetData_Amulet_AmuletGamble[];
	260511: ISheetData_Amulet_AmuletGamble[];
}
declare interface ISheetData_Amulet_AmuletGamble extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 转盘id */
	id: number;
	/** 大关下限 */
	level_range: number[];
	/** 选项组id */
	selection_group_id: number;
	/** 爆炸初始概率（百分比） */
	destroy_rate: number;
	/** 爆炸概率增长系数（百分比） */
	destroy_inc_rate: number;
	/** 初始价格 */
	price: number;
	/** 价格增长系数（百分比） */
	price_inc_rate: number;
}
//#endregion

//#region amulet_gamble_group
declare interface ISheet_Amulet_AmuletGambleGroup {
	[key: string]: ISheetData_Amulet_AmuletGambleGroup[];
	5201: ISheetData_Amulet_AmuletGambleGroup[];
	5202: ISheetData_Amulet_AmuletGambleGroup[];
	5203: ISheetData_Amulet_AmuletGambleGroup[];
	5204: ISheetData_Amulet_AmuletGambleGroup[];
	5205: ISheetData_Amulet_AmuletGambleGroup[];
}
declare interface ISheetData_Amulet_AmuletGambleGroup extends ISheetDataBase {
	id: number;
	/** selection.id */
	selection_id: number;
	/** 选项好坏类型 */
	category: number;
	/** 数量 */
	count: number;
}
//#endregion

//#region amulet_gamble_selection
declare interface ISheet_Amulet_AmuletGambleSelection {
	[key: string]: ISheetData_Amulet_AmuletGambleSelection[];
	50201: ISheetData_Amulet_AmuletGambleSelection[];
	50202: ISheetData_Amulet_AmuletGambleSelection[];
	50203: ISheetData_Amulet_AmuletGambleSelection[];
}
declare interface ISheetData_Amulet_AmuletGambleSelection extends ISheetDataBase {
	id: number;
	/** 选项id，全局唯一 */
	selection_id: number;
	/** 选项好坏类型 */
	category: number;
	/** 选项类型 */
	type: number;
	/** 选项图标 */
	selection_image: string;
	/** str/event选项标题 */
	selection_name: number;
	/** str/event选项描述 */
	selection_desc: number;
	/** 参数 */
	args: number[];
}
//#endregion

//#region amulet_forge
declare interface ISheet_Amulet_AmuletForge {
	[key: string]: ISheetData_Amulet_AmuletForge[];
	260511: ISheetData_Amulet_AmuletForge[];
}
declare interface ISheetData_Amulet_AmuletForge extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 1-护身符 2-印章 */
	type: number;
	/** 稀有度 */
	rarity: number;
	/** 价格 */
	price: number;
}
//#endregion

//#region amulet_trade_item
declare interface ISheet_Amulet_AmuletTradeItem {
	[key: string]: ISheetData_Amulet_AmuletTradeItem;
	1: ISheetData_Amulet_AmuletTradeItem;
	2: ISheetData_Amulet_AmuletTradeItem;
	3: ISheetData_Amulet_AmuletTradeItem;
	4: ISheetData_Amulet_AmuletTradeItem;
	5: ISheetData_Amulet_AmuletTradeItem;
	6: ISheetData_Amulet_AmuletTradeItem;
	7: ISheetData_Amulet_AmuletTradeItem;
	8: ISheetData_Amulet_AmuletTradeItem;
	9: ISheetData_Amulet_AmuletTradeItem;
}
declare interface ISheetData_Amulet_AmuletTradeItem extends ISheetDataBase {
	/** id */
	id: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	deprecated: number;
	/** 种类 */
	type: number;
	/** 分组（同组的不会随机到多个） */
	group: number;
	/** 价值 */
	value: number;
	/** str/event说明文 */
	desc: number;
	/** 选项图 */
	image: string;
	args: number[];
}
//#endregion

//#region amulet_trade_reward
declare interface ISheet_Amulet_AmuletTradeReward {
	[key: string]: ISheetData_Amulet_AmuletTradeReward;
	1: ISheetData_Amulet_AmuletTradeReward;
	2: ISheetData_Amulet_AmuletTradeReward;
	3: ISheetData_Amulet_AmuletTradeReward;
	4: ISheetData_Amulet_AmuletTradeReward;
	5: ISheetData_Amulet_AmuletTradeReward;
	6: ISheetData_Amulet_AmuletTradeReward;
	7: ISheetData_Amulet_AmuletTradeReward;
}
declare interface ISheetData_Amulet_AmuletTradeReward extends ISheetDataBase {
	/** id */
	id: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	deprecated: number;
	/** 价格区间最小值 */
	min_value: number;
	/** 价格区间最大值（包括） */
	max_value: number;
	/** str/event说明文 */
	desc: number;
	/** 奖励类型（1=护身符，2=符文石） */
	type: number;
	args: number[];
}
//#endregion

//#region amulet_bonfire_selection
declare interface ISheet_Amulet_AmuletBonfireSelection {
	[key: string]: ISheetData_Amulet_AmuletBonfireSelection[];
	260511: ISheetData_Amulet_AmuletBonfireSelection[];
}
declare interface ISheetData_Amulet_AmuletBonfireSelection extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 篝火选项id */
	selection_id: number;
	/** (1固定选项2随机选项) */
	random: number;
	/** 选项类型 */
	type: number;
	/** str/event选项名称 */
	selection_name: number;
	/** str/event选项描述 */
	selection_desc: number;
	/** 选项图 */
	selection_image: string;
	/** 参数 */
	args: number[];
}
//#endregion

//#region amulet_transport
declare interface ISheet_Amulet_AmuletTransport {
	[key: string]: ISheetData_Amulet_AmuletTransport;
	260511: ISheetData_Amulet_AmuletTransport;
}
declare interface ISheetData_Amulet_AmuletTransport extends ISheetDataBase {
	/** 活动id */
	activity_id: number;
	/** 价格 */
	price: number;
}
//#endregion

//#region amulet_shop_upgrade
declare interface ISheet_Amulet_AmuletShopUpgrade {
	[key: string]: ISheetData_Amulet_AmuletShopUpgrade[];
	8001: ISheetData_Amulet_AmuletShopUpgrade[];
	8002: ISheetData_Amulet_AmuletShopUpgrade[];
	8003: ISheetData_Amulet_AmuletShopUpgrade[];
	8004: ISheetData_Amulet_AmuletShopUpgrade[];
}
declare interface ISheetData_Amulet_AmuletShopUpgrade extends ISheetDataBase {
	/** 升级group */
	id: number;
	/** 等级 */
	level: number;
	/** 升级价格 */
	price: number;
	/** 效果量 */
	add_value: number;
}
//#endregion

//#region amulet_upgrade
declare interface ISheet_Amulet_AmuletUpgrade {
	[key: string]: ISheetData_Amulet_AmuletUpgrade[];
	901: ISheetData_Amulet_AmuletUpgrade[];
	902: ISheetData_Amulet_AmuletUpgrade[];
	903: ISheetData_Amulet_AmuletUpgrade[];
	904: ISheetData_Amulet_AmuletUpgrade[];
	905: ISheetData_Amulet_AmuletUpgrade[];
	906: ISheetData_Amulet_AmuletUpgrade[];
}
declare interface ISheetData_Amulet_AmuletUpgrade extends ISheetDataBase {
	/** 升级group */
	id: number;
	/** 等级 */
	level: number;
	/** 所需升级点 */
	skill_point: number;
	/** 每个等级对应一个buff，args设置效果 */
	buff_id: number;
	/** 前端展示数值 */
	display_value: number;
}
//#endregion

//#region amulet_buff
declare interface ISheet_Amulet_AmuletBuff {
	[key: string]: ISheetData_Amulet_AmuletBuff;
	901: ISheetData_Amulet_AmuletBuff;
	902: ISheetData_Amulet_AmuletBuff;
	903: ISheetData_Amulet_AmuletBuff;
	904: ISheetData_Amulet_AmuletBuff;
	905: ISheetData_Amulet_AmuletBuff;
	906: ISheetData_Amulet_AmuletBuff;
	907: ISheetData_Amulet_AmuletBuff;
	908: ISheetData_Amulet_AmuletBuff;
	909: ISheetData_Amulet_AmuletBuff;
	910: ISheetData_Amulet_AmuletBuff;
	911: ISheetData_Amulet_AmuletBuff;
	912: ISheetData_Amulet_AmuletBuff;
	913: ISheetData_Amulet_AmuletBuff;
	914: ISheetData_Amulet_AmuletBuff;
	915: ISheetData_Amulet_AmuletBuff;
	916: ISheetData_Amulet_AmuletBuff;
	917: ISheetData_Amulet_AmuletBuff;
	918: ISheetData_Amulet_AmuletBuff;
	919: ISheetData_Amulet_AmuletBuff;
	920: ISheetData_Amulet_AmuletBuff;
	921: ISheetData_Amulet_AmuletBuff;
	922: ISheetData_Amulet_AmuletBuff;
	923: ISheetData_Amulet_AmuletBuff;
	924: ISheetData_Amulet_AmuletBuff;
	925: ISheetData_Amulet_AmuletBuff;
	926: ISheetData_Amulet_AmuletBuff;
	927: ISheetData_Amulet_AmuletBuff;
	928: ISheetData_Amulet_AmuletBuff;
	8001: ISheetData_Amulet_AmuletBuff;
	8002: ISheetData_Amulet_AmuletBuff;
	8003: ISheetData_Amulet_AmuletBuff;
	8004: ISheetData_Amulet_AmuletBuff;
	9010: ISheetData_Amulet_AmuletBuff;
	9011: ISheetData_Amulet_AmuletBuff;
	9012: ISheetData_Amulet_AmuletBuff;
	9013: ISheetData_Amulet_AmuletBuff;
	9020: ISheetData_Amulet_AmuletBuff;
	9021: ISheetData_Amulet_AmuletBuff;
	9022: ISheetData_Amulet_AmuletBuff;
	9023: ISheetData_Amulet_AmuletBuff;
	9030: ISheetData_Amulet_AmuletBuff;
	9031: ISheetData_Amulet_AmuletBuff;
	9032: ISheetData_Amulet_AmuletBuff;
	9033: ISheetData_Amulet_AmuletBuff;
	9040: ISheetData_Amulet_AmuletBuff;
	9041: ISheetData_Amulet_AmuletBuff;
	9042: ISheetData_Amulet_AmuletBuff;
	9043: ISheetData_Amulet_AmuletBuff;
	9050: ISheetData_Amulet_AmuletBuff;
	9051: ISheetData_Amulet_AmuletBuff;
	9052: ISheetData_Amulet_AmuletBuff;
	9053: ISheetData_Amulet_AmuletBuff;
	9060: ISheetData_Amulet_AmuletBuff;
	9061: ISheetData_Amulet_AmuletBuff;
	9062: ISheetData_Amulet_AmuletBuff;
}
declare interface ISheetData_Amulet_AmuletBuff extends ISheetDataBase {
	/** buffid */
	id: number;
	/** 1-boss，2-商店升级，3-场外升级 */
	type: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	deprecated: number;
	/** 随机权重 */
	common_weight: number;
	/** record_level后的随机权重 */
	ex_weight: number;
	/** buff是否可叠加1-可以，0-不可以 */
	can_stack: number;
	/** str/event说明文 */
	desc: number;
	/** 屏蔽天牌/里宝指示：1万2筒3索0里宝指示牌 */
	invalid_type: number;
	args: number[];
}
//#endregion

//#region amulet_goods
declare interface ISheet_Amulet_AmuletGoods {
	[key: string]: ISheetData_Amulet_AmuletGoods;
	101: ISheetData_Amulet_AmuletGoods;
	102: ISheetData_Amulet_AmuletGoods;
	103: ISheetData_Amulet_AmuletGoods;
	111: ISheetData_Amulet_AmuletGoods;
	112: ISheetData_Amulet_AmuletGoods;
	113: ISheetData_Amulet_AmuletGoods;
	971: ISheetData_Amulet_AmuletGoods;
	972: ISheetData_Amulet_AmuletGoods;
	973: ISheetData_Amulet_AmuletGoods;
	974: ISheetData_Amulet_AmuletGoods;
	975: ISheetData_Amulet_AmuletGoods;
	976: ISheetData_Amulet_AmuletGoods;
	977: ISheetData_Amulet_AmuletGoods;
	978: ISheetData_Amulet_AmuletGoods;
	979: ISheetData_Amulet_AmuletGoods;
	980: ISheetData_Amulet_AmuletGoods;
	981: ISheetData_Amulet_AmuletGoods;
	991: ISheetData_Amulet_AmuletGoods;
}
declare interface ISheetData_Amulet_AmuletGoods extends ISheetDataBase {
	/** goods_id */
	id: number;
	/** 保底卡珍贵度，1SSR，2SR，3R，4N */
	guaranteed: number;
	/** 卡包名称str/event */
	pack_name: number;
	/** 卡包简介str/event */
	pack_desc: number;
	/** 价格 */
	price: number;
}
//#endregion

//#region amulet_fan
declare interface ISheet_Amulet_AmuletFan {
	[key: string]: ISheetData_Amulet_AmuletFan;
	1: ISheetData_Amulet_AmuletFan;
	2: ISheetData_Amulet_AmuletFan;
	3: ISheetData_Amulet_AmuletFan;
	4: ISheetData_Amulet_AmuletFan;
	5: ISheetData_Amulet_AmuletFan;
	6: ISheetData_Amulet_AmuletFan;
	7: ISheetData_Amulet_AmuletFan;
	8: ISheetData_Amulet_AmuletFan;
	9: ISheetData_Amulet_AmuletFan;
	10: ISheetData_Amulet_AmuletFan;
	11: ISheetData_Amulet_AmuletFan;
	12: ISheetData_Amulet_AmuletFan;
	13: ISheetData_Amulet_AmuletFan;
	14: ISheetData_Amulet_AmuletFan;
	15: ISheetData_Amulet_AmuletFan;
	16: ISheetData_Amulet_AmuletFan;
	17: ISheetData_Amulet_AmuletFan;
	18: ISheetData_Amulet_AmuletFan;
	19: ISheetData_Amulet_AmuletFan;
	20: ISheetData_Amulet_AmuletFan;
	21: ISheetData_Amulet_AmuletFan;
	22: ISheetData_Amulet_AmuletFan;
	23: ISheetData_Amulet_AmuletFan;
	24: ISheetData_Amulet_AmuletFan;
	25: ISheetData_Amulet_AmuletFan;
	26: ISheetData_Amulet_AmuletFan;
	27: ISheetData_Amulet_AmuletFan;
	28: ISheetData_Amulet_AmuletFan;
	29: ISheetData_Amulet_AmuletFan;
	30: ISheetData_Amulet_AmuletFan;
	31: ISheetData_Amulet_AmuletFan;
	32: ISheetData_Amulet_AmuletFan;
	33: ISheetData_Amulet_AmuletFan;
	36: ISheetData_Amulet_AmuletFan;
	37: ISheetData_Amulet_AmuletFan;
	38: ISheetData_Amulet_AmuletFan;
	39: ISheetData_Amulet_AmuletFan;
	40: ISheetData_Amulet_AmuletFan;
	41: ISheetData_Amulet_AmuletFan;
	42: ISheetData_Amulet_AmuletFan;
	43: ISheetData_Amulet_AmuletFan;
	44: ISheetData_Amulet_AmuletFan;
	45: ISheetData_Amulet_AmuletFan;
	47: ISheetData_Amulet_AmuletFan;
	48: ISheetData_Amulet_AmuletFan;
	49: ISheetData_Amulet_AmuletFan;
	50: ISheetData_Amulet_AmuletFan;
	100: ISheetData_Amulet_AmuletFan;
	101: ISheetData_Amulet_AmuletFan;
	201: ISheetData_Amulet_AmuletFan;
	202: ISheetData_Amulet_AmuletFan;
	203: ISheetData_Amulet_AmuletFan;
	204: ISheetData_Amulet_AmuletFan;
	205: ISheetData_Amulet_AmuletFan;
	206: ISheetData_Amulet_AmuletFan;
	207: ISheetData_Amulet_AmuletFan;
	208: ISheetData_Amulet_AmuletFan;
	209: ISheetData_Amulet_AmuletFan;
	210: ISheetData_Amulet_AmuletFan;
	211: ISheetData_Amulet_AmuletFan;
	212: ISheetData_Amulet_AmuletFan;
	213: ISheetData_Amulet_AmuletFan;
	214: ISheetData_Amulet_AmuletFan;
	215: ISheetData_Amulet_AmuletFan;
	216: ISheetData_Amulet_AmuletFan;
	217: ISheetData_Amulet_AmuletFan;
	218: ISheetData_Amulet_AmuletFan;
	219: ISheetData_Amulet_AmuletFan;
	220: ISheetData_Amulet_AmuletFan;
	221: ISheetData_Amulet_AmuletFan;
	222: ISheetData_Amulet_AmuletFan;
	223: ISheetData_Amulet_AmuletFan;
	224: ISheetData_Amulet_AmuletFan;
}
declare interface ISheetData_Amulet_AmuletFan extends ISheetDataBase {
	/** 番种id */
	id: number;
	/** 初始番数（都按照门清役计算，可重复时填写1个） */
	val: number;
	/** 役满役种 */
	yiman: number;
	/** str/event的番名，0为普通番 */
	name: number;
	/** str/event的番名，0为普通番 */
	desc: number;
	/** 役种类型 */
	type: number;
	/** 番型例子 */
	case: string;
}
//#endregion

//#region amulet_rune_stone
declare interface ISheet_Amulet_AmuletRuneStone {
	[key: string]: ISheetData_Amulet_AmuletRuneStone;
	7201: ISheetData_Amulet_AmuletRuneStone;
	7202: ISheetData_Amulet_AmuletRuneStone;
	7203: ISheetData_Amulet_AmuletRuneStone;
	7204: ISheetData_Amulet_AmuletRuneStone;
	7205: ISheetData_Amulet_AmuletRuneStone;
	7206: ISheetData_Amulet_AmuletRuneStone;
	7207: ISheetData_Amulet_AmuletRuneStone;
	7208: ISheetData_Amulet_AmuletRuneStone;
	7209: ISheetData_Amulet_AmuletRuneStone;
	7210: ISheetData_Amulet_AmuletRuneStone;
	7211: ISheetData_Amulet_AmuletRuneStone;
	7212: ISheetData_Amulet_AmuletRuneStone;
	7213: ISheetData_Amulet_AmuletRuneStone;
	7214: ISheetData_Amulet_AmuletRuneStone;
	7215: ISheetData_Amulet_AmuletRuneStone;
	7216: ISheetData_Amulet_AmuletRuneStone;
	7217: ISheetData_Amulet_AmuletRuneStone;
	7218: ISheetData_Amulet_AmuletRuneStone;
	7219: ISheetData_Amulet_AmuletRuneStone;
	7220: ISheetData_Amulet_AmuletRuneStone;
	7221: ISheetData_Amulet_AmuletRuneStone;
	7222: ISheetData_Amulet_AmuletRuneStone;
	7223: ISheetData_Amulet_AmuletRuneStone;
	7224: ISheetData_Amulet_AmuletRuneStone;
}
declare interface ISheetData_Amulet_AmuletRuneStone extends ISheetDataBase {
	id: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	deprecated: number;
	/** 商店刷新权重 */
	weight: number;
	/** 价格 */
	price: number;
	/** 解锁番种id */
	unlock_fan: number;
	/** 符文石图片 */
	rune_stone_image: string;
}
//#endregion

//#region amulet_task
declare interface ISheet_Amulet_AmuletTask {
	[key: string]: ISheetData_Amulet_AmuletTask;
	25011301: ISheetData_Amulet_AmuletTask;
	25011302: ISheetData_Amulet_AmuletTask;
	25011303: ISheetData_Amulet_AmuletTask;
	25011304: ISheetData_Amulet_AmuletTask;
	25011305: ISheetData_Amulet_AmuletTask;
	25011306: ISheetData_Amulet_AmuletTask;
	25011307: ISheetData_Amulet_AmuletTask;
	25011308: ISheetData_Amulet_AmuletTask;
	25011309: ISheetData_Amulet_AmuletTask;
	25011310: ISheetData_Amulet_AmuletTask;
	25011311: ISheetData_Amulet_AmuletTask;
	25011312: ISheetData_Amulet_AmuletTask;
	25011313: ISheetData_Amulet_AmuletTask;
	25011314: ISheetData_Amulet_AmuletTask;
	25011315: ISheetData_Amulet_AmuletTask;
	25011316: ISheetData_Amulet_AmuletTask;
}
declare interface ISheetData_Amulet_AmuletTask extends ISheetDataBase {
	/** 任务id */
	id: number;
	/** 相关护身符id */
	amulet_id: number;
	/** 活动id */
	activity_id: number;
	/** 基础任务id */
	base_task_id: number;
	/** 奖励 */
	reward: string;
}
//#endregion

//#region amulet_large_number
declare interface ISheet_Amulet_AmuletLargeNumber {
	[key: string]: ISheetData_Amulet_AmuletLargeNumber;
	4: ISheetData_Amulet_AmuletLargeNumber;
	6: ISheetData_Amulet_AmuletLargeNumber;
	8: ISheetData_Amulet_AmuletLargeNumber;
	9: ISheetData_Amulet_AmuletLargeNumber;
	12: ISheetData_Amulet_AmuletLargeNumber;
	15: ISheetData_Amulet_AmuletLargeNumber;
	16: ISheetData_Amulet_AmuletLargeNumber;
	18: ISheetData_Amulet_AmuletLargeNumber;
	20: ISheetData_Amulet_AmuletLargeNumber;
	21: ISheetData_Amulet_AmuletLargeNumber;
	24: ISheetData_Amulet_AmuletLargeNumber;
	27: ISheetData_Amulet_AmuletLargeNumber;
	28: ISheetData_Amulet_AmuletLargeNumber;
	30: ISheetData_Amulet_AmuletLargeNumber;
	32: ISheetData_Amulet_AmuletLargeNumber;
	33: ISheetData_Amulet_AmuletLargeNumber;
	36: ISheetData_Amulet_AmuletLargeNumber;
	39: ISheetData_Amulet_AmuletLargeNumber;
	40: ISheetData_Amulet_AmuletLargeNumber;
	42: ISheetData_Amulet_AmuletLargeNumber;
	44: ISheetData_Amulet_AmuletLargeNumber;
	45: ISheetData_Amulet_AmuletLargeNumber;
	48: ISheetData_Amulet_AmuletLargeNumber;
	51: ISheetData_Amulet_AmuletLargeNumber;
	54: ISheetData_Amulet_AmuletLargeNumber;
	57: ISheetData_Amulet_AmuletLargeNumber;
	60: ISheetData_Amulet_AmuletLargeNumber;
	63: ISheetData_Amulet_AmuletLargeNumber;
	66: ISheetData_Amulet_AmuletLargeNumber;
	69: ISheetData_Amulet_AmuletLargeNumber;
	72: ISheetData_Amulet_AmuletLargeNumber;
	75: ISheetData_Amulet_AmuletLargeNumber;
	78: ISheetData_Amulet_AmuletLargeNumber;
	81: ISheetData_Amulet_AmuletLargeNumber;
	84: ISheetData_Amulet_AmuletLargeNumber;
	87: ISheetData_Amulet_AmuletLargeNumber;
	90: ISheetData_Amulet_AmuletLargeNumber;
	93: ISheetData_Amulet_AmuletLargeNumber;
	96: ISheetData_Amulet_AmuletLargeNumber;
	99: ISheetData_Amulet_AmuletLargeNumber;
	102: ISheetData_Amulet_AmuletLargeNumber;
	105: ISheetData_Amulet_AmuletLargeNumber;
	108: ISheetData_Amulet_AmuletLargeNumber;
	111: ISheetData_Amulet_AmuletLargeNumber;
	114: ISheetData_Amulet_AmuletLargeNumber;
	117: ISheetData_Amulet_AmuletLargeNumber;
	120: ISheetData_Amulet_AmuletLargeNumber;
	123: ISheetData_Amulet_AmuletLargeNumber;
	126: ISheetData_Amulet_AmuletLargeNumber;
	129: ISheetData_Amulet_AmuletLargeNumber;
	132: ISheetData_Amulet_AmuletLargeNumber;
	135: ISheetData_Amulet_AmuletLargeNumber;
	138: ISheetData_Amulet_AmuletLargeNumber;
	141: ISheetData_Amulet_AmuletLargeNumber;
	144: ISheetData_Amulet_AmuletLargeNumber;
	147: ISheetData_Amulet_AmuletLargeNumber;
	150: ISheetData_Amulet_AmuletLargeNumber;
	153: ISheetData_Amulet_AmuletLargeNumber;
	156: ISheetData_Amulet_AmuletLargeNumber;
	159: ISheetData_Amulet_AmuletLargeNumber;
	162: ISheetData_Amulet_AmuletLargeNumber;
	165: ISheetData_Amulet_AmuletLargeNumber;
	168: ISheetData_Amulet_AmuletLargeNumber;
	171: ISheetData_Amulet_AmuletLargeNumber;
	174: ISheetData_Amulet_AmuletLargeNumber;
	177: ISheetData_Amulet_AmuletLargeNumber;
	180: ISheetData_Amulet_AmuletLargeNumber;
	183: ISheetData_Amulet_AmuletLargeNumber;
	186: ISheetData_Amulet_AmuletLargeNumber;
	189: ISheetData_Amulet_AmuletLargeNumber;
	192: ISheetData_Amulet_AmuletLargeNumber;
	195: ISheetData_Amulet_AmuletLargeNumber;
	198: ISheetData_Amulet_AmuletLargeNumber;
	201: ISheetData_Amulet_AmuletLargeNumber;
	204: ISheetData_Amulet_AmuletLargeNumber;
	207: ISheetData_Amulet_AmuletLargeNumber;
	210: ISheetData_Amulet_AmuletLargeNumber;
	213: ISheetData_Amulet_AmuletLargeNumber;
	216: ISheetData_Amulet_AmuletLargeNumber;
	219: ISheetData_Amulet_AmuletLargeNumber;
	222: ISheetData_Amulet_AmuletLargeNumber;
	225: ISheetData_Amulet_AmuletLargeNumber;
	228: ISheetData_Amulet_AmuletLargeNumber;
	231: ISheetData_Amulet_AmuletLargeNumber;
	234: ISheetData_Amulet_AmuletLargeNumber;
	237: ISheetData_Amulet_AmuletLargeNumber;
	240: ISheetData_Amulet_AmuletLargeNumber;
	243: ISheetData_Amulet_AmuletLargeNumber;
	246: ISheetData_Amulet_AmuletLargeNumber;
	249: ISheetData_Amulet_AmuletLargeNumber;
	252: ISheetData_Amulet_AmuletLargeNumber;
	255: ISheetData_Amulet_AmuletLargeNumber;
	258: ISheetData_Amulet_AmuletLargeNumber;
	261: ISheetData_Amulet_AmuletLargeNumber;
	264: ISheetData_Amulet_AmuletLargeNumber;
	267: ISheetData_Amulet_AmuletLargeNumber;
	270: ISheetData_Amulet_AmuletLargeNumber;
	273: ISheetData_Amulet_AmuletLargeNumber;
	276: ISheetData_Amulet_AmuletLargeNumber;
	279: ISheetData_Amulet_AmuletLargeNumber;
	282: ISheetData_Amulet_AmuletLargeNumber;
	285: ISheetData_Amulet_AmuletLargeNumber;
	288: ISheetData_Amulet_AmuletLargeNumber;
	291: ISheetData_Amulet_AmuletLargeNumber;
	294: ISheetData_Amulet_AmuletLargeNumber;
	297: ISheetData_Amulet_AmuletLargeNumber;
	300: ISheetData_Amulet_AmuletLargeNumber;
}
declare interface ISheetData_Amulet_AmuletLargeNumber extends ISheetDataBase {
	/** 数字id（10的n次方） */
	number_id: string;
	/** str/str万进制单位 */
	number_unit_cn: string;
	/** 千进制单位 */
	number_unit_en: string;
}
//#endregion