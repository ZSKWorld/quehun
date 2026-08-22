declare type IViewClass = Class<IView> & { createInstance?(): IView; };
declare type IMediatorClass = Class<IMediator>;
declare type ICommandClass = Class<ICommand>;

/**
 * 注入全局事件监听
 * @param eventName 事件名
 * @param once 是否只监听一次
 * @param args 参数
 */
declare function InjectGlobalEvent(eventName: EGlobalEvent, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 注入网络消息事件监听
 * @param msgName 事件名
 * @param once 是否只监听一次
 * @param args 参数
 */
declare function InjectNetEvent(msgName: ENetMessage | ENetNotify, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 注入用户数据事件监听
 * @param eventName 事件名
 * @param once 是否只监听一次
 * @param args 参数
 */
declare function InjectUserEvent(eventName: EUserEvent, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 注入页面键盘事件
 * @param keyEventType 事件类型
 * @param keyCode 触发事件的键值，-1 所有键都可以触发，默认-1
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
declare function InjectViewKeyEvent(keyEventType: EKeyEvent, keyCode?: EKeyCode, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 注入页面鼠标事件
 * @param mouseEventType 事件类型
 * @param once 是否只监听一次
 * @param args 参数
 * @return MethodDecorator
 */
declare function InjectViewMouseEvent(mouseEventType: EMouseEvent, once?: boolean, args?: any[]): MethodDecorator;

/**
 * 注入页面自定义事件
 * @param name 事件名称
 * @param once 是否只监听一次
 * @param args  参数
 * @returns MethodDecorator
 */
declare function InjectViewEvent(name: string, once?: boolean, args?: any[]): MethodDecorator;

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

//#region 页面接口定义


/** 页面 */
declare interface IView extends fgui.GComponent {
	readonly viewId: EViewID;
	readonly viewType: EViewType;
	readonly viewLayer: ELayer;
	readonly viewCategory: EViewCategory;
	readonly mediator: IMediator;

	/**
	 ** 页面打开动画
	 ** 该方法为虚方法，使用时重写即可
	 */
	onOpenAni(): Promise<any>;

	/**
	 ** 页面关闭动画
	 ** 该方法为虚方法，使用时重写即可
	 */
	onCloseAni(): Promise<any>;
}

type TGButton = fgui.GButton & IView;
type TGComboBox = fgui.GComboBox & IView;
type TGComponent = fgui.GComponent & IView;
type TGLabel = fgui.GLabel & IView;
type TGProgressBar = fgui.GProgressBar & IView;
type TGScrollBar = fgui.GScrollBar & IView;
type TGSlider = fgui.GSlider & IView;

declare interface IGButtonView extends TGButton {}
declare interface IGComboBoxView extends TGComboBox {}
declare interface IGComponentView extends TGComponent {}
declare interface IGLabelView extends TGLabel {}
declare interface IGProgressBarView extends TGProgressBar {}
declare interface IGScrollBarView extends TGScrollBar {}
declare interface IGSliderView extends TGSlider {}

/** 页面中介 */
declare interface IMediator<V extends IView = IView, D = any> extends Laya.Script {
	readonly viewId: EViewID;
	readonly viewType: EViewType;
	readonly viewLayer: ELayer;
	readonly viewCategory: EViewCategory;
	readonly owner: Laya.Sprite;
	/** 页面数据 */
	data: D;
	/** 控制器挂载的ui页面 */
	get view(): V;

	onShow(): void;
	onReshow(): void;
	onClose(): void;
}

//#endregion

/** 命令流 */
declare interface ICommand {
	execute(notifyName: string, data?: any): void;
}

declare interface IFacade {
	/** 注册页面类 */
	registerView(viewId: EViewID, viewType: EViewType, viewCls: IViewClass, mediatorCls?: IMediatorClass): void;
	/** 注册页面信息，（层级(layer), 种类(category), ... 后续有其他信息再添加） */
	registerViewInfo(viewId: EUIViewID, layer?: ELayer, category?: EViewCategory): void;
	/** mediator是否存在 */
	hasMediator(viewId: EViewID): boolean;
	/** 获取mediator类 */
	getMediatorClass(viewId: EViewID): IMediatorClass;
	/** 获取view类型 */
	getViewType(viewId: EViewID): EViewType;
	/** 获取view层级 */
	getViewLayer(viewId: EViewID): ELayer;
	/** 获取view种类 */
	getViewCategory(viewId: EViewID): EViewCategory;
	/**
	 * 创建view实例
	 * @param viewId 
	 * @param fullScreen 是否全屏 default false
	 */
	createView<T extends IView = IView>(viewId: EViewID, fullScreen?: boolean): T;
	/**
	 * 创建mediator实例
	 * @param viewId 
	 * @param fullScreen 是否全屏 default false
	 */
	createMediator<T extends IMediator = IMediator>(viewId: EViewID, fullScreen?: boolean): T;

	/** 注册命令 */
	registerCommand(notifyName: string, cls: ICommandClass): void;
	/** 命令是否存在 */
	hasCommand(notifyName: string): boolean;
	/**
	 * 移除命令
	 * @param notifyName 
	 * @param cls 不为空只移除cls对应的命令，为空移除notifyName所有命令
	 */
	removeCommand(notifyName: string, cls?: ICommandClass): void;
	/** 注册全局事件 */
	on(type: string, caller: any, listener: Function, args?: any[], once?: boolean): void;
	/** 移除指定type类型全局事件 */
	off(type: string, caller: any, listener: Function): void;
	/** 移除所有type类型全局事件 */
	offAll(type: string): void;
	/** 移除caller身上所有全局事件 */
	offAllCaller(caller: any): void;
	/** 派发事件（包括全局事件，网络事件，用户事件，命令事件） */
	dispatch(eventName: string, data?: any): void;
	/** 设置caller是否可用装饰器{@link InjectGlobalEvent}注册{@link EGlobalEvent}事件 */
	setGlobalEventDecoratorEnable(caller: any, enable: boolean): void;
	/** 设置caller是否可用装饰器{@link InjectNetEvent}注册{@link ENetMessage}或{@link ENetNotify}事件 */
	setNetEventDecoratorEnable(caller: any, enable: boolean): void;
	/** 设置caller是否可用装饰器{@link InjectUserEvent}注册{@link EUserEvent}事件 */
	setUserEventDecoratorEnable(caller: any, enable: boolean): void;
}