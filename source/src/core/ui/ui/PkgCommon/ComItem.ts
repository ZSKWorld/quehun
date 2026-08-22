/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComItem extends GComponentView {

	protected loader_icon: fgui.GLoader;
	public static url: string = "ui://vx9zwserrpakobf5";

	public static createInstance(): ComItem {
		return <ComItem>(fgui.UIPackage.createObject("PkgCommon", "ComItem"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}