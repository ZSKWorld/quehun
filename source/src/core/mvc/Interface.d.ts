declare type IViewClass = Class<IView> & { createInstance?(): IView; };
declare type IMediatorClass = Class<IMediator>;
declare type ICommandClass = Class<ICommand>;

/**
 * 注入全局事件监听
 * @param eventName 事件名
 * @param once 是否只监听一次
 * @param args 参数
 */
declare function InterestNotify(eventName: string, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 注入网络回包事件监听
 * @param msgId 回包id
 * @param once 是否只监听一次
 * @param args 参数
 */
declare function InterestMessage(msgId: ENetMessage | ENetNotify, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 注入用户事件监听
 * @param eventName 事件名，使用`EUserEvent`枚举
 * @param once 是否只监听一次
 * @param args 参数
 */
declare function InterestUserEvent(eventName: string, once?: boolean, args?: any[]): MethodDecorator;

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

/**页面扩展 */
declare interface IViewExtend {
	readonly viewId: EViewID;
	readonly viewType: EViewType;

	/**
	 * 派发全局事件
	 * @param eventName 
	 * @param data （可选）回调数据。注意：如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
	 */
	dispatch(eventName: string, data?: any): void;

	/** 添加页面事件 */
	addEvent(type: string, callback: Function, args?: any[], once?: boolean): void;

	/** 移除页面事件 */
	removeEvent(type: string, listener: Function): void;

	/** 派发页面事件 */
	sendEvent(type: string, data?: any): void;

	/**
	 * 打开页面
	 * @param viewId 页面id
	 * @param data 传入参数, default: null
	 * @param openType 页面打开对当前页面操作的类型, default: {@link EViewOpenType.None}
	 */
	openView<T = any>(viewId: EViewID, data?: T, openType = EViewOpenType.None): Promise<void>;

	/** 移除当前页面，只有UI界面才能移除自身，其他Com，Btn，Render之类的无效 */
	closeSelf(): Promise<void>;
}

/**页面 */
declare interface IView extends fgui.GComponent, IViewExtend {
	readonly viewLayer: ELayer;
	readonly viewCategory: EViewCategory;
	mediator: IMediator;

	/**
	 ** 页面创建完毕之后执行，只执行一次。
	 ** 该方法为虚方法，使用时重写即可
	 */
	onCreate(): void;

	/**
	 ** 覆盖GObject.displayObject.onAwake(即Laya.Node.onAwake)函数
	 ** 该方法为虚方法，使用时重写即可
	 */
	onAwake(): void;
	/**
	 ** 覆盖GObject.displayObject.onEnable(即Laya.Node.onEnable)函数
	 ** 该方法为虚方法，使用时重写即可
	 */
	onEnable(): void;
	/**
	 ** 覆盖GObject.displayObject.onDisable(即Laya.Node.onDisable)函数
	 ** 该方法为虚方法，使用时重写即可
	 */
	onDisable(): void;
	/**
	 ** 覆盖GObject.displayObject.onDestroy(即Laya.Node.onDestroy)函数
	 ** 该方法为虚方法，使用时重写即可
	 */
	onDestroy(): void;

	/**
	 ** 页面打开动画
	 ** 该方法为虚方法，使用时重写即可
	 */
	onOpenAni(): Promise<void>;
	/**
	 ** 页面关闭动画
	 ** 该方法为虚方法，使用时重写即可
	 */
	onCloseAni(): Promise<void>;

	getPath(): string;
}

/**中介类 */
declare interface IMediator<V extends IView = IView, D = any> extends Laya.Script, IViewExtend {
	readonly owner: Laya.Sprite;
	/** 页面数据 */
	data: D;
	/** 控制器挂载的ui页面 */
	get view(): V;
}

/** 命令流 */
declare interface ICommand {
	execute(notifyName: string, data?: any): void;
}

declare interface IFacade {

	registerView(viewId: EViewID, viewType: EViewType, viewCls: IViewClass, mediatorCls?: IMediatorClass): void;
	hasMediator(viewId: EViewID): boolean;
	getMediator(viewId: EViewID): IMediatorClass;
	createView(viewId: EViewID, fullScreen: boolean = false): IView;
	createMediator(viewId: EViewID, fullScreen: boolean = false): IMediator;

	registerCommand(notifyName: string, cls: ICommandClass): void;
	hasCommand(notifyName: string): boolean;
	removeCommand(notifyName: string, cls?: ICommandClass): void;

	on(type: string, caller: any, listener: Function, args?: any[], once?: boolean): void;
	off(type: string, caller: any, listener: Function): void;
	offAll(type: string): void;
	offAllCaller(caller: any): void;
	dispatch(eventName: string, data?: any): void;
	interestNotify(caller: any): void;
}