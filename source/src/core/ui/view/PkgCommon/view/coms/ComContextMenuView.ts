import ComContextMenu from "../../../../ui/PkgCommon/ComContextMenu";

export const enum EComContextMenuMsg {

}

export class ComContextMenuView extends ComContextMenu {
	get list() { return this.list_list; }
}
