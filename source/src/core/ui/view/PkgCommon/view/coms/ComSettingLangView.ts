import ComSettingLang from "../../../../ui/PkgCommon/ComSettingLang";

export const enum EComSettingLangMsg {
	OnBtnLangSetClick = "ComSettingLang_OnBtnLangSetClick",
}

export class ComSettingLangView extends ComSettingLang {

	override onCreate() {
		const { btn_langSet } = this;
		btn_langSet.onClick(this, this.event, [EComSettingLangMsg.OnBtnLangSetClick]);
	}

}
