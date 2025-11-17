/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComLevel1 extends fgui.GComponent {

	public loader_icon: fgui.GLoader;
	public txt_level: fgui.GTextField;
	public static url: string = "ui://vx9zwserhdeoobbq";

	public static createInstance(): ComLevel1 {
		return <ComLevel1>(fgui.UIPackage.createObject("PkgCommon", "ComLevel1"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(1));
		this.txt_level = <fgui.GTextField>(this.getChildAt(3));
	}
}