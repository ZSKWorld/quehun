/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComContextMenu extends GComponentView {

	protected list_list: fgui.GList;
	public static url: string = "ui://vx9zwsermaquobjk";

	public static createInstance(): ComContextMenu {
		return <ComContextMenu>(fgui.UIPackage.createObject("PkgCommon", "ComContextMenu"));
	}

	protected override onConstruct(): void {
		this.list_list = <fgui.GList>(this.getChildAt(2));
	}
}