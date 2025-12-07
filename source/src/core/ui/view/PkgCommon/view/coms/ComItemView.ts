import ComItem from "../../../../ui/PkgCommon/ComItem";

export const enum EComItemMsg {

}

export class ComItemView extends ExtensionClass<IView, ComItem>(ComItem) implements IView {
	refresh(id: number) {

	}
}
