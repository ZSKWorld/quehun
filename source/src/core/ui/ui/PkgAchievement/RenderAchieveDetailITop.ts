/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComItem1View } from "../../view/PkgCommon/view/coms/ComItem1View";

export default class RenderAchieveDetailITop extends GComponentView {

	protected ctrl_state: fgui.Controller;
	protected img_bar: fgui.GImage;
	protected com_reward: ComItem1View;
	protected btn_getReward: fgui.GButton;
	protected txt_progress: fgui.GTextField;
	public static url: string = "ui://ko8zynrwoo1iobik";

	public static createInstance(): RenderAchieveDetailITop {
		return <RenderAchieveDetailITop>(fgui.UIPackage.createObject("PkgAchievement", "RenderAchieveDetailITop"));
	}

	protected override onConstruct(): void {
		this.ctrl_state = this.getControllerAt(0);
		this.img_bar = <fgui.GImage>(this.getChildAt(2));
		this.com_reward = <ComItem1View>(this.getChildAt(3));
		this.btn_getReward = <fgui.GButton>(this.getChildAt(4));
		this.txt_progress = <fgui.GTextField>(this.getChildAt(5));
	}
}