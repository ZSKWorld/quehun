/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComAchieveGroupView } from "../../view/PkgAchievement/view/coms/ComAchieveGroupView";
import { ComAchieveStatView } from "../../view/PkgAchievement/view/coms/ComAchieveStatView";
import { ComAchieveRecentView } from "../../view/PkgAchievement/view/coms/ComAchieveRecentView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIAchievement extends GComponentView {

	protected com_back: ComBackView;
	protected com_groups: ComAchieveGroupView;
	protected com_stat: ComAchieveStatView;
	protected com_recent: ComAchieveRecentView;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://ko8zynrwktwpob9z";

	public static createInstance(): UIAchievement {
		return <UIAchievement>(fgui.UIPackage.createObject("PkgAchievement", "UIAchievement"));
	}

	protected override onConstruct(): void {
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.com_groups = <ComAchieveGroupView>(this.getChildAt(1));
		this.com_stat = <ComAchieveStatView>(this.getChildAt(2));
		this.com_recent = <ComAchieveRecentView>(this.getChildAt(3));
		this.trans_show = this.getTransitionAt(0);
	}
}