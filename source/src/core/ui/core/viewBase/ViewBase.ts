const ClassMap = new Map<Class<fgui.GComponent>, Class<IView & fgui.GComponent>>();

export function ViewBase<T extends fgui.GComponent = fgui.GComponent>(cls: Class<T>) {

	let NewClass: Class<IView & T>;

	if (ClassMap.has(cls))
		NewClass = ClassMap.get(cls) as any;
	else {
		const CLASS = cls as unknown as typeof fgui.GComponent;
		NewClass = class extends CLASS implements IView {
			readonly viewId: EViewID;
			readonly viewType: EViewType;
			readonly viewLayer: ELayer;
			readonly viewCategory: EViewCategory;
			mediator: IMediator<IView, any>;
			sendEvent(type: string, data?: any) { this.event(type, data); }
			onOpenAni() { return Promise.resolve(); }
			onCloseAni() { return Promise.resolve(); }
			getPath() {
				let _this: fgui.GComponent = this;
				let path = _this.name;
				while (_this.parent) {
					_this = _this.parent;
					path = (_this.name ? _this.name + "." : "") + path;
				}
				return path;
			}
			dispatch(eventName: string, data?: any) { $facade.dispatch(eventName, data); }
			openView<T = any>(viewId: EUIViewID, data?: T, openType?: EViewOpenType) {
				return $uiMgr.openView(viewId, data, openType);
			}
			closeView(viewId: EUIViewID) {
				return $uiMgr.closeView(viewId);
			}
			closeSelf() {
				const { viewId, viewType } = this;
				if (viewType == EViewType.UI)
					return $uiMgr.closeView(viewId as EUIViewID);
				else
					return Promise.resolve();
			}

			override constructFromResource() {
				super.constructFromResource();

				const view = <IView>this;
				view.onCreate?.();
				view.onAwake && (view.displayObject.onAwake = view.onAwake.bind(view));
				view.onEnable && (view.displayObject.onEnable = view.onEnable.bind(view));
				view.onDisable && (view.displayObject.onDisable = view.onDisable.bind(view));
				view.onDestroy && (view.displayObject.onDestroy = view.onDestroy.bind(view));
				if (view.viewId) {
					const MediatorCls = $facade.getMediatorClass(view.viewId);
					if (MediatorCls)
						this.mediator = view.getComponent(MediatorCls) || view.addComponent(MediatorCls);
				}
			}

			override dispose() {
				super.dispose();
				this.mediator = null;
			}

		} as any;

		ClassMap.set(cls, NewClass);
	}
	return NewClass;
}