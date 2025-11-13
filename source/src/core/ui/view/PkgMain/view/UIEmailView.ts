import UIEmail from "../../../ui/PkgMain/UIEmail";

export const enum EUIEmailMsg {

}

export class UIEmailView extends ExtensionClass<IView, UIEmail>(UIEmail) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		
	}

}
