/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class RenderVisitEmo extends fgui.GComponent {

	protected ctrl_unlock: fgui.Controller;
	protected ctrl_limit: fgui.Controller;
	protected loader_icon: fgui.GLoader;
	protected txt_desc: fgui.GTextField;
	public static url: string = "ui://vith2b669c0bobj5";

	public static createInstance(): RenderVisitEmo {
		return <RenderVisitEmo>(fgui.UIPackage.createObject("PkgMain", "RenderVisitEmo"));
	}

	protected override onConstruct(): void {
		this.ctrl_unlock = this.getControllerAt(0);
		this.ctrl_limit = this.getControllerAt(1);
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(6));
	}
}