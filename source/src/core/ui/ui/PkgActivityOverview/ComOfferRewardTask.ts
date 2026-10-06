/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComOfferRewardTask extends GComponentView {

	protected txt_title: fgui.GTextField;
	public static url: string = "ui://iooyyksi9vb31";

	public static createInstance(): ComOfferRewardTask {
		return <ComOfferRewardTask>(fgui.UIPackage.createObject("PkgActivityOverview", "ComOfferRewardTask"));
	}

	protected override onConstruct(): void {
		this.txt_title = <fgui.GTextField>(this.getChildAt(0));
	}
}