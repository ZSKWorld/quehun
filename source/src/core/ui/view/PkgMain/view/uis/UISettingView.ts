import UISetting from "../../../../ui/PkgMain/UISetting";

export const enum EUISettingMsg {

}

export class UISettingView extends ExtensionClass<IView, UISetting>(UISetting) implements IView {

	override onCreate() {
		const { btn_close } = this;
		btn_close.onClick(this, this.closeSelf);
	}

}
