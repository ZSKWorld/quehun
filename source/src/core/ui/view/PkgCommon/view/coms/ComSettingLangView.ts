import ComSettingLang from "../../../../ui/PkgCommon/ComSettingLang";

export const enum EComSettingLangMsg {
	OnBtnLangSetClick = "ComSettingLang_OnBtnLangSetClick",
}

export class ComSettingLangView extends ExtendClass<IView, ComSettingLang>(ComSettingLang) implements IView {

	override onCreate() {
		const { btn_langSet } = this;
		btn_langSet.onClick(this, this.sendEvent, [EComSettingLangMsg.OnBtnLangSetClick]);
	}

}
