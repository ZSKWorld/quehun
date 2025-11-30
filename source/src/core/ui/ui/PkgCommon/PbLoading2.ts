/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class PbLoading2 extends fgui.GProgressBar {

	protected img_block: fgui.GImage;
	protected trans_t0: fgui.Transition;
	public static url: string = "ui://vx9zwservwgmob8d";

	public static createInstance(): PbLoading2 {
		return <PbLoading2>(fgui.UIPackage.createObject("PkgCommon", "PbLoading2"));
	}

	protected override onConstruct(): void {
		this.img_block = <fgui.GImage>(this.getChildAt(2));
		this.trans_t0 = this.getTransitionAt(0);
	}
}