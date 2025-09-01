
declare interface ISafeArea {
    /** 安全区域右下角纵坐标 */
    bottom: number;
    /** 安全区域的高度，单位逻辑像素 */
    height: number;
    /** 安全区域左上角横坐标 */
    left: number;
    /** 安全区域右下角横坐标 */
    right: number;
    /** 安全区域左上角纵坐标 */
    top: number;
    /** 安全区域的宽度，单位逻辑像素 */
    width: number;
}

declare interface IGameConfig {
    readonly stat: boolean;
    readonly released: boolean;
    readonly platform: PlatformType;
}

declare interface IPlatform {
    /** 屏幕安全区域 */
    get safeArea(): ISafeArea;
    /** 右上角胶囊按钮区域 */
    get menuBtnArea(): ISafeArea;
    get config(): IGameConfig;
    init(config: IGameConfig): void;
    showConfirm(title: string, msg: string): Promise<boolean>;
}

declare interface IPlatformManager extends IPlatform {
    get stat(): boolean;
    get released(): boolean;
    get platform(): PlatformType;
    init(): void;
    isPlatform(type: PlatformType): boolean;
}