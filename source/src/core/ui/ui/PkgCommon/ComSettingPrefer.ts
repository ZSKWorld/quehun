/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { BtnSettingSwitchView } from "../../view/PkgCommon/view/btns/BtnSettingSwitchView";

export default class ComSettingPrefer extends ViewBase(fgui.GComponent) {

	protected cmb_dealCardMode: fgui.GComboBox;
	protected btn_doubleClickPass: BtnSettingSwitchView;
	protected btn_rightClickPass: BtnSettingSwitchView;
	protected btn_charShowSet: fgui.GButton;
	protected btn_dynamicSkin: BtnSettingSwitchView;
	protected cmb_aiLookMode: fgui.GComboBox;
	protected cmb_clickEffectMode: fgui.GComboBox;
	protected btn_aiLookTip: fgui.GButton;
	public static url: string = "ui://vx9zwserfip2oblf";

	public static createInstance(): ComSettingPrefer {
		return <ComSettingPrefer>(fgui.UIPackage.createObject("PkgCommon", "ComSettingPrefer"));
	}

	protected override onConstruct(): void {
		this.cmb_dealCardMode = <fgui.GComboBox>(this.getChildAt(9));
		this.btn_doubleClickPass = <BtnSettingSwitchView>(this.getChildAt(10));
		this.btn_rightClickPass = <BtnSettingSwitchView>(this.getChildAt(11));
		this.btn_charShowSet = <fgui.GButton>(this.getChildAt(12));
		this.btn_dynamicSkin = <BtnSettingSwitchView>(this.getChildAt(13));
		this.cmb_aiLookMode = <fgui.GComboBox>(this.getChildAt(14));
		this.cmb_clickEffectMode = <fgui.GComboBox>(this.getChildAt(15));
		this.btn_aiLookTip = <fgui.GButton>(this.getChildAt(16));
	}
}