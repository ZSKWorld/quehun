import { Observer } from "../../../mvc/provider/Observer";

export abstract class RDRegisterBase extends Observer implements IRDRegister {
	private _triggerEventMap: KeyMap<Function[]>;

	get rdInfos(): IRDRegisterInfo[] {
		return [];
	}

	constructor() {
		super();
		const triggerEventMap = this._triggerEventMap;
		for (const key in triggerEventMap) {
			triggerEventMap[key].forEach(func => $redDotMgr.checkListener.on(key, this, func, [key]));
		}
	}

	protected setTriggered(type: ERDTriggerType, triggered: boolean | number) {
		$redDotMgr.setTriggered(type, triggered);
	}
}