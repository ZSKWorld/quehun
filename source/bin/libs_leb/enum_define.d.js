/** 本地化语言 */
ELanguage = {
	CHS: "chs",
	CHST: "chs_t",
	EN: "en",
	JP: "jp",
	KR: "kr",
}

/** 行政版本 */
EClientType = {
	CHS: "chs",
	CHST: "chs_t",
	EN: "en",
	JP: "jp",
	KR: "kr",
}

/** 本地数据类型 */
ELocalDataKey = {
	/** 自动登录 */
	AutoLogin: "LocalDataKey_AutoLogin",
	/** 上次登录账号 */
	LastLoginData: "LocalDataKey_LastLoginData",
	/** 设备id */
	DeviceId: "LocalDataKey_DeviceId",
	/** 重复登陆 */
	MultiLogin: "LocalDataKey_MultiLogin",
}

/** 页面类型 */
EViewType = {
	UI: "UI",
	Component: "Component",
	Render: "Render",
	Button: "Button",
}

/** 页面打开对当前页面操作的类型 */
EViewOpenType = {
	None: "None",
	Hide: "Hide",
	Close: "Close",
}

/** 页面种类 */
EViewCategory = {
	/** 全屏页面 */
	FullScreen: "FullScreen",
	/** 弹窗页面 */
	Popup: "Popup",
}

/** UI层级 */
ELayer = {
	Scene: "Scene",
	UIBottom: "UIBottom",
	UIMiddle: "UIMiddle",
	UITop: "UITop",
	Dialog: "Dialog",
	Alert: "Alert",
	Lock: "Lock",
}

/** 按键事件类型 */
EKeyEventType = {
	KeyDown: "keydown",
	KeyPress: "keypress",
	KeyUp: "keyup",
}

/** 鼠标事件类型 */
EMouseEventType = {
	MouseDown: "mousedown",
	MouseUp: "mouseup",
	MouseMove: "mousemove",
	MouseClick: "click",
	MouseDoubleClick: "doubleclick",
	MouseRightClick: "rightclick",
	RightMouseDown: "rightmousedown",
	RightMouseUp: "rightmouseup",
	MouseOver: "mouseover",
	MouseOut: "mouseout",
	MouseWheel: "mousewheel",
	MouseDrag: "mousedrag",
	MouseDragEnd: "mousedragend",
}

/** 全局物品类型 */
EItemType = {
	/** 货币 */
	Currency: 1,
	/** 角色 */
	Character: 2,
	/** 道具 */
	Item: 3,
	/** 皮肤 */
	Skin: 4,
	/** 称号 */
	Title: 5,
	/** 可获得物品 */
	FuncItem: 6,
}

/** 装扮类别 item.category */
EItemCategory = {
	/** 道具 */
	Item: 1,
	/** 礼物 */
	Gift: 2,
	/** 福袋 */
	LuckyBag: 3,
	/** 角色装扮 */
	Role: 4,
	/** 通用装扮 */
	Common: 5,
	/** 活动道具 */
	ActivityItem: 6,
	/** 限时称号 */
	TimeLimitTitle: 7,
	/** 不参与成就的装扮 */
	DecorateWithoutAchieve: 8,
}

/** 普通category 子类型 */
EItemNormalType = {
	/** 无 */
	None: 0,
	/** 手动选择的奖励道具 */
	SelectReward: 1,
	/** 随机奖励道具 */
	RandomReward: 2,
	/** 礼包全领道具 */
	GiftBagReward: 3,
	/** 神秘食材 */
	MysteryFoodMaterial: 4,
	/** 结缘券 */
	FateVoucher: 5,
}

/** 礼物category 子类型 */
EItemGiftType = {
	/** 食物 */
	Food: 1,
	/** 酒 */
	Alcohol: 2,
	/** 美术品 */
	Artwork: 3,
}

/** 通用装扮category 子类型 */
EItemCommonType = {
	/** 立直棒 */
	LiZhiBang: 0,
	/** 和牌特效 */
	HuPaiEffect: 1,
	/** 立直特效 */
	LiZhiEffect: 2,
	/** 手的样式 */
	HandStyle: 3,
	/** 立直音乐 */
	LiZhiMusic: 4,
	/** 头像框 */
	HeadFrame: 5,
	/** 桌布 */
	ZhuoBo: 6,
	/** 牌背 */
	PaiBei: 7,
	/** 大厅背景 */
	DaTingBeiJing: 8,
	/** 背景音乐 */
	BeiJingYinYue: 9,
	/** 鸣牌指示 */
	MingPaiZhiShi: 10,
	/** 限时称号 */
	XianShiChengHao: 11,
	/** 插画loading图 */
	ChaHuaLoadingTu: 12,
	/** 麻将牌正面mjpface */
	MaJiangPaiZhengMian: 13,
}

