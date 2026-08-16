/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class ComBagIllust extends ViewBase(fgui.GComponent) {

	protected ctrl_type: fgui.Controller;
	protected list_illust: fgui.GList;
	protected btn_cancel: fgui.GButton;
	public static url: string = "ui://vith2b66rpakobc2";

	public static createInstance(): ComBagIllust {
		return <ComBagIllust>(fgui.UIPackage.createObject("PkgMain", "ComBagIllust"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.list_illust = <fgui.GList>(this.getChildAt(0));
		this.btn_cancel = <fgui.GButton>(this.getChildAt(1));
	}
}