//#region 网络相关
declare enum EServiceType {
	Lobby = ".lq.Lobby",
	FastTest = ".lq.FastTest",
	Route = ".lq.Route",
}

declare enum EHeaderType {
	Notify = 1,
	Request = 2,
	Response = 3,
}

declare enum ERouteState {
	/** 空闲 */
	Idle = "idle",
	/** 正常 */
	Normal = "normal",
	/** 忙碌 */
	Busy = "busy",
	/** 移除 */
	Removed = "removed",
	/** 拒绝 */
	Rejected = "rejected",
}
//#endregion

//#region 麻将牌相关
//0.筒子p,  1.万字m,  2.条子s,  3.字牌z,  4.百搭牌
declare enum EMjpType {
	/** 筒子 */
	P = "p",
	/** 万字 */
	M = "m",
	/** 条子 */
	S = "s",
	/** 字牌 */
	Z = "z",
	/** 百搭 */
	BD = "bd",
}
//#endregion

/** 本地化语言 */
declare enum ELanguage {
	CHS = "chs",
	CHST = "chs_t",
	EN = "en",
	JP = "jp",
	KR = "kr",
}

/** 行政版本 */
declare enum EClientType {
	CHS = "chs",
	CHST = "chs_t",
	EN = "en",
	JP = "jp",
	KR = "kr",
}

/** 服务器标签，日志统计用 */
declare enum EReportTag {
	None = "",
	CN = "cn",
	EN = "en",
	JP = "jp",
	KR = "kr",
}

/** 本地保存数据类型 */
declare enum ELocalDataKey {
	/** 上次登录的服务器 */
	LastServer = "LocalDataKey_LastServer",
	/** 自动登录 */
	AutoLogin = "LocalDataKey_AutoLogin",
	/** 上次登录账号 */
	LastLoginData = "LocalDataKey_LastLoginData",
	/** 设备id */
	DeviceId = "LocalDataKey_DeviceId",
	/** 重复登陆 */
	MultiLogin = "LocalDataKey_MultiLogin",
	/** 主页左上角玩家信息段位显示类型，1-四麻，2-三麻 */
	PlayerInfoLevelShowType = "LocalDataKey_PlayerInfoLevelShowType",
	/** 音效设置 */
	AudioSetting = "LocalDataKey_AudioSetting",
	/** 画面设置 */
	GraphicSetting = "LocalDataKey_GraphicSetting",
	/** 偏好设置 */
	PreferSetting = "LocalDataKey_PreferSetting",
	/** 语言设置 */
	LangSetting = "LocalDataKey_LangSetting",
	/** 其他设置 */
	OtherSetting = "LocalDataKey_OtherSetting",
}

//#region view相关

/** 与按键关联的常数 */
declare enum EKeyCode {
	Any = -1,
	NUMBER_0 = 48,
	NUMBER_1 = 49,
	NUMBER_2 = 50,
	NUMBER_3 = 51,
	NUMBER_4 = 52,
	NUMBER_5 = 53,
	NUMBER_6 = 54,
	NUMBER_7 = 55,
	NUMBER_8 = 56,
	NUMBER_9 = 57,
	A = 65,
	B = 66,
	C = 67,
	D = 68,
	E = 69,
	F = 70,
	G = 71,
	H = 72,
	I = 73,
	J = 74,
	K = 75,
	L = 76,
	M = 77,
	N = 78,
	O = 79,
	P = 80,
	Q = 81,
	R = 82,
	S = 83,
	T = 84,
	U = 85,
	V = 86,
	W = 87,
	X = 88,
	Y = 89,
	Z = 90,
	F1 = 112,
	F2 = 113,
	F3 = 114,
	F4 = 115,
	F5 = 116,
	F6 = 117,
	F7 = 118,
	F8 = 119,
	F9 = 120,
	F10 = 121,
	F11 = 122,
	F12 = 123,
	F13 = 124,
	F14 = 125,
	F15 = 126,
	NUMPAD = 21,
	NUMPAD_0 = 96,
	NUMPAD_1 = 97,
	NUMPAD_2 = 98,
	NUMPAD_3 = 99,
	NUMPAD_4 = 100,
	NUMPAD_5 = 101,
	NUMPAD_6 = 102,
	NUMPAD_7 = 103,
	NUMPAD_8 = 104,
	NUMPAD_9 = 105,
	NUMPAD_ADD = 107,
	NUMPAD_DECIMAL = 110,
	NUMPAD_DIVIDE = 111,
	NUMPAD_ENTER = 108,
	NUMPAD_MULTIPLY = 106,
	NUMPAD_SUBTRACT = 109,
	SEMICOLON = 186,
	EQUAL = 187,
	COMMA = 188,
	MINUS = 189,
	PERIOD = 190,
	SLASH = 191,
	BACKQUOTE = 192,
	LEFTBRACKET = 219,
	BACKSLASH = 220,
	RIGHTBRACKET = 221,
	QUOTE = 222,
	ALTERNATE = 18,
	BACKSPACE = 8,
	CAPS_LOCK = 20,
	COMMAND = 15,
	CONTROL = 17,
	DELETE = 46,
	ENTER = 13,
	ESCAPE = 27,
	PAGE_UP = 33,
	PAGE_DOWN = 34,
	END = 35,
	HOME = 36,
	LEFT = 37,
	UP = 38,
	RIGHT = 39,
	DOWN = 40,
	SHIFT = 16,
	SPACE = 32,
	TAB = 9,
	INSERT = 45,
}

