/** This script is generated automatically, Please do not any modify! */

declare interface ITable_Amulet {
	/** 初始化状态6参数  ---  unique */
	readonly amulet_activity: CfgExt<ISheet_Amulet_AmuletActivity>;
	/** 小关节点  ---  group */
	readonly amulet_node: CfgExtGroup<ISheet_Amulet_AmuletNode>;
	/** 大关配置  ---  group */
	readonly amulet_level: CfgExtGroup<ISheet_Amulet_AmuletLevel>;
	/** 事件随机池  ---  group */
	readonly amulet_map_event: CfgExtGroup<ISheet_Amulet_AmuletMapEvent>;
	/** 角色配置  ---  group */
	readonly amulet_character: CfgExtGroup<ISheet_Amulet_AmuletCharacter>;
	/** 角色牌库配置  ---  group */
	readonly amulet_tile_score_map: CfgExtGroup<ISheet_Amulet_AmuletTileScoreMap>;
	/** 角色对护身符权重影响配置  ---  group */
	readonly amulet_effect_weight: CfgExtGroup<ISheet_Amulet_AmuletEffectWeight>;
	/** 敌人配置  ---  unique */
	readonly amulet_enemy: CfgExt<ISheet_Amulet_AmuletEnemy>;
	/** 敌人技能配置  ---  group */
	readonly amulet_enemy_skill: CfgExtGroup<ISheet_Amulet_AmuletEnemySkill>;
	/** 护身符效果  ---  unique */
	readonly amulet_effect: CfgExt<ISheet_Amulet_AmuletEffect>;
	/** 护身符刷新池  ---  group */
	readonly amulet_pool: CfgExtGroup<ISheet_Amulet_AmuletPool>;
	/** 关键词  ---  unique */
	readonly amulet_tag: CfgExt<ISheet_Amulet_AmuletTag>;
	/** 护身符组合成  ---  unique */
	readonly amulet_effect_group: CfgExt<ISheet_Amulet_AmuletEffectGroup>;
	/** 印章效果  ---  unique */
	readonly amulet_badge: CfgExt<ISheet_Amulet_AmuletBadge>;
	/** 事件-特殊商店  ---  unique */
	readonly amulet_advanced_shop: CfgExt<ISheet_Amulet_AmuletAdvancedShop>;
	/** 事件-特殊商店升级选项  ---  unique */
	readonly amulet_advanced_shop_upgrade: CfgExt<ISheet_Amulet_AmuletAdvancedShopUpgrade>;
	/** 事件-转盘  ---  group */
	readonly amulet_gamble: CfgExtGroup<ISheet_Amulet_AmuletGamble>;
	/** 事件-转盘选项分配权重  ---  group */
	readonly amulet_gamble_group: CfgExtGroup<ISheet_Amulet_AmuletGambleGroup>;
	/** 事件-转盘选项  ---  group */
	readonly amulet_gamble_selection: CfgExtGroup<ISheet_Amulet_AmuletGambleSelection>;
	/** 事件-锻造  ---  group */
	readonly amulet_forge: CfgExtGroup<ISheet_Amulet_AmuletForge>;
	/** 事件-交易条件  ---  unique */
	readonly amulet_trade_item: CfgExt<ISheet_Amulet_AmuletTradeItem>;
	/** 事件-交易奖励  ---  unique */
	readonly amulet_trade_reward: CfgExt<ISheet_Amulet_AmuletTradeReward>;
	/** 事件-篝火  ---  group */
	readonly amulet_bonfire_selection: CfgExtGroup<ISheet_Amulet_AmuletBonfireSelection>;
	/** 事件-传送  ---  unique */
	readonly amulet_transport: CfgExt<ISheet_Amulet_AmuletTransport>;
	/** group */
	readonly amulet_shop_upgrade: CfgExtGroup<ISheet_Amulet_AmuletShopUpgrade>;
	/** 场外升级id  ---  group */
	readonly amulet_upgrade: CfgExtGroup<ISheet_Amulet_AmuletUpgrade>;
	/** BOSSbuff  ---  unique */
	readonly amulet_buff: CfgExt<ISheet_Amulet_AmuletBuff>;
	/** 商店销售卡包内容权重  ---  unique */
	readonly amulet_goods: CfgExt<ISheet_Amulet_AmuletGoods>;
	/** 青云之志算番  ---  unique */
	readonly amulet_fan: CfgExt<ISheet_Amulet_AmuletFan>;
	/** 符文石  ---  unique */
	readonly amulet_rune_stone: CfgExt<ISheet_Amulet_AmuletRuneStone>;
	/** 护身符挑战任务  ---  unique */
	readonly amulet_task: CfgExt<ISheet_Amulet_AmuletTask>;
	/** 大数单位  ---  unique */
	readonly amulet_large_number: CfgExt<ISheet_Amulet_AmuletLargeNumber>;
}

//#region amulet_activity
declare interface ISheet_Amulet_AmuletActivity {
	readonly [key: string]: ISheetData_Amulet_AmuletActivity;
	readonly 240801: ISheetData_Amulet_AmuletActivity;
	readonly 250111: ISheetData_Amulet_AmuletActivity;
	readonly 250811: ISheetData_Amulet_AmuletActivity;
	readonly 260511: ISheetData_Amulet_AmuletActivity;
}
declare interface ISheetData_Amulet_AmuletActivity extends ISheetDataBase {
	readonly activity_id: number;
	/** 强化道具编号 */
	readonly skill_item: number;
	/** 初始星币数 */
	readonly init_coin: number;
	/** 商店货架卡包数量 */
	readonly shop_count: number;
	/** 超过该关卡记录对局记录 */
	readonly record_level_id: number;
	/** 关卡节点 */
	readonly record_level_node: number;
	/** 钦定初始护身符功能解锁关卡 */
	readonly book_unlock_level_id: number;
	/** 关卡节点 */
	readonly book_unlock_level_node: number;
	/** 初始免费护身符包id */
	readonly free_effect_goods_id: number;
	/** 商店首次刷新的价格 */
	readonly shop_refresh_coin: number;
	/** 持有护身符最多数量 */
	readonly effect_max_count: number;
	/** 初始宝牌指示牌 */
	readonly init_dora_indicator: number;
	/** 初始换牌次数 */
	readonly init_change_hand: number;
	/** 初始王牌（确定摸不到） */
	readonly init_mount_count: number;
	/** 初始关卡id */
	readonly init_level: number;
	/** 额外商店升级数量 */
	readonly advanced_shop_upgrade_count: number;
}
//#endregion

