declare type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? A : B;
/** 获取对象上所有readonly字段名 */
declare type ReadonlyKeys<T> = { [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P> }[keyof T];
/** 获取对象上所有非readonly字段名 */
declare type NonReadonlyKeys<T> = { [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P, never> }[keyof T];
/** 获取对象上所有方法名 */
declare type MethodKeys<T> = { [P in keyof T]: T[P] extends Function ? P : never }[keyof T];
/** 获取对象上所有非方法名 */
declare type NonMethodKeys<T> = { [P in keyof T]: T[P] extends Function ? never : P }[keyof T];
/** 获取对象上所有非方法和非readonly字段 */
declare type OriginData<T> = Pick<T, OriginDataKeys<T>>;
/** 获取对象上所有非方法和非readonly字段名 */
declare type OriginDataKeys<T> = NonReadonlyKeys<T> & NonMethodKeys<T>;

declare type SimpleHandler = Laya.Handler | (() => void);
/** 设置对象上所有字段只读 */
declare type ReadonlyAll<T> = { readonly [P in keyof T]: T[P] extends Function ? T[P] : ReadonlyAll<T[P]>; };
/** 设置对象上所有字段可选 */
declare type PartialAll<T> = { [P in keyof T]?: Partial<T[P]>; };
declare type KeyMap<T> = { [key: string]: T; };
declare type Class<T> = new (...args: any[]) => T;

declare const $gameMgr: IGameManager;
declare const $netMgr: INetManager;
declare const $user: DO.IUserDO;
declare const $cfgMgr: IConfigManager;
declare const $loadMgr: ILoadManager;
declare const $skeletonMgr: ISkeletonManager;
declare const $uiMgr: IUIManager;
declare const $tipMgr: ITipManager;
declare const $sceneMgr: ISceneManager;
declare const $facade: IFacade;
declare const $pbMgr: IPbManager;
declare const $localDataMgr: ILocalDataManager;
declare const $itemUtil: IItemUtil;
declare const $gameUtil: IGameUtil;
declare const $redDotMgr: IRedDotManager;
declare const $timeUtil: ITimeUtil;
declare const $mathUtil: IMathUtil;
declare const $spineMgr: ISpineManager;
declare const $uiUtil: IUIUtil;
declare const $dynamicResMgr: IDynamicResManager;

/** 注入全局变量 */
declare function $windowImmit(name: string, obj: any): void;

/**
 * 扩展类字段，用于在外部定义的字段在内部可读，扩展的字段或方法不能在构造期间调用
 * @param cls 要扩展的类
 * @returns 扩展后的类
 */
declare function ExtensionClass<E, T>(cls: Class<T>): Class<T & E>;

/** 单例类装饰器 */
declare function SingletonClass<T>(constructor: T): T;

/** 把proto数据转成普通object对象 */
declare function $decodeProtoData<T extends IProto | IProto[]>(data: T): ProtoObject<T>;

declare namespace CryptoJS {
	class AES {
		static encrypt(message: string, key: string): any;
	}
	function HmacSHA256(message: string, key: string): any;
}