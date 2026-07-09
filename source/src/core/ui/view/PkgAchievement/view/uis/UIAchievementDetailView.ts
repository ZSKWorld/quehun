import UIAchievementDetail from "../../../../ui/PkgAchievement/UIAchievementDetail";

export const enum EUIAchievementDetailMsg {

}

export class UIAchievementDetailView extends ExtendClass<IView, UIAchievementDetail>(UIAchievementDetail) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
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
