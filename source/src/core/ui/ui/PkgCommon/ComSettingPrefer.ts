/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComSettingPrefer extends fgui.GComponent {

	protected cmb_dealCardMode: fgui.GComboBox;
	protected btn_doubleClickPass: fgui.GButton;
	protected btn_rightClickPass: fgui.GButton;
	protected btn_charShowSet: fgui.GButton;
	protected btn_dynamicSkin: fgui.GButton;
	protected cmb_aiLookMode: fgui.GComboBox;
	protected cmb_clickEffectMode: fgui.GComboBox;
	protected btn_aiLookTip: fgui.GButton;
	public static url: string = "ui://vx9zwserfip2oblf";

	public static createInstance(): ComSettingPrefer {
		return <ComSettingPrefer>(fgui.UIPackage.createObject("PkgCommon", "ComSettingPrefer"));
	}

	protected override onConstruct(): void {
		this.cmb_dealCardMode = <fgui.GComboBox>(this.getChildAt(9));
		this.btn_doubleClickPass = <fgui.GButton>(this.getChildAt(10));
		this.btn_rightClickPass = <fgui.GButton>(this.getChildAt(11));
		this.btn_charShowSet = <fgui.GButton>(this.getChildAt(12));
		this.btn_dynamicSkin = <fgui.GButton>(this.getChildAt(13));
		this.cmb_aiLookMode = <fgui.GComboBox>(this.getChildAt(14));
		this.cmb_clickEffectMode = <fgui.GComboBox>(this.getChildAt(15));
		this.btn_aiLookTip = <fgui.GButton>(this.getChildAt(16));
	}
}