/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { BtnSettingSwitchView } from "../../view/PkgCommon/view/btns/BtnSettingSwitchView";

export default class ComSettingGraphic extends ViewBase(fgui.GComponent) {

	protected cmb_fps: fgui.GComboBox;
	protected btn_activityEffect: BtnSettingSwitchView;
	public static url: string = "ui://vx9zwserfip2oble";

	public static createInstance(): ComSettingGraphic {
		return <ComSettingGraphic>(fgui.UIPackage.createObject("PkgCommon", "ComSettingGraphic"));
	}

	protected override onConstruct(): void {
		this.cmb_fps = <fgui.GComboBox>(this.getChildAt(3));
		this.btn_activityEffect = <BtnSettingSwitchView>(this.getChildAt(4));
	}
}