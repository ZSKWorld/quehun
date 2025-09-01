/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIEnterGame extends fgui.GComponent {

	public t0: fgui.Transition;
	public static url: string = "ui://vs9845atmj5kb6v";

	public static createInstance(): UIEnterGame {
		return <UIEnterGame>(fgui.UIPackage.createObject("PkgLogin", "UIEnterGame"));
	}

	protected override onConstruct(): void {
		this.t0 = this.getTransitionAt(0);
	}
}