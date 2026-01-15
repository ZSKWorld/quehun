/** 本地化语言 */
declare enum ELanguage {
	CHS = "chs",
	CHST = "chs_t",
	EN = "en",
	JP = "jp",
	KR = "kr",
	US_KR = "us-kr",
}

/** 行政版本 */
declare enum EClientType {
	CHS = "chs",
	CHST = "chs_t",
	EN = "en",
	JP = "jp",
	KR = "kr",
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
	get clientLanguage(): ELanguage;
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
	init(): Promise<void>;
	showConfirm(msg: string): Promise<boolean>;
}