declare interface IIPInfo {
	name: string;
	gateways: { id: string, url: string; }[];
	system_email_url: string;
	prefix_url: string;
	contest_chat_url: string;
	dhs_url: string;
	zone_ids?: number[];
}

declare interface IConfig {
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
	get platform(): string;
	get reqPlatform(): string;
	get detailPlatform(): string;
	get inDmm(): boolean;
	/** 设备id */
	get deviceId(): string;
	/** 设备信息 */
	get deviceInfo(): ProtoObject<IClientDeviceInfo>;
	/** 客户端语言 */
	get language(): ELanguage;
	/** 客户端类型 */
	get clientType(): EClientType;
	/** 包体版本 */
	get packageVersion(): string;
	/** 热更版本 */
	get resourceVersion(): string;
	/** 登录相关协议版本字符串 */
	get clientVersionStr(): string;
	/** ui显示的版本字符串 */
	get displayVersionStr(): string;
	/** 使用的货币 */
	get currency(): number[];
	/** 支付通道 */
	get payChannelId(): number;
	/** 上报客户端类型 */
	get reportClientType(): string;
	/** 重复登陆 */
	get multiLogin(): boolean;
	get regionLimited(): boolean;
	get config(): IConfig;
	get ipInfo(): IIPInfo;
	get zoneIds(): number[];
	init(ipIndex: number, config: IConfig): void;
	showConfirm(msg: string): Promise<boolean>;
	exitGame(logout: boolean, tipLangId?: number): void;
}