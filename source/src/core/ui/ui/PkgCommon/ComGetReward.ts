/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import { ViewBase } from "../../core/viewBase/ViewBase";
import { RenderGetRewardItemView } from "../../view/PkgCommon/view/renders/RenderGetRewardItemView";

export default class ComGetReward extends ViewBase(fgui.GComponent) {

	protected txt_tip: fgui.GTextField;
	protected com_reward0: RenderGetRewardItemView;
	protected com_reward1: RenderGetRewardItemView;
	protected com_reward2: RenderGetRewardItemView;
	protected com_reward3: RenderGetRewardItemView;
	protected com_reward4: RenderGetRewardItemView;
	protected com_reward5: RenderGetRewardItemView;
	protected com_reward6: RenderGetRewardItemView;
	protected com_reward7: RenderGetRewardItemView;
	protected trans_show: fgui.Transition;
	protected trans_hide: fgui.Transition;
	public static url: string = "ui://vx9zwsernng6obi1";

	public static createInstance(): ComGetReward {
		return <ComGetReward>(fgui.UIPackage.createObject("PkgCommon", "ComGetReward"));
	}

	protected override onConstruct(): void {
		this.txt_tip = <fgui.GTextField>(this.getChildAt(6));
		this.com_reward0 = <RenderGetRewardItemView>(this.getChildAt(7));
		this.com_reward1 = <RenderGetRewardItemView>(this.getChildAt(8));
		this.com_reward2 = <RenderGetRewardItemView>(this.getChildAt(9));
		this.com_reward3 = <RenderGetRewardItemView>(this.getChildAt(10));
		this.com_reward4 = <RenderGetRewardItemView>(this.getChildAt(11));
		this.com_reward5 = <RenderGetRewardItemView>(this.getChildAt(12));
		this.com_reward6 = <RenderGetRewardItemView>(this.getChildAt(13));
		this.com_reward7 = <RenderGetRewardItemView>(this.getChildAt(14));
		this.trans_show = this.getTransitionAt(0);
		this.trans_hide = this.getTransitionAt(1);
	}
}