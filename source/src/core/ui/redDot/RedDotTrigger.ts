import { SingletonExtend } from "../../common/Singleton";
import { Observer } from "../../mvc/provider/Observer";
import { EquipmentPart } from "../../userData/const/ItemEnum";
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
    private _equipMap: { [key in RDTriggerType]?: EquipmentPart } = {
        [RDTriggerType.WeaponCanWear]: EquipmentPart.Weapon,
        [RDTriggerType.HelmetCanWear]: EquipmentPart.Helmet,
        [RDTriggerType.NecklaceCanWear]: EquipmentPart.Necklace,
        [RDTriggerType.ClothesCanWear]: EquipmentPart.Clothes,
        [RDTriggerType.RingCanWear]: EquipmentPart.Ring,
        [RDTriggerType.TrousersCanWear]: EquipmentPart.Trousers,
        [RDTriggerType.AmuletCanWear]: EquipmentPart.Amulet,
        [RDTriggerType.ShoesCanWear]: EquipmentPart.Shoes,
        [RDTriggerType.MountCanWear]: EquipmentPart.Mount,
        [RDTriggerType.FashionCanWear]: EquipmentPart.Fashion,
        [RDTriggerType.HiddenWeeaponCanWear]: EquipmentPart.HiddenWeeapon,
        [RDTriggerType.MagicWeaponCanWear]: EquipmentPart.MagicWeapon,
    };
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

    /** 检测有更好的装备可穿戴红点 */
    @RDTriggerEvent(RDTriggerType.AmuletCanWear)
    @RDTriggerEvent(RDTriggerType.WeaponCanWear)
    @RDTriggerEvent(RDTriggerType.HelmetCanWear)
    @RDTriggerEvent(RDTriggerType.NecklaceCanWear)
    @RDTriggerEvent(RDTriggerType.ClothesCanWear)
    @RDTriggerEvent(RDTriggerType.RingCanWear)
    @RDTriggerEvent(RDTriggerType.TrousersCanWear)
    @RDTriggerEvent(RDTriggerType.AmuletCanWear)
    @RDTriggerEvent(RDTriggerType.ShoesCanWear)
    @RDTriggerEvent(RDTriggerType.MountCanWear)
    @RDTriggerEvent(RDTriggerType.FashionCanWear)
    @RDTriggerEvent(RDTriggerType.HiddenWeeaponCanWear)
    @RDTriggerEvent(RDTriggerType.MagicWeaponCanWear)
    @RDTriggerEvent(RDTriggerType.EquipCanWear)
    private checkAnyEquipCanWear(type: RDTriggerType) {
        let triggered = false;
        if (type == RDTriggerType.EquipCanWear) {
            for (const triggerType in this._equipMap) {
                const part = <EquipmentPart>this._equipMap[triggerType];
                const triggered2 = this.checkEquipCanWear(part);
                triggered = triggered || triggered2;
                this.setTriggered(<RDTriggerType>triggerType, triggered2);
            }
        } else {
            triggered = this.checkEquipCanWear(this._equipMap[type]);
        }
        this.setTriggered(type, triggered);
    }

    /** 检测指定部位是否有更好的可穿戴装备 */
    private checkEquipCanWear(part: EquipmentPart) {
        const wearedEquip = userData.body.getDressedEquip(part);
        const equips = userData.bag.equipment.filter(v => v.part == part);
        if (!wearedEquip) return equips.length > 0;
        return equips.length > 0 && equips.find(v => v.score > wearedEquip.score) != null;
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