/** 按键事件类型 */
declare enum EKeyEvent {
	KeyDown = "keydown",
	KeyPress = "keypress",
	KeyUp = "keyup",
}

/** 鼠标事件类型 */
declare enum EMouseEvent {
	MouseDown = "mousedown",
	MouseUp = "mouseup",
	MouseMove = "mousemove",
	MouseClick = "click",
	MouseDoubleClick = "doubleclick",
	MouseRightClick = "rightclick",
	RightMouseDown = "rightmousedown",
	RightMouseUp = "rightmouseup",
	MouseOver = "mouseover",
	MouseOut = "mouseout",
	MouseWheel = "mousewheel",
	MouseDrag = "mousedrag",
	MouseDragEnd = "mousedragend",
}

/** 页面打开对当前页面操作的类型 */
declare enum EViewOpenType {
	/** 无操作 */
	None = "None",
	/** 隐藏当前页面 */
	Hide = "Hide",
	/** 关闭当前页面 */
	Close = "Close",
}

/** 页面种类 */
declare enum EViewCategory {
	/** 全屏页面 */
	FullScreen = "FullScreen",
	/** 弹窗页面 */
	Popup = "Popup",
}

/** 页面类型 */
declare enum EViewType {
	UI = "UI",
	Component = "Component",
	Label = "Label",
	Render = "Render",
	Button = "Button",
}

/** UI层级 */
declare enum ELayer {
	Scene = "Scene",
	UIBottom = "UIBottom",
	UIMiddle = "UIMiddle",
	UITop = "UITop",
}

//#endregion

//#region 物品道具类型相关

/** 全局物品类型 */
declare enum EItemType {
	/** 货币 */
	Currency = 1,
	/** 角色 */
	Character = 2,
	/** 道具 */
	Item = 3,
	/** 皮肤 */
	Skin = 4,
	/** 称号 */
	Title = 5,
	/** 可获得物品 */
	FuncItem = 6,
}

/** 装扮类别 item.category */
declare enum EItemCategory {
	/** 道具 */
	Item = 1,
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
	TimeLimitedTitle = 7,
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
	TableCloth = 6,
	/** 牌背 */
	MjpBack = 7,
	/** 大厅背景 */
	DaTingBeiJing = 8,
	/** 背景音乐 */
	BeiJingYinYue = 9,
	/** 鸣牌指示 */
	MingPaiZhiShi = 10,
	/** 限时称号 */
	TimeLimitedTitle = 11,
	/** 插画loading图 */
	ChaHuaLoadingTu = 12,
	/** 麻将牌正面mjpface */
	MjpFront = 13,
}

/** 货币类型 */
declare enum ECurrencyType {
	/** 金币 */
	Gold = 100002,
	/** 魂玉 */
	Diamond = 100001,
	/** 皮肤券 */
	SkinTicket = 100004,
	/** 寻觅卷轴 */
	SeekTicket = 301001,
	/** 信仰值 */
	FaithValue = 100001,
}
//#endregion

