/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComSettingGraphic extends fgui.GComponent {

	protected btn_bgMuteOn: fgui.GButton;
	public static url: string = "ui://vx9zwserfip2oble";

	public static createInstance(): ComSettingGraphic {
		return <ComSettingGraphic>(fgui.UIPackage.createObject("PkgCommon", "ComSettingGraphic"));
	}

	protected override onConstruct(): void {
		this.btn_bgMuteOn = <fgui.GButton>(this.getChildAt(4));
	}
}