//#region amulet_node
declare interface ISheet_Amulet_AmuletNode {
	readonly [key: string]: ISheetData_Amulet_AmuletNode[];
	readonly 19001: ISheetData_Amulet_AmuletNode[];
	readonly 19002: ISheetData_Amulet_AmuletNode[];
	readonly 19003: ISheetData_Amulet_AmuletNode[];
	readonly 19004: ISheetData_Amulet_AmuletNode[];
	readonly 19005: ISheetData_Amulet_AmuletNode[];
	readonly 19101: ISheetData_Amulet_AmuletNode[];
	readonly 19102: ISheetData_Amulet_AmuletNode[];
	readonly 19103: ISheetData_Amulet_AmuletNode[];
	readonly 19104: ISheetData_Amulet_AmuletNode[];
	readonly 19105: ISheetData_Amulet_AmuletNode[];
	readonly 19106: ISheetData_Amulet_AmuletNode[];
	readonly 19107: ISheetData_Amulet_AmuletNode[];
	readonly 19108: ISheetData_Amulet_AmuletNode[];
	readonly 19109: ISheetData_Amulet_AmuletNode[];
	readonly 19110: ISheetData_Amulet_AmuletNode[];
	readonly 19111: ISheetData_Amulet_AmuletNode[];
	readonly 19112: ISheetData_Amulet_AmuletNode[];
	readonly 19113: ISheetData_Amulet_AmuletNode[];
	readonly 19114: ISheetData_Amulet_AmuletNode[];
	readonly 19115: ISheetData_Amulet_AmuletNode[];
	readonly 19116: ISheetData_Amulet_AmuletNode[];
	readonly 19117: ISheetData_Amulet_AmuletNode[];
	readonly 19118: ISheetData_Amulet_AmuletNode[];
	readonly 19119: ISheetData_Amulet_AmuletNode[];
	readonly 19120: ISheetData_Amulet_AmuletNode[];
	readonly 19121: ISheetData_Amulet_AmuletNode[];
	readonly 19122: ISheetData_Amulet_AmuletNode[];
	readonly 19123: ISheetData_Amulet_AmuletNode[];
	readonly 19124: ISheetData_Amulet_AmuletNode[];
	readonly 19125: ISheetData_Amulet_AmuletNode[];
	readonly 19126: ISheetData_Amulet_AmuletNode[];
	readonly 19127: ISheetData_Amulet_AmuletNode[];
	readonly 19128: ISheetData_Amulet_AmuletNode[];
	readonly 19129: ISheetData_Amulet_AmuletNode[];
	readonly 19130: ISheetData_Amulet_AmuletNode[];
	readonly 19131: ISheetData_Amulet_AmuletNode[];
	readonly 19132: ISheetData_Amulet_AmuletNode[];
	readonly 19133: ISheetData_Amulet_AmuletNode[];
	readonly 19134: ISheetData_Amulet_AmuletNode[];
	readonly 19135: ISheetData_Amulet_AmuletNode[];
	readonly 19136: ISheetData_Amulet_AmuletNode[];
	readonly 19137: ISheetData_Amulet_AmuletNode[];
	readonly 19138: ISheetData_Amulet_AmuletNode[];
	readonly 19139: ISheetData_Amulet_AmuletNode[];
	readonly 19140: ISheetData_Amulet_AmuletNode[];
	readonly 19141: ISheetData_Amulet_AmuletNode[];
	readonly 19142: ISheetData_Amulet_AmuletNode[];
	readonly 19143: ISheetData_Amulet_AmuletNode[];
	readonly 19144: ISheetData_Amulet_AmuletNode[];
	readonly 19145: ISheetData_Amulet_AmuletNode[];
	readonly 19146: ISheetData_Amulet_AmuletNode[];
	readonly 19147: ISheetData_Amulet_AmuletNode[];
	readonly 19148: ISheetData_Amulet_AmuletNode[];
	readonly 19149: ISheetData_Amulet_AmuletNode[];
	readonly 19150: ISheetData_Amulet_AmuletNode[];
	readonly 19151: ISheetData_Amulet_AmuletNode[];
	readonly 19152: ISheetData_Amulet_AmuletNode[];
	readonly 19153: ISheetData_Amulet_AmuletNode[];
	readonly 19154: ISheetData_Amulet_AmuletNode[];
	readonly 19155: ISheetData_Amulet_AmuletNode[];
	readonly 19156: ISheetData_Amulet_AmuletNode[];
	readonly 19157: ISheetData_Amulet_AmuletNode[];
	readonly 19158: ISheetData_Amulet_AmuletNode[];
	readonly 19159: ISheetData_Amulet_AmuletNode[];
	readonly 19160: ISheetData_Amulet_AmuletNode[];
	readonly 19161: ISheetData_Amulet_AmuletNode[];
	readonly 19162: ISheetData_Amulet_AmuletNode[];
	readonly 19163: ISheetData_Amulet_AmuletNode[];
	readonly 19164: ISheetData_Amulet_AmuletNode[];
	readonly 19165: ISheetData_Amulet_AmuletNode[];
	readonly 19166: ISheetData_Amulet_AmuletNode[];
	readonly 19167: ISheetData_Amulet_AmuletNode[];
	readonly 19168: ISheetData_Amulet_AmuletNode[];
	readonly 19169: ISheetData_Amulet_AmuletNode[];
	readonly 19170: ISheetData_Amulet_AmuletNode[];
	readonly 19171: ISheetData_Amulet_AmuletNode[];
	readonly 19172: ISheetData_Amulet_AmuletNode[];
	readonly 19173: ISheetData_Amulet_AmuletNode[];
	readonly 19174: ISheetData_Amulet_AmuletNode[];
	readonly 19175: ISheetData_Amulet_AmuletNode[];
	readonly 19176: ISheetData_Amulet_AmuletNode[];
	readonly 19177: ISheetData_Amulet_AmuletNode[];
	readonly 19178: ISheetData_Amulet_AmuletNode[];
	readonly 19179: ISheetData_Amulet_AmuletNode[];
	readonly 19180: ISheetData_Amulet_AmuletNode[];
	readonly 19181: ISheetData_Amulet_AmuletNode[];
	readonly 19182: ISheetData_Amulet_AmuletNode[];
	readonly 19183: ISheetData_Amulet_AmuletNode[];
	readonly 19184: ISheetData_Amulet_AmuletNode[];
	readonly 19185: ISheetData_Amulet_AmuletNode[];
	readonly 19186: ISheetData_Amulet_AmuletNode[];
	readonly 19187: ISheetData_Amulet_AmuletNode[];
	readonly 19188: ISheetData_Amulet_AmuletNode[];
	readonly 19189: ISheetData_Amulet_AmuletNode[];
	readonly 19190: ISheetData_Amulet_AmuletNode[];
	readonly 19191: ISheetData_Amulet_AmuletNode[];
	readonly 19192: ISheetData_Amulet_AmuletNode[];
	readonly 19193: ISheetData_Amulet_AmuletNode[];
	readonly 19194: ISheetData_Amulet_AmuletNode[];
	readonly 19195: ISheetData_Amulet_AmuletNode[];
	readonly 19196: ISheetData_Amulet_AmuletNode[];
	readonly 19197: ISheetData_Amulet_AmuletNode[];
	readonly 19198: ISheetData_Amulet_AmuletNode[];
	readonly 19199: ISheetData_Amulet_AmuletNode[];
	readonly 19200: ISheetData_Amulet_AmuletNode[];
	readonly 19201: ISheetData_Amulet_AmuletNode[];
	readonly 19202: ISheetData_Amulet_AmuletNode[];
	readonly 19203: ISheetData_Amulet_AmuletNode[];
	readonly 19204: ISheetData_Amulet_AmuletNode[];
	readonly 19205: ISheetData_Amulet_AmuletNode[];
	readonly 19206: ISheetData_Amulet_AmuletNode[];
	readonly 19207: ISheetData_Amulet_AmuletNode[];
	readonly 19208: ISheetData_Amulet_AmuletNode[];
	readonly 19209: ISheetData_Amulet_AmuletNode[];
	readonly 19210: ISheetData_Amulet_AmuletNode[];
	readonly 19211: ISheetData_Amulet_AmuletNode[];
	readonly 19212: ISheetData_Amulet_AmuletNode[];
	readonly 19213: ISheetData_Amulet_AmuletNode[];
	readonly 19214: ISheetData_Amulet_AmuletNode[];
	readonly 19215: ISheetData_Amulet_AmuletNode[];
	readonly 19216: ISheetData_Amulet_AmuletNode[];
	readonly 19217: ISheetData_Amulet_AmuletNode[];
	readonly 19218: ISheetData_Amulet_AmuletNode[];
	readonly 19219: ISheetData_Amulet_AmuletNode[];
	readonly 19220: ISheetData_Amulet_AmuletNode[];
	readonly 19221: ISheetData_Amulet_AmuletNode[];
	readonly 19222: ISheetData_Amulet_AmuletNode[];
	readonly 19223: ISheetData_Amulet_AmuletNode[];
	readonly 19224: ISheetData_Amulet_AmuletNode[];
	readonly 19225: ISheetData_Amulet_AmuletNode[];
	readonly 19226: ISheetData_Amulet_AmuletNode[];
	readonly 19227: ISheetData_Amulet_AmuletNode[];
	readonly 19228: ISheetData_Amulet_AmuletNode[];
	readonly 19229: ISheetData_Amulet_AmuletNode[];
	readonly 19230: ISheetData_Amulet_AmuletNode[];
	readonly 19231: ISheetData_Amulet_AmuletNode[];
	readonly 19232: ISheetData_Amulet_AmuletNode[];
	readonly 19233: ISheetData_Amulet_AmuletNode[];
	readonly 19234: ISheetData_Amulet_AmuletNode[];
	readonly 19235: ISheetData_Amulet_AmuletNode[];
	readonly 19236: ISheetData_Amulet_AmuletNode[];
	readonly 19237: ISheetData_Amulet_AmuletNode[];
	readonly 19238: ISheetData_Amulet_AmuletNode[];
	readonly 19239: ISheetData_Amulet_AmuletNode[];
	readonly 19240: ISheetData_Amulet_AmuletNode[];
	readonly 19241: ISheetData_Amulet_AmuletNode[];
	readonly 19242: ISheetData_Amulet_AmuletNode[];
	readonly 19243: ISheetData_Amulet_AmuletNode[];
	readonly 19244: ISheetData_Amulet_AmuletNode[];
	readonly 19245: ISheetData_Amulet_AmuletNode[];
	readonly 19246: ISheetData_Amulet_AmuletNode[];
	readonly 19247: ISheetData_Amulet_AmuletNode[];
	readonly 19248: ISheetData_Amulet_AmuletNode[];
	readonly 19249: ISheetData_Amulet_AmuletNode[];
	readonly 19250: ISheetData_Amulet_AmuletNode[];
	readonly 19251: ISheetData_Amulet_AmuletNode[];
	readonly 19252: ISheetData_Amulet_AmuletNode[];
	readonly 19253: ISheetData_Amulet_AmuletNode[];
	readonly 19254: ISheetData_Amulet_AmuletNode[];
	readonly 19255: ISheetData_Amulet_AmuletNode[];
	readonly 19256: ISheetData_Amulet_AmuletNode[];
	readonly 19257: ISheetData_Amulet_AmuletNode[];
	readonly 19258: ISheetData_Amulet_AmuletNode[];
	readonly 19259: ISheetData_Amulet_AmuletNode[];
	readonly 19260: ISheetData_Amulet_AmuletNode[];
	readonly 19261: ISheetData_Amulet_AmuletNode[];
	readonly 19262: ISheetData_Amulet_AmuletNode[];
	readonly 19263: ISheetData_Amulet_AmuletNode[];
	readonly 19264: ISheetData_Amulet_AmuletNode[];
	readonly 19265: ISheetData_Amulet_AmuletNode[];
	readonly 19266: ISheetData_Amulet_AmuletNode[];
	readonly 19267: ISheetData_Amulet_AmuletNode[];
	readonly 19268: ISheetData_Amulet_AmuletNode[];
	readonly 19269: ISheetData_Amulet_AmuletNode[];
	readonly 19270: ISheetData_Amulet_AmuletNode[];
	readonly 19271: ISheetData_Amulet_AmuletNode[];
	readonly 19272: ISheetData_Amulet_AmuletNode[];
	readonly 19273: ISheetData_Amulet_AmuletNode[];
	readonly 19274: ISheetData_Amulet_AmuletNode[];
	readonly 19275: ISheetData_Amulet_AmuletNode[];
	readonly 19276: ISheetData_Amulet_AmuletNode[];
	readonly 19277: ISheetData_Amulet_AmuletNode[];
	readonly 19278: ISheetData_Amulet_AmuletNode[];
	readonly 19279: ISheetData_Amulet_AmuletNode[];
	readonly 19280: ISheetData_Amulet_AmuletNode[];
	readonly 19281: ISheetData_Amulet_AmuletNode[];
	readonly 19282: ISheetData_Amulet_AmuletNode[];
	readonly 19283: ISheetData_Amulet_AmuletNode[];
	readonly 19284: ISheetData_Amulet_AmuletNode[];
	readonly 19285: ISheetData_Amulet_AmuletNode[];
	readonly 19286: ISheetData_Amulet_AmuletNode[];
	readonly 19287: ISheetData_Amulet_AmuletNode[];
	readonly 19288: ISheetData_Amulet_AmuletNode[];
	readonly 19289: ISheetData_Amulet_AmuletNode[];
	readonly 19290: ISheetData_Amulet_AmuletNode[];
	readonly 19291: ISheetData_Amulet_AmuletNode[];
	readonly 19292: ISheetData_Amulet_AmuletNode[];
	readonly 19293: ISheetData_Amulet_AmuletNode[];
	readonly 19294: ISheetData_Amulet_AmuletNode[];
	readonly 19295: ISheetData_Amulet_AmuletNode[];
	readonly 19296: ISheetData_Amulet_AmuletNode[];
	readonly 19297: ISheetData_Amulet_AmuletNode[];
	readonly 19298: ISheetData_Amulet_AmuletNode[];
	readonly 19299: ISheetData_Amulet_AmuletNode[];
}
declare interface ISheetData_Amulet_AmuletNode extends ISheetDataBase {
	readonly id: number;
	/** 节点id */
	readonly node: number;
	/** 地图节点类型 */
	readonly type: number;
	/** 节点名 */
	readonly node_name: string;
	/** 事件随机池 */
	readonly node_sub_id: number;
	/** 战斗生命倍率 */
	readonly hp_rate: string;
	/** 战斗攻击倍率 */
	readonly atk_rate: number;
	/** 过关奖励卡包 */
	readonly pack_reward: string;
	/** 过关星币数量 */
	readonly coin_reward: number;
	/** 游戏通关 */
	readonly clear_mark: number;
	/** 保底卡包,填amulet_goods.id */
	readonly guaranteed_goods: number;
	/** 关卡使用的护身符池 */
	readonly level_amulet_pool: number;
}
//#endregion

//#region amulet_level
declare interface ISheet_Amulet_AmuletLevel {
	readonly [key: string]: ISheetData_Amulet_AmuletLevel[];
	readonly 260511: ISheetData_Amulet_AmuletLevel[];
}
declare interface ISheetData_Amulet_AmuletLevel extends ISheetDataBase {
	readonly activity_id: number;
	/** 大关等级 */
	readonly level: number;
	/** 地图节点 */
	readonly node_id: number;
	/** 下一关level */
	readonly next_level: number;
}
//#endregion

//#region amulet_map_event
declare interface ISheet_Amulet_AmuletMapEvent {
	readonly [key: string]: ISheetData_Amulet_AmuletMapEvent[];
	readonly 110011: ISheetData_Amulet_AmuletMapEvent[];
	readonly 110012: ISheetData_Amulet_AmuletMapEvent[];
	readonly 110021: ISheetData_Amulet_AmuletMapEvent[];
	readonly 110031: ISheetData_Amulet_AmuletMapEvent[];
	readonly 110041: ISheetData_Amulet_AmuletMapEvent[];
	readonly 110051: ISheetData_Amulet_AmuletMapEvent[];
	readonly 120011: ISheetData_Amulet_AmuletMapEvent[];
}
declare interface ISheetData_Amulet_AmuletMapEvent extends ISheetDataBase {
	readonly id: number;
	/** 事件类型 */
	readonly event_type: number;
	/** str/event事件描述 */
	readonly event_desc: number;
}
//#endregion

//#region amulet_character
declare interface ISheet_Amulet_AmuletCharacter {
	readonly [key: string]: ISheetData_Amulet_AmuletCharacter[];
	readonly 260511: ISheetData_Amulet_AmuletCharacter[];
}
declare interface ISheetData_Amulet_AmuletCharacter extends ISheetDataBase {
	readonly activity_id: number;
	/** 角色编号 */
	readonly character_id: number;
	/** 生命值 */
	readonly hp: number;
	/** 牌库初始分数id */
	readonly tile_score_map_id: number;
	/** 重填牌数量 */
	readonly reload_count: number;
	/** 卡池影响权重 */
	readonly effect_weight_id: number;
	/** 解锁物品id(0为直接解锁) */
	readonly unlock_item_id: number;
	/** 初始待摸牌次数 */
	readonly init_desktop_count: number;
	/** 初始待摸牌中，公开的数量 */
	readonly init_open_desktop_count: number;
	/** 初始魂牌数量 */
	readonly init_tian_count: number;
	/** str/event角色名 */
	readonly character_name: number;
}
//#endregion

//#region amulet_tile_score_map
declare interface ISheet_Amulet_AmuletTileScoreMap {
	readonly [key: string]: ISheetData_Amulet_AmuletTileScoreMap[];
	readonly 20101: ISheetData_Amulet_AmuletTileScoreMap[];
	readonly 20201: ISheetData_Amulet_AmuletTileScoreMap[];
	readonly 20301: ISheetData_Amulet_AmuletTileScoreMap[];
	readonly 20401: ISheetData_Amulet_AmuletTileScoreMap[];
}
declare interface ISheetData_Amulet_AmuletTileScoreMap extends ISheetDataBase {
	readonly id: number;
	/** 牌类型 */
	readonly tile: string;
	/** 初始分数 */
	readonly score: number;
}
//#endregion

//#region amulet_effect_weight
declare interface ISheet_Amulet_AmuletEffectWeight {
	readonly [key: string]: ISheetData_Amulet_AmuletEffectWeight[];
	readonly 20121: ISheetData_Amulet_AmuletEffectWeight[];
	readonly 20131: ISheetData_Amulet_AmuletEffectWeight[];
	readonly 20141: ISheetData_Amulet_AmuletEffectWeight[];
}
declare interface ISheetData_Amulet_AmuletEffectWeight extends ISheetDataBase {
	readonly id: number;
	/** 护身符id */
	readonly effect_id: number;
}
//#endregion

//#region amulet_enemy
declare interface ISheet_Amulet_AmuletEnemy {
	readonly [key: string]: ISheetData_Amulet_AmuletEnemy;
	readonly 3001: ISheetData_Amulet_AmuletEnemy;
	readonly 3002: ISheetData_Amulet_AmuletEnemy;
	readonly 3003: ISheetData_Amulet_AmuletEnemy;
	readonly 3004: ISheetData_Amulet_AmuletEnemy;
	readonly 3005: ISheetData_Amulet_AmuletEnemy;
	readonly 3011: ISheetData_Amulet_AmuletEnemy;
	readonly 3012: ISheetData_Amulet_AmuletEnemy;
	readonly 3013: ISheetData_Amulet_AmuletEnemy;
	readonly 3014: ISheetData_Amulet_AmuletEnemy;
	readonly 3015: ISheetData_Amulet_AmuletEnemy;
	readonly 3016: ISheetData_Amulet_AmuletEnemy;
	readonly 3017: ISheetData_Amulet_AmuletEnemy;
	readonly 3018: ISheetData_Amulet_AmuletEnemy;
	readonly 3019: ISheetData_Amulet_AmuletEnemy;
	readonly 3020: ISheetData_Amulet_AmuletEnemy;
	readonly 3021: ISheetData_Amulet_AmuletEnemy;
	readonly 3022: ISheetData_Amulet_AmuletEnemy;
	readonly 3023: ISheetData_Amulet_AmuletEnemy;
	readonly 3024: ISheetData_Amulet_AmuletEnemy;
	readonly 3025: ISheetData_Amulet_AmuletEnemy;
}
declare interface ISheetData_Amulet_AmuletEnemy extends ISheetDataBase {
	/** 敌人编号 */
	readonly id: number;
	/** 敌人类别id */
	readonly boss_id: number;
	/** 生命值 */
	readonly hp: string;
	/** 狂暴牌数量 */
	readonly damage_tile_count: number;
	/** 攻击力 */
	readonly atk: number;
	/** 技能池 */
	readonly skill_pool: number;
	/** boss标记(1为boss，0不是) */
	readonly type: number;
	/** 分组，用于关卡内随机 */
	readonly group: number;
	/** str/event敌人名 */
	readonly enemy_name: number;
}
//#endregion

