import UICamera from "../../../../ui/PkgMain/UICamera";

export const enum EUICameraMsg {

}

export class UICameraView extends ExtensionClass<IView, UICamera>(UICamera) implements IView {

	override onCreate() {
		const { btn_close } = this;
		btn_close.onClick(this, this.closeSelf);
	}

}
