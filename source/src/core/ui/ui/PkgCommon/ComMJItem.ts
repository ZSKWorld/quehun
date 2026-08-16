/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class ComMJItem extends ViewBase(fgui.GComponent) {

	protected loader_front: fgui.GLoader;
	protected loader_back: fgui.GLoader;
	public static url: string = "ui://vx9zwserii8iobgf";

	public static createInstance(): ComMJItem {
		return <ComMJItem>(fgui.UIPackage.createObject("PkgCommon", "ComMJItem"));
	}

	protected override onConstruct(): void {
		this.loader_front = <fgui.GLoader>(this.getChildAt(0));
		this.loader_back = <fgui.GLoader>(this.getChildAt(1));
	}
}