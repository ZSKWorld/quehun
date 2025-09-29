import { Observer } from "../mvc/provider/Observer";

export class MessageData extends Observer {
    constructor() {
        super();
        $facade.interestMessage(this);
    }

    protected decodeMessage<T extends IProto>(data: T): ProtoObject<T> {
        if (!data) return data;
        var type = data.$type;
        if (!type) return data;
        var result: ProtoObject<T> = {} as any;
        type.fieldsArray.forEach(v => {
            var value = data[v.name];
            if (Array.isArray(value))
                result[v.name] = [...value.map(v1 => this.decodeMessage(v1))];
            else
                result[v.name] = this.decodeMessage(value);
        });
        return result;
    }
}