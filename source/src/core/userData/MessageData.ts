import { Observer } from "../mvc/provider/Observer";

export class MessageData extends Observer {
    constructor() {
        super();
        $facade.interestMessage(this);
    }
}