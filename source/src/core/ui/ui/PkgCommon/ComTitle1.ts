/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComTitle1 extends fgui.GComponent {

	public loader_icon: fgui.GLoader;
	public static url: string = "ui://vx9zwserhdeoobbo";

	public static createInstance(): ComTitle1 {
		return <ComTitle1>(fgui.UIPackage.createObject("PkgCommon", "ComTitle1"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}