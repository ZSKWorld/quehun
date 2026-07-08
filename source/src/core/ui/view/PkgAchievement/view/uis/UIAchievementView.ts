import UIAchievement from "../../../../ui/PkgAchievement/UIAchievement";
import { RenderAchieveGroupView } from "../renders/RenderAchieveGroupView";

export const enum EUIAchievementMsg {

}

export class UIAchievementView extends ExtendClass<IView, UIAchievement>(UIAchievement) implements IView {
	private _groupViews: RenderAchieveGroupView[];

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	refresh() {

	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show, false);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}
}