//#region amulet_enemy_skill
declare interface ISheet_Amulet_AmuletEnemySkill {
	readonly [key: string]: ISheetData_Amulet_AmuletEnemySkill[];
	readonly 30111: ISheetData_Amulet_AmuletEnemySkill[];
	readonly 30121: ISheetData_Amulet_AmuletEnemySkill[];
	readonly 30131: ISheetData_Amulet_AmuletEnemySkill[];
	readonly 30141: ISheetData_Amulet_AmuletEnemySkill[];
	readonly 30151: ISheetData_Amulet_AmuletEnemySkill[];
	readonly 30161: ISheetData_Amulet_AmuletEnemySkill[];
	readonly 30171: ISheetData_Amulet_AmuletEnemySkill[];
	readonly 30181: ISheetData_Amulet_AmuletEnemySkill[];
}
declare interface ISheetData_Amulet_AmuletEnemySkill extends ISheetDataBase {
	readonly group_id: number;
	/** 敌人buffid */
	readonly buff_id: number;
}
//#endregion

//#region amulet_effect
declare interface ISheet_Amulet_AmuletEffect {
	readonly [key: string]: ISheetData_Amulet_AmuletEffect;
	readonly 10: ISheetData_Amulet_AmuletEffect;
	readonly 11: ISheetData_Amulet_AmuletEffect;
	readonly 20: ISheetData_Amulet_AmuletEffect;
	readonly 21: ISheetData_Amulet_AmuletEffect;
	readonly 30: ISheetData_Amulet_AmuletEffect;
	readonly 31: ISheetData_Amulet_AmuletEffect;
	readonly 40: ISheetData_Amulet_AmuletEffect;
	readonly 41: ISheetData_Amulet_AmuletEffect;
	readonly 50: ISheetData_Amulet_AmuletEffect;
	readonly 51: ISheetData_Amulet_AmuletEffect;
	readonly 60: ISheetData_Amulet_AmuletEffect;
	readonly 61: ISheetData_Amulet_AmuletEffect;
	readonly 70: ISheetData_Amulet_AmuletEffect;
	readonly 71: ISheetData_Amulet_AmuletEffect;
	readonly 80: ISheetData_Amulet_AmuletEffect;
	readonly 81: ISheetData_Amulet_AmuletEffect;
	readonly 90: ISheetData_Amulet_AmuletEffect;
	readonly 91: ISheetData_Amulet_AmuletEffect;
	readonly 100: ISheetData_Amulet_AmuletEffect;
	readonly 101: ISheetData_Amulet_AmuletEffect;
	readonly 110: ISheetData_Amulet_AmuletEffect;
	readonly 111: ISheetData_Amulet_AmuletEffect;
	readonly 120: ISheetData_Amulet_AmuletEffect;
	readonly 121: ISheetData_Amulet_AmuletEffect;
	readonly 130: ISheetData_Amulet_AmuletEffect;
	readonly 131: ISheetData_Amulet_AmuletEffect;
	readonly 140: ISheetData_Amulet_AmuletEffect;
	readonly 141: ISheetData_Amulet_AmuletEffect;
	readonly 150: ISheetData_Amulet_AmuletEffect;
	readonly 151: ISheetData_Amulet_AmuletEffect;
	readonly 160: ISheetData_Amulet_AmuletEffect;
	readonly 161: ISheetData_Amulet_AmuletEffect;
	readonly 170: ISheetData_Amulet_AmuletEffect;
	readonly 171: ISheetData_Amulet_AmuletEffect;
	readonly 180: ISheetData_Amulet_AmuletEffect;
	readonly 181: ISheetData_Amulet_AmuletEffect;
	readonly 190: ISheetData_Amulet_AmuletEffect;
	readonly 191: ISheetData_Amulet_AmuletEffect;
	readonly 200: ISheetData_Amulet_AmuletEffect;
	readonly 201: ISheetData_Amulet_AmuletEffect;
	readonly 210: ISheetData_Amulet_AmuletEffect;
	readonly 211: ISheetData_Amulet_AmuletEffect;
	readonly 220: ISheetData_Amulet_AmuletEffect;
	readonly 221: ISheetData_Amulet_AmuletEffect;
	readonly 230: ISheetData_Amulet_AmuletEffect;
	readonly 231: ISheetData_Amulet_AmuletEffect;
	readonly 240: ISheetData_Amulet_AmuletEffect;
	readonly 241: ISheetData_Amulet_AmuletEffect;
	readonly 250: ISheetData_Amulet_AmuletEffect;
	readonly 251: ISheetData_Amulet_AmuletEffect;
	readonly 260: ISheetData_Amulet_AmuletEffect;
	readonly 261: ISheetData_Amulet_AmuletEffect;
	readonly 270: ISheetData_Amulet_AmuletEffect;
	readonly 271: ISheetData_Amulet_AmuletEffect;
	readonly 280: ISheetData_Amulet_AmuletEffect;
	readonly 281: ISheetData_Amulet_AmuletEffect;
	readonly 290: ISheetData_Amulet_AmuletEffect;
	readonly 291: ISheetData_Amulet_AmuletEffect;
	readonly 300: ISheetData_Amulet_AmuletEffect;
	readonly 301: ISheetData_Amulet_AmuletEffect;
	readonly 310: ISheetData_Amulet_AmuletEffect;
	readonly 311: ISheetData_Amulet_AmuletEffect;
	readonly 320: ISheetData_Amulet_AmuletEffect;
	readonly 321: ISheetData_Amulet_AmuletEffect;
	readonly 330: ISheetData_Amulet_AmuletEffect;
	readonly 331: ISheetData_Amulet_AmuletEffect;
	readonly 340: ISheetData_Amulet_AmuletEffect;
	readonly 341: ISheetData_Amulet_AmuletEffect;
	readonly 350: ISheetData_Amulet_AmuletEffect;
	readonly 351: ISheetData_Amulet_AmuletEffect;
	readonly 360: ISheetData_Amulet_AmuletEffect;
	readonly 361: ISheetData_Amulet_AmuletEffect;
	readonly 370: ISheetData_Amulet_AmuletEffect;
	readonly 371: ISheetData_Amulet_AmuletEffect;
	readonly 380: ISheetData_Amulet_AmuletEffect;
	readonly 381: ISheetData_Amulet_AmuletEffect;
	readonly 390: ISheetData_Amulet_AmuletEffect;
	readonly 391: ISheetData_Amulet_AmuletEffect;
	readonly 400: ISheetData_Amulet_AmuletEffect;
	readonly 401: ISheetData_Amulet_AmuletEffect;
	readonly 410: ISheetData_Amulet_AmuletEffect;
	readonly 411: ISheetData_Amulet_AmuletEffect;
	readonly 420: ISheetData_Amulet_AmuletEffect;
	readonly 421: ISheetData_Amulet_AmuletEffect;
	readonly 430: ISheetData_Amulet_AmuletEffect;
	readonly 431: ISheetData_Amulet_AmuletEffect;
	readonly 440: ISheetData_Amulet_AmuletEffect;
	readonly 441: ISheetData_Amulet_AmuletEffect;
	readonly 450: ISheetData_Amulet_AmuletEffect;
	readonly 451: ISheetData_Amulet_AmuletEffect;
	readonly 460: ISheetData_Amulet_AmuletEffect;
	readonly 461: ISheetData_Amulet_AmuletEffect;
	readonly 470: ISheetData_Amulet_AmuletEffect;
	readonly 471: ISheetData_Amulet_AmuletEffect;
	readonly 480: ISheetData_Amulet_AmuletEffect;
	readonly 481: ISheetData_Amulet_AmuletEffect;
	readonly 490: ISheetData_Amulet_AmuletEffect;
	readonly 491: ISheetData_Amulet_AmuletEffect;
	readonly 500: ISheetData_Amulet_AmuletEffect;
	readonly 501: ISheetData_Amulet_AmuletEffect;
	readonly 510: ISheetData_Amulet_AmuletEffect;
	readonly 511: ISheetData_Amulet_AmuletEffect;
	readonly 520: ISheetData_Amulet_AmuletEffect;
	readonly 521: ISheetData_Amulet_AmuletEffect;
	readonly 530: ISheetData_Amulet_AmuletEffect;
	readonly 531: ISheetData_Amulet_AmuletEffect;
	readonly 550: ISheetData_Amulet_AmuletEffect;
	readonly 551: ISheetData_Amulet_AmuletEffect;
	readonly 560: ISheetData_Amulet_AmuletEffect;
	readonly 561: ISheetData_Amulet_AmuletEffect;
	readonly 570: ISheetData_Amulet_AmuletEffect;
	readonly 571: ISheetData_Amulet_AmuletEffect;
	readonly 580: ISheetData_Amulet_AmuletEffect;
	readonly 581: ISheetData_Amulet_AmuletEffect;
	readonly 590: ISheetData_Amulet_AmuletEffect;
	readonly 591: ISheetData_Amulet_AmuletEffect;
	readonly 600: ISheetData_Amulet_AmuletEffect;
	readonly 601: ISheetData_Amulet_AmuletEffect;
	readonly 610: ISheetData_Amulet_AmuletEffect;
	readonly 611: ISheetData_Amulet_AmuletEffect;
	readonly 620: ISheetData_Amulet_AmuletEffect;
	readonly 621: ISheetData_Amulet_AmuletEffect;
	readonly 630: ISheetData_Amulet_AmuletEffect;
	readonly 631: ISheetData_Amulet_AmuletEffect;
	readonly 640: ISheetData_Amulet_AmuletEffect;
	readonly 641: ISheetData_Amulet_AmuletEffect;
	readonly 650: ISheetData_Amulet_AmuletEffect;
	readonly 651: ISheetData_Amulet_AmuletEffect;
	readonly 660: ISheetData_Amulet_AmuletEffect;
	readonly 661: ISheetData_Amulet_AmuletEffect;
	readonly 670: ISheetData_Amulet_AmuletEffect;
	readonly 671: ISheetData_Amulet_AmuletEffect;
	readonly 680: ISheetData_Amulet_AmuletEffect;
	readonly 681: ISheetData_Amulet_AmuletEffect;
	readonly 690: ISheetData_Amulet_AmuletEffect;
	readonly 691: ISheetData_Amulet_AmuletEffect;
	readonly 700: ISheetData_Amulet_AmuletEffect;
	readonly 701: ISheetData_Amulet_AmuletEffect;
	readonly 710: ISheetData_Amulet_AmuletEffect;
	readonly 711: ISheetData_Amulet_AmuletEffect;
	readonly 720: ISheetData_Amulet_AmuletEffect;
	readonly 721: ISheetData_Amulet_AmuletEffect;
	readonly 730: ISheetData_Amulet_AmuletEffect;
	readonly 731: ISheetData_Amulet_AmuletEffect;
	readonly 740: ISheetData_Amulet_AmuletEffect;
	readonly 741: ISheetData_Amulet_AmuletEffect;
	readonly 750: ISheetData_Amulet_AmuletEffect;
	readonly 751: ISheetData_Amulet_AmuletEffect;
	readonly 1010: ISheetData_Amulet_AmuletEffect;
	readonly 1011: ISheetData_Amulet_AmuletEffect;
	readonly 1020: ISheetData_Amulet_AmuletEffect;
	readonly 1021: ISheetData_Amulet_AmuletEffect;
	readonly 1030: ISheetData_Amulet_AmuletEffect;
	readonly 1031: ISheetData_Amulet_AmuletEffect;
	readonly 1040: ISheetData_Amulet_AmuletEffect;
	readonly 1041: ISheetData_Amulet_AmuletEffect;
	readonly 1050: ISheetData_Amulet_AmuletEffect;
	readonly 1051: ISheetData_Amulet_AmuletEffect;
	readonly 1060: ISheetData_Amulet_AmuletEffect;
	readonly 1061: ISheetData_Amulet_AmuletEffect;
	readonly 1070: ISheetData_Amulet_AmuletEffect;
	readonly 1071: ISheetData_Amulet_AmuletEffect;
	readonly 1080: ISheetData_Amulet_AmuletEffect;
	readonly 1081: ISheetData_Amulet_AmuletEffect;
	readonly 1090: ISheetData_Amulet_AmuletEffect;
	readonly 1091: ISheetData_Amulet_AmuletEffect;
	readonly 1100: ISheetData_Amulet_AmuletEffect;
	readonly 1101: ISheetData_Amulet_AmuletEffect;
	readonly 1110: ISheetData_Amulet_AmuletEffect;
	readonly 1111: ISheetData_Amulet_AmuletEffect;
	readonly 1120: ISheetData_Amulet_AmuletEffect;
	readonly 1121: ISheetData_Amulet_AmuletEffect;
	readonly 1130: ISheetData_Amulet_AmuletEffect;
	readonly 1131: ISheetData_Amulet_AmuletEffect;
	readonly 1140: ISheetData_Amulet_AmuletEffect;
	readonly 1141: ISheetData_Amulet_AmuletEffect;
	readonly 1150: ISheetData_Amulet_AmuletEffect;
	readonly 1151: ISheetData_Amulet_AmuletEffect;
	readonly 1160: ISheetData_Amulet_AmuletEffect;
	readonly 1161: ISheetData_Amulet_AmuletEffect;
	readonly 1170: ISheetData_Amulet_AmuletEffect;
	readonly 1171: ISheetData_Amulet_AmuletEffect;
	readonly 1180: ISheetData_Amulet_AmuletEffect;
	readonly 1181: ISheetData_Amulet_AmuletEffect;
	readonly 1190: ISheetData_Amulet_AmuletEffect;
	readonly 1191: ISheetData_Amulet_AmuletEffect;
	readonly 1200: ISheetData_Amulet_AmuletEffect;
	readonly 1201: ISheetData_Amulet_AmuletEffect;
	readonly 1210: ISheetData_Amulet_AmuletEffect;
	readonly 1211: ISheetData_Amulet_AmuletEffect;
	readonly 1220: ISheetData_Amulet_AmuletEffect;
	readonly 1221: ISheetData_Amulet_AmuletEffect;
	readonly 1230: ISheetData_Amulet_AmuletEffect;
	readonly 1231: ISheetData_Amulet_AmuletEffect;
	readonly 1240: ISheetData_Amulet_AmuletEffect;
	readonly 1241: ISheetData_Amulet_AmuletEffect;
	readonly 1250: ISheetData_Amulet_AmuletEffect;
	readonly 1251: ISheetData_Amulet_AmuletEffect;
	readonly 1260: ISheetData_Amulet_AmuletEffect;
	readonly 1261: ISheetData_Amulet_AmuletEffect;
	readonly 1270: ISheetData_Amulet_AmuletEffect;
	readonly 1271: ISheetData_Amulet_AmuletEffect;
	readonly 1280: ISheetData_Amulet_AmuletEffect;
	readonly 1281: ISheetData_Amulet_AmuletEffect;
	readonly 1290: ISheetData_Amulet_AmuletEffect;
	readonly 1291: ISheetData_Amulet_AmuletEffect;
	readonly 1300: ISheetData_Amulet_AmuletEffect;
	readonly 1301: ISheetData_Amulet_AmuletEffect;
	readonly 1310: ISheetData_Amulet_AmuletEffect;
	readonly 1311: ISheetData_Amulet_AmuletEffect;
	readonly 1320: ISheetData_Amulet_AmuletEffect;
	readonly 1321: ISheetData_Amulet_AmuletEffect;
	readonly 1330: ISheetData_Amulet_AmuletEffect;
	readonly 1331: ISheetData_Amulet_AmuletEffect;
	readonly 1340: ISheetData_Amulet_AmuletEffect;
	readonly 1341: ISheetData_Amulet_AmuletEffect;
	readonly 1350: ISheetData_Amulet_AmuletEffect;
	readonly 1351: ISheetData_Amulet_AmuletEffect;
	readonly 1360: ISheetData_Amulet_AmuletEffect;
	readonly 1361: ISheetData_Amulet_AmuletEffect;
	readonly 1370: ISheetData_Amulet_AmuletEffect;
	readonly 1371: ISheetData_Amulet_AmuletEffect;
	readonly 1380: ISheetData_Amulet_AmuletEffect;
	readonly 1381: ISheetData_Amulet_AmuletEffect;
	readonly 1390: ISheetData_Amulet_AmuletEffect;
	readonly 1391: ISheetData_Amulet_AmuletEffect;
	readonly 1400: ISheetData_Amulet_AmuletEffect;
	readonly 1401: ISheetData_Amulet_AmuletEffect;
	readonly 1410: ISheetData_Amulet_AmuletEffect;
	readonly 1411: ISheetData_Amulet_AmuletEffect;
	readonly 1420: ISheetData_Amulet_AmuletEffect;
	readonly 1421: ISheetData_Amulet_AmuletEffect;
	readonly 1430: ISheetData_Amulet_AmuletEffect;
	readonly 1431: ISheetData_Amulet_AmuletEffect;
	readonly 1440: ISheetData_Amulet_AmuletEffect;
	readonly 1441: ISheetData_Amulet_AmuletEffect;
	readonly 1450: ISheetData_Amulet_AmuletEffect;
	readonly 1451: ISheetData_Amulet_AmuletEffect;
	readonly 1460: ISheetData_Amulet_AmuletEffect;
	readonly 1461: ISheetData_Amulet_AmuletEffect;
	readonly 1470: ISheetData_Amulet_AmuletEffect;
	readonly 1471: ISheetData_Amulet_AmuletEffect;
	readonly 1480: ISheetData_Amulet_AmuletEffect;
	readonly 1481: ISheetData_Amulet_AmuletEffect;
	readonly 1490: ISheetData_Amulet_AmuletEffect;
	readonly 1491: ISheetData_Amulet_AmuletEffect;
	readonly 1500: ISheetData_Amulet_AmuletEffect;
	readonly 1501: ISheetData_Amulet_AmuletEffect;
	readonly 1510: ISheetData_Amulet_AmuletEffect;
	readonly 1511: ISheetData_Amulet_AmuletEffect;
	readonly 1520: ISheetData_Amulet_AmuletEffect;
	readonly 1521: ISheetData_Amulet_AmuletEffect;
	readonly 1530: ISheetData_Amulet_AmuletEffect;
	readonly 1531: ISheetData_Amulet_AmuletEffect;
	readonly 1540: ISheetData_Amulet_AmuletEffect;
	readonly 1541: ISheetData_Amulet_AmuletEffect;
	readonly 1550: ISheetData_Amulet_AmuletEffect;
	readonly 1551: ISheetData_Amulet_AmuletEffect;
	readonly 1560: ISheetData_Amulet_AmuletEffect;
	readonly 1561: ISheetData_Amulet_AmuletEffect;
	readonly 1570: ISheetData_Amulet_AmuletEffect;
	readonly 1571: ISheetData_Amulet_AmuletEffect;
	readonly 1580: ISheetData_Amulet_AmuletEffect;
	readonly 1581: ISheetData_Amulet_AmuletEffect;
	readonly 1590: ISheetData_Amulet_AmuletEffect;
	readonly 1591: ISheetData_Amulet_AmuletEffect;
	readonly 1600: ISheetData_Amulet_AmuletEffect;
	readonly 1601: ISheetData_Amulet_AmuletEffect;
	readonly 1610: ISheetData_Amulet_AmuletEffect;
	readonly 1611: ISheetData_Amulet_AmuletEffect;
	readonly 1620: ISheetData_Amulet_AmuletEffect;
	readonly 1621: ISheetData_Amulet_AmuletEffect;
	readonly 1630: ISheetData_Amulet_AmuletEffect;
	readonly 1631: ISheetData_Amulet_AmuletEffect;
	readonly 1640: ISheetData_Amulet_AmuletEffect;
	readonly 1641: ISheetData_Amulet_AmuletEffect;
	readonly 1650: ISheetData_Amulet_AmuletEffect;
	readonly 1651: ISheetData_Amulet_AmuletEffect;
	readonly 1660: ISheetData_Amulet_AmuletEffect;
	readonly 1661: ISheetData_Amulet_AmuletEffect;
	readonly 1670: ISheetData_Amulet_AmuletEffect;
	readonly 1671: ISheetData_Amulet_AmuletEffect;
	readonly 1680: ISheetData_Amulet_AmuletEffect;
	readonly 1681: ISheetData_Amulet_AmuletEffect;
	readonly 1690: ISheetData_Amulet_AmuletEffect;
	readonly 1691: ISheetData_Amulet_AmuletEffect;
	readonly 1700: ISheetData_Amulet_AmuletEffect;
	readonly 1701: ISheetData_Amulet_AmuletEffect;
	readonly 1710: ISheetData_Amulet_AmuletEffect;
	readonly 1711: ISheetData_Amulet_AmuletEffect;
	readonly 1720: ISheetData_Amulet_AmuletEffect;
	readonly 1721: ISheetData_Amulet_AmuletEffect;
	readonly 1730: ISheetData_Amulet_AmuletEffect;
	readonly 1731: ISheetData_Amulet_AmuletEffect;
	readonly 1740: ISheetData_Amulet_AmuletEffect;
	readonly 1741: ISheetData_Amulet_AmuletEffect;
	readonly 2010: ISheetData_Amulet_AmuletEffect;
	readonly 2011: ISheetData_Amulet_AmuletEffect;
	readonly 2020: ISheetData_Amulet_AmuletEffect;
	readonly 2021: ISheetData_Amulet_AmuletEffect;
	readonly 2030: ISheetData_Amulet_AmuletEffect;
	readonly 2031: ISheetData_Amulet_AmuletEffect;
	readonly 2040: ISheetData_Amulet_AmuletEffect;
	readonly 2041: ISheetData_Amulet_AmuletEffect;
	readonly 2050: ISheetData_Amulet_AmuletEffect;
	readonly 2051: ISheetData_Amulet_AmuletEffect;
	readonly 2060: ISheetData_Amulet_AmuletEffect;
	readonly 2061: ISheetData_Amulet_AmuletEffect;
	readonly 2070: ISheetData_Amulet_AmuletEffect;
	readonly 2071: ISheetData_Amulet_AmuletEffect;
	readonly 2080: ISheetData_Amulet_AmuletEffect;
	readonly 2081: ISheetData_Amulet_AmuletEffect;
	readonly 2090: ISheetData_Amulet_AmuletEffect;
	readonly 2091: ISheetData_Amulet_AmuletEffect;
	readonly 2100: ISheetData_Amulet_AmuletEffect;
	readonly 2101: ISheetData_Amulet_AmuletEffect;
	readonly 2110: ISheetData_Amulet_AmuletEffect;
	readonly 2111: ISheetData_Amulet_AmuletEffect;
	readonly 2120: ISheetData_Amulet_AmuletEffect;
	readonly 2121: ISheetData_Amulet_AmuletEffect;
	readonly 2130: ISheetData_Amulet_AmuletEffect;
	readonly 2131: ISheetData_Amulet_AmuletEffect;
	readonly 2140: ISheetData_Amulet_AmuletEffect;
	readonly 2141: ISheetData_Amulet_AmuletEffect;
	readonly 2150: ISheetData_Amulet_AmuletEffect;
	readonly 2151: ISheetData_Amulet_AmuletEffect;
	readonly 2160: ISheetData_Amulet_AmuletEffect;
	readonly 2161: ISheetData_Amulet_AmuletEffect;
	readonly 2170: ISheetData_Amulet_AmuletEffect;
	readonly 2171: ISheetData_Amulet_AmuletEffect;
	readonly 2180: ISheetData_Amulet_AmuletEffect;
	readonly 2181: ISheetData_Amulet_AmuletEffect;
	readonly 2190: ISheetData_Amulet_AmuletEffect;
	readonly 2191: ISheetData_Amulet_AmuletEffect;
	readonly 2200: ISheetData_Amulet_AmuletEffect;
	readonly 2201: ISheetData_Amulet_AmuletEffect;
	readonly 2210: ISheetData_Amulet_AmuletEffect;
	readonly 2211: ISheetData_Amulet_AmuletEffect;
	readonly 2220: ISheetData_Amulet_AmuletEffect;
	readonly 2221: ISheetData_Amulet_AmuletEffect;
	readonly 2230: ISheetData_Amulet_AmuletEffect;
	readonly 2231: ISheetData_Amulet_AmuletEffect;
	readonly 2240: ISheetData_Amulet_AmuletEffect;
	readonly 2241: ISheetData_Amulet_AmuletEffect;
	readonly 2250: ISheetData_Amulet_AmuletEffect;
	readonly 2251: ISheetData_Amulet_AmuletEffect;
	readonly 2260: ISheetData_Amulet_AmuletEffect;
	readonly 2261: ISheetData_Amulet_AmuletEffect;
	readonly 2270: ISheetData_Amulet_AmuletEffect;
	readonly 2271: ISheetData_Amulet_AmuletEffect;
	readonly 2280: ISheetData_Amulet_AmuletEffect;
	readonly 2281: ISheetData_Amulet_AmuletEffect;
	readonly 2290: ISheetData_Amulet_AmuletEffect;
	readonly 2291: ISheetData_Amulet_AmuletEffect;
	readonly 2300: ISheetData_Amulet_AmuletEffect;
	readonly 2301: ISheetData_Amulet_AmuletEffect;
	readonly 2310: ISheetData_Amulet_AmuletEffect;
	readonly 2311: ISheetData_Amulet_AmuletEffect;
	readonly 2320: ISheetData_Amulet_AmuletEffect;
	readonly 2321: ISheetData_Amulet_AmuletEffect;
	readonly 2330: ISheetData_Amulet_AmuletEffect;
	readonly 2331: ISheetData_Amulet_AmuletEffect;
	readonly 3010: ISheetData_Amulet_AmuletEffect;
	readonly 3011: ISheetData_Amulet_AmuletEffect;
	readonly 3020: ISheetData_Amulet_AmuletEffect;
	readonly 3021: ISheetData_Amulet_AmuletEffect;
	readonly 3030: ISheetData_Amulet_AmuletEffect;
	readonly 3031: ISheetData_Amulet_AmuletEffect;
	readonly 3040: ISheetData_Amulet_AmuletEffect;
	readonly 3041: ISheetData_Amulet_AmuletEffect;
	readonly 3050: ISheetData_Amulet_AmuletEffect;
	readonly 3051: ISheetData_Amulet_AmuletEffect;
	readonly 3060: ISheetData_Amulet_AmuletEffect;
	readonly 3061: ISheetData_Amulet_AmuletEffect;
	readonly 3070: ISheetData_Amulet_AmuletEffect;
	readonly 3071: ISheetData_Amulet_AmuletEffect;
	readonly 3080: ISheetData_Amulet_AmuletEffect;
	readonly 3081: ISheetData_Amulet_AmuletEffect;
	readonly 3090: ISheetData_Amulet_AmuletEffect;
	readonly 3091: ISheetData_Amulet_AmuletEffect;
	readonly 3100: ISheetData_Amulet_AmuletEffect;
	readonly 3101: ISheetData_Amulet_AmuletEffect;
	readonly 3110: ISheetData_Amulet_AmuletEffect;
	readonly 3111: ISheetData_Amulet_AmuletEffect;
	readonly 3120: ISheetData_Amulet_AmuletEffect;
	readonly 3121: ISheetData_Amulet_AmuletEffect;
	readonly 3130: ISheetData_Amulet_AmuletEffect;
	readonly 3131: ISheetData_Amulet_AmuletEffect;
	readonly 3140: ISheetData_Amulet_AmuletEffect;
	readonly 3141: ISheetData_Amulet_AmuletEffect;
	readonly 3150: ISheetData_Amulet_AmuletEffect;
	readonly 3151: ISheetData_Amulet_AmuletEffect;
	readonly 3160: ISheetData_Amulet_AmuletEffect;
	readonly 3161: ISheetData_Amulet_AmuletEffect;
	readonly 3170: ISheetData_Amulet_AmuletEffect;
	readonly 3171: ISheetData_Amulet_AmuletEffect;
	readonly 3180: ISheetData_Amulet_AmuletEffect;
	readonly 3181: ISheetData_Amulet_AmuletEffect;
	readonly 3190: ISheetData_Amulet_AmuletEffect;
	readonly 3191: ISheetData_Amulet_AmuletEffect;
	readonly 3200: ISheetData_Amulet_AmuletEffect;
	readonly 3201: ISheetData_Amulet_AmuletEffect;
	readonly 3210: ISheetData_Amulet_AmuletEffect;
	readonly 3211: ISheetData_Amulet_AmuletEffect;
	readonly 3220: ISheetData_Amulet_AmuletEffect;
	readonly 3221: ISheetData_Amulet_AmuletEffect;
	readonly 3230: ISheetData_Amulet_AmuletEffect;
	readonly 3231: ISheetData_Amulet_AmuletEffect;
	readonly 3240: ISheetData_Amulet_AmuletEffect;
	readonly 3241: ISheetData_Amulet_AmuletEffect;
	readonly 3250: ISheetData_Amulet_AmuletEffect;
	readonly 3251: ISheetData_Amulet_AmuletEffect;
	readonly 3260: ISheetData_Amulet_AmuletEffect;
	readonly 3261: ISheetData_Amulet_AmuletEffect;
	readonly 3270: ISheetData_Amulet_AmuletEffect;
	readonly 3271: ISheetData_Amulet_AmuletEffect;
	readonly 3280: ISheetData_Amulet_AmuletEffect;
	readonly 3281: ISheetData_Amulet_AmuletEffect;
	readonly 3290: ISheetData_Amulet_AmuletEffect;
	readonly 3291: ISheetData_Amulet_AmuletEffect;
	readonly 3300: ISheetData_Amulet_AmuletEffect;
	readonly 3301: ISheetData_Amulet_AmuletEffect;
	readonly 3310: ISheetData_Amulet_AmuletEffect;
	readonly 3311: ISheetData_Amulet_AmuletEffect;
	readonly 3320: ISheetData_Amulet_AmuletEffect;
	readonly 3321: ISheetData_Amulet_AmuletEffect;
	readonly 3330: ISheetData_Amulet_AmuletEffect;
	readonly 3331: ISheetData_Amulet_AmuletEffect;
	readonly 3340: ISheetData_Amulet_AmuletEffect;
	readonly 3341: ISheetData_Amulet_AmuletEffect;
	readonly 3350: ISheetData_Amulet_AmuletEffect;
	readonly 3351: ISheetData_Amulet_AmuletEffect;
	readonly 3360: ISheetData_Amulet_AmuletEffect;
	readonly 3361: ISheetData_Amulet_AmuletEffect;
	readonly 3370: ISheetData_Amulet_AmuletEffect;
	readonly 3371: ISheetData_Amulet_AmuletEffect;
	readonly 3380: ISheetData_Amulet_AmuletEffect;
	readonly 3381: ISheetData_Amulet_AmuletEffect;
	readonly 3390: ISheetData_Amulet_AmuletEffect;
	readonly 3391: ISheetData_Amulet_AmuletEffect;
	readonly 3400: ISheetData_Amulet_AmuletEffect;
	readonly 3401: ISheetData_Amulet_AmuletEffect;
	readonly 3410: ISheetData_Amulet_AmuletEffect;
	readonly 3411: ISheetData_Amulet_AmuletEffect;
	readonly 3420: ISheetData_Amulet_AmuletEffect;
	readonly 3421: ISheetData_Amulet_AmuletEffect;
	readonly 3430: ISheetData_Amulet_AmuletEffect;
	readonly 3431: ISheetData_Amulet_AmuletEffect;
	readonly 3440: ISheetData_Amulet_AmuletEffect;
	readonly 3441: ISheetData_Amulet_AmuletEffect;
	readonly 3450: ISheetData_Amulet_AmuletEffect;
	readonly 3451: ISheetData_Amulet_AmuletEffect;
	readonly 3460: ISheetData_Amulet_AmuletEffect;
	readonly 3461: ISheetData_Amulet_AmuletEffect;
	readonly 3470: ISheetData_Amulet_AmuletEffect;
	readonly 3471: ISheetData_Amulet_AmuletEffect;
	readonly 3480: ISheetData_Amulet_AmuletEffect;
	readonly 3481: ISheetData_Amulet_AmuletEffect;
	readonly 3490: ISheetData_Amulet_AmuletEffect;
	readonly 3491: ISheetData_Amulet_AmuletEffect;
	readonly 3500: ISheetData_Amulet_AmuletEffect;
	readonly 3501: ISheetData_Amulet_AmuletEffect;
	readonly 3510: ISheetData_Amulet_AmuletEffect;
	readonly 3511: ISheetData_Amulet_AmuletEffect;
	readonly 3520: ISheetData_Amulet_AmuletEffect;
	readonly 3521: ISheetData_Amulet_AmuletEffect;
	readonly 3530: ISheetData_Amulet_AmuletEffect;
	readonly 3531: ISheetData_Amulet_AmuletEffect;
	readonly 3540: ISheetData_Amulet_AmuletEffect;
	readonly 3541: ISheetData_Amulet_AmuletEffect;
	readonly 3550: ISheetData_Amulet_AmuletEffect;
	readonly 3551: ISheetData_Amulet_AmuletEffect;
	readonly 3560: ISheetData_Amulet_AmuletEffect;
	readonly 3561: ISheetData_Amulet_AmuletEffect;
	readonly 3570: ISheetData_Amulet_AmuletEffect;
	readonly 3571: ISheetData_Amulet_AmuletEffect;
	readonly 3580: ISheetData_Amulet_AmuletEffect;
	readonly 3581: ISheetData_Amulet_AmuletEffect;
	readonly 3590: ISheetData_Amulet_AmuletEffect;
	readonly 3591: ISheetData_Amulet_AmuletEffect;
	readonly 3600: ISheetData_Amulet_AmuletEffect;
	readonly 3601: ISheetData_Amulet_AmuletEffect;
	readonly 3610: ISheetData_Amulet_AmuletEffect;
	readonly 3611: ISheetData_Amulet_AmuletEffect;
	readonly 3620: ISheetData_Amulet_AmuletEffect;
	readonly 3621: ISheetData_Amulet_AmuletEffect;
	readonly 3630: ISheetData_Amulet_AmuletEffect;
	readonly 3631: ISheetData_Amulet_AmuletEffect;
	readonly 3640: ISheetData_Amulet_AmuletEffect;
	readonly 3641: ISheetData_Amulet_AmuletEffect;
	readonly 3650: ISheetData_Amulet_AmuletEffect;
	readonly 3651: ISheetData_Amulet_AmuletEffect;
	readonly 3660: ISheetData_Amulet_AmuletEffect;
	readonly 3661: ISheetData_Amulet_AmuletEffect;
	readonly 3670: ISheetData_Amulet_AmuletEffect;
	readonly 3671: ISheetData_Amulet_AmuletEffect;
	readonly 3680: ISheetData_Amulet_AmuletEffect;
	readonly 3681: ISheetData_Amulet_AmuletEffect;
	readonly 3690: ISheetData_Amulet_AmuletEffect;
	readonly 3691: ISheetData_Amulet_AmuletEffect;
	readonly 3700: ISheetData_Amulet_AmuletEffect;
	readonly 3701: ISheetData_Amulet_AmuletEffect;
	readonly 3710: ISheetData_Amulet_AmuletEffect;
	readonly 3711: ISheetData_Amulet_AmuletEffect;
	readonly 3720: ISheetData_Amulet_AmuletEffect;
	readonly 3721: ISheetData_Amulet_AmuletEffect;
	readonly 3730: ISheetData_Amulet_AmuletEffect;
	readonly 3731: ISheetData_Amulet_AmuletEffect;
	readonly 3740: ISheetData_Amulet_AmuletEffect;
	readonly 3741: ISheetData_Amulet_AmuletEffect;
	readonly 3750: ISheetData_Amulet_AmuletEffect;
	readonly 3751: ISheetData_Amulet_AmuletEffect;
	readonly 3760: ISheetData_Amulet_AmuletEffect;
	readonly 3761: ISheetData_Amulet_AmuletEffect;
	readonly 3770: ISheetData_Amulet_AmuletEffect;
	readonly 3771: ISheetData_Amulet_AmuletEffect;
	readonly 3780: ISheetData_Amulet_AmuletEffect;
	readonly 3781: ISheetData_Amulet_AmuletEffect;
	readonly 3790: ISheetData_Amulet_AmuletEffect;
	readonly 3791: ISheetData_Amulet_AmuletEffect;
	readonly 3800: ISheetData_Amulet_AmuletEffect;
	readonly 3801: ISheetData_Amulet_AmuletEffect;
	readonly 3810: ISheetData_Amulet_AmuletEffect;
	readonly 3811: ISheetData_Amulet_AmuletEffect;
	readonly 3820: ISheetData_Amulet_AmuletEffect;
	readonly 3821: ISheetData_Amulet_AmuletEffect;
	readonly 3830: ISheetData_Amulet_AmuletEffect;
	readonly 3831: ISheetData_Amulet_AmuletEffect;
	readonly 3840: ISheetData_Amulet_AmuletEffect;
	readonly 3841: ISheetData_Amulet_AmuletEffect;
	readonly 3850: ISheetData_Amulet_AmuletEffect;
	readonly 3851: ISheetData_Amulet_AmuletEffect;
	readonly 3860: ISheetData_Amulet_AmuletEffect;
	readonly 3861: ISheetData_Amulet_AmuletEffect;
	readonly 3870: ISheetData_Amulet_AmuletEffect;
	readonly 3871: ISheetData_Amulet_AmuletEffect;
	readonly 3880: ISheetData_Amulet_AmuletEffect;
	readonly 3881: ISheetData_Amulet_AmuletEffect;
}
declare interface ISheetData_Amulet_AmuletEffect extends ISheetDataBase {
	/** 护身符id */
	readonly id: number;
	/** 是否允许钦定(1可以,0不行) */
	readonly book_enabled: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	readonly deprecated: number;
	/** 区分权重隐藏标签{,分隔} */
	readonly group: string;
	/** 1=秘籍，2=梅兰竹菊, 3=海盗，4=小鬼 */
	readonly effect_group: number;
	/** 在商店中是否必定有印章 */
	readonly shop_badge: number;
	/** 已有升级卡时是否依旧可以在卡包中出现 */
	readonly duplicate_enabled: number;
	/** 升级后的卡 */
	readonly upgrade: number;
	/** 珍贵度，1SSR，2SR，3R，4N */
	readonly rarity: number;
	/** 商店买入价格 */
	readonly price: number;
	/** 是否允许出售1-可以，0-不行 */
	readonly can_sell: number;
	/** 商店出售价格 */
	readonly sell_price: number;
	/** str/event卡名 */
	readonly name: number;
	/** str/event效果 */
	readonly desc: number;
	/** 卡图 */
	readonly card_image: string;
	/** 角标 */
	readonly card_remark: number;
	/** 前端无成长进度时的初始值 */
	readonly init_param_view: number[];
	readonly args: number[];
	readonly tag_id: number[];
}
//#endregion

