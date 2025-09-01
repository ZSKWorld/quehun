import { Observer } from "../../mvc/provider/Observer";

/** 页面缓存 */
class UICache {

	private _mediators = new Map<string, IMediator>();

	cache(mediator: IMediator) {
		const viewId = mediator.viewId;
		this._mediators.set(viewId, mediator);
	}

	get(viewId: ViewID) {
		const mediator = this._mediators.get(viewId);
		this._mediators.delete(viewId);
		return mediator;
	}

	destroy(viewId: ViewID) {
		const mediator = this.get(viewId);
		mediator && mediator.view.dispose();
	}

	onResize() {
		this._mediators.forEach(v => v.view.makeFullScreen());
	}

}

/** UI管理类 */
export class UIManager extends Observer implements IUIManager {
	private _layerMap: { [key in Layer]: fgui.GComponent };

	/** 缓存池 */
	private _cache: UICache;
	/** 锁屏计数标识 */
	private _lockMark: number = 0;
	/** 锁屏遮罩 */
	private _lockMask: fgui.GGraph;
	/** 已打开页面 */
	private _openedViews: IMediator[] = [];
	private _openedStack: ViewID[] = [];

	private get lockMark() { return this._lockMark; }
	private set lockMark(value: number) {
		this._lockMark = value;
		this._lockMask.visible = value != 0;
	}

	init() {
		if (this._layerMap) return;
		this._layerMap = {} as any;
		const gRoot = fgui.GRoot.inst;
		Laya.stage.addChild(gRoot.displayObject);
		for (const key in Layer) {
			if (Object.prototype.hasOwnProperty.call(Layer, key)) {
				const layer = new fgui.GComponent();
				layer.name = Layer[key];
				gRoot.addChild(layer);
				this._layerMap[layer.name] = layer;
				layer.displayObject.mouseThrough = true;
				layer.displayObject.mouseEnabled = true;
				layer.makeFullScreen();
			}
		}

		this._cache = new UICache();
		const mask = this._lockMask = new fgui.GGraph();
		mask.visible = false;
		mask.sortingOrder = 9999;
		mask.name = "UIManager_Mask";
		this.addToLayer(mask, Layer.UITop);
		mask.drawRect(0, "", "#00000000");
		mask.makeFullScreen();
		mask.addRelation(mask.parent, fgui.RelationType.Size);
		//延迟100防止频繁触发
		Laya.stage.on(Laya.Event.RESIZE, this, () => Laya.timer.callLater(this, this.onResize));
	}

	addToLayer(obj: fgui.GObject, layer: Layer, index?: number) {
		if (!obj || obj.isDisposed || !this._layerMap[layer]) return;
		index = index ?? this._layerMap[layer].numChildren;
		this._layerMap[layer].addChildAt(obj, index);
	}

	isTopView(view: IMediator | IView) {
		if (!view) return false;
		const topView = this._openedViews[0];
		if (!topView) return false;
		return topView == view || topView.view == view;
	}

	openView<T = any>(viewId: ViewID, data?: T) {
		this.lockMark++;
		let mediator: IMediator;
		let openedIndex = this._openedViews.findIndex(v => v.viewId == viewId);
		if (openedIndex == -1) {
			mediator = this._cache.get(viewId) || facade.createMediator(viewId, true);
		} else {
			mediator = this._openedViews[openedIndex];
		}
		return this.openView2(mediator, data);
	}

	closeView(viewId: ViewID) {
		const index = this._openedViews.findIndex(v => v.viewId == viewId);
		if (index <= -1) return;
		const mediator = this._openedViews[index];
		if (!mediator.view.parent) {
			this._openedViews.splice(index, 1);
			this._cache.cache(mediator);
			return;
		}
		this._openedViews.splice(index, 1);
		const stackIndex = this._openedStack.indexOf(viewId);
		if (stackIndex == -1) Logger.error("未知得stack view id");
		else this._openedStack.splice(stackIndex, 1);
		this.lockMark++;
		mediator.onCloseAni().then(() => {
			this._cache.cache(mediator);
			mediator.view.removeFromParent();
			this.lockMark--;
			const nextViewId = this._openedStack[this._openedStack.length - 1];
			const topViewId = this._openedViews[0]?.viewId;
			if (topViewId != nextViewId)
				this.openView(this._openedStack.pop());
		});
	}

	closeAllView() {
		this._openedViews.forEach(v => {
			v.view.parent && v.view.removeFromParent();
			this._cache.cache(v);
		});
		this._openedViews.length = 0;
		this._openedStack.length = 0;
	}

	destroyView(viewId: ViewID) {
		this._cache.destroy(viewId);
		const index = this._openedViews.findIndex(v => v.viewId == viewId);
		if (index >= 0) {
			const mediator = this._openedViews[index];
			this._openedViews.splice(index, 1);
			mediator.view.dispose();
		}
	}

	private openView2(mediator: IMediator, data: any) {
		if (mediator) {
			this._openedStack.push(mediator.viewId);
			mediator.data = data || mediator.data;
			const openIndex = this._openedViews.findIndex(v => v == mediator);
			openIndex >= 0 && this._openedViews.splice(openIndex, 1);
			this._openedViews.unshift(mediator);
			mediator.view.removeFromParent();
			this.addToLayer(mediator.view, mediator.view.layer || Layer.UIBottom);
			return mediator.onOpenAni().finally(this.openViewFinal.bind(this));
		} else return this.openViewFinal();
	}

	private openViewFinal() {
		this.lockMark--;
		return Promise.resolve();
	}

	private onResize() {
		this._openedViews.forEach(v => v.view.makeFullScreen());
		this._cache.onResize();
	}
}