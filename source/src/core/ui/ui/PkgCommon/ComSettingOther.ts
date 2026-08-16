/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { BtnSettingSwitchView } from "../../view/PkgCommon/view/btns/BtnSettingSwitchView";

export default class ComSettingOther extends ViewBase(fgui.GComponent) {

	protected ctrl_streamer: fgui.Controller;
	protected btn_yiZhong: fgui.GButton;
	protected btn_giftCode: fgui.GButton;
	protected btn_keFuCenter: fgui.GButton;
	protected btn_emailBind: fgui.GButton;
	protected btn_userAgreement: fgui.GButton;
	protected btn_privacyPolicy: fgui.GButton;
	protected btn_resetSetting: fgui.GButton;
	protected btn_streamerOn: BtnSettingSwitchView;
	protected btn_foreignNickname: BtnSettingSwitchView;
	protected btn_localNickname: BtnSettingSwitchView;
	protected btn_replayNickname: BtnSettingSwitchView;
	protected btn_observeNickname: BtnSettingSwitchView;
	protected btn_matchNickname: BtnSettingSwitchView;
	protected btn_rankNickname: BtnSettingSwitchView;
	public static url: string = "ui://vx9zwserfip2oblh";

	public static createInstance(): ComSettingOther {
		return <ComSettingOther>(fgui.UIPackage.createObject("PkgCommon", "ComSettingOther"));
	}

	protected override onConstruct(): void {
		this.ctrl_streamer = this.getControllerAt(0);
		this.btn_yiZhong = <fgui.GButton>(this.getChildAt(9));
		this.btn_giftCode = <fgui.GButton>(this.getChildAt(10));
		this.btn_keFuCenter = <fgui.GButton>(this.getChildAt(11));
		this.btn_emailBind = <fgui.GButton>(this.getChildAt(12));
		this.btn_userAgreement = <fgui.GButton>(this.getChildAt(13));
		this.btn_privacyPolicy = <fgui.GButton>(this.getChildAt(14));
		this.btn_resetSetting = <fgui.GButton>(this.getChildAt(15));
		this.btn_streamerOn = <BtnSettingSwitchView>(this.getChildAt(16));
		this.btn_foreignNickname = <BtnSettingSwitchView>(this.getChildAt(41));
		this.btn_localNickname = <BtnSettingSwitchView>(this.getChildAt(42));
		this.btn_replayNickname = <BtnSettingSwitchView>(this.getChildAt(43));
		this.btn_observeNickname = <BtnSettingSwitchView>(this.getChildAt(44));
		this.btn_matchNickname = <BtnSettingSwitchView>(this.getChildAt(45));
		this.btn_rankNickname = <BtnSettingSwitchView>(this.getChildAt(46));
	}
}