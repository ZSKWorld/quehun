/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class CmbCommon1_popup extends GComponentView {

	public list_list: fgui.GList;
	public static url: string = "ui://vx9zwsergsi2obem";

	public static createInstance(): CmbCommon1_popup {
		return <CmbCommon1_popup>(fgui.UIPackage.createObject("PkgCommon", "CmbCommon1_popup"));
	}

	protected override onConstruct(): void {
		this.list_list = <fgui.GList>(this.getChildAt(1));
	}
}