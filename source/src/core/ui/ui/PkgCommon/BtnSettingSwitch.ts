/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class BtnSettingSwitch extends fgui.GButton {

	protected txt_title1: fgui.GTextField;
	protected txt_title2: fgui.GTextField;
	public static url: string = "ui://vx9zwseruw9yobl3";

	public static createInstance(): BtnSettingSwitch {
		return <BtnSettingSwitch>(fgui.UIPackage.createObject("PkgCommon", "BtnSettingSwitch"));
	}

	protected override onConstruct(): void {
		this.txt_title1 = <fgui.GTextField>(this.getChildAt(2));
		this.txt_title2 = <fgui.GTextField>(this.getChildAt(3));
	}
}