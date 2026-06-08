class UIStack {
	private _data: EUIViewID[] = [];
	get count() { return this._data.length; }

	push(item: EUIViewID) {
		const index = this._data.indexOf(item);
		if (index > -1)
			this._data.splice(index, 1);
		this._data.unshift(item);
	}

	pop() {
		return this._data.shift();
	}

	peek() {
		return this._data[0];
	}

	remove(item: EUIViewID) {
		const index = this._data.indexOf(item);
		if (index > -1) {
			this._data.splice(index, 1);
		}
	}

	clear() {
		this._data.length = 0;
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
export class UIManager extends Singleton<UIManager>() implements IUIManager {
	private _layerMap: { [key in ELayer]: fgui.GComponent };

	/** 缓存池 */
	private _cache: UICache;
	/** 锁屏计数标识 */
	private _lockMark: number = 0;
	/** 锁屏遮罩 */
	private _lockMask: fgui.GGraph;
	/** 已打开页面 */
	private _openedViews: IMediator[] = [];
	private _openedStack = new UIStack();

	private get lockMark() { return this._lockMark; }
	private set lockMark(value: number) {
		this._lockMark = value;
		this._lockMask.visible = value != 0;
	}

	private get topView() { return this._openedViews[0]; }
	private get topViewId() { return this.topView?.viewId as EUIViewID; }

	protected constructor() {
		super();
		this._layerMap = {} as any;
		const gRoot = fgui.GRoot.inst;
		Laya.stage.addChild(gRoot.displayObject);
		for (const key in ELayer) {
			const layer = new fgui.GComponent();
			layer.name = ELayer[key];
			gRoot.addChild(layer);
			this._layerMap[layer.name] = layer;
			layer.displayObject.mouseThrough = true;
			layer.displayObject.mouseEnabled = true;
			layer.makeFullScreen();
		}

		this._cache = new UICache();
		const mask = this._lockMask = new fgui.GGraph();
		mask.visible = false;
		mask.sortingOrder = 9999;
		mask.name = "UIManager_Mask";
		this.addToLayer(mask, ELayer.UITop);
		mask.drawRect(0, "", EColorString._00000000);
		mask.makeFullScreen();
		mask.addRelation(mask.parent, fgui.RelationType.Size);
	}

	addToLayer(obj: fgui.GObject, layer: ELayer, index?: number) {
		const targetLayer = this._layerMap[layer];
		if (!obj || obj.isDisposed || !targetLayer) return;
		const targetIndex = index ?? targetLayer.numChildren;
		targetLayer.addChildAt(obj, targetIndex);
	}

	isTopView(viewId: EViewID) { return this.topViewId == viewId; }

	async openView<T = any>(viewId: EUIViewID, data?: T, openType = EViewOpenType.None) {
		if (!viewId) return;
		if (!$facade.hasMediator(viewId)) return;

		this.lockMark++;
		const success = await this.dealTopView(viewId, data, openType);
		success && await this.addView(viewId, data);
		this.lockMark--;
	}

	async closeView(viewId: EUIViewID, openStack = true) {
		if (!viewId) return;

		this.lockMark++;
		await this.removeView(viewId, true);
		if (openStack && this.isStackView(viewId)) {
			const nextViewId = this._openedStack.peek();
			const topViewId = this.topViewId;
			if (nextViewId && nextViewId != topViewId)
				await this.openView(this._openedStack.pop());
		}
		this.lockMark--;
	}

	closeAllView() {
		this._openedViews.forEach(v => {
			v.view.parent && v.view.removeFromParent();
			this._cache.cache(v);
		});
		this._openedViews.length = 0;
		this._openedStack.clear();
	}

	destroyView(viewId: EUIViewID) {
		this._cache.destroy(viewId);
		const index = this._openedViews.findIndex(v => v.viewId == viewId);
		if (index == -1) return;
		const mediator = this._openedViews[index];
		this._openedViews.splice(index, 1);
		mediator.view.dispose();
	}

	private isStackView(viewId: EUIViewID) {
		const category = $facade.getViewCategory(viewId);
		return category == EViewCategory.FullScreen;
	}

	private async dealTopView(viewId: EUIViewID, data: any, openType: EViewOpenType) {
		if (openType != EViewOpenType.Hide && openType != EViewOpenType.Close) return true;

		const topId = this.topViewId;
		if (!topId) return true;

		if (this.isTopView(viewId)) {
			this.topView.data = data;
			return false;
		}

		if (!this.isStackView(topId)) {
			this.closeView(topId, false);
			return this.dealTopView(viewId, data, openType);
		}

		switch (openType) {
			case EViewOpenType.Hide:
				await this.removeView(topId, false);
				break;
			case EViewOpenType.Close:
				await this.removeView(topId, true);
				break;
			default: return false;
		}
		return true;
	}

	private getOrCreateMediator(viewId: EUIViewID) {
		let mediator: IMediator;
		const openIndex = this._openedViews.findIndex(v => v.viewId == viewId);
		if (openIndex == -1) {
			mediator = this._cache.get(viewId) || $facade.createMediator(viewId, true);
		} else {
			mediator = this._openedViews[openIndex];
			this._openedViews.splice(openIndex, 1);
		}
		return mediator;
	}

	private async addView(viewId: EUIViewID, data?: any) {
		const mediator = this.getOrCreateMediator(viewId);
		if (!mediator) return;
		$facade.dispatch(EGlobalEvent.OnViewOpenBegin, viewId);
		if (this.isStackView(viewId))
			this._openedStack.push(viewId);
		this._openedViews.unshift(mediator);
		mediator.view.removeFromParent();
		mediator.data = data;
		this.addToLayer(mediator.view, mediator.view.viewLayer || ELayer.UIBottom);
		await mediator.view.onOpenAni?.();
		$facade.dispatch(EGlobalEvent.OnViewOpenEnd, viewId);
	}

	private async removeView(viewId: EUIViewID, removeStack: boolean) {
		const index = this._openedViews.findIndex(v => v.viewId == viewId);
		if (index <= -1) return;
		$facade.dispatch(EGlobalEvent.OnViewCloseBegin, viewId);
		const mediator = this._openedViews[index];
		this._openedViews.splice(index, 1);
		removeStack && this._openedStack.remove(viewId);
		await mediator.view.onCloseAni?.();
		this._cache.cache(mediator);
		mediator.view.removeFromParent();
		$facade.dispatch(EGlobalEvent.OnViewCloseEnd, viewId);
	}
}