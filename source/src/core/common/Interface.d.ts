declare type LoadURL = string | Laya.ILoadURL | (string | Readonly<Laya.ILoadURL>)[];
declare interface ILoadManager {
	fetch<D = any>(url: string, contentType: keyof Laya.ContentTypeMap, onProgress?: Laya.ProgressCallback, options?: Laya.ILoadOptions): Promise<D>;

	load<D extends Object, T extends LoadURL>(url: T, type?: string, onProgress?: Laya.ProgressCallback): Promise<T extends Array<any> ? D[] : D>;
	load<D extends Object, T extends LoadURL>(url: T, options?: Laya.ILoadOptions, onProgress?: Laya.ProgressCallback): Promise<T extends Array<any> ? D[] : D>;
	load<D extends Object, T extends LoadURL>(url: T, complete?: Laya.Handler, progress?: Laya.Handler, type?: string, priority?: number, cache?: boolean, group?: string, ignoreCache?: boolean, useWorkerLoader?: boolean): Promise<T extends Array<any> ? D[] : D>;

	loadPackage(resKey: string | string[], progressHandler?: Laya.Handler | ((progress: number) => void)): Promise<fgui.UIPackage[]>;

	getRes<T = any>(url: string, type?: string): T;
	cancelLoadByUrl(url: string): void;
	clearRes(url: string, checkObj?: any): void;

	clearTextureRes(url: string): void;
}

declare interface ILogger {
	log(...args: any[]): void;
	warn(...args: any[]): void;
	error(...args: any[]): void;
	assert(assert: boolean, tipText?: string): void;
	setEnable(enable: boolean): void;
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
	 * @param aniMode 动画类型及其描述 default 0
	 * - 模式 0: 使用模板缓冲数据，不允许修改。（内存开销小，计算开销小，不支持换装）
	 * - 模式 1: 使用动画自己的缓冲区，每个动画都有自己的缓冲区，相当耗费内存。（内存开销大，计算开销小，支持换装）
	 * - 模式 2: 使用动态方式进行实时绘制。（内存开销小，计算开销大，支持换装，不建议使用）
	 */
	create(url: string, aniMode?: 0 | 1 | 2): Laya.Skeleton;
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
	owner: Laya.Sprite;
	get spineId(): number;
	play(nameOrIndex: string | number, loop: boolean, force?: boolean, start?: number, end?: number, freshSkin?: boolean, playAudio?: boolean): void;
	recover(): void;
}

declare interface ISpineManager {
	init(): Promise<void>;
	loadIllustData(id: number): Promise<ISpineIllustSkinData>;
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

	/**
	 * 数字转组合数字
	 * @param num 
	 * @param fixed default 2
	 */
	groupNumber(num: number, fixed?: number): string;

	/**
	 * 
	 * @param num 
	 * @param dp default 3
	 */
	num2Letter(num: number, dp?: number): string;

	letter2Num(str: string): number;

	/**
	 * 返回min-max之间得随机整数
	 * @param min 最小值整数(包含)
	 * @param max 最大值整数(包含)
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
	/** 重复0-length */
	repeat(t: number, length: number): number;
	/** 反复0-length-0 */
	pingpong(t: number, length: number): number;
}

declare interface IItemInfo {
	name: string;
	/** 正式使用的图标，半透明背景 */
	icon: string;
	/** 显示在物品详情的图标，非半透明背景 */
	itemIcon: string;
	/** 预览图标 */
	previewIcon: string;
	desc: string;
	func: string;
	/** 资源名称，item_definition.view表中的res_name */
	resName: string;
	/** 资源路径 */
	resPath: string;
	/** 资源图集路径（牌背和牌面） */
	atlasPath: string;
	/** 图集纹理路径（牌背和牌面） */
	atlasTexPath: string;
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
	getPlayerPlayingInfo(data: { is_online: boolean; playing: IAccountPlayingGame; logout_time: number; }): { color: string, text: string; };
	/** 获取玩家是否在游戏中 */
	getPlayerInGaming(data: IAccountPlayingGame): boolean;
	/**
	 * 打开链接
	 * @param url 链接地址
	 * @param openNew 是否打开新窗口，默认true
	 */
	openHref(url: string, openNew?: boolean): void;
	/**
	 * 冻结对象
	 * @param obj 需要冻结的对象
	 * @param deep 是否深度冻结，默认true
	 * @returns 冻结后的对象
	 */
	freeze<T>(obj: T, deep?: boolean): T;
	/** 下载文本 */
	downloadTxt(fileName: string, text: string): void;
	/** 加载脚本 */
	loadScript(url: string): Promise<boolean>;
}

declare interface ITimeUtil {
	readonly MinSec: number;
	readonly HourSec: number;
	readonly DaySec: number;
	readonly WeekSec: number;
	readonly MonthSec: number;
	readonly YearSec: number;
	/** 当前时间，毫秒 */
	get milliSecond(): number;
	/** 当前时间，秒 */
	get second(): number;
	/** 当前年份，2026 */
	get year(): number;
	/** 当前月份，1-12 */
	get month(): number;
	/** 当前日期，1-28|29|30|31 */
	get date(): number;
	/** 当前星期，0-6, 0是周日 */
	get day(): number;
	/** 设置服务器时间，ms */
	setServerTime(time: number): void;
	/** 将yyyy-mm-dd转换成时间戳 */
	getTimeByString(timeStr: string): number;
	/** 将毫秒数转化成 `1970/1/1 08:00:15` 的格式 */
	timeFormat1(timestamp: number): string;
	/** 将秒数转换成 `01:23:45` 的格式 */
	timeFormat2(second: number): string;
	/** 将秒数转换成 `1小时2分3秒` 的格式 */
	timeFormat3(second: number): string;
	/** 将秒数转换成 `x天` 或 `x小时` 或 `x分` 或 `x秒` 的格式 */
	timeFormat4(second: number): string;
	/** 将秒数转换成 `刚刚`、`10分钟前`、`x小时前`、`x天前`、`x周前`、`x月前` 的格式 */
	timeFormat5(second: number): string;

	/**
	 * 将日期转换成 `1970/1/1` 的格式
	 * @param timestamp 
	 * @param split 替换 / 符号
	 */
	dateFormat1(timestamp: number, split?: string): string;
	/**
	 * 将日期转换成 `18:51:05` 的格式
	 * @param timestamp 
	 * @param split 替换 : 符号
	 */
	dateFormat2(timestamp: number, split?: string): string;

	/** 等待 `milSec` 毫秒 */
	wait(milSec: number): Promise<void>;
}

declare interface ILocalDataManager {
	getNum(key: ELocalDataKey, defaultValue?: number): number;
	setNum(key: ELocalDataKey, value: number): void;

	getStr(key: ELocalDataKey, defaultValue?: string): string;
	setStr(key: ELocalDataKey, value: string): void;

	getBool(key: ELocalDataKey, defaultValue?: boolean): boolean;
	setBool(key: ELocalDataKey, value: boolean): void;

	getObj<T extends object>(key: ELocalDataKey, defaultValue?: T): T;
	setObj<T extends object>(key: ELocalDataKey, value: T): void;

	remove(key: ELocalDataKey): void;
	removeAll(): void;
}

declare interface IItemUtil {
	/** 拆分物品数量字符串 */
	splitItems(str: string): IItem[];
	getItemType(id: number): EItemType;
	getItemInfo(id: number): ReadonlyAll<IItemInfo>;
}

declare interface IAudioManager {
	playAudio(id: number): void;
	playAudio(path: string): void;

	playBgm(id: number): void;
	playBgm(path: string): void;
}