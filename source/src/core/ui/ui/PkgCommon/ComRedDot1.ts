/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComRedDot1 extends fgui.GComponent {

	protected loader_icon: fgui.GLoader;
	public static url: string = "ui://vx9zwserea8nobfg";

	public static createInstance(): ComRedDot1 {
		return <ComRedDot1>(fgui.UIPackage.createObject("PkgCommon", "ComRedDot1"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}