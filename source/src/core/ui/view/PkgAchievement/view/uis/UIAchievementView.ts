import UIAchievement from "../../../../ui/PkgAchievement/UIAchievement";

export const enum EUIAchievementMsg {

}

export class UIAchievementView extends ExtendClass<IView, UIAchievement>(UIAchievement) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	refresh() {
		this.com_groups.refresh();
		const { gold, silver, copper, total } = $user.achievement.statisticsInfo;
		this.com_stat.refresh(gold, silver, copper, total);
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