declare enum EClientValueType {
	None = 0,
	CompleteRegistration = 1,
	CompleteTutorial = 2,
	Level_1 = 3,
	Level_2 = 4,
	Level_3 = 5,
	Get_The_Title1 = 6,
	Purchase_Click = 7,
	Purchase = 8,
	XinShouYinDao = 10,
	G_Role_create = 1001, // 成功创建角色
	G_Role_login = 1002, // 登录进所选服务器
	G_Role_logout = 1003, // 角色离开服务器
	G_tutorial_complete = 1004, // 完成新手引导
	G_Purchase = 1005, // 成功充值
	G_Purchase_click = 1006, // 点击充值相关按钮，辉玉，铜币等等
	G_Purchase_first = 1007, // 历史上完成首次购买in-app purchase，排重
	G_Role_level_1 = 1008, // 初心1星
	G_Role_level_2 = 1009, // 初心2星
	G_Role_level_3 = 1010, // 初心3星
	G_Role_level_4 = 1011, // 雀士1星
	G_Role_level_5 = 1012, // 雀士2星
	G_Role_level_6 = 1013, // 雀士3星
	G_Role_level_7 = 1014, // 雀杰1星
	G_Role_level_8 = 1015, // 雀杰2星
	G_Role_level_9 = 1016, // 雀杰3星
	G_Role_level_10 = 1017, // 雀豪1星
	G_Role_level_11 = 1018, // 雀豪2星
	G_Role_level_12 = 1018, // 雀豪3星
	G_Role_level_13 = 1020, // 雀圣1星
	G_Role_level_14 = 1021, // 雀圣2星
	G_Role_level_15 = 1022, // 雀圣3星
	G_Role_level_16 = 1023, // 魂天
	G_get_title_1 = 1024, // 获得称号魂之契约者（充值6元）
	G_get_title_2 = 1025, // 获得称号魂之契约者（充值30元）
	G_get_title_3 = 1026, // 获得称号魂之契约者（充值60元）
	G_get_title_4 = 1027, // 获得称号魂之启迪者（充值100元）
	G_get_title_5 = 1028, // 获得称号魂之启迪者（充值250元）
	G_get_title_6 = 1029, // 获得称号魂之启迪者（充值500元）
	G_get_title_7 = 1030, // 获得称号魂之缔造者（充值1000元）
	G_get_title_8 = 1031, // 获得称号魂之缔造者（充值2000元）
	G_get_title_9 = 1032, // 获得称号魂之缔造者（充值3000元）
	G_get_title_10 = 1033, // 获得称号魂之超越者（充值4000元）
	G_get_title_11 = 1034, // 猫粮供应商（充值5000元）
	G_tutorial_jump = 1035, // 跳过新手引导

	TW_Purchase = 2001, // 付费
	TW_Signup = 2002, // 注册
	TW_Tutorial_Completed = 2003, // 新手引导结束

	Shilian_Reward = 3001,
	Chunjie_Anim_Point = 3002,

	Chara_Show_Star = 3003, //寮舍是否只显示角色
	Recharge_Xieyi_Checked = 3004, // 充值协议确认
	Chunjie_Yindao_Checked = 3005, // 春节活动是否展示过新手引导
	event2403_followed = 3006, // 2403主播活动是否已关注
	BA_Yindao_Checked = 3008, // ba活动是否展示过新手引导
	HaiDao_Yindao_Checked = 3009, // 2406海岛活动是否展示过新手引导
	Spot_2408_Checked = 3010, // 2408剧情活动是否展示过新手引导
	Imas_Yindao_Checked = 3011, // 2411偶像大师活动是否展示过新手引导
	BA2501_Yindao_Checked = 3012, //2501春节庙会动是否展示过新手引导
	BA2501_LastEvent_Checked = 3013, //2501春节庙会动是否已完成最后一个事件
	BA2501_PlayCG_Checked = 3014, //2501春节庙会动是否展示过告别cg
	HF_Yindao_Checked = 3015, // 2404天之杯活动是否展示过新手引导

}

/** 逻辑场景类型枚举 */
declare enum ESceneType {
	LoginScene = "LoginScene",
	MainScene = "MainScene",
}

/** 各种UI对象池标识 */
declare enum EUIPoolKey {
	/** 文本提示 */
	TipInfo = "EUIPoolKey_TipInfo",
	/** 菜单 */
	ContextMenu = "EUIPoolKey_ContextMenu",
}

/** 全局常量定义 */
declare enum EConstDefine {
	/** 本地化资源根目录 */
	LangResDir = "langRes/",
}

/** 全局事件枚举 */
declare enum EGlobalEvent {
	/** 游戏回到前台事件 */
	OnGameShow = "EGlobalEvent_OnGameShow",
	/** 游戏隐藏后台事件 */
	OnGameHide = "EGlobalEvent_OnGameHide",

	/** 红点组件唤醒 */
	RedDotCompAwake = "EGlobalEvent_RedDotCompAwake",
	/** 红点组件销毁 */
	RedDotCompDestroy = "EGlobalEvent_RedDotCompDestroy",
	/** 初始完成 */
	OnInitGameCompleted = "EGlobalEvent_OnInitGameCompleted",

	//#region 网络相关
	LobbyConnecting = "EGlobalEvent_LobbyConnectting",
	LobbyReconnecting = "EGlobalEvent_LobbyReconnecting",
	LobbyConnected = "EGlobalEvent_LobbyConnected",
	LobbyClosed = "EGlobalEvent_LobbyClosed",
	GameConnecting = "EGlobalEvent_GameConnecting",
	GameReconnecting = "EGlobalEvent_GameReconnecting",
	GameConnected = "EGlobalEvent_GameConnected",
	GameClosed = "EGlobalEvent_GameClosed",
	OBConnecting = "EGlobalEvent_OBConnecting",
	OBReconnecting = "EGlobalEvent_OBReconnecting",
	OBConnected = "EGlobalEvent_OBConnected",
	OBClosed = "EGlobalEvent_OBClosed",
	//#endregion

