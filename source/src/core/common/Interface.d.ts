declare interface ILoadManager {
	fetch<K extends keyof Laya.ContentTypeMap>(url: string, contentType: K, onProgress?: Laya.ProgressCallback, options?: Readonly<Laya.ILoadOptions>): Promise<Laya.ContentTypeMap[K]>;

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
	 * @param urls 动画路径 {@link ResPath.ESkeletonPath}[]
	 */
	load(urls: string[], progress?: Laya.Handler): Promise<Laya.Templet[]>;
	/**
	 * 获取一个骨骼动画
	 * @param url 动画路径 {@link ResPath.ESkeletonPath}
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

declare interface ISpineController extends Laya.Script {
	override owner: Laya.Sprite;
	get gowner(): fgui.GComponent;
	get spineId(): number;
	play(nameOrIndex: string | number, loop: boolean, force?: boolean, start?: number, end?: number, freshSkin?: boolean, playAudio?: boolean): void;
}

declare interface ISpineManager {
	/**
	 * 加载spine动画模板
	 * @param ids spine id
	 */
	load(ids: number[], progress?: Laya.Handler): Promise<Laya.SpineTemplet[][]>;
	/**
	 * 获取一个spine动画
	 * @param id spine id
	 * @param parent 父节点
	 */
	create(id: number, parent?: fgui.GComponent): ISpineController;
	/**
	 * 回收spin动画到对象池
	 */
	recover(spine: ISpineController): void;
	/**
	 * 清除动画对象池
	 * @param url
	 */
	clear(id: number): void;
	/**
	 * 销毁动画并释放内存
	 */
	dispose(id: number): void;
}

declare interface IMathUtil {
	readonly Radian: number;

	/** 角度转弧度 */
	angle2Radian(angle: number): number;

	/** 弧度转角度 */
	radian2Angle(radian: number): number;

	/**数字转中文数字 */
	chineseNum(num: number): string;

	/**数字转组合数字 */
	groupNumber(num: number, fixed: number = 2): string;

	num2Letter(num: number, dp: number = 3): string;

	letter2Num(str: string): number;

	/**
	 * 返回min-max之间得随机整数
	 * @param min 最小值整数(包含)
	 * @param max 最大值整数(不包含)
	 * @returns
	 */
	randomInt(min: number, max: number): number;

	/**
	 * 返回min-max之间得随机数
	 * @param min 最小值(包含)
	 * @param max 最大值(不包含)
	 * @returns
	 */
	randomFloat(min: number, max: number): number;

	/**
	 * 数值限制
	 * @param value
	 * @param min
	 * @param max
	 * @returns
	 */
	clamp(value: number, min: number, max: number): number;

	/**
	 * 数值限制在0-1
	 * @param value
	 * @returns
	 */
	clamp01(value: number): number;

	/** x从0平滑过渡到1 */
	smoothStep(x: number): number;

	lerp(a: number, b: number, t: number): number;

	/** 获取数字正负号 */
	symbol(num: number): -1 | 0 | 1;
}

declare interface IGameUtil {
	createUUID(): string;
	/** 随机颜色字符串 */
	randomColor(): string;
	HmacSHA256(msg: string): string;
}

declare interface ITimeUtil {
	get milliSecond(): number;
	get second(): number;
	milliSecond2YMDHMS(milliSecond: number): string;
	timeFormat(second: number, keepHour: boolean = true): string;
	timeFormatChinese(second: number): string;
	wait(milSec: number): Promise<void>;
}

declare enum ELocalDataKey {
	/** 自动登录 */
	AutoLogin = "LocalDataKey_AutoLogin",
	/** 上次登录账号 */
	LastLoginData = "LocalDataKey_LastLoginData",
	/** 设备id */
	DeviceId = "LocalDataKey_DeviceId",
	/** 重复登陆 */
	MultiLogin = "LocalDataKey_MultiLogin",
}

declare interface ILocalDataManager {
	set<T = any>(key: ELocalDataKey, value: T): void;

	get<T = any>(key: ELocalDataKey): T;

	remove(key: ELocalDataKey): void;

	removeAll(): void;
}