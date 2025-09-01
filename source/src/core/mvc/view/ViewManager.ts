import { Singleton } from "../../common/Singleton";

export class ViewManager extends Singleton<ViewManager>() {
    private _viewClsMap: { [viewId in ViewID]?: IViewClass; } = {};
    private _mediatorlClsMap: { [viewId in ViewID]?: IMediatorClass; } = {};

    register(viewId: ViewID, viewType: ViewType, viewCls: IViewClass, mediatorCls: IMediatorClass) {
        if (!viewCls || !mediatorCls) {
            Logger.error("viewCls or mediatorCls 不能为空", viewId, viewCls, mediatorCls);
            return;
        }
        if (this._viewClsMap[viewId]) {
            Logger.error("重复注册view", viewId);
            return;
        }
        viewCls.prototype.viewId = viewId;
        viewCls.prototype.viewType = viewType;
        mediatorCls.prototype.viewId = viewId;
        mediatorCls.prototype.viewType = viewType;
        this._viewClsMap[viewId] = viewCls;
        this._mediatorlClsMap[viewId] = mediatorCls;
    }

    has(viewId: ViewID) {
        return !!this._mediatorlClsMap[viewId];
    }

    get(viewId: ViewID) {
        return this._mediatorlClsMap[viewId];
    }

    create(viewId: ViewID, fullScreen: boolean = false) {
        const viewInst = this._viewClsMap[viewId].createInstance();
        viewInst.name = viewId;
        fullScreen && viewInst.makeFullScreen();
        return viewInst.getComponent(this.get(viewId));
    }
}