	//#region 页面相关
	/** 页面打开前 */
	OnViewOpenBegin = "EGlobalEvent_OnViewOpenBegin",
	/** 页面打开后 */
	OnViewOpenEnd = "EGlobalEvent_OnViewOpenEnd",
	/** 页面关闭前 */
	OnViewCloseBegin = "EGlobalEvent_OnViewCloseBegin",
	/** 页面关闭后 */
	OnViewCloseEnd = "EGlobalEvent_OnViewCloseEnd",
	//#endregion

	/**绑定手机号完成 */
	BindPhoneCompleted = "EGlobalEvent_BindPhoneCompleted",
	/** 登录成功 */
	LoginSuccess = "EGlobalEvent_LoginSuccess",

	//#region logicScene相关
	/** 场景开始加载 */
	OnSceneLoadBegin = "EGlobalEvent_OnSceneLoadBegin",
	/** 场景加载进度 */
	OnSceneLoadProgress = "EGlobalEvent_OnSceneLoadProgress",
	/** 场景加载结束 */
	OnSceneLoadEnd = "EGlobalEvent_OnSceneLoadEnd",
	/** 进入场景开始 */
	OnSceneEnterBegin = "EGlobalEvent_OnSceneEnterBegin",
	/** 进入场景结束 */
	OnSceneEnterEnd = "EGlobalEvent_OnSceneEnterEnd",
	/** 退出场景开始 */
	OnSceneExitBegin = "EGlobalEvent_OnSceneExitBegin",
	/** 退出场景结束 */
	OnSceneExitEnd = "EGlobalEvent_OnSceneExitEnd",
	//#endregion

}

/** 用户数据变化事件 */
declare enum EUserEvent {
	//#region 邮件相关
	OnMailChanged = "EUserEvent_OnMailChanged",
	//#endregion

	//#region 公告相关
	OnAnnouncementChanged = "EUserEvent_OnAnnouncementChanged",
	//#endregion

	//#region 好友相关
	OnFriendsChanged = "EUserEvent_OnFriendsChanged",
	OnFriendMaxCountChanged = "EUserEvent_OnFriendMaxCountChanged",
	OnFriendApplyChanged = "EUserEvent_OnFriendApplyChanged",
	//#endregion

	//#region 背包相关
	OnBagItemsChanged = "EUserEvent_OnBagItemsChanged",
	OnBagDailyGainRecordChanged = "EUserEvent_OnBagDailyGainRecordChanged",
	OnCGUsingChanged = "EUserEvent_OnCGUsingChanged",
	//#endregion

	//#region 角色相关
	OnMainCharacterChanged = "EUserEvent_OnMainCharacterChanged",
	OnCharacterChanged = "EUserEvent_OnCharacterChanged",
	OnCharacterSortChanged = "EUserEvent_OnCharacterSortChanged",
	//#endregion

	//#region 装扮相关

	/** 使用中的牌背变化 */
	OnMjpBackUseChanged = "EUserEvent_OnMjpBackUseChanged",
	/** 使用中的牌面变化 */
	OnMjpFrontUseChanged = "EUserEvent_OnMjpFrontUseChanged",
	/** 使用中的桌布变化 */
	OnTableClothUseChanged = "EUserEvent_OnTableClothUseChanged",
	/** 使用中的大厅背景变化 */
	OnLobbyBgChanged = "EUserEvent_OnLobbyBgChanged",
	/** 使用中的装扮变化 */
	OnViewUseChanged = "EUserEvent_OnViewUseChanged",
	/** 装扮数据变化 */
	OnCommonViewChanged = "EUserEvent_OnCommonViewChanged",

	//#endregion

	//#region client_value相关
	OnClientValueChanged = "EUserEvent_OnClientValueChanged",
	//#endregion

	//#region 活动相关
	OnActivityListChanged = "EUserEvent_OnActivityListChanged",
	OnActivityIntervalChanged = "EUserEvent_OnActivityIntervalChanged",
	OnActivityBuffChanged = "EUserEvent_OnActivityBuffChanged",
	OnActivityTaskProgressChanged = "EUserEvent_OnActivityTaskProgressChanged",
	OnActivityFlipTaskProgressChanged = "EUserEvent_OnActivityFlipTaskProgressChanged",
	OnActivityPeriodTaskProgressChanged = "EUserEvent_OnActivityPeriodTaskProgressChanged",
	OnActivityRandomTaskProgressChanged = "EUserEvent_OnActivityRandomTaskProgressChanged",
	OnActivitySegmentTaskProgressChanged = "EUserEvent_OnActivitySegmentTaskProgressChanged",
	//#endregion

