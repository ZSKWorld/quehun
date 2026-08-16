import RenderAchieveDetailGroup from "../../../../ui/PkgAchievement/RenderAchieveDetailGroup";

export const enum ERenderAchieveDetailGroupMsg {

}

export class RenderAchieveDetailGroupView extends RenderAchieveDetailGroup {
	setSelect(select: boolean, ani: boolean) {
		fgui.GTween.kill(this);
		const targetScale = select ? 1.2 : 1;
		if (ani)
			this.tweenScale(targetScale, targetScale, Math.abs((select ? 1.2 : 1) - this.scaleX) / 0.2 * 0.1);
		else
			this.setScale(targetScale, targetScale);
	}

	refresh(data: DO.IAchieveGroupInfo) {
		const { ctrl_type, img_redDot, img_proBar, _children } = this;
		const cfgGroup = $cfgMgr.achievement.achievement_group[data.id];

		$dynamicResMgr.setLoader(this.asLoader, $langRes("myres/achievement/" + cfgGroup.img));
		this.title = cfgGroup.langField(ECfgLangField.name);
		const percentage = !!cfgGroup.percentage;
		ctrl_type.selectedIndex = percentage ? 0 : 1;
		img_redDot.visible = data.haveReward;

		if (!cfgGroup.percentage) return;
		const percent = $mathUtil.clamp01(data.progress);
		_children[0].visible = percent >= 1;
		img_proBar.fillAmount = percent * 0.94 + 0.03;
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.asLoader);
	}
}
