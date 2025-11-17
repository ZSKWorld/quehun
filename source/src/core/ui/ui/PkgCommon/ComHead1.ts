/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComHead1 extends fgui.GComponent {

	public loader_head: fgui.GLoader;
	public loader_frame: fgui.GLoader;
	public static url: string = "ui://vx9zwserhdeoobbn";

	public static createInstance(): ComHead1 {
		return <ComHead1>(fgui.UIPackage.createObject("PkgCommon", "ComHead1"));
	}

	protected override onConstruct(): void {
		this.loader_head = <fgui.GLoader>(this.getChildAt(1));
		this.loader_frame = <fgui.GLoader>(this.getChildAt(2));
	}
}