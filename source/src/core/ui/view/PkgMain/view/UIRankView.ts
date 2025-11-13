import UIRank from "../../../ui/PkgMain/UIRank";

export const enum EUIRankMsg {

}

export class UIRankView extends ExtensionClass<IView, UIRank>(UIRank) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {
		
	}

}
