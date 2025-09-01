/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UITest2 extends fgui.GComponent {

	public graph_bg: fgui.GGraph;
	public static url: string = "ui://p1qvtug5ara42";

	public static createInstance(): UITest2 {
		return <UITest2>(fgui.UIPackage.createObject("PkgTest", "UITest2"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
	}
}