//#region amulet_pool
declare interface ISheet_Amulet_AmuletPool {
	readonly [key: string]: ISheetData_Amulet_AmuletPool[];
	readonly 25011101: ISheetData_Amulet_AmuletPool[];
	readonly 25011102: ISheetData_Amulet_AmuletPool[];
	readonly 25011103: ISheetData_Amulet_AmuletPool[];
	readonly 25081101: ISheetData_Amulet_AmuletPool[];
	readonly 25081102: ISheetData_Amulet_AmuletPool[];
	readonly 25081103: ISheetData_Amulet_AmuletPool[];
	readonly 26051101: ISheetData_Amulet_AmuletPool[];
	readonly 26051102: ISheetData_Amulet_AmuletPool[];
	readonly 26051103: ISheetData_Amulet_AmuletPool[];
}
declare interface ISheetData_Amulet_AmuletPool extends ISheetDataBase {
	/** 护身符池id */
	readonly level_amulet_pool_id: number;
	/** 护身符id */
	readonly amulet_id: number;
}
//#endregion

//#region amulet_tag
declare interface ISheet_Amulet_AmuletTag {
	readonly [key: string]: ISheetData_Amulet_AmuletTag;
	readonly 25084001: ISheetData_Amulet_AmuletTag;
	readonly 25084002: ISheetData_Amulet_AmuletTag;
	readonly 25084003: ISheetData_Amulet_AmuletTag;
	readonly 25084004: ISheetData_Amulet_AmuletTag;
	readonly 25084005: ISheetData_Amulet_AmuletTag;
	readonly 25084006: ISheetData_Amulet_AmuletTag;
	readonly 25084007: ISheetData_Amulet_AmuletTag;
	readonly 25084008: ISheetData_Amulet_AmuletTag;
	readonly 25084009: ISheetData_Amulet_AmuletTag;
	readonly 25084010: ISheetData_Amulet_AmuletTag;
	readonly 25084011: ISheetData_Amulet_AmuletTag;
	readonly 25084012: ISheetData_Amulet_AmuletTag;
	readonly 25084013: ISheetData_Amulet_AmuletTag;
	readonly 25084014: ISheetData_Amulet_AmuletTag;
	readonly 25084015: ISheetData_Amulet_AmuletTag;
	readonly 25084016: ISheetData_Amulet_AmuletTag;
	readonly 25084017: ISheetData_Amulet_AmuletTag;
	readonly 25084018: ISheetData_Amulet_AmuletTag;
	readonly 25084019: ISheetData_Amulet_AmuletTag;
	readonly 25084020: ISheetData_Amulet_AmuletTag;
	readonly 25084021: ISheetData_Amulet_AmuletTag;
	readonly 25084022: ISheetData_Amulet_AmuletTag;
	readonly 25084023: ISheetData_Amulet_AmuletTag;
	readonly 25084024: ISheetData_Amulet_AmuletTag;
	readonly 25084025: ISheetData_Amulet_AmuletTag;
	readonly 26054001: ISheetData_Amulet_AmuletTag;
	readonly 26054002: ISheetData_Amulet_AmuletTag;
	readonly 26054003: ISheetData_Amulet_AmuletTag;
	readonly 26054004: ISheetData_Amulet_AmuletTag;
	readonly 26054005: ISheetData_Amulet_AmuletTag;
	readonly 26054006: ISheetData_Amulet_AmuletTag;
	readonly 26054007: ISheetData_Amulet_AmuletTag;
	readonly 26054008: ISheetData_Amulet_AmuletTag;
	readonly 26054009: ISheetData_Amulet_AmuletTag;
}
declare interface ISheetData_Amulet_AmuletTag extends ISheetDataBase {
	/** 关键词id */
	readonly tag_id: number;
	/** str/event关键词名 */
	readonly tag_name: number;
	/** str/event关键词描述 */
	readonly tag_desc: number;
}
//#endregion

