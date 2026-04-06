import { Controller } from "./controller/Controller";
import { ViewManager } from "./view/ViewManager";

/** mvc门面类 */
export class Facade extends Singleton<Facade>() implements IFacade {
	private _viewMgr: ViewManager;
	private _controller: Controller;
	private _notifyListener: Laya.EventDispatcher;
	private _messageListener: Laya.EventDispatcher;
	private _userEventListener: Laya.EventDispatcher;

	protected constructor() {
		super();
		this._viewMgr = ViewManager.Inst;
		this._controller = Controller.Inst;
		this._notifyListener = new Laya.EventDispatcher();
		this._messageListener = new Laya.EventDispatcher();
		this._userEventListener = new Laya.EventDispatcher();
	}

	//#region View
	registerView(viewId: EViewID, viewType: EViewType, viewCls: IViewClass, mediatorCls?: IMediatorClass) {
		this._viewMgr.register(viewId, viewType, viewCls, mediatorCls);
	}

	registerViewInfo(viewId: EViewID, layer = ELayer.UIBottom, category = EViewCategory.FullScreen) {
		this._viewMgr.registerInfo(viewId, layer, category);
	}

	hasMediator(viewId: EViewID) {
		return this._viewMgr.hasMediator(viewId);
	}

	getMediatorClass(viewId: EViewID) {
		return this._viewMgr.getMediatorClass(viewId);
	}

	getViewType(viewId: EViewID) {
		return this._viewMgr.getViewType(viewId);
	}

	getViewLayer(viewId: EViewID) {
		return this._viewMgr.getViewLayer(viewId);
	}

	getViewCategory(viewId: EViewID) {
		return this._viewMgr.getViewCategory(viewId);
	}

	createView(viewId: EViewID, fullScreen = false) {
		return this._viewMgr.createView(viewId, fullScreen);
	}

	createMediator(viewId: EViewID, fullScreen = false) {
		return this.createView(viewId, fullScreen).mediator;
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
		if (once) this._notifyListener.once(type, caller, listener, args);
		else this._notifyListener.on(type, caller, listener, args);
	}

	off(type: string, caller: any, listener: Function) {
		this._notifyListener.off(type, caller, listener);
	}

	offAll(type: string) {
		this._notifyListener.offAll(type);
	}

	offAllCaller(caller: any) {
		this._notifyListener.offAllCaller(caller);
	}

	dispatch(eventName: string, data?: any) {
		this._notifyListener.event(eventName, data);
		this._messageListener.event(eventName, data);
		this._userEventListener.event(eventName, data);
		this._controller.execute(eventName, data);
	}

	setNotifyDecoaratorEnable(caller: any, enable: boolean) {
		this.setDecoratorEnable(caller, "__notifyMap", this._notifyListener, enable);
	}
	setMessageDecoaratorEnable(caller: any, enable: boolean) {
		this.setDecoratorEnable(caller, "__messageMap", this._messageListener, enable);
	}
	setUserEventDecoaratorEnable(caller: any, enable: boolean) {
		this.setDecoratorEnable(caller, "__userEventMap", this._userEventListener, enable);
	}
	private setDecoratorEnable(caller: any, eventMapName: string, listener: Laya.EventDispatcher, enable: boolean) {
		if (enable) {
			if (!caller) return;
			const eventList = caller[eventMapName];
			if (!eventList) return;
			for (const eventName in eventList) {
				const callbackList = eventList[eventName];
				for (const k in callbackList) {
					const callback = callbackList[k];
					const param = callback[eventName];
					const once = param ? param.__once : false;
					const args = param ? param.__args : null;
					if (once) {
						listener.once(eventName, caller, callback, args);
					} else {
						listener.on(eventName, caller, callback, args);
					}
				}
			}
		}
		else
			listener.offAllCaller(caller);
	}
	//#endregion
}