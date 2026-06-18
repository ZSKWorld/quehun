import { Observer } from "../../../mvc/provider/Observer";

export abstract class Base_RDChecker extends Observer implements IRDChecker {
	private _triggerEventMap: KeyMap<Function[]>;

	get rdInfos(): IRDCheckInfo[] {
		return [];
	}

	constructor() {
		super();
		const triggerEventMap = this._triggerEventMap;
		for (const key in triggerEventMap) {
			triggerEventMap[key].forEach(func => $redDotMgr.checkListener.on(key, this, func, [key]));
		}
	}

	protected setRDCheck(type: ERDTriggerType, checked: boolean | number) {
		const count = typeof checked === "boolean" ? +!!checked : checked;
		$redDotMgr.setRDCount(type, count);
	}
}