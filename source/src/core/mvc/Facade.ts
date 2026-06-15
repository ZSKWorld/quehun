import { Controller } from "./controller/Controller";
import { ViewManager } from "./view/ViewManager";

const enum DecoratorKeyMap {
	GlobalEvent = "__globalEventMap",
	NetEvent = "__netEventMap",
	UserEvent = "__userEventMap",
}

/** mvc门面类 */
@Singleton
export class Facade implements IFacade {
	private _viewMgr = new ViewManager();
	private _controller = new Controller();
	private _globalEventListener = new Laya.EventDispatcher();
	private _netEventListener = new Laya.EventDispatcher();
	private _userEventListener = new Laya.EventDispatcher();

	//#region View
	registerView(viewId: EViewID, viewType: EViewType, viewCls: IViewClass, mediatorCls?: IMediatorClass) {
		this._viewMgr.register(viewId, viewType, viewCls, mediatorCls);
	}

	registerViewInfo(viewId: EUIViewID, layer = ELayer.UIBottom, category = EViewCategory.FullScreen) {
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
		return this.createView(viewId, fullScreen)?.mediator;
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
		if (once) this._globalEventListener.once(type, caller, listener, args);
		else this._globalEventListener.on(type, caller, listener, args);
	}

	off(type: string, caller: any, listener: Function) {
		this._globalEventListener.off(type, caller, listener);
	}

	offAll(type: string) {
		this._globalEventListener.offAll(type);
	}

	offAllCaller(caller: any) {
		this._globalEventListener.offAllCaller(caller);
	}

	dispatch(eventName: string, data?: any) {
		this._globalEventListener.event(eventName, data);
		this._netEventListener.event(eventName, data);
		this._userEventListener.event(eventName, data);
		this._controller.execute(eventName, data);
	}

	setGlobalEventDecoratorEnable(caller: any, enable: boolean) {
		this.setDecoratorEnable(caller, DecoratorKeyMap.GlobalEvent, this._globalEventListener, enable);
	}
	setNetEventDecoratorEnable(caller: any, enable: boolean) {
		this.setDecoratorEnable(caller, DecoratorKeyMap.NetEvent, this._netEventListener, enable);
	}
	setUserEventDecoratorEnable(caller: any, enable: boolean) {
		this.setDecoratorEnable(caller, DecoratorKeyMap.UserEvent, this._userEventListener, enable);
	}
	private setDecoratorEnable(caller: any, eventMapName: string, listener: Laya.EventDispatcher, enable: boolean) {
		if (!listener) return;
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
				if (enable) {
					if (once) {
						listener.once(eventName, caller, callback, args);
					} else {
						listener.on(eventName, caller, callback, args);
					}
				} else {
					listener.off(eventName, caller, callback);
				}
			}
		}
	}
	//#endregion
}