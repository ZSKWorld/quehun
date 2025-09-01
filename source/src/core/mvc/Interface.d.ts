declare type IProxyClass = Class<IProxy>;
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
declare function InterestMessage(msgId: MessageID, once?: boolean, args?: any[]): MethodDecorator;

declare enum ProxyID {
    Login,
    Main,
    Bag,
    Battle,
}

/** 代理类 */
declare interface IProxy {
    readonly proxyId: ProxyID;
}

/** 页面类型 */
declare enum ViewType {
    UI = "UI",
    Component = "Component",
    Render = "Render",
    Button = "Button",
}

/**页面扩展 */
declare interface IViewExtend {
    readonly viewId: ViewID;
    readonly viewType: ViewType;

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
     * @param data 传入参数
     */
    openView<T = any>(viewId: ViewID, data?: T): Promise<void>;

    /** 移除当前页面，只有UI界面才能移除自身，其他Com，Btn，Render之类的无效 */
    closeSelf(): void;
}

/**页面 */
declare interface IView extends fgui.GComponent, IViewExtend {
    readonly layer: Layer;
    mediator: IMediator;

    /**
     * 页面创建完毕之后执行，只执行一次。
     * 该方法为虚方法，使用时重写即可
     */
    onCreate(): void;

    getPath(): string;
}

/**中介类 */
declare interface IMediator<V extends IView = IView, D = any> extends Laya.Script, IViewExtend {
    override owner: Laya.Sprite;
    /** 页面数据 */
    data: D;
    /** 控制器挂载的ui页面 */
    get view(): V;

    /**
     * 页面打开动画
     * 该方法为虚方法，使用时重写即可
     */
    onOpenAni(): Promise<void>;

    /**
     * 页面关闭动画
     * 该方法为虚方法，使用时重写即可
     */
    onCloseAni(): Promise<void>;
}

/** 命令流 */
declare interface ICommand {
    execute(notifyName: string, data?: any): void;
}

declare interface IFacade {
    registerProxy(proxyId: ProxyID, proxyCls: IProxyClass): void;
    hasProxy(proxyId: ProxyID): boolean;
    getProxy(proxyId: ProxyID): IProxy;

    registerView(viewId: ViewID, viewType: ViewType, viewCls: IViewClass, mediatorCls: IMediatorClass): void;
    hasMediator(viewId: ViewID): boolean;
    getMediator(viewId: ViewID): IMediatorClass;
    createMediator(viewId: ViewID, fullScreen: boolean = false): IMediator;

    registerCommand(notifyName: string, cls: ICommandClass): void;
    hasCommand(notifyName: string): boolean;
    removeCommand(notifyName: string, cls?: ICommandClass): void;

    on(type: string, caller: any, listener: Function, args?: any[], once?: boolean): void;
    off(type: string, caller: any, listener: Function): void;
    offAll(type: string): void;
    offAllCaller(caller: any): void;
    dispatch(eventName: string, data?: any): void;
    interestNotify(caller: any): void;
    interestMessage(caller: any): void;
}