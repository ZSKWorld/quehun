import { SingletonExtend } from "../../common/Singleton";

export class Provider extends SingletonExtend<Provider, Laya.EventDispatcher>(Laya.EventDispatcher) {

    interestNotify(caller: any) {
        this.interest(caller, "__notifyMap");
    }

    interestMessage(caller: any) {
        this.interest(caller, "__messageMap");
    }

    private interest(caller: any, mapName: string) {
        if (!caller) return;
        const eventList = caller[mapName];
        if (!eventList) return;
        for (const eventName in eventList) {
            const callbackList = eventList[eventName];
            for (const k in callbackList) {
                const callback: any = callbackList[k];
                const param = callback[eventName];
                const once = param ? param.__once : false;
                const args = param ? param.__args : null;
                if (once) {
                    this.once(eventName, caller, callback, args);
                } else {
                    this.on(eventName, caller, callback, args);
                }
            }
        }
    }
}