/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UILoginWaitting extends fgui.GComponent {

	public btn_close: fgui.GButton;
	public t0: fgui.Transition;
	public static url: string = "ui://vs9845atmj5kb6w";

	public static createInstance(): UILoginWaitting {
		return <UILoginWaitting>(fgui.UIPackage.createObject("PkgLogin", "UILoginWaitting"));
	}

	protected override onConstruct(): void {
		this.btn_close = <fgui.GButton>(this.getChildAt(3));
		this.t0 = this.getTransitionAt(0);
	}
}