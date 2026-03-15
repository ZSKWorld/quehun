/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIVideo extends fgui.GComponent {

	protected btn_jump: fgui.GButton;
	public static url: string = "ui://vith2b66rmm9obh3";

	public static createInstance(): UIVideo {
		return <UIVideo>(fgui.UIPackage.createObject("PkgMain", "UIVideo"));
	}

	protected override onConstruct(): void {
		this.btn_jump = <fgui.GButton>(this.getChildAt(0));
	}
}