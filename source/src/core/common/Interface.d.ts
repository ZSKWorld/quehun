declare interface INotifier {
    /**
     * 派发事件。
     * @param eventName 事件类型。
     * @param data （可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；
     * 如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
     */
    dispatch(eventName: string, data?: any): void;
}

declare interface IObserver extends INotifier {

}

declare interface ILoadManager {
    load<D = any, T extends LoadURL>(url: T, type?: string, onProgress?: Laya.ProgressCallback): Promise<T extends Array<any> ? D[] : D>;
    load<D = any, T extends LoadURL>(url: T, options?: Readonly<Laya.ILoadOptions>, onProgress?: Laya.ProgressCallback): Promise<T extends Array<any> ? D[] : D>;
    load<D = any, T extends LoadURL>(url: T, complete?: Laya.Handler, progress?: Laya.Handler, type?: string, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean, useWorkerLoader?: boolean): Promise<T extends Array<any> ? D[] : D>;

    loadPackage(resKey: string | string[], progressHandler?: Laya.Handler | ((progress: number) => void)): Promise<fgui.UIPackage[]>;

    getRes<T = any>(url: string, type?: string): T;

    clearRes(url: string, checkObj?: any): void;

    clearTextureRes(url: string): void;
}

declare class Logger {
    private constructor(name: string, enable?: boolean);
    static create(name: string, enable?: boolean): Logger;
    static setEnable(enable: boolean): void;
    static log(...args: any[]): void;
    static warn(...args: any[]): void;
    static error(...args: any[]): void;
    static assert(assert: boolean, tipText?: string): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    assert(assert: boolean, tipText?: string): void;
}

declare interface ISkeletonManager {
    /**
     * 加载骨骼动画模板
     * @param urls 动画路径 {@link ResPath.SkeletonPath}[]
     */
    load(urls: string[], progress?: Laya.Handler): Promise<Laya.Templet[]>;
    /**
     * 获取一个骨骼动画
     * @param url 动画路径 {@link ResPath.SkeletonPath}
     * @param enableSkin 是否开启换装
     */
    create(url: string, aniMode: 0 | 1 | 2 = 0): Laya.Skeleton;
    /**
     * 回收骨骼动画到对象池
     */
    recover(skeleton: Laya.Skeleton): void;
    /**
     * 清除动画对象池
     * @param url
     */
    clear(url: string): void;
    /**
     * 销毁动画并释放内存
     */
    dispose(url: string): void;
}