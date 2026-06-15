import { ScriptObserver } from "../provider/ScriptObserver";
import { MediatorDIExtend } from "./MediatorDIExtend";

/**
 * 中介基类
 * 该组件为可回收组件。鼠标、键盘交互事件可使用装饰器注册 => InjectViewKeyEvent, InjectViewMouseEvent
 */
export abstract class MediatorBase<V extends IView = IView, D = any> extends ExtendClass<IMediator, ScriptObserver>(ScriptObserver) implements IMediator {
	override _singleton = true;
	/** 控制器数据 */
	private _data: D;
	private _parent: MediatorBase;
	/** 页面装饰器注册的消息映射 */
	private __viewEventMap: KeyMap<Function[]>;

	override get data() { return this._data; }
	override set data(value) {
		const oldData = this._data;
		this._data = value;
		this.onDataChanged(value, oldData);
	}
	override get view() { return this.gowner as V; }
	protected get parent() {
		if (this.viewType == EViewType.UI) return null;
		if (this._parent) return this._parent;

		let curNode = this.view.parent;
		while (curNode) {
			const parentMediator: MediatorBase = curNode.getComponent(MediatorBase as any);
			if (parentMediator) {
				this._parent = parentMediator;
				break;
			}
			curNode = curNode.parent;
		}
		return this._parent;
	}

	override addEvent(type: string, listener: Function, args?: any[], once?: boolean) {
		const caller = this.view;
		if (!caller) return;
		if (once) caller.once(type, this, listener, args);
		else caller.on(type, this, listener, args);
	}
	override removeEvent(type: string, listener: Function) {
		this.view?.off(type, this, listener);
	}
	override sendEvent(type: string, data?: any) {
		this.view?.event(type, data);
	}

	override onReset() {
		this._data = null;
		this._parent = null;
		this.setViewEventDecoratorEnable(false);
	}

	protected override _onAdded() {
		super._onAdded();
		this.setViewEventDecoratorEnable(true);
	}

	protected override _onEnable() {
		super._onEnable();
		MediatorDIExtend.registerDeviceEvent(this);
	}

	protected override _onDisable() {
		super._onDisable();
		MediatorDIExtend.offDeviceEvent(this);
	}

	private setViewEventDecoratorEnable(enable: boolean) {
		const vem = this.__viewEventMap;
		if (!vem) return;
		for (const eventName in vem) {
			const callbackMap = vem[eventName];
			for (const k in callbackMap) {
				const callback = callbackMap[k];
				const param = callback[eventName];
				const once = param ? param.__once : false;
				const args = param ? param.__args : null;
				if (enable) this.addEvent(eventName, callback, args, once);
				else this.removeEvent(eventName, callback);
			}
		}
	}

	protected onDataChanged(data: D, oldData?: D) { }
}
