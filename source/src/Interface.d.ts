
declare interface IGameManager {
    /** 设备id */
    get deviceId(): string;
    get language(): string;
    get clientType(): string;
    get payChannelId(): number;
    getCurrency(): number[];
    getDeviceInfo(): IClientDeviceInfo;
    showConfirm(msg: string): Promise<boolean>;
    getReportClientType(): string;
}