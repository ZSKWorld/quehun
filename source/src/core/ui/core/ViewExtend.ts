import { MediatorBase } from "../../mvc/view/MediatorBase";

/** 页面及控制器扩展 */
export class ViewExtend {
	static extends() {
		this.viewExtend(MediatorBase.prototype);
		this.viewExtend(fgui.GComponent.prototype as IView);
		this.fguiGComponentExtend();
	}

	private static fguiGComponentExtend() {
		const prototype = fgui.GComponent.prototype as IView;
		prototype.sendEvent = function (...args) {
			const mediator = (<IView>this).mediator;
			mediator && mediator.sendEvent(...args);
		};
		prototype.addEvent = function (type, callback, args?, once?) {
			const mediator = (<IView>this).mediator;
			mediator && mediator.addEvent(type, callback, args, once);
		};
		prototype.removeEvent = function (type, listener) {
			const mediator = (<IView>this).mediator;
			mediator && mediator.removeEvent(type, listener);
		};

		const constructFromResource = prototype.constructFromResource;
		prototype.constructFromResource = function () {
			constructFromResource.call(this);
			const _this = <IView>this;
			_this.onCreate?.();
			if (_this.viewId) {
				const MediatorCls = facade.getMediator(_this.viewId);
				let mediator = _this.getComponent(MediatorCls);
				if (!mediator && MediatorCls) {
					mediator = _this.addComponent(MediatorCls);
				}
				_this.mediator = mediator;
			}
		};

		const dispose = prototype.dispose;
		prototype.dispose = function () {
			dispose.call(this);
			const _this = this as IView;
			_this.mediator = null;
		};
		prototype.getPath = function () {
			let _this = <fgui.GObject>this;
			let path = _this.name;
			while (_this.parent) {
				_this = _this.parent;
				path = (_this.name ? _this.name + "." : "") + path;
			}
			return path;
		};
	}

	private static viewExtend(prototype: IViewExtend) {
		prototype.dispatch = function (...args) { return facade.dispatch(...args); };
		prototype.openView = function (...args) { return uiMgr.openView(...args); };
		prototype.closeSelf = function () {
			const { viewId, viewType } = (<IViewExtend>this);
			(viewType == ViewType.UI) && uiMgr.closeView(viewId);
		};
	}
}