import { SingletonExtend } from "../../common/Singleton";
import { Observer } from "../../mvc/provider/Observer";
import { RDTriggerType } from "./RedDotEnum";

function RDTriggerEvent(eventName: RDTriggerType) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const eventMap: KeyMap<Function[]> = target._triggerEventMap = target._triggerEventMap || {};
        const func = descriptor.value;
        if (eventMap[eventName])
            eventMap[eventName].push(func);
        else
            eventMap[eventName] = [func];
    };
}

export class RedDotTrigger extends SingletonExtend<RedDotTrigger, Observer>(Observer) {

    private _triggers = new Map<RDTriggerType, boolean>();
    private _triggerEventMap: KeyMap<Function[]>;
    private _eventCenter: Laya.EventDispatcher;

    init(event: Laya.EventDispatcher) {
        this._eventCenter = event;
        const triggerEventMap = this._triggerEventMap;
        for (const key in triggerEventMap) {
            triggerEventMap[key].forEach(func => event.on("Trigger" + key, this, func, [key]));
        }
    }

    private setTriggered(type: RDTriggerType, triggered: boolean) {
        this._triggers.set(type, triggered);
        Laya.timer.callLater(this, this.callTrigger);
    }

    private callTrigger() {
        const { _triggers, _eventCenter } = this;
        _triggers.forEach((v, k) => {
            _eventCenter.event(k, [k, v]);
        });
        _triggers.clear();
    }
}