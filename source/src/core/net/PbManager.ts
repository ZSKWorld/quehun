import { ServiceType } from "./NetDefine";


export class PbManager implements IPbManager {
    private _root: protobuf.Root;
    private _methodMap: KeyMap<protobuf.Method>;
    private _seriveMethods: { [key in ServiceType]: protobuf.Method[] };
    private _method2Service: KeyMap<ServiceType>;
    private _wrapperCtor: protobuf.Type;

    get methodMap() { return this._methodMap; }
    get method2Service() { return this._method2Service; }

    async init() {
        const protoJson = await loadMgr.fetch(ResPath.ConfigPath.Proto, "json");
        this._root = protobuf.Root.fromJSON(protoJson);
        this._root.resolveAll();
        const services: protobuf.Service[] = [];
        this._root.nestedArray.forEach(v => {
            Object.values(v).forEach((vv: any) => {
                if (vv instanceof protobuf.Service) {
                    services.push(vv);
                }
            });
        });
        this._methodMap = {} as any;
        this._method2Service = {} as any;
        this._seriveMethods = {} as any;
        services.forEach(s => {
            s.methodsArray.forEach(m => {
                this._methodMap[m.name] = m;
                this._method2Service[m.name] = s.fullName as ServiceType;
            });
            this._seriveMethods[s.fullName] = [...s.methodsArray];
        });

        this._wrapperCtor = this._root.lookupType('lq.Wrapper');

    }

    decodeMessage(bytes: Uint8Array) {
        const wrapper = this.decodeRpc(bytes);
        const msgType = this._root.lookupType(wrapper.name);
        return msgType.decode(wrapper.data);
    }

    encodeRpc(name: string, data: Uint8Array) {
        const wrapper = this._wrapperCtor;
        const msg = wrapper.create({
            name: name,
            data: data
        });
        return wrapper.encode(msg).finish();
    }

    decodeRpc(data: Uint8Array) {
        const wrapper = this._wrapperCtor;
        return wrapper.decode(data) as unknown as { name: string, data: Uint8Array; };
    }
}
