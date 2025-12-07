/** 装扮类别 item.category */
declare enum EItemCategory {
	/** 普通 */
	Normal = 1,
	/** 礼物 */
	Gift = 2,
	/** 福袋 */
	LuckyBag = 3,
	/** 角色装扮 */
	Role = 4,
	/** 通用装扮 */
	Common = 5,
	/** 活动道具 */
	ActivityItem = 6,
	/** 限时称号 */
	TimeLimitTitle = 7,
	/** 不参与成就的装扮 */
	DecorateWithoutAchieve = 8,
}

/** 普通category 子类型 */
declare enum EItemNormalType {
	/** 无 */
	None = 0,
	/** 手动选择的奖励道具 */
	SelectReward = 1,
	/** 随机奖励道具 */
	RandomReward = 2,
	/** 礼包全领道具 */
	GiftBagReward = 3,
	/** 神秘食材 */
	MysteryFoodMaterial = 4,
	/** 结缘券 */
	FateVoucher = 5,
}

/** 礼物category 子类型 */
declare enum EItemGiftType {
	/** 食物 */
	Food = 1,
	/** 酒 */
	Alcohol = 2,
	/** 美术品 */
	Artwork = 3,
}

/** 通用装扮category 子类型 */
declare enum EItemCommonType {
	/** 立直棒 */
	LiZhiBang = 0,
	/** 和牌特效 */
	HuPaiEffect = 1,
	/** 立直特效 */
	LiZhiEffect = 2,
	/** 手的样式 */
	HandStyle = 3,
	/** 立直音乐 */
	LiZhiMusic = 4,
	/** 头像框 */
	HeadFrame = 5,
	/** 桌布 */
	ZhuoBo = 6,
	/** 牌背 */
	PaiBei = 7,
	/** 大厅背景 */
	DaTingBeiJing = 8,
	/** 背景音乐 */
	BeiJingYinYue = 9,
	/** 鸣牌指示 */
	MingPaiZhiShi = 10,
	/** 限时称号 */
	XianShiChengHao = 11,
	/** 插画loading图 */
	ChaHuaLoadingTu = 12,
	/** 麻将牌正面mjpface */
	MaJiangPaiZhengMian = 13,
}
