import RenderAchieveDetailITop from "../../../../ui/PkgAchievement/RenderAchieveDetailITop";

export class RenderAchieveDetailITopView extends ExtendClass<IView, RenderAchieveDetailITop>(RenderAchieveDetailITop) implements IView {
	private _groupId: number;

	override onCreate() {
		const { btn_getReward } = this;
		btn_getReward.onClick(this, this.onBtnGetRewardClick);
	}

	refresh(data: DO.IAchieveGroupInfo) {
		this._groupId = data.id;
		const percent = data.progress;
		const { txt_progress, img_bar, ctrl_state, com_reward } = this;
		txt_progress.text = `${ (percent * 100).toFixed(1) }%`;
		fgui.GTween.kill(img_bar);
		const duration = Math.max(Math.abs(percent - this.img_bar.fillAmount) * 1.5, 0.001);
		fgui.GTween.to(img_bar.fillAmount, percent, duration).setTarget(img_bar, "fillAmount").setEase(fgui.EaseType.QuartOut);
		ctrl_state.selectedIndex = data.groupRewardState + 1;
		if (data.groupRewardState != ERewardState.NoReward) {
			const cfgGroup = $cfgMgr.achievement.achievement_group[data.id];
			const item = $itemUtil.splitItems(cfgGroup.reward)[0];
			com_reward.refreshItemIcon(item.item_id);
		}
	}

	override onDisable() {
		fgui.GTween.kill(this.img_bar);
		this.img_bar.fillAmount = 0;
	}

	private onBtnGetRewardClick() {
		const groupId = this._groupId;
		if (!groupId) return;
		$netMgr.requests.receiveAchievementGroupReward({ group_id: groupId });
	}
}
