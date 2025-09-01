/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class LabelItem2 extends fgui.GLabel {

	public graph_bg: fgui.GGraph;
	public static url: string = "ui://p1qvtug5ara43";

	public static createInstance(): LabelItem2 {
		return <LabelItem2>(fgui.UIPackage.createObject("PkgTest", "LabelItem2"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
	}
}