	//#region 充值相关
	/** vip经验变化 */
	OnRechargeVipExpChanged = "EUserEvent_OnRechargeVipExpChanged",
	/** 已充值档位变化 */
	OnRechargeRechargedListChanged = "EUserEvent_OnRechargeRechargedListChanged",
	/** 已领取的vip等级奖励变化 */
	OnRechargeGainVipLevelChanged = "EUserEvent_OnRechargeGainVipLevelChanged",
	//#endregion

	//#region 成就相关
	OnAchievementChanged = "EUserEvent_OnAchievementChanged",
	OnNewAchievement = "EUserEvent_OnNewAchievement",

	//#endregion
}

//#region 视频事件

/** 视频加载事件 */
declare enum EVideoLoadEvent {
	/** 浏览器开始寻找媒体数据时。 */
	LoadStart = "loadstart",
	/** 视频的时长、尺寸、字幕等元数据加载完成。 */
	LoadedMetadata = "loadedmetadata",
	/** 当前帧的数据加载完成（视频首帧已就绪）。 */
	LoadedData = "loadeddata",
	/** 浏览器正在下载视频数据。 */
	Progress = "progress",
	/** 浏览器认为已经加载了足够的数据，可以开始播放。 */
	CanPlay = "canplay",
	/** 预计在不断网的情况下可以顺畅播放直至结束。 */
	CanPlayThrough = "canplaythrough",
}

/** 视频播放状态事件 */
declare enum EVideoPlaybackEvent {
	/** 当 play() 方法被调用或 autoplay 生效 */
	Play = "play",
	/** 视频真正开始运行（从暂停或缓冲状态恢复） */
	Playing = "playing",
	/** 视频暂停 */
	Pause = "pause",
	/** 视频播放到末尾 */
	Ended = "ended",
	/** 播放因缓冲而停止（网络跟不上） */
	Waiting = "waiting",
	/** 浏览器尝试获取数据但数据不可用 */
	Stalled = "stalled",
}

/** 视频互动与进度事件 */
declare enum EVideoProgressAndInteractionEvent {
	/** 播放位置改变（每秒触发约 4-66 次） */
	TimeUpdate = "timeupdate",
	/** 用户开始拖动进度条 */
	Seeking = "seeking",
	/** 用户完成拖动，新的位置已定位 */
	Seeked = "seeked",
	/** 音量改变或静音状态切换 */
	VolumeChange = "volumechange",
	/** 播放速率改变（如切换 2x */
	RateChange = "ratechange",
}

/** 视频错误处理事件 */
declare enum EVideoErrorEvent {
	/** 发生错误（如视频格式不支持、404）。可通过 video.error 获取详情。 */
	Error = "error",
	/** 视频加载被中止（非错误原因，通常是用户操作）。 */
	Abort = "abort",
}
//#endregion

//#region spine相关

/** spine布局类型 */
declare enum ESpineLayout {
	A0 = "A0",
	B0 = "B0",
	B1 = "B1",
	B2 = "B2",
	B3 = "B3",
	C0 = "C0",
	D0 = "D0",
	E0 = "E0",
	F0 = "F0",
	F1 = "F1",
	F2 = "F2",
	G0 = "G0",
	H0 = "H0",
	I0 = "I0",
	J0 = "J0",
	K0 = "K0",
	L0 = "L0",
	Spot = "spot",
	Treasure_Single_Small = "treasure_single_small",
	Treasure_Single_Big = "treasure_single_big",
	Treasure_Double_L_Small = "treasure_double_l_small",
	Treasure_Double_L_Big = "treasure_double_l_big",
	Treasure_Double_R_Small = "treasure_double_r_small",
	Treasure_Double_R_Big = "treasure_double_r_big",
}
//#endregion

//#region 红点相关
/** 红点检测类型枚举 */
declare enum ERDTriggerType {
	/** 未读邮件红点 */
	MailNotRead = "ERDTriggerType_MailNotRead",
	/** 有奖励可领取邮件红点 */
	MailHaveReward = "ERDTriggerType_MailHaveReward",
	/** 未读公告红点 */
	AnnouncementHaveNotRead = "ERDTriggerType_AnnouncementHaveNotRead",
	/** 七日0有奖励可领取红点 */
	SevenDay0HaveReward = "ERDTriggerType_SevenDay0HaveReward",
	/** 七日1有奖励可领取红点 */
	SevenDay1HaveReward = "ERDTriggerType_SevenDay1HaveReward",
	/** 七日2有奖励可领取红点 */
	SevenDay2HaveReward = "ERDTriggerType_SevenDay2HaveReward",
	/** 七日3有奖励可领取红点 */
	SevenDay3HaveReward = "ERDTriggerType_SevenDay3HaveReward",
	/** 七日4有奖励可领取红点 */
	SevenDay4HaveReward = "ERDTriggerType_SevenDay4HaveReward",
	/** 七日5有奖励可领取红点 */
	SevenDay5HaveReward = "ERDTriggerType_SevenDay5HaveReward",
	/** 七日6有奖励可领取红点 */
	SevenDay6HaveReward = "ERDTriggerType_SevenDay6HaveReward",
}

