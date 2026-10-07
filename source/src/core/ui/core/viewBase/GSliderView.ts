import { GViewExtend } from "./GViewExtend";

@GViewExtend
export class GSliderView extends fgui.GSlider implements IView {
	readonly viewId: EViewID;
	readonly viewType: EViewType;
	readonly viewLayer: ELayer;
	readonly viewCategory: EViewCategory;
	readonly mediator: IMediator;

	onOpenAni() { return Promise.resolve(null); }
	onCloseAni() { return Promise.resolve(null); }
	protected onCreate() { }
	protected onAwake() { }
	protected onEnable() { }
	protected onDisable() { }
	protected onDestroy() { }
	protected dispatch(eventName: string, data?: any) { }
	protected openView<T = any>(viewId: EUIViewID, data?: T, openType?: EViewOpenType) {
		return Promise.resolve();
	}
	protected closeView(viewId: EUIViewID) { return Promise.resolve(); }
	protected closeSelf() { return Promise.resolve(); }
	protected getPath() { return ""; }
}