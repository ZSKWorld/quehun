import { NotifyConst } from "../../common/NotifyConst";
import { SingletonExtend } from "../../common/Singleton";
import { RDDefineInit, RDMap } from "./RedDotDefine";
import { RedDotNode } from "./RedDotNode";
import { RedDotTrigger } from "./RedDotTrigger";

export class RedDotManager extends SingletonExtend<RedDotManager, Laya.EventDispatcher>(Laya.EventDispatcher) {
    init() {
        RedDotNode.eventCenter = this;
        RedDotTrigger.Inst.init(this);
        RDDefineInit();
        facade.interestNotify(this);
    }

    @InterestNotify(NotifyConst.RedDotCompAwake)
    private onRedDotCompAwake(comp: fgui.GComponent) {
        const data = this.getRDByComp(RDMap.Root, comp);
        data && data.refresh();
    }

    @InterestNotify(NotifyConst.RedDotCompDestroy)
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