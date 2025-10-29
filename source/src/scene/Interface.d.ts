/** 逻辑场景 */
declare interface IScene<T = any> extends IObserver {
	readonly type: SceneType;
	/** 场景打开数据 */
	readonly data: T;
	readonly views: Set<string>;

	/**加载场景，进入场景前的资源加载 */
	load(): Promise<void>;

	/** 进入场景，资源加载后执行 */
	enter(data: any): void;

	/** 退出场景 */
	exit(): void;
}

declare interface ISceneManager {
	registerScene(type: string, scene: Class<IScene>): void;
	registerView(type: string, view: string): void;
	/**
	 * 
	 * @param type ESceneType
	 * @param data 
	 */
	enterScene(type: string, data?: any): void;
}