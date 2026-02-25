import { Notifier } from "./Notifier";

export class Observer extends Notifier implements IObserver {
	constructor() {
		super();
		$facade.setNotifyDecoaratorEnable(this, true);
		$facade.setMessageDecoaratorEnable(this, true);
		$facade.setUserEventDecoaratorEnable(this, true);
	}
}
