/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIChooseServer extends fgui.GComponent {

	protected list_server: fgui.GList;
	public static url: string = "ui://8tw6j59fhrq54";

	public static createInstance(): UIChooseServer {
		return <UIChooseServer>(fgui.UIPackage.createObject("PkgEntrance", "UIChooseServer"));
	}

	protected override onConstruct(): void {
		this.list_server = <fgui.GList>(this.getChildAt(1));
	}
}