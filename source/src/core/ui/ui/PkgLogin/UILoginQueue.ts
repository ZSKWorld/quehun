/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UILoginQueue extends fgui.GComponent {

	protected btn_quit: fgui.GButton;
	protected txt_pos: fgui.GTextField;
	protected txt_time: fgui.GTextField;
	public static url: string = "ui://vs9845at6eqpb8d";

	public static createInstance(): UILoginQueue {
		return <UILoginQueue>(fgui.UIPackage.createObject("PkgLogin", "UILoginQueue"));
	}

	protected override onConstruct(): void {
		this.btn_quit = <fgui.GButton>(this.getChildAt(1));
		this.txt_pos = <fgui.GTextField>(this.getChildAt(6));
		this.txt_time = <fgui.GTextField>(this.getChildAt(7));
	}
}