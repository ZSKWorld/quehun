import ComItem1 from "../../../../ui/PkgCommon/ComItem1";

export const enum EBtnItem1Msg {

}

export class ComItem1View extends ExtensionClass<IView, ComItem1>(ComItem1) implements IView {

	override onCreate() {

	}

	refresh(id: number) {
		this.com_item.refreshItemIcon(id);
	}
}
