import { Notifier } from "./Notifier";

export class Observer extends Notifier implements IObserver {
    public constructor() {
        super();
        facade.interestNotify(this);
    }
}
