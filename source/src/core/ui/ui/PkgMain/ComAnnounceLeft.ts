/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class ComAnnounceLeft extends ViewBase(fgui.GComponent) {

	protected ctrl_type: fgui.Controller;
	protected list_tab: fgui.GList;
	public static url: string = "ui://vith2b66ojz4obha";

	public static createInstance(): ComAnnounceLeft {
		return <ComAnnounceLeft>(fgui.UIPackage.createObject("PkgMain", "ComAnnounceLeft"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.list_tab = <fgui.GList>(this.getChildAt(1));
	}
}