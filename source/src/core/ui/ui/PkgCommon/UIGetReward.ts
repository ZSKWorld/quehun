/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { GComponentView } from "../../core/viewBase/GComponentView";
import { ComGetRewardView } from "../../view/PkgCommon/view/coms/ComGetRewardView";

export default class UIGetReward extends GComponentView {

	protected btn_bg: fgui.GButton;
	protected com_content: ComGetRewardView;
	public static url: string = "ui://vx9zwsernng6obhx";

	public static createInstance(): UIGetReward {
		return <UIGetReward>(fgui.UIPackage.createObject("PkgCommon", "UIGetReward"));
	}

	protected override onConstruct(): void {
		this.btn_bg = <fgui.GButton>(this.getChildAt(0));
		this.com_content = <ComGetRewardView>(this.getChildAt(1));
	}
}