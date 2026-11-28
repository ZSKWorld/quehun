/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComCreateRoomSetting extends GComponentView {

	protected ctrl_type: fgui.Controller;
	protected ctrl_openSetting: fgui.Controller;
	protected btn_startPoint: fgui.GButton;
	protected btn_oneMustPoint: fgui.GButton;
	protected btn_jiFei0: fgui.GButton;
	protected btn_jiFei1: fgui.GButton;
	protected btn_guYi0: fgui.GButton;
	protected btn_guYi1: fgui.GButton;
	protected btn_ziMo0: fgui.GButton;
	protected btn_ziMo1: fgui.GButton;
	protected btn_ziMoTip: fgui.GButton;
	protected btn_chiBaoPai0: fgui.GButton;
	protected btn_chiBaoPai1: fgui.GButton;
	protected btn_chiBaoPai2: fgui.GButton;
	protected btn_chiBaoPai3: fgui.GButton;
	protected btn_shiDuan0: fgui.GButton;
	protected btn_shiDuan1: fgui.GButton;
	protected btn_shiDuanTip: fgui.GButton;
	protected btn_fanFu0: fgui.GButton;
	protected btn_fanFu1: fgui.GButton;
	protected btn_fanFu2: fgui.GButton;
	protected btn_easy0: fgui.GButton;
	protected btn_easy1: fgui.GButton;
	protected btn_easyTip: fgui.GButton;
	protected btn_ai0: fgui.GButton;
	protected btn_ai1: fgui.GButton;
	protected btn_openHand0: fgui.GButton;
	protected btn_openHand1: fgui.GButton;
	public static url: string = "ui://vith2b66ejejobl4";

	public static createInstance(): ComCreateRoomSetting {
		return <ComCreateRoomSetting>(fgui.UIPackage.createObject("PkgMain", "ComCreateRoomSetting"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.ctrl_openSetting = this.getControllerAt(1);
		this.btn_startPoint = <fgui.GButton>(this.getChildAt(2));
		this.btn_oneMustPoint = <fgui.GButton>(this.getChildAt(5));
		this.btn_jiFei0 = <fgui.GButton>(this.getChildAt(8));
		this.btn_jiFei1 = <fgui.GButton>(this.getChildAt(9));
		this.btn_guYi0 = <fgui.GButton>(this.getChildAt(11));
		this.btn_guYi1 = <fgui.GButton>(this.getChildAt(12));
		this.btn_ziMo0 = <fgui.GButton>(this.getChildAt(15));
		this.btn_ziMo1 = <fgui.GButton>(this.getChildAt(16));
		this.btn_ziMoTip = <fgui.GButton>(this.getChildAt(17));
		this.btn_chiBaoPai0 = <fgui.GButton>(this.getChildAt(20));
		this.btn_chiBaoPai1 = <fgui.GButton>(this.getChildAt(21));
		this.btn_chiBaoPai2 = <fgui.GButton>(this.getChildAt(22));
		this.btn_chiBaoPai3 = <fgui.GButton>(this.getChildAt(23));
		this.btn_shiDuan0 = <fgui.GButton>(this.getChildAt(25));
		this.btn_shiDuan1 = <fgui.GButton>(this.getChildAt(26));
		this.btn_shiDuanTip = <fgui.GButton>(this.getChildAt(27));
		this.btn_fanFu0 = <fgui.GButton>(this.getChildAt(29));
		this.btn_fanFu1 = <fgui.GButton>(this.getChildAt(30));
		this.btn_fanFu2 = <fgui.GButton>(this.getChildAt(31));
		this.btn_easy0 = <fgui.GButton>(this.getChildAt(33));
		this.btn_easy1 = <fgui.GButton>(this.getChildAt(34));
		this.btn_easyTip = <fgui.GButton>(this.getChildAt(35));
		this.btn_ai0 = <fgui.GButton>(this.getChildAt(37));
		this.btn_ai1 = <fgui.GButton>(this.getChildAt(38));
		this.btn_openHand0 = <fgui.GButton>(this.getChildAt(40));
		this.btn_openHand1 = <fgui.GButton>(this.getChildAt(41));
	}
}