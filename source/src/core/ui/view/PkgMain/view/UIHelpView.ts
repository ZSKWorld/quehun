import UIHelp from "../../../ui/PkgMain/UIHelp";

export const enum EUIHelpMsg {

}

export class UIHelpView extends ExtensionClass<IView, UIHelp>(UIHelp) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		
	}

}
