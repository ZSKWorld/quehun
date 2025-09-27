import { ERDName, ERDTriggerType } from "./RedDotEnum";
import { RedDotNode } from "./RedDotNode";

const map: { [key in ERDName]: IRedDotNode } = {} as any;

const create = function (parent?: IRedDotNode, path?: string, triggers?: ERDTriggerType[]) {
    return RedDotNode.create(parent, path, triggers);
}

export const RDDefineInit = function () {
    if (!map.Root) {
        map.Root = create();
    }
}
export const RDMap = map;
