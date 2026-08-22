/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComSettingAudioView } from "../../view/PkgCommon/view/coms/ComSettingAudioView";
import { ComSettingGraphicView } from "../../view/PkgCommon/view/coms/ComSettingGraphicView";
import { ComSettingPreferView } from "../../view/PkgCommon/view/coms/ComSettingPreferView";
import { ComSettingLangView } from "../../view/PkgCommon/view/coms/ComSettingLangView";
import { ComSettingOtherView } from "../../view/PkgCommon/view/coms/ComSettingOtherView";

export default class UISetting extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected btn_mask: fgui.GButton;
	protected com_audio: ComSettingAudioView;
	protected com_graphic: ComSettingGraphicView;
	protected com_prefer: ComSettingPreferView;
	protected com_lang: ComSettingLangView;
	protected com_other: ComSettingOtherView;
	protected btn_close: fgui.GButton;
	protected btn_logout: fgui.GButton;
	protected txt_version: fgui.GTextField;
	public static url: string = "ui://vx9zwserktwpob9w";

	public static createInstance(): UISetting {
		return <UISetting>(fgui.UIPackage.createObject("PkgCommon", "UISetting"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.btn_mask = <fgui.GButton>(this.getChildAt(0));
		this.com_audio = <ComSettingAudioView>(this.getChildAt(2));
		this.com_graphic = <ComSettingGraphicView>(this.getChildAt(3));
		this.com_prefer = <ComSettingPreferView>(this.getChildAt(4));
		this.com_lang = <ComSettingLangView>(this.getChildAt(5));
		this.com_other = <ComSettingOtherView>(this.getChildAt(6));
		this.btn_close = <fgui.GButton>(this.getChildAt(7));
		this.btn_logout = <fgui.GButton>(this.getChildAt(13));
		this.txt_version = <fgui.GTextField>(this.getChildAt(14));
	}
}