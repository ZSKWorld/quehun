declare interface ITable_Amulet {
	/** 初始化状态6参数  ---  unique */
	amulet_activity: CfgExt<ISheet_Amulet_AmuletActivity>;
	/** 关卡配置  ---  group */
	amulet_games: CfgExt<ISheet_Amulet_AmuletGames>;
	/** group */
	amulet_rewards: CfgExt<ISheet_Amulet_AmuletRewards>;
	/** BOSSbuff  ---  unique */
	amulet_buff: CfgExt<ISheet_Amulet_AmuletBuff>;
	/** 护身符效果  ---  unique */
	amulet_effect: CfgExt<ISheet_Amulet_AmuletEffect>;
	/** 护身符组合成  ---  unique */
	amulet_effect_group: CfgExt<ISheet_Amulet_AmuletEffectGroup>;
	/** 青云之志算番  ---  unique */
	amulet_fan: CfgExt<ISheet_Amulet_AmuletFan>;
	/** 商店销售卡包内容权重  ---  unique */
	amulet_goods: CfgExt<ISheet_Amulet_AmuletGoods>;
	/** group */
	amulet_shop_upgrade: CfgExt<ISheet_Amulet_AmuletShopUpgrade>;
	/** 场外升级id  ---  group */
	amulet_upgrade: CfgExt<ISheet_Amulet_AmuletUpgrade>;
	/** 护身符挑战任务  ---  unique */
	amulet_task: CfgExt<ISheet_Amulet_AmuletTask>;
	/** 护身符刷新池  ---  group */
	amulet_pool: CfgExt<ISheet_Amulet_AmuletPool>;
	/** 印章效果  ---  unique */
	amulet_badge: CfgExt<ISheet_Amulet_AmuletBadge>;
	/** 关键词  ---  unique */
	amulet_tag: CfgExt<ISheet_Amulet_AmuletTag>;
	/** 大数单位  ---  unique */
	amulet_large_number: CfgExt<ISheet_Amulet_AmuletLargeNumber>;
}

//#region amulet_activity
declare interface ISheet_Amulet_AmuletActivity {
	240801: ISheetData_Amulet_AmuletActivity;
	250111: ISheetData_Amulet_AmuletActivity;
	250811: ISheetData_Amulet_AmuletActivity;
}
declare interface ISheetData_Amulet_AmuletActivity {
	activity_id: number;
	/** 强化道具编号 */
	skill_item: number;
	/** 初始星币数 */
	init_coin: number;
	/** 商店货架卡包数量 */
	shop_count: number;
	/** 超过该关卡记录对局记录 */
	record_level: number;
	/** 钦定初始护身符功能解锁关卡 */
	book_unlock_level: number;
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
	/** 初始待摸牌次数 */
	init_desktop_count: number;
	/** 初始待摸牌中，公开的数量 */
	init_open_desktop_count: number;
	/** 初始数牌分数 */
	init_shupai_point: number;
	/** 初始数牌分数 */
	init_zipai_point: number;
	/** 初始王牌（确定摸不到） */
	init_mount_count: number;
	/** 初始关卡id */
	init_level: number;
	/** 初始魂牌数量 */
	init_tian_count: number;
	/** 初始单卡无印权重 */
	init_badge_weight: number[];
}
//#endregion

//#region amulet_games
declare interface ISheet_Amulet_AmuletGames {
	240801: ISheetData_Amulet_AmuletGames[];
	250111: ISheetData_Amulet_AmuletGames[];
	250811: ISheetData_Amulet_AmuletGames[];
}
declare interface ISheetData_Amulet_AmuletGames {
	activity_id: number;
	/** 关卡等级 */
	level: number;
	/** 过关分数 */
	target_point: string;
	/** 过关奖励卡包 */
	reward_pack: string;
	reward: number;
	/** 1=boss */
	boss: number;
	next_level: number;
	/** 关卡回合数 */
	round: number;
	clear_mark: number;
	level_group: number;
	level_name: string;
	/** 保底卡包,填amulet_goods.id */
	guaranteed_goods: number;
	/** 关卡使用的护身符池 */
	level_amulet_pool: number;
}
//#endregion

//#region amulet_rewards
declare interface ISheet_Amulet_AmuletRewards {
	240801: ISheetData_Amulet_AmuletRewards[];
	250111: ISheetData_Amulet_AmuletRewards[];
	250811: ISheetData_Amulet_AmuletRewards[];
}
declare interface ISheetData_Amulet_AmuletRewards {
	activity_id: number;
	/** 目标分数百分比 */
	target_point: number;
	/** 奖励星币 */
	reward_coin: number;
}
//#endregion

