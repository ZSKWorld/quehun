import { MediatorDIExtend } from "./MediatorDIExtend";

/**
 * 中介基类
 * 该组件为可回收组件。鼠标、键盘交互事件可使用装饰器注册 => InjectViewKeyEvent, InjectViewMouseEvent
 */
export abstract class MediatorBase<V extends IView = IView, D = any> extends Laya.Script implements IMediator {
	override _singleton = true;
	override readonly owner: Laya.Sprite;
	readonly viewId: EViewID;
	readonly viewType: EViewType;
	readonly viewLayer: ELayer;
	readonly viewCategory: EViewCategory;
	/** 控制器数据 */
	private _data: D;
	private _parent: MediatorBase;
	/** 页面装饰器注册的消息映射 */
	private __viewEventMap: KeyMap<Function[]>;

	get data() { return this._data; }
	set data(value) {
		const oldData = this._data;
		this._data = value;
		this.onDataChanged(value, oldData);
	}
	get view() { return this.gowner as V; }
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

	dispatch(eventName: string, data?: any): void {
		$facade.dispatch(eventName, data);
	}
	addEvent(type: string, listener: Function, args?: any[], once?: boolean) {
		if (once) this.view?.once(type, this, listener, args);
		else this.view?.on(type, this, listener, args);
	}
	removeEvent(type: string, listener: Function) {
		this.view?.off(type, this, listener);
	}
	openView<T = any>(viewId: EUIViewID, data?: T, openType?: EViewOpenType) {
		return $uiMgr.openView(viewId, data, openType);
	}
	closeView(viewId: EUIViewID) {
		return $uiMgr.closeView(viewId);
	}
	closeSelf() {
		const { viewId, viewType } = this;
		if (viewType == EViewType.UI)
			return $uiMgr.closeView(viewId as EUIViewID);
		else
			return Promise.resolve();
	}
	onShow() { }
	onReshow() { }
	onClose() { }

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
		$facade.setGlobalEventDecoratorEnable(this, true);
		$facade.setNetEventDecoratorEnable(this, true);
		$facade.setUserEventDecoratorEnable(this, true);
		MediatorDIExtend.registerDeviceEvent(this);
	}

	protected override _onDisable() {
		super._onDisable();
		$facade.setGlobalEventDecoratorEnable(this, false);
		$facade.setNetEventDecoratorEnable(this, false);
		$facade.setUserEventDecoratorEnable(this, false);
		MediatorDIExtend.offDeviceEvent(this);
	}

	protected onDataChanged(data: D, oldData?: D) {

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
}
