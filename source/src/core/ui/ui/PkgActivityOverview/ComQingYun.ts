/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComQingYun extends GComponentView {

	protected loader_bg: fgui.GLoader;
	protected btn_go: fgui.GButton;
	public static url: string = "ui://iooyyksisf50obaj";

	public static createInstance(): ComQingYun {
		return <ComQingYun>(fgui.UIPackage.createObject("PkgActivityOverview", "ComQingYun"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
		this.btn_go = <fgui.GButton>(this.getChildAt(1));
	}
}