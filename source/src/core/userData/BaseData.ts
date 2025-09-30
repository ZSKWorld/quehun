import { Observer } from "../mvc/provider/Observer";

export class BaseData extends Observer {
    constructor() {
        super();
        $netMgr.interestMessage(this);
    }

    protected decode<T extends IProto>(data: T): ProtoObject<T> {
        if (!data) return data;
        const type = data.$type;
        if (!type) return data;
        const result: ProtoObject<T> = {} as any;
        type.fieldsArray.forEach(v => {
            const value = data[v.name];
            if (Array.isArray(value))
                result[v.name] = [...value.map(v1 => this.decode(v1))];
            else
                result[v.name] = this.decode(value);
        });
        return result;
    }
}