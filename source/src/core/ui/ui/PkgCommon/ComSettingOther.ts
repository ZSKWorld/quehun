/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComSettingOther extends fgui.GComponent {

	protected btn_yiZhong: fgui.GButton;
	protected btn_giftCode: fgui.GButton;
	protected btn_keFuCenter: fgui.GButton;
	protected btn_emailBind: fgui.GButton;
	protected btn_userAgreement: fgui.GButton;
	protected btn_privacyPolicy: fgui.GButton;
	protected btn_resetSetting: fgui.GButton;
	protected btn_streamerOn: fgui.GButton;
	public static url: string = "ui://vx9zwserfip2oblh";

	public static createInstance(): ComSettingOther {
		return <ComSettingOther>(fgui.UIPackage.createObject("PkgCommon", "ComSettingOther"));
	}

	protected override onConstruct(): void {
		this.btn_yiZhong = <fgui.GButton>(this.getChildAt(9));
		this.btn_giftCode = <fgui.GButton>(this.getChildAt(10));
		this.btn_keFuCenter = <fgui.GButton>(this.getChildAt(11));
		this.btn_emailBind = <fgui.GButton>(this.getChildAt(12));
		this.btn_userAgreement = <fgui.GButton>(this.getChildAt(13));
		this.btn_privacyPolicy = <fgui.GButton>(this.getChildAt(14));
		this.btn_resetSetting = <fgui.GButton>(this.getChildAt(15));
		this.btn_streamerOn = <fgui.GButton>(this.getChildAt(16));
	}
}