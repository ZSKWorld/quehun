import { Observer } from "./Observer";

export class ObserverAll extends Observer {
	constructor() {
		super();
		$facade.setMessageDecoaratorEnable(this, true);
		$facade.setUserEventDecoaratorEnable(this, true);
	}
}