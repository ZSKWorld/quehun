import { ProtobufManager } from "./ProtobufManager";


export enum HeaderType {
  NULL = 0,
  NOTIFY = 1,
  REQUEST = 2,
  RESPONSE = 3,
}

export class HeaderData {
  type: number; // HeaderType
  reqIndex?: number; // for HeaderType.REQUEST
}


export class MessageWrapper {

  static initWrapper() {
    this.WrapperCtor = ProtobufManager.lookupType('lq.Wrapper');
    console.log(`Wrapper is ${ JSON.stringify(this.WrapperCtor) }`);
  }

  static encodeHeaderData(header: HeaderData) {
    switch (header.type) {
      case HeaderType.REQUEST:
        // return Uint8Array.from([header.type, header.reqIndex & 0xff, header.reqIndex >> 8]);
        return new Uint8Array([header.type, header.reqIndex & 0xff, header.reqIndex >> 8]);
      case HeaderType.RESPONSE:
        // return Uint8Array.from([header.type, header.reqIndex & 0xff, header.reqIndex >> 8]);
        return new Uint8Array([header.type, header.reqIndex & 0xff, header.reqIndex >> 8]);
      case HeaderType.NOTIFY:
        // return Uint8Array.from([header.type]);
        return new Uint8Array([header.type]);
    }
    // return Uint8Array.from([]);
    return new Uint8Array([]);
  }

  static encodeMessage(message: any) {
    const MessageType = message.$type;
    return this.wrap(MessageType.fullName, MessageType.encode(message).finish());
  }

  static decodeMessage(bytes: Uint8Array) {
    const wrapper = this.unwrap(bytes);
    return this.decode(wrapper.name, wrapper.data);
  }

  static encodeRpc(method: string, Uint8Array: Uint8Array) {
    return this.wrap(method, Uint8Array);
  }

  static decodeRpc(data: Uint8Array): any {
    return this.unwrap(data);
  }

  private static wrap(name: string, data: Uint8Array) {
    const Wrapper = this.WrapperCtor;
    const wrapper = Wrapper.create({
      name: name,
      data: data
    });
    return Wrapper.encode(wrapper).finish();
  }

  private static unwrap(data: Uint8Array) {
    const Wrapper = MessageWrapper.WrapperCtor;
    return Wrapper.decode(data);
  }

  private static decode(name: string, data: Uint8Array) {
    const MessageType = ProtobufManager.lookupType(name);
    if (!MessageType)
      throw new Error(`ERR_CANNOT_FIND_MESSAGE_TYPE, ${ name }`);

    return MessageType.decode(data);
  }

  static WrapperCtor: any;
}