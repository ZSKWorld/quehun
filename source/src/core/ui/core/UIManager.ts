import { Notifier } from "../../mvc/provider/Notifier";

interface IStackData {
	id: EUIViewID;
	view: IMediator;
}

class UIStack {
	private _data: IStackData[] = [];
	get count() { return this._data.length; }

	push(id: EUIViewID, view: IMediator) {
		this._data.unshift({ id, view });
	}

	peek() {
		return this._data.first;
	}

	get(id: EUIViewID) {
		return this._data.find(v => v.id == id);
	}

	pop() {
		return this._data.shift();
	}

	has(id: EUIViewID) {
		return this._data.findIndex(v => v.id == id) >= 0;
	}

	remove(id: EUIViewID) {
		const index = this._data.findIndex(v => v.id == id);
		if (index > -1) {
			return this._data.splice(index, 1)[0];
		}
		return null;
	}

	clear() {
		this._data.clear();
	}

	*[Symbol.iterator]() {
		const data = this._data.slice();
		const cnt = data.length;
		for (let i = 0; i < cnt; i++) {
			yield data[i];
		}
	}
}
/** 页面缓存 */
class UICache {

	private _mediators = new Map<EUIViewID, IMediator>();

	cache(mediator: IMediator) {
		if (!mediator) return;
		const viewId = mediator.viewId as EUIViewID;
		this._mediators.set(viewId, mediator);
	}

	find(viewId: EUIViewID) {
		const mediator = this._mediators.get(viewId);
		return mediator;
	}

	get(viewId: EUIViewID) {
		const mediator = this._mediators.get(viewId);
		this._mediators.delete(viewId);
		return mediator;
	}

	destroy(viewId: EUIViewID) {
		const mediator = this.get(viewId);
		mediator && mediator.view.dispose();
	}

}

/** UI管理类 */
@Singleton
export class UIManager extends Notifier implements IUIManager {
	private _layerMap: { [key in ELayer]: fgui.GComponent };

	/** 缓存池 */
	private _cache: UICache;
	/** 锁屏计数标识 */
	private _lockMark: number = 0;
	/** 锁屏遮罩 */
	private _lockMask: fgui.GGraph;
	private _openedStack = new UIStack();

	private get lockMark() { return this._lockMark; }
	private set lockMark(value: number) {
		this._lockMark = value;
		this._lockMask.visible = value != 0;
	}

	private get topStackViewId() {
		for (const data of this._openedStack) {
			if (this.isStackView(data.id))
				return data.id;
		}
		return null;
	}

	constructor() {
		super();
		this._layerMap = {} as any;
		const gRoot = fgui.GRoot.inst;
		Laya.stage.addChild(gRoot.displayObject);
		for (const key in ELayer) {
			const layer = new fgui.GComponent();
			layer.name = ELayer[key];
			gRoot.addChild(layer);
			this._layerMap[layer.name] = layer;
			layer.opaque = false;
			layer.touchable = true;
			layer.makeFullScreen();
		}

		this._cache = new UICache();
		const mask = this._lockMask = new fgui.GGraph();
		mask.visible = false;
		mask.sortingOrder = 9999;
		mask.name = "UIManager_Mask";
		this.addToLayer(mask, ELayer.Mask);
		mask.drawRect(0, "", EColorString._00000000);
		mask.makeFullScreen();
		mask.addRelation(mask.parent, fgui.RelationType.Size);
	}

	isTopView(viewId: EViewID) { return this._openedStack.peek()?.id == viewId; }

	addToLayer(obj: fgui.GObject, layer: ELayer, index?: number) {
		const targetLayer = this._layerMap[layer];
		if (!obj || obj.isDisposed || !targetLayer) return;
		const targetIndex = index ?? targetLayer.numChildren;
		targetLayer.addChildAt(obj, targetIndex);
	}

	async openView<T = any>(viewId: EUIViewID, data?: T, openType = EViewOpenType.None) {
		if (!$facade.hasMediator(viewId)) return;

		this.lockMark++;

		const topStackViewId = this.topStackViewId;
		switch (openType) {
			case EViewOpenType.Hide:
				this.closeAllTopNotStackView();
				topStackViewId != viewId && await this.removeView(topStackViewId, false);
				break;
			case EViewOpenType.Close:
				this.closeAllTopNotStackView();
				topStackViewId != viewId && await this.removeView(topStackViewId, true);
				break;
		}

		await this.addView(viewId, data);
		this.lockMark--;
	}

	async closeView(viewId: EUIViewID) {
		if (!this._openedStack.has(viewId)) return;

		this.lockMark++;
		if (this.topStackViewId == viewId)
			this.closeAllTopNotStackView();

		await this.removeView(viewId, true);

		if (this.isStackView(viewId)) {
			const nextData = this._openedStack.peek();
			await this.openView(nextData.id, nextData.view?.data);
		}
		this.lockMark--;
	}

	closeAllView() {
		for (const data of this._openedStack) {
			this.removeView(data.id, true);
		}
		this._openedStack.clear();
	}

	destroyView(viewId: EUIViewID) {
		this._cache.destroy(viewId);
		const data = this._openedStack.remove(viewId);
		data?.view.view.dispose();
	}

	private isStackView(viewId: EUIViewID) {
		const category = $facade.getViewCategory(viewId);
		return category == EViewCategory.FullScreen;
	}

	private closeAllTopNotStackView() {
		for (const data of this._openedStack) {
			if (!this.isStackView(data.id)) {
				this.removeView(data.id, true);
			}
			else break;
		}
	}

	private async addView(viewId: EUIViewID, data?: any) {
		let mediator = this._openedStack.remove(viewId)?.view;
		if (!mediator) {
			mediator = this._cache.get(viewId);
			if (!mediator)
				mediator = $facade.createMediator(viewId, true);
		}
		if (!mediator) return;

		this._openedStack.push(viewId, mediator);
		this.dispatch(EGlobalEvent.OnViewOpenBegin, viewId);
		mediator.data = data;
		const onStage = mediator.view.onStage;
		this.addToLayer(mediator.view, mediator.view.viewLayer || ELayer.UIBottom);
		!onStage && await mediator.view.onOpenAni();
		this.dispatch(EGlobalEvent.OnViewOpenEnd, viewId);
	}

	private async removeView(viewId: EUIViewID, removeStack: boolean) {
		const mediator = this._openedStack.get(viewId)?.view;
		if (!mediator) return;
		if (removeStack) {
			this._cache.cache(mediator);
			this._openedStack.remove(viewId);
		}
		this.dispatch(EGlobalEvent.OnViewCloseBegin, viewId);
		await mediator.view.onCloseAni();
		mediator.view.removeFromParent();
		this.dispatch(EGlobalEvent.OnViewCloseEnd, viewId);
	}
}