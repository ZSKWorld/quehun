export class ViewManager extends Singleton<ViewManager>() {
	private _viewClsMap: { [viewId in EViewID]?: IViewClass; } = {};
	private _mediatorClsMap: { [viewId in EViewID]?: IMediatorClass; } = {};

	register(viewId: EViewID, viewType: EViewType, viewCls: IViewClass, mediatorCls?: IMediatorClass) {
		if (!viewCls) {
			Logger.error("viewCls 不能为空", viewId, viewCls);
			return;
		}
		if (this._viewClsMap[viewId]) {
			Logger.error("重复注册view", viewId);
			return;
		}
		(<IViewExtend>viewCls.prototype).viewId = viewId;
		(<IViewExtend>viewCls.prototype).viewType = viewType;
		mediatorCls && ((<IViewExtend>mediatorCls.prototype).viewId = viewId);
		mediatorCls && ((<IViewExtend>mediatorCls.prototype).viewType = viewType);
		this._viewClsMap[viewId] = viewCls;
		this._mediatorClsMap[viewId] = mediatorCls;
	}

	registerInfo(viewId: EViewID, layer = ELayer.UIBottom, category = EViewCategory.FullScreen) {
		const ViewCls = this._viewClsMap[viewId];
		const mediatorCls = this._mediatorClsMap[viewId];
		if (ViewCls) {
			(<IViewExtend>ViewCls.prototype).viewLayer = layer;
			(<IViewExtend>ViewCls.prototype).viewCategory = category;
		}
		if (mediatorCls) {
			(<IViewExtend>mediatorCls.prototype).viewLayer = layer;
			(<IViewExtend>mediatorCls.prototype).viewCategory = category;
		}
	}

	getViewType(viewId: EViewID) {
		const ViewCls = this._viewClsMap[viewId];
		if (!ViewCls) return;
		return (<IViewExtend>ViewCls.prototype).viewType;
	}

	getViewLayer(viewId: EViewID) {
		const ViewCls = this._viewClsMap[viewId];
		if (!ViewCls) return;
		return (<IViewExtend>ViewCls.prototype).viewLayer;
	}

	getViewCategory(viewId: EViewID) {
		const ViewCls = this._viewClsMap[viewId];
		if (!ViewCls) return;
		return (<IViewExtend>ViewCls.prototype).viewCategory;
	}

	hasMediator(viewId: EViewID) {
		return !!this._mediatorClsMap[viewId];
	}

	getMediatorClass(viewId: EViewID) {
		return this._mediatorClsMap[viewId];
	}

	createView(viewId: EViewID, fullScreen: boolean = false) {
		const viewInst = this._viewClsMap[viewId].createInstance();
		viewInst && (viewInst.name = viewId);
		viewInst && fullScreen && viewInst.makeFullScreen();
		return viewInst;
	}

	createMediator(viewId: EViewID, fullScreen: boolean = false) {
		const viewInst = this.createView(viewId, fullScreen);
		return viewInst.mediator;
	}
}