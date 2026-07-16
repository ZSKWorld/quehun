import ComSettingPrefer from "../../../../ui/PkgCommon/ComSettingPrefer";

export const enum EComSettingPreferMsg {
	OnBtnDoubleClickPassClick = "ComSettingPrefer_OnBtnDoubleClickPassClick",
	OnBtnRightClickPassClick = "ComSettingPrefer_OnBtnRightClickPassClick",
	OnBtnCharShowSetClick = "ComSettingPrefer_OnBtnCharShowSetClick",
	OnBtnDynamicSkinClick = "ComSettingPrefer_OnBtnDynamicSkinClick",
	OnBtnAiLookTipClick = "ComSettingPrefer_OnBtnAiLookTipClick",
}

export class ComSettingPreferView extends ExtendClass<IView, ComSettingPrefer>(ComSettingPrefer) implements IView {

	override onCreate() {
		const { btn_doubleClickPass, btn_rightClickPass, btn_charShowSet, btn_dynamicSkin, btn_aiLookTip } = this;
		btn_doubleClickPass.onClick(this, this.sendEvent, [EComSettingPreferMsg.OnBtnDoubleClickPassClick]);
		btn_rightClickPass.onClick(this, this.sendEvent, [EComSettingPreferMsg.OnBtnRightClickPassClick]);
		btn_charShowSet.onClick(this, this.sendEvent, [EComSettingPreferMsg.OnBtnCharShowSetClick]);
		btn_dynamicSkin.onClick(this, this.sendEvent, [EComSettingPreferMsg.OnBtnDynamicSkinClick]);
		btn_aiLookTip.onClick(this, this.sendEvent, [EComSettingPreferMsg.OnBtnAiLookTipClick]);
	}

}
