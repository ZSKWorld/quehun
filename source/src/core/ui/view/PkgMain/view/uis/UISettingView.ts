import UISetting from "../../../../ui/PkgMain/UISetting";

export const enum EUISettingMsg {

}

export class UISettingView extends ExtensionClass<IView, UISetting>(UISetting) implements IView {
	override readonly viewCategory = EViewCategory.Popup;

	override onCreate() {

	}

}
