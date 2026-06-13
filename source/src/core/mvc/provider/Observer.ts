import { Notifier } from "./Notifier";

export class Observer extends Notifier implements IObserver {
	constructor() {
		super();
		$facade.setGlobalEventDecoratorEnable(this, true);
		$facade.setNetEventDecoratorEnable(this, true);
		$facade.setUserEventDecoratorEnable(this, true);
	}
}
