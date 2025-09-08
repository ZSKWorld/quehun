import { HeaderType, ServiceType } from "./NetDefine";


export class PbManager implements IPbManager {
  private _root: protobuf.Root;
  private _seriveMethods: { [key in ServiceType]: protobuf.Method[] };
  private _methodMap: KeyMap<ServiceType>;
  private _wrapperCtor: protobuf.Type;

  get methodMap() { return this._methodMap; }

  async loadPb() {
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
    this._seriveMethods = {} as any;
    services.forEach(s => {
      s.methodsArray.forEach(m => {
        this._methodMap[m.name] = s.fullName as ServiceType;
      });
      this._seriveMethods[s.fullName] = [...s.methodsArray];
    });

    this._wrapperCtor = this.lookupType('lq.Wrapper');

  }

  //#region proto
  lookup(path: (string | string[]), parentAlreadyChecked?: boolean) {
    return this._root.lookup(path, parentAlreadyChecked);
  }

  lookupType(path: (string | string[])) {
    return this._root.lookupType(path);
  }

  lookupEnum(path: (string | string[])) {
    return this._root.lookupEnum(path);
  }

  lookupTypeOrEnum(path: (string | string[])) {
    return this._root.lookupTypeOrEnum(path);
  }

  lookupService(path: (string | string[])) {
    return this._root.lookupService(path);
  }

  lookupMethod(path: (string | string[])) {
    if (typeof (path) == 'string') path = path.split('.');

    if (path.length === 0) return null;

    const service = this.lookupService(path.slice(0, -1));
    if (!service) return null;

    const method = path[path.length - 1];
    return service.methods[method];
  }
  //#endregion

  //#region wrapper
  encodeHeaderData(header: IHeaderData) {
    switch (header.type) {
      case HeaderType.Request:
        return new Uint8Array([header.type, header.reqIndex & 0xff, header.reqIndex >> 8]);
      case HeaderType.Response:
        return new Uint8Array([header.type, header.reqIndex & 0xff, header.reqIndex >> 8]);
      case HeaderType.Notify:
        return new Uint8Array([header.type]);
    }
    return new Uint8Array([]);
  }

  encodeMessage(message: protobuf.Message<{}>) {
    const msgType = message.$type;
    return this.wrap(msgType.fullName, msgType.encode(message).finish());
  }

  decodeMessage(bytes: Uint8Array) {
    const wrapper = this.unwrap(bytes);
    return this.decode(wrapper.name, wrapper.data);
  }

  encodeRpc(method: string, bytes: Uint8Array) {
    return this.wrap(method, bytes);
  }

  decodeRpc(data: Uint8Array) {
    return this.unwrap(data);
  }

  private wrap(name: string, data: Uint8Array) {
    const wrapper = this._wrapperCtor;
    const msg = wrapper.create({
      name: name,
      data: data
    });
    return wrapper.encode(msg).finish();
  }

  private unwrap(data: Uint8Array) {
    const wrapper = this._wrapperCtor;
    return wrapper.decode(data) as unknown as { name: string, data: Uint8Array; };
  }

  private decode(name: string, data: Uint8Array) {
    const msgType = this.lookupType(name);
    if (!msgType)
      throw new Error(`cannot find message type, ${ name }`);

    return msgType.decode(data);
  }
  //#endregion
}
