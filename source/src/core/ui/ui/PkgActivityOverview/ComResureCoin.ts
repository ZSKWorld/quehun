/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComResureCoin extends GComponentView {

	protected txt_title: fgui.GTextField;
	public static url: string = "ui://iooyyksi9vb32";

	public static createInstance(): ComResureCoin {
		return <ComResureCoin>(fgui.UIPackage.createObject("PkgActivityOverview", "ComResureCoin"));
	}

	protected override onConstruct(): void {
		this.txt_title = <fgui.GTextField>(this.getChildAt(0));
	}
}