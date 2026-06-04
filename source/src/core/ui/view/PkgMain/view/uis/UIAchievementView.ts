import UIAchievement from "../../../../ui/PkgMain/UIAchievement";

export const enum EUIAchievementMsg {

}

export class UIAchievementView extends ExtensionClass<IView, UIAchievement>(UIAchievement) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.closeSelf);
	}

	override onOpenAni() {
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		return this.com_back.onCloseAni();
	}
}
