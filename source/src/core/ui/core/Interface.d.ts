/**
 * 页面控制器键盘事件装饰器工厂
 * @param keyEventType 事件类型
 * @param key 触发事件的键值，-1 所有键都可以触发，默认-1
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
declare function ViewKeyEvent(keyEventType: EKeyEventType, key?: number, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 页面控制器鼠标事件装饰器工厂
 * @param mouseEventType 事件类型
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
declare function ViewMouseEvent(mouseEventType: EMouseEventType, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 页面控制器自定义事件装饰器工厂
 * @param name 事件名称
 * @param once 是否只监听一次
 * @param args  参数
 * @returns MethodDecorator
 */
declare function ViewEvent(name: string, once?: boolean, args?: any[]): MethodDecorator;

declare interface IDynamicResManager {
	add(path: string): void;
	remove(path: string): void;
	setLoader(loader: fgui.GLoader, path: string): void;
	clearLoader(loader: fgui.GLoader): void;
}

declare interface IUIManager {
	init(): void;

	/**
	 * 添加对象
	 * @param obj 要添加的对象
	 * @param layer 目标层级
	 * @param index 插入位置
	 * @returns
	 */
	addToLayer(obj: fgui.GObject, layer: ELayer, index?: number): void;

	/** 是否是最顶层ui */
	isTopView(view: IMediator | IView): boolean;

	/**
	 * 打开页面
	 * @param viewId 页面id
	 * @param data 传入参数
	 * @param openType 页面打开对当前页面操作的类型
	 */
	openView<T = any>(viewId: EViewID, data?: T, openType: EViewOpenType = EViewOpenType.None): Promise<void>;

	/** 移除页面
	 * @param viewId 页面id
	 */
	closeView(viewId: EViewID): Promise<void>;

	/** 移除所有页面 */
	closeAllView(): void;

	destroyView(viewId: EViewID): void;
}
