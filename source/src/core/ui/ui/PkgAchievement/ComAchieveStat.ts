/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";

export default class ComAchieveStat extends ViewBase(fgui.GComponent) {

	protected txt_gold: fgui.GTextField;
	protected txt_silver: fgui.GTextField;
	protected txt_copper: fgui.GTextField;
	protected txt_total: fgui.GTextField;
	public static url: string = "ui://ko8zynrwcd64w";

	public static createInstance(): ComAchieveStat {
		return <ComAchieveStat>(fgui.UIPackage.createObject("PkgAchievement", "ComAchieveStat"));
	}

	protected override onConstruct(): void {
		this.txt_gold = <fgui.GTextField>(this.getChildAt(5));
		this.txt_silver = <fgui.GTextField>(this.getChildAt(6));
		this.txt_copper = <fgui.GTextField>(this.getChildAt(7));
		this.txt_total = <fgui.GTextField>(this.getChildAt(9));
	}
}