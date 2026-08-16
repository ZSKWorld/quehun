/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class ComAnnounceContent extends ViewBase(fgui.GComponent) {

	protected loader_header: fgui.GLoader;
	protected txt_title: fgui.GTextField;
	protected rtxt_content: fgui.GRichTextField;
	public static url: string = "ui://vith2b66wu0dobhd";

	public static createInstance(): ComAnnounceContent {
		return <ComAnnounceContent>(fgui.UIPackage.createObject("PkgMain", "ComAnnounceContent"));
	}

	protected override onConstruct(): void {
		this.loader_header = <fgui.GLoader>(this.getChildAt(0));
		this.txt_title = <fgui.GTextField>(this.getChildAt(1));
		this.rtxt_content = <fgui.GRichTextField>(this.getChildAt(2));
	}
}