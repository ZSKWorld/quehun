import { Observer } from "../../mvc/provider/Observer";

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
export class UIManager extends Observer implements IUIManager {
	private _layerMap: { [key in ELayer]: fgui.GComponent };

	/** 缓存池 */
	private _cache: UICache;
	/** 锁屏计数标识 */
	private _lockMark: number = 0;
	/** 锁屏遮罩 */
	private _lockMask: fgui.GGraph;
	/** 已打开页面 */
	private _openedViews: IMediator[] = [];
	private _openedStack: EViewID[] = [];

	private get lockMark() { return this._lockMark; }
	private set lockMark(value: number) {
		this._lockMark = value;
		this._lockMask.visible = value != 0;
	}

	private _curMediator: IMediator<IView, any>;

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
		mask.drawRect(0, "", "#00000000");
		mask.makeFullScreen();
		mask.addRelation(mask.parent, fgui.RelationType.Size);
	}

	addToLayer(obj: fgui.GObject, layer: ELayer, index?: number) {
		const targetLayer = this._layerMap[layer];
		if (!obj || obj.isDisposed || !targetLayer) return;
		const targetIndex = index ?? targetLayer.numChildren;
		targetLayer.addChildAt(obj, targetIndex);
	}

	isTopView(view: IMediator | IView) {
		if (!view) return false;
		const topView = this._openedViews[0];
		if (!topView) return false;
		return topView == view || topView.view == view;
	}

	async openView<T = any>(viewId: EViewID, data?: T, openType = EViewOpenType.None) {
		if (!viewId) return;
		this.lockMark++;
		await this.dealTopViewOnOpenView(openType);
		let mediator: IMediator;
		const openIndex = this._openedViews.findIndex(v => v.viewId == viewId);
		if (openIndex == -1) {
			mediator = this._cache.get(viewId) || $facade.createMediator(viewId, true);
		} else {
			mediator = this._openedViews[openIndex];
		}

		if (this.isStackView(mediator.view))
			this._openedStack.unshift(mediator.viewId);
		data != null && (mediator.data = data);
		openIndex >= 0 && this._openedViews.splice(openIndex, 1);
		this._openedViews.unshift(mediator);
		mediator.view.removeFromParent();
		this.addToLayer(mediator.view, mediator.view.viewLayer || ELayer.UIBottom);
		this._curMediator = mediator;
		await mediator.view.onOpenAni?.();
		this.lockMark--;
	}

	async closeView(viewId: EViewID, openStack = true) {
		const index = this._openedViews.findIndex(v => v.viewId == viewId);
		if (index <= -1) return;
		const mediator = this._openedViews[index];
		this._openedViews.splice(index, 1);
		const stackIndex = this._openedStack.indexOf(viewId);
		if (stackIndex >= 0) this._openedStack.splice(stackIndex, 1);
		this.lockMark++;
		await mediator.view.onCloseAni?.();
		this._cache.cache(mediator);
		mediator.view.removeFromParent();
		if (this.isStackView(mediator.view) && openStack) {
			const nextViewId = this._openedStack[0];
			const topViewId = this._openedViews[0]?.viewId;
			if (nextViewId && nextViewId != topViewId)
				await this.openView(this._openedStack.shift());
		}
		this.lockMark--;
	}

	closeAllView() {
		this._openedViews.forEach(v => {
			v.view.parent && v.view.removeFromParent();
			this._cache.cache(v);
		});
		this._openedViews.length = 0;
		this._openedStack.length = 0;
	}

	destroyView(viewId: EViewID) {
		this._cache.destroy(viewId);
		const index = this._openedViews.findIndex(v => v.viewId == viewId);
		if (index >= 0) {
			const mediator = this._openedViews[index];
			this._openedViews.splice(index, 1);
			mediator.view.dispose();
		}
	}

	private isStackView(view: IView) {
		return view.viewCategory != EViewCategory.Popup;
	}

	private async dealTopViewOnOpenView(openType: EViewOpenType) {
		const topMediator = this._openedViews[0];
		if (!topMediator) return;
		switch (openType) {
			case EViewOpenType.Hide:
				this._openedViews.shift();
				await topMediator.view.onCloseAni?.();
				this._cache.cache(topMediator);
				topMediator.view.removeFromParent();
				break;
			case EViewOpenType.Close:
				await this.closeView(topMediator.viewId, false);
				break;
		}
	}
}