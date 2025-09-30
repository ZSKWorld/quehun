import { Notifier } from "../provider/Notifier";

/** 代理基类 */
export abstract class ProxyBase extends Notifier implements IProxy {
    readonly proxyId: EProxyID;
    constructor() {
        super();
        $netMgr.interestMessage(this);
    }

    protected checkError(res: IResponse) {
        if (!res.error) return false;
        const { code, u32_params, str_params, json_param } = res.error;
        if (code == 156) {//登录排队
            $uiMgr.openView(EViewID.UILoginQueueView);
        } else if (code == 503) {//删号提示

        } else {

        }
        // $facade.
        return true;
    }
}