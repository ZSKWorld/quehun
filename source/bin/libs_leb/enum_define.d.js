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

EClientValueType = {
	None: 0,
	CompleteRegistration: 1,
	CompleteTutorial: 2,
	Level_1: 3,
	Level_2: 4,
	Level_3: 5,
	Get_The_Title1: 6,
	Purchase_Click: 7,
	Purchase: 8,
	XinShouYinDao: 10,
	G_Role_create: 1001, // 成功创建角色
	G_Role_login: 1002, // 登录进所选服务器
	G_Role_logout: 1003, // 角色离开服务器
	G_tutorial_complete: 1004, // 完成新手引导
	G_Purchase: 1005, // 成功充值
	G_Purchase_click: 1006, // 点击充值相关按钮，辉玉，铜币等等
	G_Purchase_first: 1007, // 历史上完成首次购买in-app purchase，排重
	G_Role_level_1: 1008, // 初心1星
	G_Role_level_2: 1009, // 初心2星
	G_Role_level_3: 1010, // 初心3星
	G_Role_level_4: 1011, // 雀士1星
	G_Role_level_5: 1012, // 雀士2星
	G_Role_level_6: 1013, // 雀士3星
	G_Role_level_7: 1014, // 雀杰1星
	G_Role_level_8: 1015, // 雀杰2星
	G_Role_level_9: 1016, // 雀杰3星
	G_Role_level_10: 1017, // 雀豪1星
	G_Role_level_11: 1018, // 雀豪2星
	G_Role_level_12: 1018, // 雀豪3星
	G_Role_level_13: 1020, // 雀圣1星
	G_Role_level_14: 1021, // 雀圣2星
	G_Role_level_15: 1022, // 雀圣3星
	G_Role_level_16: 1023, // 魂天
	G_get_title_1: 1024, // 获得称号魂之契约者（充值6元）
	G_get_title_2: 1025, // 获得称号魂之契约者（充值30元）
	G_get_title_3: 1026, // 获得称号魂之契约者（充值60元）
	G_get_title_4: 1027, // 获得称号魂之启迪者（充值100元）
	G_get_title_5: 1028, // 获得称号魂之启迪者（充值250元）
	G_get_title_6: 1029, // 获得称号魂之启迪者（充值500元）
	G_get_title_7: 1030, // 获得称号魂之缔造者（充值1000元）
	G_get_title_8: 1031, // 获得称号魂之缔造者（充值2000元）
	G_get_title_9: 1032, // 获得称号魂之缔造者（充值3000元）
	G_get_title_10: 1033, // 获得称号魂之超越者（充值4000元）
	G_get_title_11: 1034, // 猫粮供应商（充值5000元）
	G_tutorial_jump: 1035, // 跳过新手引导

	TW_Purchase: 2001, // 付费
	TW_Signup: 2002, // 注册
	TW_Tutorial_Completed: 2003, // 新手引导结束

	Shilian_Reward: 3001,
	Chunjie_Anim_Point: 3002,

	Chara_Show_Star: 3003, //寮舍是否只显示角色
	Recharge_Xieyi_Checked: 3004, // 充值协议确认
	Chunjie_Yindao_Checked: 3005, // 春节活动是否展示过新手引导
	event2403_followed: 3006, // 2403主播活动是否已关注
	BA_Yindao_Checked: 3008, // ba活动是否展示过新手引导
	HaiDao_Yindao_Checked: 3009, // 2406海岛活动是否展示过新手引导
	Spot_2408_Checked: 3010, // 2408剧情活动是否展示过新手引导
	Imas_Yindao_Checked: 3011, // 2411偶像大师活动是否展示过新手引导
	BA2501_Yindao_Checked: 3012, //2501春节庙会动是否展示过新手引导
	BA2501_LastEvent_Checked: 3013, //2501春节庙会动是否已完成最后一个事件
	BA2501_PlayCG_Checked: 3014, //2501春节庙会动是否展示过告别cg
	HF_Yindao_Checked: 3015, // 2404天之杯活动是否展示过新手引导

}

