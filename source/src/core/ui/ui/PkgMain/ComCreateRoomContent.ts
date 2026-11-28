/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComCreateRoomSettingView } from "../../view/PkgMain/view/coms/ComCreateRoomSettingView";

export default class ComCreateRoomContent extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected ctrl_openSetting: fgui.Controller;
	protected btn_siRen: fgui.GButton;
	protected btn_sanRen: fgui.GButton;
	protected btn_special: fgui.GButton;
	protected btn_juShu0: fgui.GButton;
	protected btn_juShu1: fgui.GButton;
	protected btn_juShu2: fgui.GButton;
	protected btn_juShu3: fgui.GButton;
	protected group_jushu: fgui.GGroup;
	protected btn_think0: fgui.GButton;
	protected btn_think1: fgui.GButton;
	protected btn_think2: fgui.GButton;
	protected btn_think3: fgui.GButton;
	protected btn_think4: fgui.GButton;
	protected btn_setting0: fgui.GButton;
	protected btn_setting1: fgui.GButton;
	protected com_setting: ComCreateRoomSettingView;
	public static url: string = "ui://vith2b66pbxcobkb";

	public static createInstance(): ComCreateRoomContent {
		return <ComCreateRoomContent>(fgui.UIPackage.createObject("PkgMain", "ComCreateRoomContent"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.ctrl_openSetting = this.getControllerAt(1);
		this.btn_siRen = <fgui.GButton>(this.getChildAt(3));
		this.btn_sanRen = <fgui.GButton>(this.getChildAt(4));
		this.btn_special = <fgui.GButton>(this.getChildAt(6));
		this.btn_juShu0 = <fgui.GButton>(this.getChildAt(10));
		this.btn_juShu1 = <fgui.GButton>(this.getChildAt(11));
		this.btn_juShu2 = <fgui.GButton>(this.getChildAt(12));
		this.btn_juShu3 = <fgui.GButton>(this.getChildAt(13));
		this.group_jushu = <fgui.GGroup>(this.getChildAt(14));
		this.btn_think0 = <fgui.GButton>(this.getChildAt(17));
		this.btn_think1 = <fgui.GButton>(this.getChildAt(18));
		this.btn_think2 = <fgui.GButton>(this.getChildAt(19));
		this.btn_think3 = <fgui.GButton>(this.getChildAt(20));
		this.btn_think4 = <fgui.GButton>(this.getChildAt(21));
		this.btn_setting0 = <fgui.GButton>(this.getChildAt(25));
		this.btn_setting1 = <fgui.GButton>(this.getChildAt(26));
		this.com_setting = <ComCreateRoomSettingView>(this.getChildAt(29));
	}
}