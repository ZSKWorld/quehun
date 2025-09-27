import { Notifier } from "../provider/Notifier";

/** 代理基类 */
export abstract class ProxyBase extends Notifier implements IProxy {
    readonly proxyId: EProxyID;
    constructor() {
        super();
        $facade.interestMessage(this);
    }
}