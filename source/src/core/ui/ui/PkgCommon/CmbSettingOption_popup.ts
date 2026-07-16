/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class CmbSettingOption_popup extends fgui.GComponent {

	public list_list: fgui.GList;
	public static url: string = "ui://vx9zwseruw9yobl8";

	public static createInstance(): CmbSettingOption_popup {
		return <CmbSettingOption_popup>(fgui.UIPackage.createObject("PkgCommon", "CmbSettingOption_popup"));
	}

	protected override onConstruct(): void {
		this.list_list = <fgui.GList>(this.getChildAt(1));
	}
}