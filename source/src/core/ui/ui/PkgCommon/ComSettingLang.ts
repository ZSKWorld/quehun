/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComSettingLang extends fgui.GComponent {

	protected btn_langSet: fgui.GButton;
	public static url: string = "ui://vx9zwserfip2oblg";

	public static createInstance(): ComSettingLang {
		return <ComSettingLang>(fgui.UIPackage.createObject("PkgCommon", "ComSettingLang"));
	}

	protected override onConstruct(): void {
		this.btn_langSet = <fgui.GButton>(this.getChildAt(2));
	}
}