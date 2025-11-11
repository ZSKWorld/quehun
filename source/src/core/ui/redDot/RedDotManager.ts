import { ENotifyConst } from "../../common/NotifyConst";
import { ERDName } from "./RedDotDefine";
import { RedDotNode } from "./RedDotNode";
import { RedDotTrigger } from "./RedDotTrigger";

export class RedDotManager extends Laya.EventDispatcher implements IRedDotManager {
	private _rdMap: { [key in ERDName]: IRedDotNode };

	init() {
		RedDotTrigger.Inst.init();
		$facade.interestNotify(this);

		this._rdMap = {} as any;
		const rdMap = this._rdMap;
		rdMap.Root = RedDotNode.create();
	}

	@InterestNotify(ENotifyConst.RedDotCompAwake)
	private onRedDotCompAwake(comp: fgui.GComponent) {
		const data = this.getRDByComp(this._rdMap.Root, comp);
		data && data.refresh();
	}

	@InterestNotify(ENotifyConst.RedDotCompDestroy)
	private onRedDotCompDestroy(comp: fgui.GComponent) {
		const data = this.getRDByComp(this._rdMap.Root, comp);
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