//#region amulet_buff
declare interface ISheet_Amulet_AmuletBuff {
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
declare interface ISheetData_Amulet_AmuletBuff {
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
	/** str/event说明文 */
	desc: number;
	/** 屏蔽天牌/里宝指示：1万2筒3索0里宝指示牌 */
	invalid_type: number;
	args: number[];
}
//#endregion

//#region amulet_effect
declare interface ISheet_Amulet_AmuletEffect {
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
}
declare interface ISheetData_Amulet_AmuletEffect {
	/** 护身符id */
	id: number;
	/** 是否允许钦定(1可以,0不行) */
	book_enabled: number;
	/** 屏蔽标记，0正常，1屏蔽 */
	deprecated: number;
	/** 商店刷新权重 */
	weight: number;
	/** 1=秘籍，2=梅兰竹菊 */
	effect_group: number;
	/** 在商店中是否必定有印章 */
	shop_badge: number;
	/** 已有升级卡时是否依旧可以在卡包中出现 */
	duplicate_enabled: number;
	/** 升级后的卡 */
	upgrade: number;
	/** 珍贵度，1SSR，2SR，3R，4N */
	rarity: number;
	/** 商店价格 */
	price: number;
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

//#region amulet_effect_group
declare interface ISheet_Amulet_AmuletEffectGroup {
	1: ISheetData_Amulet_AmuletEffectGroup;
	2: ISheetData_Amulet_AmuletEffectGroup;
}
declare interface ISheetData_Amulet_AmuletEffectGroup {
	/** 护身符组id */
	id: number;
	/** 融合后护身符id */
	merge_card: number;
}
//#endregion

//#region amulet_fan
declare interface ISheet_Amulet_AmuletFan {
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
}
declare interface ISheetData_Amulet_AmuletFan {
	/** 番种id */
	id: number;
	/** 番数（都按照门清役计算，可重复时填写1个） */
	val: number;
	/** str/event的番名，0为普通番 */
	desc: number;
}
//#endregion

//#region amulet_goods
declare interface ISheet_Amulet_AmuletGoods {
	101: ISheetData_Amulet_AmuletGoods;
	102: ISheetData_Amulet_AmuletGoods;
	103: ISheetData_Amulet_AmuletGoods;
	111: ISheetData_Amulet_AmuletGoods;
	112: ISheetData_Amulet_AmuletGoods;
	113: ISheetData_Amulet_AmuletGoods;
	991: ISheetData_Amulet_AmuletGoods;
}
declare interface ISheetData_Amulet_AmuletGoods {
	/** goods_id */
	id: number;
	/** 在商店中出现的权重 */
	weight: number;
	/** 保底卡珍贵度，1SSR，2SR，3R，4N */
	guaranteed: number;
	/** 卡包名称str/event */
	pack_name: number;
	/** 卡包简介str/event */
	pack_desc: number;
	/** 价格 */
	price: number;
	/** SSR权重 */
	rarity_weight: number[];
	/** 无印权重 */
	badge_weight: number[];
}
//#endregion

//#region amulet_shop_upgrade
declare interface ISheet_Amulet_AmuletShopUpgrade {
	8001: ISheetData_Amulet_AmuletShopUpgrade[];
	8002: ISheetData_Amulet_AmuletShopUpgrade[];
	8003: ISheetData_Amulet_AmuletShopUpgrade[];
	8004: ISheetData_Amulet_AmuletShopUpgrade[];
}
declare interface ISheetData_Amulet_AmuletShopUpgrade {
	/** 升级group */
	id: number;
	/** 等级 */
	level: number;
	/** 升级价格 */
	price: number;
	/** 显示数值 */
	display_value: number;
}
//#endregion

//#region amulet_upgrade
declare interface ISheet_Amulet_AmuletUpgrade {
	901: ISheetData_Amulet_AmuletUpgrade[];
	902: ISheetData_Amulet_AmuletUpgrade[];
	903: ISheetData_Amulet_AmuletUpgrade[];
	904: ISheetData_Amulet_AmuletUpgrade[];
	905: ISheetData_Amulet_AmuletUpgrade[];
	906: ISheetData_Amulet_AmuletUpgrade[];
}
declare interface ISheetData_Amulet_AmuletUpgrade {
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

//#region amulet_task
declare interface ISheet_Amulet_AmuletTask {
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
declare interface ISheetData_Amulet_AmuletTask {
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

//#region amulet_pool
declare interface ISheet_Amulet_AmuletPool {
	25011101: ISheetData_Amulet_AmuletPool[];
	25011102: ISheetData_Amulet_AmuletPool[];
	25011103: ISheetData_Amulet_AmuletPool[];
	25081101: ISheetData_Amulet_AmuletPool[];
	25081102: ISheetData_Amulet_AmuletPool[];
	25081103: ISheetData_Amulet_AmuletPool[];
}
declare interface ISheetData_Amulet_AmuletPool {
	/** 护身符池id */
	level_amulet_pool_id: number;
	/** 护身符id */
	amulet_id: number;
	/** 修改后的权重，默认为100 */
	amulet_weight: number;
}
//#endregion

//#region amulet_badge
declare interface ISheet_Amulet_AmuletBadge {
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
}
declare interface ISheetData_Amulet_AmuletBadge {
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

//#region amulet_tag
declare interface ISheet_Amulet_AmuletTag {
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
}
declare interface ISheetData_Amulet_AmuletTag {
	/** 关键词id */
	tag_id: number;
	/** str/event关键词名 */
	tag_name: number;
	/** str/event关键词描述 */
	tag_desc: number;
}
//#endregion

//#region amulet_large_number
declare interface ISheet_Amulet_AmuletLargeNumber {
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
declare interface ISheetData_Amulet_AmuletLargeNumber {
	/** 数字id（10的n次方） */
	number_id: string;
	/** str/str万进制单位 */
	number_unit_cn: string;
	/** 千进制单位 */
	number_unit_en: string;
}
//#endregion