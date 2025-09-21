/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UIEntrance extends fgui.GComponent {

	public trans_t0: fgui.Transition;
	public static url: string = "ui://8tw6j59fnrcf0";

	public static createInstance(): UIEntrance {
		return <UIEntrance>(fgui.UIPackage.createObject("PkgEntrance", "UIEntrance"));
	}

	protected override onConstruct(): void {
		this.trans_t0 = this.getTransitionAt(0);
	}
}