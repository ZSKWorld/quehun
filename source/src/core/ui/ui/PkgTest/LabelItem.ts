/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class LabelItem extends fgui.GLabel {

	public graph_bg: fgui.GGraph;
	public graph_mask: fgui.GGraph;
	public static url: string = "ui://p1qvtug5671l1";

	public static createInstance(): LabelItem {
		return <LabelItem>(fgui.UIPackage.createObject("PkgTest", "LabelItem"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.graph_mask = <fgui.GGraph>(this.getChildAt(2));
	}
}