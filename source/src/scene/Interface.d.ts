/** 逻辑场景 */
declare interface IScene<T = any> extends IObserver {
	readonly type: ESceneType;
	/** 场景打开数据 */
	readonly data: T;
	readonly views: Set<EUIViewID>;

	/**加载场景，进入场景前的资源加载 */
	load(): Promise<void>;

	/** 进入场景，资源加载后执行 */
	enter(data: any): Promise<void>;

	/** 退出场景 */
	exit(): Promise<void>;
}

declare interface ISceneManager {
	registerScene(type: ESceneType, scene: Class<IScene>): void;
	registerView(type: ESceneType, view: EUIViewID): void;
	enterScene(type: ESceneType, data?: any): Promise<void>;
}