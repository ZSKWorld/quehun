/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ComAchieveStatView } from "../../view/PkgAchievement/view/coms/ComAchieveStatView";
import { RenderAchieveDetailITopView } from "../../view/PkgAchievement/view/renders/RenderAchieveDetailITopView";
import { ComBackView } from "../../view/PkgCommon/view/coms/ComBackView";

export default class UIAchievementDetail extends fgui.GComponent {

	protected ctrl_type: fgui.Controller;
	protected com_back: ComBackView;
	protected com_stat: ComAchieveStatView;
	protected list_group: fgui.GList;
	protected img_top: fgui.GImage;
	protected img_bottom: fgui.GImage;
	protected com_itemTop: RenderAchieveDetailITopView;
	protected list_item: fgui.GList;
	protected trans_show: fgui.Transition;
	public static url: string = "ui://ko8zynrwcd64obih";

	public static createInstance(): UIAchievementDetail {
		return <UIAchievementDetail>(fgui.UIPackage.createObject("PkgAchievement", "UIAchievementDetail"));
	}

	protected override onConstruct(): void {
		this.ctrl_type = this.getControllerAt(0);
		this.com_back = <ComBackView>(this.getChildAt(0));
		this.com_stat = <ComAchieveStatView>(this.getChildAt(1));
		this.list_group = <fgui.GList>(this.getChildAt(2));
		this.img_top = <fgui.GImage>(this.getChildAt(3));
		this.img_bottom = <fgui.GImage>(this.getChildAt(4));
		this.com_itemTop = <RenderAchieveDetailITopView>(this.getChildAt(6));
		this.list_item = <fgui.GList>(this.getChildAt(7));
		this.trans_show = this.getTransitionAt(0);
	}
}