import UIAchievement from "../../../../ui/PkgAchievement/UIAchievement";

export const enum EUIAchievementMsg {

}

export class UIAchievementView extends UIAchievement {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	refresh() {
		this.com_groups.refresh();
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
