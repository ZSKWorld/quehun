import { Observer } from "../../mvc/provider/Observer";
import { ERDName, ERDTriggerType } from "./RedDotDefine";
import { RedDotNode } from "./RedDotNode";
import { RedDotTrigger } from "./RedDotTrigger";

export class RedDotManager extends Observer implements IRedDotManager {
	private _trigger: RedDotTrigger;
	private _checkListener = new Laya.EventDispatcher();
	private _triggerListener = new Laya.EventDispatcher();
	private _rdMap: { [key in ERDName]: IRedDotNode };

	get checkListener() { return this._checkListener; }
	get triggerListener() { return this._triggerListener; }

	@InterestNotify(ENotifyConst.OnInitGameCompleted)
	private onInitGameCompleted() {
		this._trigger = new RedDotTrigger();

		this._rdMap = {} as any;
		const rdMap = this._rdMap;
		rdMap.Root = RedDotNode.create();
		rdMap.Mail = RedDotNode.create(rdMap.Root, "UIBottom.UIMainView.mail", [ERDTriggerType.MailNotRead, ERDTriggerType.MailHaveReward]);
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
		const childs = data.children;
		for (let i = 0, cnt = childs.length; i < cnt; i++) {
			const result: IRedDotNode = this.getRDByComp(childs[i], comp);
			if (result) return result;
		}
		return null;
	}
}