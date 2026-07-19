/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { BtnSettingSwitchView } from "../../view/PkgCommon/view/btns/BtnSettingSwitchView";

export default class ComSettingAudio extends fgui.GComponent {

	protected ctrl_globalMute: fgui.Controller;
	protected btn_globalVolumeOn: fgui.GButton;
	protected btn_bgmVolumeOn: fgui.GButton;
	protected btn_seVolumeOn: fgui.GButton;
	protected btn_liqiVolumeOn: fgui.GButton;
	protected btn_charVolumeOn: fgui.GButton;
	protected btn_specialVolumeTip: fgui.GButton;
	protected slider_globalVolume: fgui.GSlider;
	protected slider_bgmVolume: fgui.GSlider;
	protected slider_seVolume: fgui.GSlider;
	protected slider_liqiVolume: fgui.GSlider;
	protected slider_charVolume: fgui.GSlider;
	protected btn_charVolumeSet: fgui.GButton;
	protected btn_specialVolumeOn: BtnSettingSwitchView;
	protected btn_lobbyBgmSet: fgui.GButton;
	protected btn_mjBgmSet: fgui.GButton;
	protected btn_backgroundMuteOn: BtnSettingSwitchView;
	protected txt_bgmType: fgui.GTextField;
	protected txt_bgmName: fgui.GTextField;
	public static url: string = "ui://vx9zwserfip2obld";

	public static createInstance(): ComSettingAudio {
		return <ComSettingAudio>(fgui.UIPackage.createObject("PkgCommon", "ComSettingAudio"));
	}

	protected override onConstruct(): void {
		this.ctrl_globalMute = this.getControllerAt(0);
		this.btn_globalVolumeOn = <fgui.GButton>(this.getChildAt(15));
		this.btn_bgmVolumeOn = <fgui.GButton>(this.getChildAt(16));
		this.btn_seVolumeOn = <fgui.GButton>(this.getChildAt(17));
		this.btn_liqiVolumeOn = <fgui.GButton>(this.getChildAt(18));
		this.btn_charVolumeOn = <fgui.GButton>(this.getChildAt(19));
		this.btn_specialVolumeTip = <fgui.GButton>(this.getChildAt(20));
		this.slider_globalVolume = <fgui.GSlider>(this.getChildAt(21));
		this.slider_bgmVolume = <fgui.GSlider>(this.getChildAt(22));
		this.slider_seVolume = <fgui.GSlider>(this.getChildAt(23));
		this.slider_liqiVolume = <fgui.GSlider>(this.getChildAt(24));
		this.slider_charVolume = <fgui.GSlider>(this.getChildAt(25));
		this.btn_charVolumeSet = <fgui.GButton>(this.getChildAt(26));
		this.btn_specialVolumeOn = <BtnSettingSwitchView>(this.getChildAt(27));
		this.btn_lobbyBgmSet = <fgui.GButton>(this.getChildAt(28));
		this.btn_mjBgmSet = <fgui.GButton>(this.getChildAt(29));
		this.btn_backgroundMuteOn = <BtnSettingSwitchView>(this.getChildAt(30));
		this.txt_bgmType = <fgui.GTextField>(this.getChildAt(40));
		this.txt_bgmName = <fgui.GTextField>(this.getChildAt(41));
	}
}