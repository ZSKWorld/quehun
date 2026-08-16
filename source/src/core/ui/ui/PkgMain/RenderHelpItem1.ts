/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class RenderHelpItem1 extends ViewBase(fgui.GComponent) {

	protected txt_name: fgui.GTextField;
	protected txt_desc: fgui.GTextField;
	protected txt_limit: fgui.GTextField;
	public static url: string = "ui://vith2b66ii8iobhg";

	public static createInstance(): RenderHelpItem1 {
		return <RenderHelpItem1>(fgui.UIPackage.createObject("PkgMain", "RenderHelpItem1"));
	}

	protected override onConstruct(): void {
		this.txt_name = <fgui.GTextField>(this.getChildAt(20));
		this.txt_desc = <fgui.GTextField>(this.getChildAt(21));
		this.txt_limit = <fgui.GTextField>(this.getChildAt(22));
	}
}