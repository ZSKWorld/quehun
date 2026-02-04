declare interface IIPInfo {
	name: string;
	gateways: { id: string, url: string }[];
	system_email_url: string;
	prefix_url: string;
	contest_chat_url: string;
	dhs_url: string;
	zone_ids?:number[];
}

declare interface IIPConfig {
	ip: IIPInfo[];
	goods_sheleve_id: string;
	emergency_url: string;
	awsc_sdk_js: string;
	nec_sdk_js: string;
	tracker_url: string;
	wapchat_url: string;
	mycard_url: string;
	homepage_url: string;
	fb_oauth_url: string;
	fb_sdk_js: string;
	sgoogle_redirect_uri: string;
}

declare interface IGameManager {
	get released(): boolean;
	get inDmm(): boolean;
	/** 设备id */
	get deviceId(): string;
	/** 设备信息 */
	get deviceInfo(): ProtoObject<IClientDeviceInfo>;
	/** 客户端语言 */
	get language(): ELanguage;
	/** 客户端类型 */
	get clientType(): EClientType;
	/** 资源版本 */
	get version(): string;
	/** 客户端版本 */
	get clientVersion(): string;
	/** 使用的货币 */
	get currency(): number[];
	/** 支付通道 */
	get payChannelId(): number;
	/** 上报客户端类型 */
	get reportClientType(): string;
	/** 重复登陆 */
	get multiLogin(): boolean;
	get regionLimited(): boolean;
	get ipConfig(): IIPConfig;
	get ipInfo(): IIPInfo;
	get zoneIds(): number[];
	init(): Promise<void>;
	showConfirm(msg: string): Promise<boolean>;
}

declare const enum ENotifyConst {
	/** 游戏回到前台事件 */
	OnGameShow = "NotifyConst_OnGameShow",
	/** 游戏隐藏后台事件 */
	OnGameHide = "NotifyConst_OnGameHide",

	/** 红点组件唤醒 */
	RedDotCompAwake = "NotifyConst_RedDotCompAwake",
	/** 红点组件销毁 */
	RedDotCompDestroy = "NotifyConst_RedDotCompDestroy",
	/** 初始完成 */
	OnInitGameCompleted = "NotifyConst_OnInitGameCompleted",

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
	/** 登录成功 */
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

}