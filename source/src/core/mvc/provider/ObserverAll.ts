import { Observer } from "./Observer";

export class ObserverAll extends Observer {
	constructor() {
		super();
		$facade.setMessageDecoaratorenable(this, true);
	}
}