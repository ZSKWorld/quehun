/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class CmbCommon1_popup extends ViewBase(fgui.GComponent) {

	public list_list: fgui.GList;
	public static url: string = "ui://vx9zwsergsi2obem";

	public static createInstance(): CmbCommon1_popup {
		return <CmbCommon1_popup>(fgui.UIPackage.createObject("PkgCommon", "CmbCommon1_popup"));
	}

	protected override onConstruct(): void {
		this.list_list = <fgui.GList>(this.getChildAt(1));
	}
}