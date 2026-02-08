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

	private _triggers = new Map<ERDTriggerType, boolean | number>();
	private _triggerEventMap: KeyMap<Function[]>;

	init() {
		const triggerEventMap = this._triggerEventMap;
		for (const key in triggerEventMap) {
			triggerEventMap[key].forEach(func => $redDotMgr.on("Trigger" + key, this, func, [key]));
		}
	}

	@InterestUserEvent(EUserEvent.OnMailChanged)
	private checkMail() {
		const mails = $userData.mail.mails;
		this.setTriggered(ERDTriggerType.MailNotRead, mails.some(v => v.state == 0));
		this.setTriggered(ERDTriggerType.MailHaveReward, mails.some(v => v.attachments.length && !v.take_attachment));
	}

	private setTriggered(type: ERDTriggerType, triggered: boolean | number) {
		this._triggers.set(type, triggered);
		Laya.timer.callLater(this, this.callTrigger);
	}

	private callTrigger() {
		const { _triggers } = this;
		for (const [k, v] of _triggers) {
			$redDotMgr.event(k, [k, v]);
		}
		_triggers.clear();
	}
}