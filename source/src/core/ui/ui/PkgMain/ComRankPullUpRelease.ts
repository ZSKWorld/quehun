/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComRankPullUpRelease extends fgui.GComponent {

	public ctrl_c1: fgui.Controller;
	public trans_t0: fgui.Transition;
	public static url: string = "ui://vith2b66gks8obbn";

	public static createInstance(): ComRankPullUpRelease {
		return <ComRankPullUpRelease>(fgui.UIPackage.createObject("PkgMain", "ComRankPullUpRelease"));
	}

	protected override onConstruct(): void {
		this.ctrl_c1 = this.getControllerAt(0);
		this.trans_t0 = this.getTransitionAt(0);
	}
}