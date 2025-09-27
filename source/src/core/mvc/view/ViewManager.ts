import { Singleton } from "../../common/Singleton";

export class ViewManager extends Singleton<ViewManager>() {
    private _viewClsMap: { [viewId in EViewID]?: IViewClass; } = {};
    private _mediatorlClsMap: { [viewId in EViewID]?: IMediatorClass; } = {};

    register(viewId: EViewID, viewType: EViewType, viewCls: IViewClass, mediatorCls: IMediatorClass) {
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

    has(viewId: EViewID) {
        return !!this._mediatorlClsMap[viewId];
    }

    get(viewId: EViewID) {
        return this._mediatorlClsMap[viewId];
    }

    create(viewId: EViewID, fullScreen: boolean = false) {
        const viewInst = this._viewClsMap[viewId].createInstance();
        viewInst.name = viewId;
        fullScreen && viewInst.makeFullScreen();
        return viewInst.getComponent(this.get(viewId));
    }
}