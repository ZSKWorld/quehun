/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComMatchRot extends GComponentView {

	protected loader_bg: fgui.GLoader;
	public static url: string = "ui://iooyyksisf50obak";

	public static createInstance(): ComMatchRot {
		return <ComMatchRot>(fgui.UIPackage.createObject("PkgActivityOverview", "ComMatchRot"));
	}

	protected override onConstruct(): void {
		this.loader_bg = <fgui.GLoader>(this.getChildAt(0));
	}
}