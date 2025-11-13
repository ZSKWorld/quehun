import UIActivity from "../../../ui/PkgMain/UIActivity";

export const enum EUIActivityMsg {

}

export class UIActivityView extends ExtensionClass<IView, UIActivity>(UIActivity) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		
	}

}
