/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class ComHead extends ViewBase(fgui.GComponent) {

	protected loader_icon: fgui.GLoader;
	public static url: string = "ui://vx9zwserq5yiobc3";

	public static createInstance(): ComHead {
		return <ComHead>(fgui.UIPackage.createObject("PkgCommon", "ComHead"));
	}

	protected override onConstruct(): void {
		this.loader_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}