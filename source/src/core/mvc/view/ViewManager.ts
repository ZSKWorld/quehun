@Singleton
export class ViewManager {

	private _viewClsMap: { [viewId in EViewID]?: IViewClass; } = {};
	private _mediatorClsMap: { [viewId in EViewID]?: IMediatorClass; } = {};

	register(viewId: EViewID, viewType: EViewType, viewCls: IViewClass, mediatorCls?: IMediatorClass) {
		if (!viewCls) {
			Logger.error("viewCls 不能为空", viewId, viewCls);
			return;
		}
		if (this.getViewClass(viewId)) {
			Logger.error("重复注册view", viewId);
			return;
		}
		(viewCls.prototype.viewId as any) = viewId;
		(viewCls.prototype.viewType as any) = viewType;
		mediatorCls && ((mediatorCls.prototype.viewId as any) = viewId);
		mediatorCls && ((mediatorCls.prototype.viewType as any) = viewType);
		this._viewClsMap[viewId] = viewCls;
		this._mediatorClsMap[viewId] = mediatorCls;
	}

	registerInfo(viewId: EUIViewID, layer = ELayer.UIBottom, category = EViewCategory.FullScreen) {
		const viewCls = this.getViewClass(viewId);
		const mediatorCls = this.getMediatorClass(viewId);
		if (viewCls) {
			(viewCls.prototype.viewLayer as any) = layer;
			(viewCls.prototype.viewCategory as any) = category;
		}
		if (mediatorCls) {
			(mediatorCls.prototype.viewLayer as any) = layer;
			(mediatorCls.prototype.viewCategory as any) = category;
		}
	}

	getViewType(viewId: EViewID) {
		const viewCls = this.getViewClass(viewId);
		if (!viewCls) return;
		return viewCls.prototype.viewType;
	}

	getViewLayer(viewId: EViewID) {
		const viewCls = this.getViewClass(viewId);
		if (!viewCls) return;
		return viewCls.prototype.viewLayer;
	}

	getViewCategory(viewId: EViewID) {
		const viewCls = this.getViewClass(viewId);
		if (!viewCls) return;
		return viewCls.prototype.viewCategory;
	}

	hasView(viewId: EViewID) {
		return this.getViewClass(viewId) != null;
	}

	getViewClass(viewId: EViewID) {
		if (!viewId) return null;
		return this._viewClsMap[viewId];
	}

	hasMediator(viewId: EViewID) {
		return this.getMediatorClass(viewId) != null;
	}

	getMediatorClass(viewId: EViewID) {
		if (!viewId) return null;
		return this._mediatorClsMap[viewId];
	}

	createView(viewId: EViewID, fullScreen: boolean = false) {
		const viewCls = this.getViewClass(viewId);
		if (!viewCls) return null;
		const viewInst = viewCls.createInstance();
		viewInst && (viewInst.name = viewId);
		viewInst && fullScreen && viewInst.makeFullScreen();
		return viewInst;
	}

	createMediator(viewId: EViewID, fullScreen: boolean = false) {
		const viewInst = this.createView(viewId, fullScreen);
		if (!viewInst) return null;
		return viewInst.mediator;
	}
}