//#region amulet_effect_group
declare interface ISheet_Amulet_AmuletEffectGroup {
	readonly [key: string]: ISheetData_Amulet_AmuletEffectGroup;
	readonly 1: ISheetData_Amulet_AmuletEffectGroup;
	readonly 2: ISheetData_Amulet_AmuletEffectGroup;
}
declare interface ISheetData_Amulet_AmuletEffectGroup extends ISheetDataBase {
	/** 护身符组id */
	readonly id: number;
	/** 融合后护身符id */
	readonly merge_card: number;
}
//#endregion

//#region amulet_badge
declare interface ISheet_Amulet_AmuletBadge {
	readonly [key: string]: ISheetData_Amulet_AmuletBadge;
	readonly 600010: ISheetData_Amulet_AmuletBadge;
	readonly 600020: ISheetData_Amulet_AmuletBadge;
	readonly 600030: ISheetData_Amulet_AmuletBadge;
	readonly 600040: ISheetData_Amulet_AmuletBadge;
	readonly 600050: ISheetData_Amulet_AmuletBadge;
	readonly 600060: ISheetData_Amulet_AmuletBadge;
	readonly 600070: ISheetData_Amulet_AmuletBadge;
	readonly 600080: ISheetData_Amulet_AmuletBadge;
	readonly 600090: ISheetData_Amulet_AmuletBadge;
	readonly 600100: ISheetData_Amulet_AmuletBadge;
	readonly 600110: ISheetData_Amulet_AmuletBadge;
	readonly 600120: ISheetData_Amulet_AmuletBadge;
	readonly 600130: ISheetData_Amulet_AmuletBadge;
	readonly 600140: ISheetData_Amulet_AmuletBadge;
	readonly 600150: ISheetData_Amulet_AmuletBadge;
	readonly 600160: ISheetData_Amulet_AmuletBadge;
	readonly 600170: ISheetData_Amulet_AmuletBadge;
	readonly 600180: ISheetData_Amulet_AmuletBadge;
	readonly 600190: ISheetData_Amulet_AmuletBadge;
	readonly 600200: ISheetData_Amulet_AmuletBadge;
	readonly 600210: ISheetData_Amulet_AmuletBadge;
	readonly 600220: ISheetData_Amulet_AmuletBadge;
	readonly 600230: ISheetData_Amulet_AmuletBadge;
	readonly 600240: ISheetData_Amulet_AmuletBadge;
	readonly 600250: ISheetData_Amulet_AmuletBadge;
	readonly 600260: ISheetData_Amulet_AmuletBadge;
	readonly 600270: ISheetData_Amulet_AmuletBadge;
	readonly 600280: ISheetData_Amulet_AmuletBadge;
	readonly 600290: ISheetData_Amulet_AmuletBadge;
	readonly 600300: ISheetData_Amulet_AmuletBadge;
	readonly 600310: ISheetData_Amulet_AmuletBadge;
}
declare interface ISheetData_Amulet_AmuletBadge extends ISheetDataBase {
	/** 印章id */
	readonly id: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	readonly deprecated: number;
	/** 可以被覆盖或删除 */
	readonly coverable: number;
	/** 商店刷新权重 */
	readonly weight: number;
	/** 档位，1铜，2银，3金 */
	readonly rarity: number;
	/** 印章体积，0普通1大 */
	readonly volume: number;
	/** str/event印章名 */
	readonly badge_name: number;
	/** str/event效果 */
	readonly badge_desc: number;
	/** 印章图 */
	readonly badge_image: string;
	readonly args: number[];
}
//#endregion

