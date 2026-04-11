/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UITest extends fgui.GComponent {

	protected graph_bg: fgui.GGraph;
	protected btn_close: fgui.GButton;
	public static url: string = "ui://vx9zwser5zjlobgd";

	public static createInstance(): UITest {
		return <UITest>(fgui.UIPackage.createObject("PkgCommon", "UITest"));
	}

	protected override onConstruct(): void {
		this.graph_bg = <fgui.GGraph>(this.getChildAt(0));
		this.btn_close = <fgui.GButton>(this.getChildAt(1));
	}
}