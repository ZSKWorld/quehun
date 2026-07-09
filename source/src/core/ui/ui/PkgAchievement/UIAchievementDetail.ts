/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComAchieveStatView } from "../../view/PkgAchievement/view/coms/ComAchieveStatView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIAchievementDetail extends fgui.GComponent {

	protected com_back: ComBackView;
	protected com_stat: ComAchieveStatView;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://ko8zynrwcd64obih";

	public static createInstance(): UIAchievementDetail {
		return <UIAchievementDetail>(fgui.UIPackage.createObject("PkgAchievement", "UIAchievementDetail"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.com_stat = <ComAchieveStatView>(this.getChildAt(1));
		this.trans_show = this.getTransitionAt(0);
	}
}