/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class ComAnnounceContent extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected txt_empty: fgui.GTextField;
	protected loader_header: fgui.GLoader;
	protected txt_title: fgui.GTextField;
	protected rtxt_content: fgui.GRichTextField;
	public static url: string = "ui://vith2b66wu0dobhd";

	public static createInstance(): ComAnnounceContent {
		return <ComAnnounceContent>(fgui.UIPackage.createObject("PkgMain", "ComAnnounceContent"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.txt_empty = <fgui.GTextField>(this.getChildAt(0));
		this.loader_header = <fgui.GLoader>(this.getChildAt(1));
		this.txt_title = <fgui.GTextField>(this.getChildAt(2));
		this.rtxt_content = <fgui.GRichTextField>(this.getChildAt(3));
	}
}