/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComTitle extends GComponentView {

	protected loader_icon: fgui.GLoader;
	public static url: string = "ui://vx9zwserhdeoobbo";

	public static createInstance(): ComTitle {
		return <ComTitle>(fgui.UIPackage.createObject("PkgCommon", "ComTitle"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}