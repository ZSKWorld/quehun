/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UITest extends fgui.GComponent {

	public graph_bg: fgui.GGraph;
	public txt_choosed: fgui.GTextField;
	public static url: string = "ui://p1qvtug5671l0";

	public static createInstance(): UITest {
		return <UITest>(fgui.UIPackage.createObject("PkgTest", "UITest"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.txt_choosed = <fgui.GTextField>(this.getChildAt(1));
	}
}