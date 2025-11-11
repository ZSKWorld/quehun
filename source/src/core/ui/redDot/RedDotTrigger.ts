import { SingletonExtend } from "../../common/Singleton";
import { Observer } from "../../mvc/provider/Observer";
import { ERDTriggerType } from "./RedDotDefine";

function RDTriggerEvent(eventName: ERDTriggerType) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const eventMap: KeyMap<Function[]> = target._triggerEventMap = target._triggerEventMap || {};
		const func = descriptor.value;
		if (eventMap[eventName])
			eventMap[eventName].push(func);
		else
			eventMap[eventName] = [func];
	};
}

export class RedDotTrigger extends SingletonExtend<RedDotTrigger, Observer>(Observer) {

	private _triggers = new Map<ERDTriggerType, boolean>();
	private _triggerEventMap: KeyMap<Function[]>;

	init() {
		const triggerEventMap = this._triggerEventMap;
		for (const key in triggerEventMap) {
			triggerEventMap[key].forEach(func => $redDotMgr.on("Trigger" + key, this, func, [key]));
		}
	}

	private setTriggered(type: ERDTriggerType, triggered: boolean) {
		this._triggers.set(type, triggered);
		Laya.timer.callLater(this, this.callTrigger);
	}

	private callTrigger() {
		const { _triggers } = this;
		_triggers.forEach((v, k) => {
			$redDotMgr.event(k, [k, v]);
		});
		_triggers.clear();
	}
}