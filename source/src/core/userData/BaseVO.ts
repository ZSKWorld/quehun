import { Notifier } from "../mvc/provider/Notifier";

export class BaseVO extends Notifier {
	constructor() {
		super();
		$netMgr.interestMessage(this);
	}
}