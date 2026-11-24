import { Notifier } from "../../mvc/provider/Notifier";

class UIStack {
	private _mediators: IMediator[] = [];

	push(view: IMediator) {
		this._mediators.unshift(view);
	}

	peek() {
		return this._mediators.first;
	}

	get(id: EUIViewID) {
		const views = this._mediators;
		for (let i = 0, n = views.length; i < n; i++) {
			if (views[i].viewId == id)
				return views[i];
		}
		return null;
	}

	has(id: EUIViewID) {
		const views = this._mediators;
		for (let i = 0, n = views.length; i < n; i++) {
			if (views[i].viewId == id)
				return true;
		}
		return false;
	}

	remove(id: EUIViewID) {
		const views = this._mediators;
		for (let i = 0, n = views.length; i < n; i++) {
			if (views[i].viewId == id) {
				return views.splice(i, 1)[0];
			}
		}
		return null;
	}

	clear() {
		this._mediators.clear();
	}

	*[Symbol.iterator]() {
		const views = this._mediators.slice();
		for (let i = 0, n = views.length; i < n; i++) {
			yield views[i].viewId as EUIViewID;
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

	get topViewId() { return this._openedStack.peek()?.viewId; }

	get topStackViewId() {
		for (const viewId of this._openedStack) {
			if (this.isStackView(viewId))
				return viewId;
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

	isTopView(viewId: EViewID) { return this.topViewId == viewId; }
	isTopStackView(viewId: EViewID) { return this.topStackViewId == viewId; }

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
				await this.closeAllTopNotStackView();
				topStackViewId != viewId && await this.removeView(topStackViewId, false);
				break;
			case EViewOpenType.Close:
				await this.closeAllTopNotStackView();
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
			await this.closeAllTopNotStackView();

		await this.removeView(viewId, true);

		if (this.isStackView(viewId)) {
			const mediator = this._openedStack.peek();
			await this.openView(mediator.viewId as EUIViewID, mediator?.view?.data);
		}
		this.lockMark--;
	}

	closeAllView() {
		for (const viewId of this._openedStack) {
			this.removeView(viewId, true);
		}
		this._openedStack.clear();
	}

	destroyView(viewId: EUIViewID) {
		this._cache.destroy(viewId);
		const mediator = this._openedStack.remove(viewId);
		mediator?.view.dispose();
	}

	private isStackView(viewId: EUIViewID) {
		const category = $facade.getViewCategory(viewId);
		return category == EViewCategory.FullScreen;
	}

	private async closeAllTopNotStackView() {
		for (const viewId of this._openedStack) {
			if (!this.isStackView(viewId)) {
				this.removeView(viewId, true);
				await $timeUtil.wait(100);
			}
			else break;
		}
	}

	private async addView(viewId: EUIViewID, data?: any) {
		const mediator = this._openedStack.remove(viewId)
			|| this._cache.get(viewId)
			|| $facade.createMediator(viewId, true);
		if (!mediator) return;

		this._openedStack.push(mediator);
		this.dispatch(EGlobalEvent.OnViewOpenBegin, viewId);
		mediator.data = data;
		const onStage = mediator.view.onStage;
		this.addToLayer(mediator.view, mediator.view.viewLayer || ELayer.UIBottom);
		!onStage && await mediator.view.onOpenAni();
		this.dispatch(EGlobalEvent.OnViewOpenEnd, viewId);
	}

	private async removeView(viewId: EUIViewID, removeStack: boolean) {
		const mediator = this._openedStack.get(viewId);
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