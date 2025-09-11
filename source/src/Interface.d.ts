declare interface IGameManager {
    /** 设备id */
    get deviceId(): string;
    /** 设备信息 */
    get deviceInfo(): IClientDeviceInfo;
    /** 客户端语言 */
    get language(): string;
    /** 客户端类型 */
    get clientType(): string;
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
    init(): Promise<void>;
    showConfirm(msg: string): Promise<boolean>;
}