//#region amulet_advanced_shop
declare interface ISheet_Amulet_AmuletAdvancedShop {
	readonly [key: string]: ISheetData_Amulet_AmuletAdvancedShop;
	readonly 260511: ISheetData_Amulet_AmuletAdvancedShop;
}
declare interface ISheetData_Amulet_AmuletAdvancedShop extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 刷新价格系数（百分比） */
	readonly refresh_price_rate: number;
	/** 初始刷新价格 */
	readonly shop_refresh_coin: number;
	/** 护身符商品=卡包结果 */
	readonly effect_goods_pack: number;
}
//#endregion

//#region amulet_advanced_shop_upgrade
declare interface ISheet_Amulet_AmuletAdvancedShopUpgrade {
	readonly [key: string]: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 1: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 2: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 3: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 4: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 5: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 6: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 7: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 8: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 9: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 10: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 11: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 12: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 13: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 14: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 15: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 16: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 17: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 18: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 19: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
	readonly 20: ISheetData_Amulet_AmuletAdvancedShopUpgrade;
}
declare interface ISheetData_Amulet_AmuletAdvancedShopUpgrade extends ISheetDataBase {
	/** 升级 id */
	readonly id: number;
	/** 类型 */
	readonly type: number;
	/** str/event选项描述 */
	readonly selection_desc: number[];
	/** 购买价格 */
	readonly price: number;
	/** 显示数值 */
	readonly display_value: number;
	readonly args: number[];
}
//#endregion

//#region amulet_gamble
declare interface ISheet_Amulet_AmuletGamble {
	readonly [key: string]: ISheetData_Amulet_AmuletGamble[];
	readonly 260511: ISheetData_Amulet_AmuletGamble[];
}
declare interface ISheetData_Amulet_AmuletGamble extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 转盘id */
	readonly id: number;
	/** 大关下限 */
	readonly level_range: number[];
	/** 选项组id */
	readonly selection_group_id: number;
	/** 爆炸初始概率（百分比） */
	readonly destroy_rate: number;
	/** 爆炸概率增长系数（百分比） */
	readonly destroy_inc_rate: number;
	/** 初始价格 */
	readonly price: number;
	/** 价格增长系数（百分比） */
	readonly price_inc_rate: number;
}
//#endregion

//#region amulet_gamble_group
declare interface ISheet_Amulet_AmuletGambleGroup {
	readonly [key: string]: ISheetData_Amulet_AmuletGambleGroup[];
	readonly 5201: ISheetData_Amulet_AmuletGambleGroup[];
	readonly 5202: ISheetData_Amulet_AmuletGambleGroup[];
	readonly 5203: ISheetData_Amulet_AmuletGambleGroup[];
	readonly 5204: ISheetData_Amulet_AmuletGambleGroup[];
	readonly 5205: ISheetData_Amulet_AmuletGambleGroup[];
}
declare interface ISheetData_Amulet_AmuletGambleGroup extends ISheetDataBase {
	readonly id: number;
	/** selection.id */
	readonly selection_id: number;
	/** 选项好坏类型 */
	readonly category: number;
	/** 数量 */
	readonly count: number;
}
//#endregion

//#region amulet_gamble_selection
declare interface ISheet_Amulet_AmuletGambleSelection {
	readonly [key: string]: ISheetData_Amulet_AmuletGambleSelection[];
	readonly 50201: ISheetData_Amulet_AmuletGambleSelection[];
	readonly 50202: ISheetData_Amulet_AmuletGambleSelection[];
	readonly 50203: ISheetData_Amulet_AmuletGambleSelection[];
}
declare interface ISheetData_Amulet_AmuletGambleSelection extends ISheetDataBase {
	readonly id: number;
	/** 选项id，全局唯一 */
	readonly selection_id: number;
	/** 选项好坏类型 */
	readonly category: number;
	/** 选项类型 */
	readonly type: number;
	/** 选项图标 */
	readonly selection_image: string;
	/** str/event选项标题 */
	readonly selection_name: number;
	/** str/event选项描述 */
	readonly selection_desc: number;
	/** 参数 */
	readonly args: number[];
}
//#endregion

//#region amulet_forge
declare interface ISheet_Amulet_AmuletForge {
	readonly [key: string]: ISheetData_Amulet_AmuletForge[];
	readonly 260511: ISheetData_Amulet_AmuletForge[];
}
declare interface ISheetData_Amulet_AmuletForge extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 1-护身符 2-印章 */
	readonly type: number;
	/** 稀有度 */
	readonly rarity: number;
	/** 价格 */
	readonly price: number;
}
//#endregion

//#region amulet_trade_item
declare interface ISheet_Amulet_AmuletTradeItem {
	readonly [key: string]: ISheetData_Amulet_AmuletTradeItem;
	readonly 1: ISheetData_Amulet_AmuletTradeItem;
	readonly 2: ISheetData_Amulet_AmuletTradeItem;
	readonly 3: ISheetData_Amulet_AmuletTradeItem;
	readonly 4: ISheetData_Amulet_AmuletTradeItem;
	readonly 5: ISheetData_Amulet_AmuletTradeItem;
	readonly 6: ISheetData_Amulet_AmuletTradeItem;
	readonly 7: ISheetData_Amulet_AmuletTradeItem;
	readonly 8: ISheetData_Amulet_AmuletTradeItem;
	readonly 9: ISheetData_Amulet_AmuletTradeItem;
}
declare interface ISheetData_Amulet_AmuletTradeItem extends ISheetDataBase {
	/** id */
	readonly id: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	readonly deprecated: number;
	/** 种类 */
	readonly type: number;
	/** 分组（同组的不会随机到多个） */
	readonly group: number;
	/** 价值 */
	readonly value: number;
	/** str/event说明文 */
	readonly desc: number;
	/** 选项图 */
	readonly image: string;
	readonly args: number[];
}
//#endregion

//#region amulet_trade_reward
declare interface ISheet_Amulet_AmuletTradeReward {
	readonly [key: string]: ISheetData_Amulet_AmuletTradeReward;
	readonly 1: ISheetData_Amulet_AmuletTradeReward;
	readonly 2: ISheetData_Amulet_AmuletTradeReward;
	readonly 3: ISheetData_Amulet_AmuletTradeReward;
	readonly 4: ISheetData_Amulet_AmuletTradeReward;
	readonly 5: ISheetData_Amulet_AmuletTradeReward;
	readonly 6: ISheetData_Amulet_AmuletTradeReward;
	readonly 7: ISheetData_Amulet_AmuletTradeReward;
}
declare interface ISheetData_Amulet_AmuletTradeReward extends ISheetDataBase {
	/** id */
	readonly id: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	readonly deprecated: number;
	/** 价格区间最小值 */
	readonly min_value: number;
	/** 价格区间最大值（包括） */
	readonly max_value: number;
	/** str/event说明文 */
	readonly desc: number;
	/** 奖励类型（1=护身符，2=符文石） */
	readonly type: number;
	readonly args: number[];
}
//#endregion

