/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComBigHead extends fgui.GComponent {

	protected loader_head: fgui.GLoader;
	public static url: string = "ui://vx9zwserq5yiobc3";

	public static createInstance(): ComBigHead {
		return <ComBigHead>(fgui.UIPackage.createObject("PkgCommon", "ComBigHead"));
	}

	protected override onConstruct(): void {
		this.loader_head = <fgui.GLoader>(this.getChildAt(1));
	}
}