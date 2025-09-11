
declare interface IGameManager {
    /** 设备id */
    get deviceId(): string;
    get language(): string;
    get clientType(): string;
    get version(): string;
    get clientVersion(): string;
    get payChannelId(): number;
    init(): Promise<void>;
    getCurrency(): number[];
    getDeviceInfo(): IClientDeviceInfo;
    showConfirm(msg: string): Promise<boolean>;
    getReportClientType(): string;
}