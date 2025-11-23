/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComLevel1 extends fgui.GComponent {

	public ctrl_ht: fgui.Controller;
	public loader_icon: fgui.GLoader;
	public txt_htLevel: fgui.GTextField;
	public txt_htScore: fgui.GTextField;
	public static url: string = "ui://vx9zwserhdeoobbq";

	public static createInstance(): ComLevel1 {
		return <ComLevel1>(fgui.UIPackage.createObject("PkgCommon", "ComLevel1"));
	}

	protected override onConstruct(): void {
		this.ctrl_ht = this.getControllerAt(0);
		this.loader_icon = <fgui.GLoader>(this.getChildAt(1));
		this.txt_htLevel = <fgui.GTextField>(this.getChildAt(4));
		this.txt_htScore = <fgui.GTextField>(this.getChildAt(5));
	}
}