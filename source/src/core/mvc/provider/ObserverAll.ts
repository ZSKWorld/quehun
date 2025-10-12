import { Observer } from "./Observer";

export class ObserverAll extends Observer {
    constructor() {
        super();
        $netMgr.interestMessage(this);
    }
}