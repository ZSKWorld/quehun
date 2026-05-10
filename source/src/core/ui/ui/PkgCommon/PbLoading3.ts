/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class PbLoading3 extends fgui.GProgressBar {

	public trans_t0: fgui.Transition;
	public static url: string = "ui://vx9zwsersxdbobiu";

	public static createInstance(): PbLoading3 {
		return <PbLoading3>(fgui.UIPackage.createObject("PkgCommon", "PbLoading3"));
	}

	protected override onConstruct(): void {
		this.trans_t0 = this.getTransitionAt(0);
	}
}