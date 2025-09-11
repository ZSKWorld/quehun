/** 逻辑场景类型枚举 */
export const enum SceneType {
	LoginScene = "LoginScene",
	MainScene = "MainScene",
}

export const enum SceneEvent {
	/** 场景开始加载 */
	OnLoadBegin = "SceneEvent_OnLoadBegin",
	/** 场景加载进度 */
	OnLoadProgress = "SceneEvent_OnLoadProgress",
	/** 场景加载结束 */
	OnLoadEnd = "SceneEvent_OnLoadEnd",
	/** 进入场景 */
	OnEnterScene = "SceneEvent_OnEnterScene",
	/** 退出场景 */
	OnExitScene = "SceneEvent_OnExitScene",
}