import ComItem1 from "../../../../ui/PkgCommon/ComItem1";

export const enum EBtnItem1Msg {

}

export class ComItem1View extends ExtendClass<IView, ComItem1>(ComItem1) implements IView {

	override onCreate() {

	}

	refreshSkin(url: string) {
		this.com_item.refreshSkin(url);
	}

	refresh(id: number) {
		this.com_item.refreshItemIcon(id);
	}
}
