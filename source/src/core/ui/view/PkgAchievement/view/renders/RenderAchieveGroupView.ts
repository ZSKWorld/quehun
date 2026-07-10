import RenderAchieveGroup from "../../../../ui/PkgAchievement/RenderAchieveGroup";

export class RenderAchieveGroupView extends ExtendClass<IView, RenderAchieveGroup>(RenderAchieveGroup) implements IView {

	override onCreate() {

	}

	refresh(id: number, percent: number, haveReward: boolean) {
		const { ctrl_type, img_redDot, _iconObject, txt_percent, img_proBar } = this;
		const cfgGroup = $cfgMgr.achievement.achievement_group[id];

		$dynamicResMgr.setLoader(this.asLoader, $langRes("myres/achievement/" + cfgGroup.img));
		this.title = cfgGroup.langField(ECfgLangField.name);
		const percentage = !!cfgGroup.percentage;
		ctrl_type.selectedIndex = percentage ? 0 : 1;
		img_redDot.visible = haveReward;

		if (!cfgGroup.percentage) return;
		percent = $mathUtil.clamp01(percent);
		_iconObject.asCom._children[0].visible = percent >= 1;
		txt_percent.text = `${ (percent * 100).toFixed(1) }%`;
		img_proBar.fillAmount = percent * 0.94 + 0.03;
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.asLoader);
	}
}
