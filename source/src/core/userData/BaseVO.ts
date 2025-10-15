import { ObserverAll } from "../mvc/provider/ObserverAll";

export class BaseVO extends ObserverAll {

    protected decodeProtoData<T extends IProto>(data: T) {
        return $decodeProtoData(data);
    }
}