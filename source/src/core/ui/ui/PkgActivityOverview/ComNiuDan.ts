/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComNiuDan extends GComponentView {

	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://iooyyksihf79oban";

	public static createInstance(): ComNiuDan {
		return <ComNiuDan>(fgui.UIPackage.createObject("PkgActivityOverview", "ComNiuDan"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}