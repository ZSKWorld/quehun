/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";

export default class ComAchieveGroup extends GComponentView {

	protected graph_empty: fgui.GGraph;
	public static url: string = "ui://ko8zynrwcd64v";

	public static createInstance(): ComAchieveGroup {
		return <ComAchieveGroup>(fgui.UIPackage.createObject("PkgAchievement", "ComAchieveGroup"));
	}

	protected override onConstruct(): void {
		this.graph_empty = <fgui.GGraph>(this.getChildAt(0));
	}
}