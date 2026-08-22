/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComHead extends GComponentView {

	protected loader_icon: fgui.GLoader;
	public static url: string = "ui://vx9zwserq5yiobc3";

	public static createInstance(): ComHead {
		return <ComHead>(fgui.UIPackage.createObject("PkgCommon", "ComHead"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}