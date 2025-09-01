import { Singleton } from "../../common/Singleton";

export class ModelManager extends Singleton<ModelManager>() {
    private _proxyMap: { [proxyId in ProxyID]?: IProxy; } = {};

    register(proxyId: ProxyID, proxy: IProxyClass) {
        if (!proxy) {
            Logger.error("cls 不能为空", proxyId, proxy);
        }
        if (this.has(proxyId)) {
            Logger.error("重复注册proxy", proxyId);
            return;
        }
        proxy.prototype.proxyId = proxyId;
        this._proxyMap[proxyId] = new proxy();
    }

    has(proxyId: ProxyID) {
        return !!this._proxyMap[proxyId];
    }

    get(proxyId: ProxyID) {
        return this._proxyMap[proxyId];
    }
}