
function dispatch(eventName: string, data?: any) {
	$facade.dispatch(eventName, data);
};
function openView(viewId: EUIViewID, data?: any, openType?: EViewOpenType) {
	return $uiMgr.openView(viewId, data, openType);
};
function closeView(viewId: EUIViewID) {
	return $uiMgr.closeView(viewId);
};
function closeSelf() {
	const { viewId, viewType } = this;
	if (viewType == EViewType.UI)
		return $uiMgr.closeView(viewId as EUIViewID);
	else
		return Promise.resolve();
};
function getPath() {
	let _this: fgui.GComponent = this;
	let path = _this.name;
	while (_this.parent) {
		_this = _this.parent;
		path = (_this.name ? _this.name + "." : "") + path;
	}
	return path;
};

export function GViewExtend<T extends Class<any>>(constructor: T) {
	const prototype = constructor.prototype;

	const oldConstructFromResource = prototype.constructFromResource;
	const oldDispose = prototype.dispose;

	prototype.constructFromResource = function () {
		const _this = this;
		oldConstructFromResource.call(_this);
		const { viewId, displayObject } = _this;

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
	};
	prototype.dispose = function () {
		oldDispose.call(this);
		this.mediator = null;
	};
	prototype.dispatch = dispatch;
	prototype.openView = openView;
	prototype.closeView = closeView;
	prototype.closeSelf = closeSelf;
	prototype.getPath = getPath;
	return constructor;
}