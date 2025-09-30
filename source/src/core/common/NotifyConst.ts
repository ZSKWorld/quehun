export const enum ENotifyConst {
	/** 游戏回到前台事件 */
	OnGameShow = "NotifyConst_OnGameShow",
	/** 游戏隐藏后台事件 */
	OnGameHide = "NotifyConst_OnGameHide",

	/** 红点组件唤醒 */
	RedDotCompAwake = "NotifyConst_RedDotCompAwake",
	/** 红点组件销毁 */
	RedDotCompDestroy = "NotifyConst_RedDotCompDestroy",

	//#region 网络相关
	LobbyConnecting = "NotifyConst_LobbyConnectting",
	LobbyReconnecting = "NotifyConst_LobbyReconnecting",
	LobbyConnected = "NotifyConst_LobbyConnected",
	LobbyClosed = "NotifyConst_LobbyClosed",
	GameConnecting = "NotifyConst_GameConnecting",
	GameReconnecting = "NotifyConst_GameReconnecting",
	GameConnected = "NotifyConst_GameConnected",
	GameClosed = "NotifyConst_GameClosed",
	OBConnecting = "NotifyConst_OBConnecting",
	OBReconnecting = "NotifyConst_OBReconnecting",
	OBConnected = "NotifyConst_OBConnected",
	OBClosed = "NotifyConst_OBClosed",
	//#endregion


}