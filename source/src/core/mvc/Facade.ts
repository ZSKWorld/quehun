import { Singleton } from "../common/Singleton";
import { Controller } from "./controller/Controller";
import { ModelManager } from "./model/ModelManager";
import { Provider } from "./provider/Provider";
import { ViewManager } from "./view/ViewManager";

/** mvc门面类 */
export class Facade extends Singleton<Facade>() implements IFacade {
    private _proxyMgr: ModelManager;
    private _viewMgr: ViewManager;
    private _controller: Controller;
    private _provider: Provider;

    protected constructor() {
        super();
        this._proxyMgr = ModelManager.Inst;
        this._viewMgr = ViewManager.Inst;
        this._controller = Controller.Inst;
        this._provider = Provider.Inst;
    }

    //#region Proxy
    registerProxy(proxyId: ProxyID, proxyCls: IProxyClass) {
        this._proxyMgr.register(proxyId, proxyCls);
    }

    hasProxy(proxyId: ProxyID) {
        return this._proxyMgr.has(proxyId);
    }

    getProxy(proxyId: ProxyID) {
        return this._proxyMgr.get(proxyId);
    }
    //#endregion

    //#region View
    registerView(viewId: ViewID, viewType: ViewType, viewCls: IViewClass, mediatorCls: IMediatorClass) {
        this._viewMgr.register(viewId, viewType, viewCls, mediatorCls);
    }

    hasMediator(viewId: ViewID) {
        return this._viewMgr.has(viewId);
    }

    getMediator(viewId: ViewID) {
        return this._viewMgr.get(viewId);
    }

    createMediator(viewId: ViewID, fullScreen: boolean = false) {
        return this._viewMgr.create(viewId, fullScreen);
    }
    //#endregion

    //#region Controller
    registerCommand(notifyName: string, cls: ICommandClass) {
        this._controller.register(notifyName, cls);
    }

    hasCommand(notifyName: string) {
        return this._controller.has(notifyName);
    }

    removeCommand(notifyName: string, cls?: ICommandClass) {
        this._controller.remove(notifyName, cls);
    }
    //#endregion

    //#region Event
    on(type: string, caller: any, listener: Function, args?: any[], once?: boolean) {
        if (once) this._provider.once(type, caller, listener, args);
        else this._provider.on(type, caller, listener, args);
    }

    off(type: string, caller: any, listener: Function) {
        this._provider.off(type, caller, listener);
    }

    offAll(type: string) {
        this._provider.offAll(type);
    }

    offAllCaller(caller: any) {
        this._provider.offAllCaller(caller);
    }

    dispatch(eventName: string, data?: any) {
        this._provider.event(eventName, data);
        this._controller.execute(eventName, data);
    }

    interestNotify(caller: any) {
        this._provider.interestNotify(caller);
    }

    interestMessage(caller: any) {
        this._provider.interestMessage(caller);
    }
    //#endregion
}