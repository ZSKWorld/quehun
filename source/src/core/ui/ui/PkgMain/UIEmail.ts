/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIEmail extends fgui.GComponent {

	public ctrl_c1: fgui.Controller;
	public btn_back: fgui.GButton;
	public static url: string = "ui://vith2b66ktwpob9t";

	public static createInstance(): UIEmail {
		return <UIEmail>(fgui.UIPackage.createObject("PkgMain", "UIEmail"));
	}

	protected override onConstruct(): void {
		this.ctrl_c1 = this.getControllerAt(0);
		this.btn_back = <fgui.GButton>(this.getChildAt(3));
	}
}