//#region amulet_bonfire_selection
declare interface ISheet_Amulet_AmuletBonfireSelection {
	readonly [key: string]: ISheetData_Amulet_AmuletBonfireSelection[];
	readonly 260511: ISheetData_Amulet_AmuletBonfireSelection[];
}
declare interface ISheetData_Amulet_AmuletBonfireSelection extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 篝火选项id */
	readonly selection_id: number;
	/** (1固定选项2随机选项) */
	readonly random: number;
	/** 选项类型 */
	readonly type: number;
	/** str/event选项名称 */
	readonly selection_name: number;
	/** str/event选项描述 */
	readonly selection_desc: number;
	/** 选项图 */
	readonly selection_image: string;
	/** 参数 */
	readonly args: number[];
}
//#endregion

//#region amulet_transport
declare interface ISheet_Amulet_AmuletTransport {
	readonly [key: string]: ISheetData_Amulet_AmuletTransport;
	readonly 260511: ISheetData_Amulet_AmuletTransport;
}
declare interface ISheetData_Amulet_AmuletTransport extends ISheetDataBase {
	/** 活动id */
	readonly activity_id: number;
	/** 价格 */
	readonly price: number;
}
//#endregion

//#region amulet_shop_upgrade
declare interface ISheet_Amulet_AmuletShopUpgrade {
	readonly [key: string]: ISheetData_Amulet_AmuletShopUpgrade[];
	readonly 8001: ISheetData_Amulet_AmuletShopUpgrade[];
	readonly 8002: ISheetData_Amulet_AmuletShopUpgrade[];
	readonly 8003: ISheetData_Amulet_AmuletShopUpgrade[];
	readonly 8004: ISheetData_Amulet_AmuletShopUpgrade[];
}
declare interface ISheetData_Amulet_AmuletShopUpgrade extends ISheetDataBase {
	/** 升级group */
	readonly id: number;
	/** 等级 */
	readonly level: number;
	/** 升级价格 */
	readonly price: number;
	/** 效果量 */
	readonly add_value: number;
}
//#endregion

//#region amulet_upgrade
declare interface ISheet_Amulet_AmuletUpgrade {
	readonly [key: string]: ISheetData_Amulet_AmuletUpgrade[];
	readonly 901: ISheetData_Amulet_AmuletUpgrade[];
	readonly 902: ISheetData_Amulet_AmuletUpgrade[];
	readonly 903: ISheetData_Amulet_AmuletUpgrade[];
	readonly 904: ISheetData_Amulet_AmuletUpgrade[];
	readonly 905: ISheetData_Amulet_AmuletUpgrade[];
	readonly 906: ISheetData_Amulet_AmuletUpgrade[];
}
declare interface ISheetData_Amulet_AmuletUpgrade extends ISheetDataBase {
	/** 升级group */
	readonly id: number;
	/** 等级 */
	readonly level: number;
	/** 所需升级点 */
	readonly skill_point: number;
	/** 每个等级对应一个buff，args设置效果 */
	readonly buff_id: number;
	/** 前端展示数值 */
	readonly display_value: number;
}
//#endregion

//#region amulet_buff
declare interface ISheet_Amulet_AmuletBuff {
	readonly [key: string]: ISheetData_Amulet_AmuletBuff;
	readonly 901: ISheetData_Amulet_AmuletBuff;
	readonly 902: ISheetData_Amulet_AmuletBuff;
	readonly 903: ISheetData_Amulet_AmuletBuff;
	readonly 904: ISheetData_Amulet_AmuletBuff;
	readonly 905: ISheetData_Amulet_AmuletBuff;
	readonly 906: ISheetData_Amulet_AmuletBuff;
	readonly 907: ISheetData_Amulet_AmuletBuff;
	readonly 908: ISheetData_Amulet_AmuletBuff;
	readonly 909: ISheetData_Amulet_AmuletBuff;
	readonly 910: ISheetData_Amulet_AmuletBuff;
	readonly 911: ISheetData_Amulet_AmuletBuff;
	readonly 912: ISheetData_Amulet_AmuletBuff;
	readonly 913: ISheetData_Amulet_AmuletBuff;
	readonly 914: ISheetData_Amulet_AmuletBuff;
	readonly 915: ISheetData_Amulet_AmuletBuff;
	readonly 916: ISheetData_Amulet_AmuletBuff;
	readonly 917: ISheetData_Amulet_AmuletBuff;
	readonly 918: ISheetData_Amulet_AmuletBuff;
	readonly 919: ISheetData_Amulet_AmuletBuff;
	readonly 920: ISheetData_Amulet_AmuletBuff;
	readonly 921: ISheetData_Amulet_AmuletBuff;
	readonly 922: ISheetData_Amulet_AmuletBuff;
	readonly 923: ISheetData_Amulet_AmuletBuff;
	readonly 924: ISheetData_Amulet_AmuletBuff;
	readonly 925: ISheetData_Amulet_AmuletBuff;
	readonly 926: ISheetData_Amulet_AmuletBuff;
	readonly 927: ISheetData_Amulet_AmuletBuff;
	readonly 928: ISheetData_Amulet_AmuletBuff;
	readonly 8001: ISheetData_Amulet_AmuletBuff;
	readonly 8002: ISheetData_Amulet_AmuletBuff;
	readonly 8003: ISheetData_Amulet_AmuletBuff;
	readonly 8004: ISheetData_Amulet_AmuletBuff;
	readonly 9010: ISheetData_Amulet_AmuletBuff;
	readonly 9011: ISheetData_Amulet_AmuletBuff;
	readonly 9012: ISheetData_Amulet_AmuletBuff;
	readonly 9013: ISheetData_Amulet_AmuletBuff;
	readonly 9020: ISheetData_Amulet_AmuletBuff;
	readonly 9021: ISheetData_Amulet_AmuletBuff;
	readonly 9022: ISheetData_Amulet_AmuletBuff;
	readonly 9023: ISheetData_Amulet_AmuletBuff;
	readonly 9030: ISheetData_Amulet_AmuletBuff;
	readonly 9031: ISheetData_Amulet_AmuletBuff;
	readonly 9032: ISheetData_Amulet_AmuletBuff;
	readonly 9033: ISheetData_Amulet_AmuletBuff;
	readonly 9040: ISheetData_Amulet_AmuletBuff;
	readonly 9041: ISheetData_Amulet_AmuletBuff;
	readonly 9042: ISheetData_Amulet_AmuletBuff;
	readonly 9043: ISheetData_Amulet_AmuletBuff;
	readonly 9050: ISheetData_Amulet_AmuletBuff;
	readonly 9051: ISheetData_Amulet_AmuletBuff;
	readonly 9052: ISheetData_Amulet_AmuletBuff;
	readonly 9053: ISheetData_Amulet_AmuletBuff;
	readonly 9060: ISheetData_Amulet_AmuletBuff;
	readonly 9061: ISheetData_Amulet_AmuletBuff;
	readonly 9062: ISheetData_Amulet_AmuletBuff;
}
declare interface ISheetData_Amulet_AmuletBuff extends ISheetDataBase {
	/** buffid */
	readonly id: number;
	/** 1-boss，2-商店升级，3-场外升级 */
	readonly type: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	readonly deprecated: number;
	/** 随机权重 */
	readonly common_weight: number;
	/** record_level后的随机权重 */
	readonly ex_weight: number;
	/** buff是否可叠加1-可以，0-不可以 */
	readonly can_stack: number;
	/** str/event说明文 */
	readonly desc: number;
	/** 屏蔽天牌/里宝指示：1万2筒3索0里宝指示牌 */
	readonly invalid_type: number;
	readonly args: number[];
}
//#endregion

//#region amulet_goods
declare interface ISheet_Amulet_AmuletGoods {
	readonly [key: string]: ISheetData_Amulet_AmuletGoods;
	readonly 101: ISheetData_Amulet_AmuletGoods;
	readonly 102: ISheetData_Amulet_AmuletGoods;
	readonly 103: ISheetData_Amulet_AmuletGoods;
	readonly 111: ISheetData_Amulet_AmuletGoods;
	readonly 112: ISheetData_Amulet_AmuletGoods;
	readonly 113: ISheetData_Amulet_AmuletGoods;
	readonly 971: ISheetData_Amulet_AmuletGoods;
	readonly 972: ISheetData_Amulet_AmuletGoods;
	readonly 973: ISheetData_Amulet_AmuletGoods;
	readonly 974: ISheetData_Amulet_AmuletGoods;
	readonly 975: ISheetData_Amulet_AmuletGoods;
	readonly 976: ISheetData_Amulet_AmuletGoods;
	readonly 977: ISheetData_Amulet_AmuletGoods;
	readonly 978: ISheetData_Amulet_AmuletGoods;
	readonly 979: ISheetData_Amulet_AmuletGoods;
	readonly 980: ISheetData_Amulet_AmuletGoods;
	readonly 981: ISheetData_Amulet_AmuletGoods;
	readonly 991: ISheetData_Amulet_AmuletGoods;
}
declare interface ISheetData_Amulet_AmuletGoods extends ISheetDataBase {
	/** goods_id */
	readonly id: number;
	/** 保底卡珍贵度，1SSR，2SR，3R，4N */
	readonly guaranteed: number;
	/** 卡包名称str/event */
	readonly pack_name: number;
	/** 卡包简介str/event */
	readonly pack_desc: number;
	/** 价格 */
	readonly price: number;
}
//#endregion

//#region amulet_fan
declare interface ISheet_Amulet_AmuletFan {
	readonly [key: string]: ISheetData_Amulet_AmuletFan;
	readonly 1: ISheetData_Amulet_AmuletFan;
	readonly 2: ISheetData_Amulet_AmuletFan;
	readonly 3: ISheetData_Amulet_AmuletFan;
	readonly 4: ISheetData_Amulet_AmuletFan;
	readonly 5: ISheetData_Amulet_AmuletFan;
	readonly 6: ISheetData_Amulet_AmuletFan;
	readonly 7: ISheetData_Amulet_AmuletFan;
	readonly 8: ISheetData_Amulet_AmuletFan;
	readonly 9: ISheetData_Amulet_AmuletFan;
	readonly 10: ISheetData_Amulet_AmuletFan;
	readonly 11: ISheetData_Amulet_AmuletFan;
	readonly 12: ISheetData_Amulet_AmuletFan;
	readonly 13: ISheetData_Amulet_AmuletFan;
	readonly 14: ISheetData_Amulet_AmuletFan;
	readonly 15: ISheetData_Amulet_AmuletFan;
	readonly 16: ISheetData_Amulet_AmuletFan;
	readonly 17: ISheetData_Amulet_AmuletFan;
	readonly 18: ISheetData_Amulet_AmuletFan;
	readonly 19: ISheetData_Amulet_AmuletFan;
	readonly 20: ISheetData_Amulet_AmuletFan;
	readonly 21: ISheetData_Amulet_AmuletFan;
	readonly 22: ISheetData_Amulet_AmuletFan;
	readonly 23: ISheetData_Amulet_AmuletFan;
	readonly 24: ISheetData_Amulet_AmuletFan;
	readonly 25: ISheetData_Amulet_AmuletFan;
	readonly 26: ISheetData_Amulet_AmuletFan;
	readonly 27: ISheetData_Amulet_AmuletFan;
	readonly 28: ISheetData_Amulet_AmuletFan;
	readonly 29: ISheetData_Amulet_AmuletFan;
	readonly 30: ISheetData_Amulet_AmuletFan;
	readonly 31: ISheetData_Amulet_AmuletFan;
	readonly 32: ISheetData_Amulet_AmuletFan;
	readonly 33: ISheetData_Amulet_AmuletFan;
	readonly 36: ISheetData_Amulet_AmuletFan;
	readonly 37: ISheetData_Amulet_AmuletFan;
	readonly 38: ISheetData_Amulet_AmuletFan;
	readonly 39: ISheetData_Amulet_AmuletFan;
	readonly 40: ISheetData_Amulet_AmuletFan;
	readonly 41: ISheetData_Amulet_AmuletFan;
	readonly 42: ISheetData_Amulet_AmuletFan;
	readonly 43: ISheetData_Amulet_AmuletFan;
	readonly 44: ISheetData_Amulet_AmuletFan;
	readonly 45: ISheetData_Amulet_AmuletFan;
	readonly 47: ISheetData_Amulet_AmuletFan;
	readonly 48: ISheetData_Amulet_AmuletFan;
	readonly 49: ISheetData_Amulet_AmuletFan;
	readonly 50: ISheetData_Amulet_AmuletFan;
	readonly 100: ISheetData_Amulet_AmuletFan;
	readonly 101: ISheetData_Amulet_AmuletFan;
	readonly 201: ISheetData_Amulet_AmuletFan;
	readonly 202: ISheetData_Amulet_AmuletFan;
	readonly 203: ISheetData_Amulet_AmuletFan;
	readonly 204: ISheetData_Amulet_AmuletFan;
	readonly 205: ISheetData_Amulet_AmuletFan;
	readonly 206: ISheetData_Amulet_AmuletFan;
	readonly 207: ISheetData_Amulet_AmuletFan;
	readonly 208: ISheetData_Amulet_AmuletFan;
	readonly 209: ISheetData_Amulet_AmuletFan;
	readonly 210: ISheetData_Amulet_AmuletFan;
	readonly 211: ISheetData_Amulet_AmuletFan;
	readonly 212: ISheetData_Amulet_AmuletFan;
	readonly 213: ISheetData_Amulet_AmuletFan;
	readonly 214: ISheetData_Amulet_AmuletFan;
	readonly 215: ISheetData_Amulet_AmuletFan;
	readonly 216: ISheetData_Amulet_AmuletFan;
	readonly 217: ISheetData_Amulet_AmuletFan;
	readonly 218: ISheetData_Amulet_AmuletFan;
	readonly 219: ISheetData_Amulet_AmuletFan;
	readonly 220: ISheetData_Amulet_AmuletFan;
	readonly 221: ISheetData_Amulet_AmuletFan;
	readonly 222: ISheetData_Amulet_AmuletFan;
	readonly 223: ISheetData_Amulet_AmuletFan;
	readonly 224: ISheetData_Amulet_AmuletFan;
}
declare interface ISheetData_Amulet_AmuletFan extends ISheetDataBase {
	/** 番种id */
	readonly id: number;
	/** 初始番数（都按照门清役计算，可重复时填写1个） */
	readonly val: number;
	/** 役满役种 */
	readonly yiman: number;
	/** str/event的番名，0为普通番 */
	readonly name: number;
	/** str/event的番名，0为普通番 */
	readonly desc: number;
	/** 役种类型 */
	readonly type: number;
	/** 番型例子 */
	readonly case: string;
}
//#endregion

