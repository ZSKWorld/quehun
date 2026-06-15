import { Observer } from "../../mvc/provider/Observer";
import { RedDotNode } from "./RedDotNode";
import { RDTriggerManager } from "./register/RDTriggerManager";

@Singleton
export class RedDotManager extends Observer implements IRedDotManager {
	private _checkListener = new Laya.EventDispatcher();
	private _triggerListener = new Laya.EventDispatcher();
	private _rdMap: Record<ERDName, IRedDotNode> = {} as any;
	private _triggers = new Map<ERDTriggerType, boolean | number>();

	get checkListener() { return this._checkListener; }
	get triggerListener() { return this._triggerListener; }

	setTriggered(type: ERDTriggerType, triggered: boolean | number) {
		this._triggers.set(type, triggered);
		Laya.timer.callLater(this, this.callTrigger);
	}

	private callTrigger() {
		const { _triggers } = this;
		for (const [k, v] of _triggers) {
			this._triggerListener.event(k, [k, v]);
		}
		_triggers.clear();
	}

	@InjectGlobalEvent(EGlobalEvent.OnInitGameCompleted)
	private onInitGameCompleted() {
		const rdMap = this._rdMap;
		const rdRegisters = RDTriggerManager.getTriggers();
		const rdInfos = rdRegisters.reduce((pre, cur) => pre.concat(cur.rdInfos), [] as IRDTriggerInfo[]);
		while (rdInfos.length > 0) {
			const info = rdInfos.shift();
			const parentName = info[1];
			if (parentName && !rdMap[parentName]) {
				rdInfos.push(info);
			} else {
				const name = info[0];
				const path = info[2];
				const triggers = info[3];
				const parent = parentName ? rdMap[parentName] : null;
				const node = RedDotNode.create(parent, path, triggers);
				rdMap[name] = node;
			}
		}
	}

	@InjectGlobalEvent(EGlobalEvent.RedDotCompAwake)
	private onRedDotCompAwake(comp: fgui.GComponent) {
		const data = this.getRDByComp(this._rdMap[ERDName.Root], comp);
		data && data.refresh();
	}

	@InjectGlobalEvent(EGlobalEvent.RedDotCompDestroy)
	private onRedDotCompDestroy(comp: fgui.GComponent) {
		const data = this.getRDByComp(this._rdMap[ERDName.Root], comp);
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