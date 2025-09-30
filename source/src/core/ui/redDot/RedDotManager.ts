import { ENotifyConst } from "../../common/NotifyConst";
import { RDDefineInit, RDMap } from "./RedDotDefine";
import { RedDotNode } from "./RedDotNode";
import { RedDotTrigger } from "./RedDotTrigger";

export class RedDotManager extends Laya.EventDispatcher implements IRedDotManager {
    init() {
        RedDotTrigger.Inst.init();
        RDDefineInit();
        $facade.interestNotify(this);
    }

    @InterestNotify(ENotifyConst.RedDotCompAwake)
    private onRedDotCompAwake(comp: fgui.GComponent) {
        const data = this.getRDByComp(RDMap.Root, comp);
        data && data.refresh();
    }

    @InterestNotify(ENotifyConst.RedDotCompDestroy)
    private onRedDotCompDestroy(comp: fgui.GComponent) {
        const data = this.getRDByComp(RDMap.Root, comp);
        data && data.recover();
    }

    private getRDByComp(data: IRedDotNode, comp: fgui.GComponent) {
        if (!data || !comp) return null;
        if (data.comp == comp) return data;
        const childs = data.childs;
        for (let i = 0, cnt = childs.length; i < cnt; i++) {
            const result: IRedDotNode = this.getRDByComp(childs[i], comp);
            if (result) return result;
        }
        return null;
    }
}