declare enum ERDName {
	Root = "ERDName_Root",
	Main_Mail = "ERDName_Main_Mail",
	Main_Announcement = "ERDName_Main_Announcement",
	Main_SevenDay = "ERDName_Main_SevenDay",
	SevenDay_Day0 = "ERDName_SevenDay_Day0",
	SevenDay_Day1 = "ERDName_SevenDay_Day1",
	SevenDay_Day2 = "ERDName_SevenDay_Day2",
	SevenDay_Day3 = "ERDName_SevenDay_Day3",
	SevenDay_Day4 = "ERDName_SevenDay_Day4",
	SevenDay_Day5 = "ERDName_SevenDay_Day5",
	SevenDay_Day6 = "ERDName_SevenDay_Day6",

}
//#endregion

/** 配置表本地化字段名 */
declare enum ECfgLangField {
	name = "name",
	desc = "desc",
	desc2 = "desc2",
	desc_cv = "desc_cv",
	desc_item = "desc_item",
	desc_func = "desc_func",
	first_desc = "first_desc",
	normal_desc = "normal_desc",
	expire_desc = "expire_desc",
	room_name = "room_name",
	lock_tips = "lock_tips",
}

declare enum EColorString {
	_000000 = "#000000",
	_000080 = "#000080",
	_00aaff = "#00aaff",
	_00ff00 = "#00ff00",
	_51f1ff = "#51f1ff",
	_58c4db = "#58c4db",
	_66ccff = "#66ccff",
	_8c8c8c = "#8c8c8c",
	_8cb65f = "#8cb65f",
	_8d6f61 = "#8d6f61",
	_999999 = "#999999",
	_a9d94d = "#a9d94d",
	_d4815c = "#d4815c",
	_d9b263 = "#d9b263",
	_e0ab67 = "#e0ab67",
	_e8af71 = "#e8af71",
	_eab65e = "#eab65e",
	_ebb661 = "#ebb661",
	_edb26f = "#EDB26F",
	_f17828 = "#f17828",
	_f56aff = "#f56aff",
	_f7b75d = "#f7b75d",
	_ff0000 = "#ff0000",
	_ffc8c8 = "#ffc8c8",
	_ffc900 = "#ffc900",
	_ffffff = "#ffffff",
	_00000000 = "#00000000",
}

//#region 充值相关

/** 支付平台 */
declare enum EPaymentPlatform {
	DMM = "dmm",
	GooglePlay = "google_play",
	Iap = "iap",
	MyCard = "mycard",
	NintenDo = "nintendo",
	PayPal = "paypal",
	Steam = "steam",
	XSolla = "xsolla",
	XSollaV4 = "xsolla_v4",
	YoStarV4 = "yostar_v4",
	YoStarV4_KR = "yostar_v4_kr",
}

/** 支付渠道 */
declare enum EPaymentChannel {
	UnionPay = "unionpay",
	CreditCard = "creditcard",
	WeChat = "wechat",
	AliPay = "alipay"
}

/** 支付类型 */
declare enum EPaymentType {
	MyCard = 1,
	PayPal = 2,
	XSolla = 3,
	YinLian = 4,
	WeChat = 5,
	AliPay = 6,
	XinYongKa = 7,
}
//#endregion

/** 奖励领取状态 */
declare enum ERewardState {
	/** 无奖励 */
	NoReward = -1,
	/** 不可领取 */
	CanNotReward = 0,
	/** 可领取 */
	CanReward = 1,
	/** 已领取 */
	Rewarded = 2,
}

/** 背景音乐类型 */
declare enum EBgmType {
	Lobby = "lobby",
	Mj = "mj",
}

