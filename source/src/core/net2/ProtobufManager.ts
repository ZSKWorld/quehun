import * as protobuf from "../../../libs_game/protobuf";

export class ProtobufManager {
  private static root: protobuf.Root;

  static loadProto(descriptor: any) {
    this.root = protobuf.Root.fromJSON(descriptor);
    this.root.resolveAll();
  }

  static lookup(path: (string | string[]), parentAlreadyChecked?: boolean) {
    return this.root.lookup(path, parentAlreadyChecked);
  }

  static lookupType(path: (string | string[])) {
    return this.root.lookupType(path);
  }

  static lookupEnum(path: (string | string[])) {
    return this.root.lookupEnum(path);
  }

  static lookupTypeOrEnum(path: (string | string[])) {
    return this.root.lookupTypeOrEnum(path);
  }

  static lookupService(path: (string | string[])) {
    return this.root.lookupService(path);
  }

  static lookupMethod(path: (string | string[])) {
    if (typeof (path) == 'string') path = path.split('.');

    if (path.length === 0) return null;

    const service = this.lookupService(path.slice(0, -1));
    if (!service) return null;

    const method = path[path.length - 1];
    return service.methods[method];
  }

}
