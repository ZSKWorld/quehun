/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GButtonView } from "../../core/viewBase/GButtonView";
import { ComRedDot1View } from "../../view/PkgCommon/view/coms/ComRedDot1View";

export default class RenderOverviewTab extends GButtonView {

	protected loader_icon2: fgui.GLoader;
	protected com_redDot: ComRedDot1View;
	public static url: string = "ui://iooyyksi9vb33";

	public static createInstance(): RenderOverviewTab {
		return <RenderOverviewTab>(fgui.UIPackage.createObject("PkgActivityOverview", "RenderOverviewTab"));
	}

	protected override onConstruct(): void {
		this.loader_icon2 = <fgui.GLoader>(this.getChildAt(1));
		this.com_redDot = <ComRedDot1View>(this.getChildAt(5));
	}
}