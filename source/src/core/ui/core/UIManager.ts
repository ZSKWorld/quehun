class UIStack {
	private _data: EViewID[] = [];
	get count() { return this._data.length; }

	push(item: EViewID) {
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

	remove(item: EViewID) {
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

	private _mediators = new Map<string, IMediator>();

	cache(mediator: IMediator) {
		const viewId = mediator.viewId;
		this._mediators.set(viewId, mediator);
	}

	get(viewId: EViewID) {
		const mediator = this._mediators.get(viewId);
		this._mediators.delete(viewId);
		return mediator;
	}

	destroy(viewId: EViewID) {
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
	private get topViewId() { return this.topView?.viewId; }

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

	async openView<T = any>(viewId: EViewID, data?: T, openType = EViewOpenType.None) {
		if (!viewId) return;
		if (!$facade.hasMediator(viewId)) return;

		if (this.isTopView(viewId)) {
			this.topView.data = data;
			return;
		}

		$facade.dispatch(ENotifyConst.OnViewOpenBegin, viewId);
		this.lockMark++;
		await this.dealTopView(openType);
		const mediator = this.getOrCreateMediator(viewId);
		await this.addToView(mediator, data);
		this.lockMark--;
		$facade.dispatch(ENotifyConst.OnViewOpenEnd, viewId);
	}

	async closeView(viewId: EViewID, openStack = true) {
		if (!viewId) return;
		$facade.dispatch(ENotifyConst.OnViewCloseBegin, viewId);
		this.lockMark++;
		const success = await this.removeFromView(viewId, true);
		if (success && this.isStackView(viewId) && openStack) {
			const nextViewId = this._openedStack.peek();
			const topViewId = this.topViewId;
			if (nextViewId && nextViewId != topViewId)
				await this.openView(this._openedStack.pop());
		}
		this.lockMark--;
		$facade.dispatch(ENotifyConst.OnViewCloseEnd, viewId);
	}

	closeAllView() {
		this._openedViews.forEach(v => {
			v.view.parent && v.view.removeFromParent();
			this._cache.cache(v);
		});
		this._openedViews.length = 0;
		this._openedStack.clear();
	}

	destroyView(viewId: EViewID) {
		this._cache.destroy(viewId);
		const index = this._openedViews.findIndex(v => v.viewId == viewId);
		if (index == -1) return;
		const mediator = this._openedViews[index];
		this._openedViews.splice(index, 1);
		mediator.view.dispose();
	}

	private isStackView(viewId: EViewID) {
		const category = $facade.getViewCategory(viewId);
		return category == EViewCategory.FullScreen;
	}

	private async dealTopView(openType: EViewOpenType) {
		if (openType != EViewOpenType.Hide && openType != EViewOpenType.Close) return;

		const viewId = this.topViewId;

		if (!viewId) return;
		if (!this.isStackView(viewId)) {
			this.closeView(viewId, false);
			await this.dealTopView(openType);
			return;
		}

		switch (openType) {
			case EViewOpenType.Hide:
				await this.removeFromView(viewId, false);
				break;
			case EViewOpenType.Close:
				await this.closeView(viewId, false);
				break;
		}
	}

	private getOrCreateMediator(viewId: EViewID) {
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

	private async addToView(mediator: IMediator, data?: any) {
		if (!mediator) return;
		if (this.isStackView(mediator.viewId))
			this._openedStack.push(mediator.viewId);
		this._openedViews.unshift(mediator);
		mediator.view.removeFromParent();
		mediator.data = data;
		this.addToLayer(mediator.view, mediator.view.viewLayer || ELayer.UIBottom);
		await mediator.view.onOpenAni?.();
	}

	private async removeFromView(viewId: EViewID, removeStack: boolean) {
		const index = this._openedViews.findIndex(v => v.viewId == viewId);
		if (index <= -1) return false;
		const mediator = this._openedViews[index];
		this._openedViews.splice(index, 1);
		removeStack && this._openedStack.remove(viewId);
		await mediator.view.onCloseAni?.();
		this._cache.cache(mediator);
		mediator.view.removeFromParent();
		return true;
	}
}