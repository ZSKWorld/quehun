export const enum NotifyConst {
	/** 初始化上下文 */
	InitContext = "NotifyConst_InitContext",
	/** 游戏回到前台事件 */
	OnGameShow = "NotifyConst_OnGameShow",
	/** 游戏隐藏后台事件 */
	OnGameHide = "NotifyConst_OnGameHide",

	/** 红点组件唤醒 */
	RedDotCompAwake = "NotifyConst_RedDotCompAwake",
	/** 红点组件销毁 */
	RedDotCompDestroy = "NotifyConst_RedDotCompDestroy",

	LoginSuccess = "NotifyConst_LoginSuccess",
	LoginFail = "NotifyConst_LoginFail",

	/** 添加游戏日志 */
	AddGameLog = "NotifyConst_AddGameLog",
	/** 清除游戏日志 */
	ClearGameLog = "NotifyConst_ClearGameLog",

	/** 清除账号 */
	ClearAccount = "NotifyConst_ClearAccount",


	/** 进入战斗 */
	EnterBattle = "NotifyConst_EnterBattle",
	/** 退出战斗 */
	ExitBattle = "NotifyConst_ExitBattle",

	/** 开始采集 */
	StartGather = "NotifyConst_StartGather",

}