/** 角色语音类型 */
declare enum EVoiceType {
	/** 立直 */
	act_rich = "act_rich",
	/** 两立直 */
	act_drich = "act_drich",
	/** 吃 */
	act_chi = "act_chi",
	/** 碰 */
	act_pon = "act_pon",
	/** 杠 */
	act_kan = "act_kan",
	/** 拔北 */
	act_babei = "act_babei",
	/** 荣 */
	act_ron = "act_ron",
	/** 自摸 */
	act_tumo = "act_tumo",
	/** 获得语音 */
	lobby_selfintro = "lobby_selfintro",
	/** 对局开始 */
	ingame_start = "ingame_start",
	/** 终局一位 */
	game_top = "game_top",
	/** 终局一位-荣和获胜 */
	game_top_ron = "game_top_ron",
	/** 终局一位-高分获胜 */
	game_top_big = "game_top_big",
	/** 登录语音 普通/满羁绊 */
	lobby_playerlogin = "lobby_playerlogin",
	/** 大厅交互语音1-8 */
	lobby_normal = "lobby_normal",
	/** 送礼物语音普通 */
	lobby_gift = "lobby_gift",
	/** 送礼物语音喜好 */
	lobby_gift_favor = "lobby_gift_favor",
	/** 好感度升级语音1 */
	lobby_levelup0 = "lobby_levelup0",
	/** 好感度升级语音2 */
	lobby_levelup1 = "lobby_levelup1",
	/** 好感度升级语音3 */
	lobby_levelup2 = "lobby_levelup2",
	/** 好感度升级语音4 */
	lobby_levelup3 = "lobby_levelup3",
	/** 好感度升级语音5 */
	lobby_levelmax = "lobby_levelmax",
	/** 契约语音 */
	lobby_qiyue = "lobby_qiyue",
	/** 隐藏语音 - 新年|情人节 */
	lobby_limited = "lobby_limited",
	/** 枪杠 */
	fan_qianggang = "fan_qianggang",
	/** 岭上开花 */
	fan_lingshang = "fan_lingshang",
	/** 海底摸月 */
	fan_haidi = "fan_haidi",
	/** 河底捞鱼 */
	fan_hedi = "fan_hedi",
	/** 东 */
	fan_dong = "fan_dong",
	/** 南 */
	fan_nan = "fan_nan",
	/** 西 */
	fan_xi = "fan_xi",
	/** 北 */
	fan_bei = "fan_bei",
	/** 中 */
	fan_zhong = "fan_zhong",
	/** 白 */
	fan_bai = "fan_bai",
	/** 发 */
	fan_fa = "fan_fa",
	/** 连东 */
	fan_doubledong = "fan_doubledong",
	/** 连南 */
	fan_doublenan = "fan_doublenan",
	/** 连西 */
	fan_doublexi = "fan_doublexi",
	/** 连北 */
	fan_doublebei = "fan_doublebei",
	/** 断幺 */
	fan_duanyao = "fan_duanyao",
	/** 一杯口 */
	fan_yibeikou = "fan_yibeikou",
	/** 平和 */
	fan_pinghu = "fan_pinghu",
	/** 混全带幺九 */
	fan_hunquandaiyaojiu = "fan_hunquandaiyaojiu",
	/** 一气通贯 */
	fan_yiqitongguan = "fan_yiqitongguan",
	/** 三色同顺 */
	fan_sansetongshun = "fan_sansetongshun",
	/** 三色同刻 */
	fan_sansetongke = "fan_sansetongke",
	/** 三杠子 */
	fan_sangangzi = "fan_sangangzi",
	/** 对对和 */
	fan_duiduihu = "fan_duiduihu",
	/** 三暗刻 */
	fan_sananke = "fan_sananke",
	/** 小三元 */
	fan_xiaosanyuan = "fan_xiaosanyuan",
	/** 混老头 */
	fan_hunlaotou = "fan_hunlaotou",
	/** 七对子 */
	fan_qiduizi = "fan_qiduizi",
	/** 纯全带幺九 */
	fan_chunquandaiyaojiu = "fan_chunquandaiyaojiu",
	/** 混一色 */
	fan_hunyise = "fan_hunyise",
	/** 二杯口 */
	fan_erbeikou = "fan_erbeikou",
	/** 清一色 */
	fan_qingyise = "fan_qingyise",
	/** 立直 */
	fan_liqi = "fan_liqi",
	/** 两立直 */
	fan_dliqi = "fan_dliqi",
	/** 自摸 */
	fan_zimo = "fan_zimo",
	/** 一发 */
	fan_yifa = "fan_yifa",
	/** 宝牌 */
	fan_dora1 = "fan_dora1",
	/** 宝牌2 */
	fan_dora2 = "fan_dora2",
	/** 宝牌3 */
	fan_dora3 = "fan_dora3",
	/** 宝牌4 */
	fan_dora4 = "fan_dora4",
	/** 宝牌5 */
	fan_dora5 = "fan_dora5",
	/** 宝牌6 */
	fan_dora6 = "fan_dora6",
	/** 宝牌7 */
	fan_dora7 = "fan_dora7",
	/** 宝牌8 */
	fan_dora8 = "fan_dora8",
	/** 宝牌9 */
	fan_dora9 = "fan_dora9",
	/** 宝牌10 */
	fan_dora10 = "fan_dora10",
	/** 宝牌11 */
	fan_dora11 = "fan_dora11",
	/** 宝牌12 */
	fan_dora12 = "fan_dora12",
	/** 宝牌一大堆 */
	fan_dora13 = "fan_dora13",
	/** 天和 */
	fan_tianhu = "fan_tianhu",
	/** 地和 */
	fan_dihu = "fan_dihu",
	/** 大三元 */
	fan_dasanyuan = "fan_dasanyuan",
	/** 四暗刻 */
	fan_sianke = "fan_sianke",
	/** 四暗刻单骑 */
	fan_siankedanqi = "fan_siankedanqi",
	/** 字一色 */
	fan_ziyise = "fan_ziyise",
	/** 绿一色 */
	fan_lvyise = "fan_lvyise",
	/** 清老头 */
	fan_qinglaotou = "fan_qinglaotou",
	/** 国士无双 */
	fan_guoshiwushuang = "fan_guoshiwushuang",
	/** 国士无双13面听 */
	fan_guoshishisanmian = "fan_guoshishisanmian",
	/** 大四喜 */
	fan_dasixi = "fan_dasixi",
	/** 小四喜 */
	fan_xiaosixi = "fan_xiaosixi",
	/** 四杠子 */
	fan_sigangzi = "fan_sigangzi",
	/** 九莲宝灯 */
	fan_jiulianbaodeng = "fan_jiulianbaodeng",
	/** 纯正九莲宝灯 */
	fan_chunzhengjiulianbaodeng = "fan_chunzhengjiulianbaodeng",
	/** 流局满贯 */
	fan_liujumanguan = "fan_liujumanguan",
	/** 累计役满 */
	gameend_leijiyiman = "gameend_leijiyiman",
	/** 满贯 */
	gameend_manguan = "gameend_manguan",
	/** 跳满 */
	gameend_tiaoman = "gameend_tiaoman",
	/** 倍满 */
	gameend_beiman = "gameend_beiman",
	/** 三倍满 */
	gameend_sanbeiman = "gameend_sanbeiman",
	/** 役满 */
	gameend_yiman1 = "gameend_yiman1",
	/** 两倍役满 */
	gameend_yiman2 = "gameend_yiman2",
	/** 三倍役满 */
	gameend_yiman3 = "gameend_yiman3",
	/** 四倍役满 */
	gameend_yiman4 = "gameend_yiman4",
	/** 五倍役满 */
	gameend_yiman5 = "gameend_yiman5",
	/** 六倍役满 */
	gameend_yiman6 = "gameend_yiman6",
	/** 听牌 */
	gameend_tingpai = "gameend_tingpai",
	/** 未听牌 */
	gameend_noting = "gameend_noting",
	/** 四风连打 */
	gameend_sifenglianda = "gameend_sifenglianda",
	/** 四杠流局 */
	gameend_sigangliuju = "gameend_sigangliuju",
	/** 四家立直 */
	gameend_sijializhi = "gameend_sijializhi",
	/** 九种九牌 */
	gameend_jiuzhongjiupai = "gameend_jiuzhongjiupai",
	/** 杠上炮 */
	scfan_lingshangfangchong = "scfan_lingshangfangchong",
	/** 根 */
	scfan_gen = "scfan_gen",
	/** 带幺九 */
	scfan_daiyaojiu = "scfan_daiyaojiu",
	/** 金钩钓 */
	scfan_jingoudiao = "scfan_jingoudiao",
	/** 清对 */
	scfan_qingdui = "scfan_qingdui",
	/** 将对 */
	scfan_jiangdui = "scfan_jiangdui",
	/** 龙七对 */
	scfan_longqidui = "scfan_longqidui",
	/** 清七对 */
	scfan_qingqidui = "scfan_qingqidui",
	/** 清幺九 */
	scfan_qingyaojiu = "scfan_qingyaojiu",
	/** 清金钩钓 */
	scfan_qingjindoudiao = "scfan_qingjindoudiao",
	/** 清龙七对 */
	scfan_qinglongqidui = "scfan_qinglongqidui",
	/** 十八罗汉 */
	scfan_shibaluohan = "scfan_shibaluohan",
	/** 清十八罗汉 */
	scfan_qingshibaluohan = "scfan_qingshibaluohan",
	/** 特殊语音 - 连续打出多张相同牌 */
	ingame_lianda = "ingame_lianda",
	/** 特殊语音 - 打出宝牌 */
	ingame_baopai = "ingame_baopai",
	/** 特殊语音 - 余牌少于10 */
	ingame_remain10 = "ingame_remain10",
	/** 特殊语音 - 役满听牌 */
	ingame_yiman = "ingame_yiman",
	/** 特殊语音 - 倍满/三倍满听牌 */
	ingame_beiman = "ingame_beiman",
	/** 特殊语音 - 进入友人房 */
	lobby_room_in = "lobby_room_in",
	/** 特殊语音 - 友人房内准备 */
	lobby_room_ready = "lobby_room_ready",
}
