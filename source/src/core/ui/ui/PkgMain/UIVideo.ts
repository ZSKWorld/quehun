/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIVideo extends fgui.GComponent {

	protected com_videoRoot: fgui.GComponent;
	protected btn_jump: fgui.GButton;
	protected trans_show: fgui.Transition;
	protected trans_hide: fgui.Transition;
	public static url: string = "ui://vith2b66rmm9obh3";

	public static createInstance(): UIVideo {
		return <UIVideo>(fgui.UIPackage.createObject("PkgMain", "UIVideo"));
	}

	protected override onConstruct(): void {
		this.com_videoRoot = <fgui.GComponent>(this.getChildAt(1));
		this.btn_jump = <fgui.GButton>(this.getChildAt(4));
		this.trans_show = this.getTransitionAt(0);
		this.trans_hide = this.getTransitionAt(1);
	}
}