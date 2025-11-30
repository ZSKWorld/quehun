/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComItem extends fgui.GComponent {

	protected loader_icon: fgui.GLoader;
	public static url: string = "ui://vx9zwserq5yiobc2";

	public static createInstance(): ComItem {
		return <ComItem>(fgui.UIPackage.createObject("PkgCommon", "ComItem"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(1));
	}
}