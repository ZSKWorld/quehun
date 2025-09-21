import { RDName, RDTriggerType } from "./RedDotEnum";
import { RedDotNode } from "./RedDotNode";

const map: { [key in RDName]: IRedDotNode } = {} as any;

const create = function (parent?: IRedDotNode, path?: string, triggers?: RDTriggerType[]) {
    return RedDotNode.create(parent, path, triggers);
}

export const RDDefineInit = function () {
    if (!map.Root) {
        map.Root = create();
    }
}
export const RDMap = map;
