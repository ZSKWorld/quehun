/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderVisitCharInfo extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected loader_icon: fgui.GLoader;
	protected txt_desc: fgui.GTextField;
	public static url: string = "ui://vith2b669c0bobj5";

	public static createInstance(): RenderVisitCharInfo {
		return <RenderVisitCharInfo>(fgui.UIPackage.createObject("PkgMain", "RenderVisitCharInfo"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(6));
	}
}