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

	/**绑定手机号完成 */
	BindPhoneCompleted = "NotifyConst_BindPhoneCompleted",

	LoginSuccess = "NotifyConst_LoginSuccess",

	//#region logicScene相关
	/** 场景开始加载 */
	OnSceneLoadBegin = "NotifyConst_OnSceneLoadBegin",
	/** 场景加载进度 */
	OnSceneLoadProgress = "NotifyConst_OnSceneLoadProgress",
	/** 场景加载结束 */
	OnSceneLoadEnd = "NotifyConst_OnSceneLoadEnd",
	/** 进入场景 */
	OnEnterScene = "NotifyConst_OnEnterScene",
	/** 退出场景 */
	OnExitScene = "NotifyConst_OnExitScene",
	//#endregion

	//#region 邮件相关
	OnMailDataChanged = "NotifyConst_OnMailDataChanged",
	//#endregion

	//#region 好友相关
	OnFriendChanged = "NotifyConst_OnFriendChanged",
	OnFriendApplyChanged = "NotifyConst_OnFriendApplyChanged",
	OnFriendRecentChanged = "NotifyConst_OnFriendRecentChanged",
	//#endregion
}