//#region amulet_rune_stone
declare interface ISheet_Amulet_AmuletRuneStone {
	readonly [key: string]: ISheetData_Amulet_AmuletRuneStone;
	readonly 7201: ISheetData_Amulet_AmuletRuneStone;
	readonly 7202: ISheetData_Amulet_AmuletRuneStone;
	readonly 7203: ISheetData_Amulet_AmuletRuneStone;
	readonly 7204: ISheetData_Amulet_AmuletRuneStone;
	readonly 7205: ISheetData_Amulet_AmuletRuneStone;
	readonly 7206: ISheetData_Amulet_AmuletRuneStone;
	readonly 7207: ISheetData_Amulet_AmuletRuneStone;
	readonly 7208: ISheetData_Amulet_AmuletRuneStone;
	readonly 7209: ISheetData_Amulet_AmuletRuneStone;
	readonly 7210: ISheetData_Amulet_AmuletRuneStone;
	readonly 7211: ISheetData_Amulet_AmuletRuneStone;
	readonly 7212: ISheetData_Amulet_AmuletRuneStone;
	readonly 7213: ISheetData_Amulet_AmuletRuneStone;
	readonly 7214: ISheetData_Amulet_AmuletRuneStone;
	readonly 7215: ISheetData_Amulet_AmuletRuneStone;
	readonly 7216: ISheetData_Amulet_AmuletRuneStone;
	readonly 7217: ISheetData_Amulet_AmuletRuneStone;
	readonly 7218: ISheetData_Amulet_AmuletRuneStone;
	readonly 7219: ISheetData_Amulet_AmuletRuneStone;
	readonly 7220: ISheetData_Amulet_AmuletRuneStone;
	readonly 7221: ISheetData_Amulet_AmuletRuneStone;
	readonly 7222: ISheetData_Amulet_AmuletRuneStone;
	readonly 7223: ISheetData_Amulet_AmuletRuneStone;
	readonly 7224: ISheetData_Amulet_AmuletRuneStone;
}
declare interface ISheetData_Amulet_AmuletRuneStone extends ISheetDataBase {
	readonly id: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	readonly deprecated: number;
	/** 商店刷新权重 */
	readonly weight: number;
	/** 价格 */
	readonly price: number;
	/** 解锁番种id */
	readonly unlock_fan: number;
	/** 符文石图片 */
	readonly rune_stone_image: string;
}
//#endregion

//#region amulet_task
declare interface ISheet_Amulet_AmuletTask {
	readonly [key: string]: ISheetData_Amulet_AmuletTask;
	readonly 25011301: ISheetData_Amulet_AmuletTask;
	readonly 25011302: ISheetData_Amulet_AmuletTask;
	readonly 25011303: ISheetData_Amulet_AmuletTask;
	readonly 25011304: ISheetData_Amulet_AmuletTask;
	readonly 25011305: ISheetData_Amulet_AmuletTask;
	readonly 25011306: ISheetData_Amulet_AmuletTask;
	readonly 25011307: ISheetData_Amulet_AmuletTask;
	readonly 25011308: ISheetData_Amulet_AmuletTask;
	readonly 25011309: ISheetData_Amulet_AmuletTask;
	readonly 25011310: ISheetData_Amulet_AmuletTask;
	readonly 25011311: ISheetData_Amulet_AmuletTask;
	readonly 25011312: ISheetData_Amulet_AmuletTask;
	readonly 25011313: ISheetData_Amulet_AmuletTask;
	readonly 25011314: ISheetData_Amulet_AmuletTask;
	readonly 25011315: ISheetData_Amulet_AmuletTask;
	readonly 25011316: ISheetData_Amulet_AmuletTask;
}
declare interface ISheetData_Amulet_AmuletTask extends ISheetDataBase {
	/** 任务id */
	readonly id: number;
	/** 相关护身符id */
	readonly amulet_id: number;
	/** 活动id */
	readonly activity_id: number;
	/** 基础任务id */
	readonly base_task_id: number;
	/** 奖励 */
	readonly reward: string;
}
//#endregion

//#region amulet_large_number
declare interface ISheet_Amulet_AmuletLargeNumber {
	readonly [key: string]: ISheetData_Amulet_AmuletLargeNumber;
	readonly 4: ISheetData_Amulet_AmuletLargeNumber;
	readonly 6: ISheetData_Amulet_AmuletLargeNumber;
	readonly 8: ISheetData_Amulet_AmuletLargeNumber;
	readonly 9: ISheetData_Amulet_AmuletLargeNumber;
	readonly 12: ISheetData_Amulet_AmuletLargeNumber;
	readonly 15: ISheetData_Amulet_AmuletLargeNumber;
	readonly 16: ISheetData_Amulet_AmuletLargeNumber;
	readonly 18: ISheetData_Amulet_AmuletLargeNumber;
	readonly 20: ISheetData_Amulet_AmuletLargeNumber;
	readonly 21: ISheetData_Amulet_AmuletLargeNumber;
	readonly 24: ISheetData_Amulet_AmuletLargeNumber;
	readonly 27: ISheetData_Amulet_AmuletLargeNumber;
	readonly 28: ISheetData_Amulet_AmuletLargeNumber;
	readonly 30: ISheetData_Amulet_AmuletLargeNumber;
	readonly 32: ISheetData_Amulet_AmuletLargeNumber;
	readonly 33: ISheetData_Amulet_AmuletLargeNumber;
	readonly 36: ISheetData_Amulet_AmuletLargeNumber;
	readonly 39: ISheetData_Amulet_AmuletLargeNumber;
	readonly 40: ISheetData_Amulet_AmuletLargeNumber;
	readonly 42: ISheetData_Amulet_AmuletLargeNumber;
	readonly 44: ISheetData_Amulet_AmuletLargeNumber;
	readonly 45: ISheetData_Amulet_AmuletLargeNumber;
	readonly 48: ISheetData_Amulet_AmuletLargeNumber;
	readonly 51: ISheetData_Amulet_AmuletLargeNumber;
	readonly 54: ISheetData_Amulet_AmuletLargeNumber;
	readonly 57: ISheetData_Amulet_AmuletLargeNumber;
	readonly 60: ISheetData_Amulet_AmuletLargeNumber;
	readonly 63: ISheetData_Amulet_AmuletLargeNumber;
	readonly 66: ISheetData_Amulet_AmuletLargeNumber;
	readonly 69: ISheetData_Amulet_AmuletLargeNumber;
	readonly 72: ISheetData_Amulet_AmuletLargeNumber;
	readonly 75: ISheetData_Amulet_AmuletLargeNumber;
	readonly 78: ISheetData_Amulet_AmuletLargeNumber;
	readonly 81: ISheetData_Amulet_AmuletLargeNumber;
	readonly 84: ISheetData_Amulet_AmuletLargeNumber;
	readonly 87: ISheetData_Amulet_AmuletLargeNumber;
	readonly 90: ISheetData_Amulet_AmuletLargeNumber;
	readonly 93: ISheetData_Amulet_AmuletLargeNumber;
	readonly 96: ISheetData_Amulet_AmuletLargeNumber;
	readonly 99: ISheetData_Amulet_AmuletLargeNumber;
	readonly 102: ISheetData_Amulet_AmuletLargeNumber;
	readonly 105: ISheetData_Amulet_AmuletLargeNumber;
	readonly 108: ISheetData_Amulet_AmuletLargeNumber;
	readonly 111: ISheetData_Amulet_AmuletLargeNumber;
	readonly 114: ISheetData_Amulet_AmuletLargeNumber;
	readonly 117: ISheetData_Amulet_AmuletLargeNumber;
	readonly 120: ISheetData_Amulet_AmuletLargeNumber;
	readonly 123: ISheetData_Amulet_AmuletLargeNumber;
	readonly 126: ISheetData_Amulet_AmuletLargeNumber;
	readonly 129: ISheetData_Amulet_AmuletLargeNumber;
	readonly 132: ISheetData_Amulet_AmuletLargeNumber;
	readonly 135: ISheetData_Amulet_AmuletLargeNumber;
	readonly 138: ISheetData_Amulet_AmuletLargeNumber;
	readonly 141: ISheetData_Amulet_AmuletLargeNumber;
	readonly 144: ISheetData_Amulet_AmuletLargeNumber;
	readonly 147: ISheetData_Amulet_AmuletLargeNumber;
	readonly 150: ISheetData_Amulet_AmuletLargeNumber;
	readonly 153: ISheetData_Amulet_AmuletLargeNumber;
	readonly 156: ISheetData_Amulet_AmuletLargeNumber;
	readonly 159: ISheetData_Amulet_AmuletLargeNumber;
	readonly 162: ISheetData_Amulet_AmuletLargeNumber;
	readonly 165: ISheetData_Amulet_AmuletLargeNumber;
	readonly 168: ISheetData_Amulet_AmuletLargeNumber;
	readonly 171: ISheetData_Amulet_AmuletLargeNumber;
	readonly 174: ISheetData_Amulet_AmuletLargeNumber;
	readonly 177: ISheetData_Amulet_AmuletLargeNumber;
	readonly 180: ISheetData_Amulet_AmuletLargeNumber;
	readonly 183: ISheetData_Amulet_AmuletLargeNumber;
	readonly 186: ISheetData_Amulet_AmuletLargeNumber;
	readonly 189: ISheetData_Amulet_AmuletLargeNumber;
	readonly 192: ISheetData_Amulet_AmuletLargeNumber;
	readonly 195: ISheetData_Amulet_AmuletLargeNumber;
	readonly 198: ISheetData_Amulet_AmuletLargeNumber;
	readonly 201: ISheetData_Amulet_AmuletLargeNumber;
	readonly 204: ISheetData_Amulet_AmuletLargeNumber;
	readonly 207: ISheetData_Amulet_AmuletLargeNumber;
	readonly 210: ISheetData_Amulet_AmuletLargeNumber;
	readonly 213: ISheetData_Amulet_AmuletLargeNumber;
	readonly 216: ISheetData_Amulet_AmuletLargeNumber;
	readonly 219: ISheetData_Amulet_AmuletLargeNumber;
	readonly 222: ISheetData_Amulet_AmuletLargeNumber;
	readonly 225: ISheetData_Amulet_AmuletLargeNumber;
	readonly 228: ISheetData_Amulet_AmuletLargeNumber;
	readonly 231: ISheetData_Amulet_AmuletLargeNumber;
	readonly 234: ISheetData_Amulet_AmuletLargeNumber;
	readonly 237: ISheetData_Amulet_AmuletLargeNumber;
	readonly 240: ISheetData_Amulet_AmuletLargeNumber;
	readonly 243: ISheetData_Amulet_AmuletLargeNumber;
	readonly 246: ISheetData_Amulet_AmuletLargeNumber;
	readonly 249: ISheetData_Amulet_AmuletLargeNumber;
	readonly 252: ISheetData_Amulet_AmuletLargeNumber;
	readonly 255: ISheetData_Amulet_AmuletLargeNumber;
	readonly 258: ISheetData_Amulet_AmuletLargeNumber;
	readonly 261: ISheetData_Amulet_AmuletLargeNumber;
	readonly 264: ISheetData_Amulet_AmuletLargeNumber;
	readonly 267: ISheetData_Amulet_AmuletLargeNumber;
	readonly 270: ISheetData_Amulet_AmuletLargeNumber;
	readonly 273: ISheetData_Amulet_AmuletLargeNumber;
	readonly 276: ISheetData_Amulet_AmuletLargeNumber;
	readonly 279: ISheetData_Amulet_AmuletLargeNumber;
	readonly 282: ISheetData_Amulet_AmuletLargeNumber;
	readonly 285: ISheetData_Amulet_AmuletLargeNumber;
	readonly 288: ISheetData_Amulet_AmuletLargeNumber;
	readonly 291: ISheetData_Amulet_AmuletLargeNumber;
	readonly 294: ISheetData_Amulet_AmuletLargeNumber;
	readonly 297: ISheetData_Amulet_AmuletLargeNumber;
	readonly 300: ISheetData_Amulet_AmuletLargeNumber;
}
declare interface ISheetData_Amulet_AmuletLargeNumber extends ISheetDataBase {
	/** 数字id（10的n次方） */
	readonly number_id: string;
	/** str/str万进制单位 */
	readonly number_unit_cn: string;
	/** 千进制单位 */
	readonly number_unit_en: string;
}
//#endregion