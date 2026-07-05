import ComContextMenu from "../../../../ui/PkgCommon/ComContextMenu";

export const enum EComContextMenuMsg {

}

export class ComContextMenuView extends ExtendClass<IView, ComContextMenu>(ComContextMenu) implements IView {
	get list() { return this.list_list; }
}
