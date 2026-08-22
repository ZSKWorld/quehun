export class GSliderView extends fgui.GSlider implements IGSliderView {
	readonly viewId: EViewID;
	readonly viewType: EViewType;
	readonly viewLayer: ELayer;
	readonly viewCategory: EViewCategory;
	mediator: IMediator;

	override constructFromResource() {
		super.constructFromResource();

		const _this = this;
		const { viewId, displayObject } = _this;
		const prototype = GSliderView.prototype;

		_this.onCreate();
		_this.onAwake != prototype.onAwake && (displayObject.onAwake = _this.onAwake.bind(_this));
		_this.onEnable != prototype.onEnable && (displayObject.onEnable = _this.onEnable.bind(_this));
		_this.onDisable != prototype.onDisable && (displayObject.onDisable = _this.onDisable.bind(_this));
		_this.onDestroy != prototype.onDestroy && (displayObject.onDestroy = _this.onDestroy.bind(_this));

		if (viewId) {
			const MediatorCls = $facade.getMediatorClass(viewId);
			if (MediatorCls)
				_this.mediator = _this.getComponent(MediatorCls) || _this.addComponent(MediatorCls);
		}
	}

	override dispose() {
		super.dispose();
		this.mediator = null;
	}

	protected onCreate() { }
	protected onAwake() { }
	protected onEnable() { }
	protected onDisable() { }
	protected onDestroy() { }
	onOpenAni() {
		return Promise.resolve();
	}
	onCloseAni() {
		return Promise.resolve();
	}

	protected dispatch(eventName: string, data?: any) {
		$facade.dispatch(eventName, data);
	}
	protected openView<T = any>(viewId: EUIViewID, data?: T, openType?: EViewOpenType) {
		return $uiMgr.openView(viewId, data, openType);
	}
	protected closeView(viewId: EUIViewID) {
		return $uiMgr.closeView(viewId);
	}
	protected closeSelf() {
		const { viewId, viewType } = this;
		if (viewType == EViewType.UI)
			return $uiMgr.closeView(viewId as EUIViewID);
		else
			return Promise.resolve();
	}

	protected getPath() {
		let _this: fgui.GComponent = this;
		let path = _this.name;
		while (_this.parent) {
			_this = _this.parent;
			path = (_this.name ? _this.name + "." : "") + path;
		}
		return path;
	}

}