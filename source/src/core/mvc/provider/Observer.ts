import { Notifier } from "./Notifier";

export class Observer extends Notifier implements IObserver {
	constructor() {
		super();
		$facade.setNotifyDecoratorEnable(this, true);
		$facade.setMessageDecoratorEnable(this, true);
		$facade.setUserEventDecoratorEnable(this, true);
	}
}
