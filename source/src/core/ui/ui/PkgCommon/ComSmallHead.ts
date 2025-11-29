/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComSmallHead extends fgui.GComponent {

	public loader_head: fgui.GLoader;
	public loader_frame: fgui.GLoader;
	public static url: string = "ui://vx9zwserhdeoobbn";

	public static createInstance(): ComSmallHead {
		return <ComSmallHead>(fgui.UIPackage.createObject("PkgCommon", "ComSmallHead"));
	}

	protected override onConstruct(): void {
		this.loader_head = <fgui.GLoader>(this.getChildAt(1));
		this.loader_frame = <fgui.GLoader>(this.getChildAt(2));
	}
}