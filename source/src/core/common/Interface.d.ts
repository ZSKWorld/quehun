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

declare interface IItemInfo {
	name: string;
	/** 正式使用的图标，半透明背景 */
	icon: string;
	/** 显示在物品详情的图标，非半透明背景 */
	itemIcon: string;
	desc: string;
	func: string;
	titleIcon: string;
	/** 皮肤信息 */
	skinInfo: IItemInfo_SkinInfo;
}

declare interface IItemInfo_SkinInfo {
	full: string;
	half: string;
	bighead: string;
	smallhead: string;
	smallhead1: string;
	smallhead2: string;
	smallhead3: string;
	waitingroom: string;
	x: string;
}

declare interface IGameUtil {
	/** 加密标准字符串，若出现不认识的字符，原样保留 */
	encrypt(str: string): string;
	/** 解密标准字符，与加密配合使用 */
	decrypt(str: string): string;
	encodeAccountId(id: number): number;
	decodeAccountId(encodedId: number): number;
	encryptAccountId(id: number): number;
	decryptAccountId(encryptId: number): number;
	createUUID(): string;
	/** 随机颜色字符串 */
	randomColor(): string;
	HmacSHA256(msg: string): string;
	getI18nContext(i18n: ProtoObject<II18nContext>[], defValue?: string): string;
	/** 是否是ai账号 */
	isAI(accountId: number): boolean;
	/** 获取账号区域id */
	getZoneId(accoundId: number): number;
	/** 是否是同区域(同服) */
	isSameZone(accountId1: number, accountId2: number): boolean;
	/** 获取玩家游戏状态信息 */
	getPlayerPlayingInfo(data: { is_online: boolean; playing: IAccountPlayingGame; logout_time: number }): { color: string, text: string };
	/** 获取玩家是否在游戏中 */
	getPlayerInGaming(data: IAccountPlayingGame): boolean;
}

declare interface ITimeUtil {
	/** 当前时间，毫秒 */
	get milliSecond(): number;
	/** 当前时间，秒 */
	get second(): number;
	/** 设置服务器时间，ms */
	setServerTime(time: number): void;
	/** 将yyyy-mm-dd转换成时间戳 */
	getTimeByString(timeStr: string): number;
	/** 将时间戳转化成 `1970/1/1 08:00:15` 的格式 */
	timeFormat1(timestamp: number): string;
	/** 将秒数转换成 `01:23:45` 的格式 */
	timeFormat2(second: number): string;
	/** 将秒数转换成 `1小时23分45秒` 的格式 */
	timeFormat3(second: number): string;
	/** 将秒数转换成 `x天` 或 `x小时` 或 `x分` 或 `x秒` 的格式 */
	timeFormat4(second: number): string;
	/** 把unix时间戳（秒）根据现在时间转化成“刚刚”、“10分钟前”这样的描述 */
	timeFormat5(timestamp: number): string;
	/** 等待 `milSec` 毫秒 */
	wait(milSec: number): Promise<void>;
}

declare interface ILocalDataManager {
	set<T = any>(key: ELocalDataKey, value: T): void;

	get<T = any>(key: ELocalDataKey, defaultValue?: T): T;

	remove(key: ELocalDataKey): void;

	removeAll(): void;
}

declare interface IItemUtil {
	getItemType(id: number): EItemType;
	getItemInfo(id: number): IItemInfo;
}