import RenderAchieveDetailItem from "../../../../ui/PkgAchievement/RenderAchieveDetailItem";

export class RenderAchieveDetailItemView extends RenderAchieveDetailItem {
	private _achieveId: number;
	private _rewardId: number;

	override onCreate() {
		const { com_reward, btn_getReward } = this;
		com_reward.onClick(this, this.onComRewardClick);
		btn_getReward.onClick(this, this.onBtnGetRewardClick);
	}

	refresh(id: number, data: ProtoObject<IAchievementProgress>) {
		const counter = data ? data.counter : 0;
		const achieved = data ? data.achieved : 0;
		const rewarded = data ? data.rewarded : 0;
		const achievedTime = data ? data.achieved_time * 1000 : 0;
		this._achieveId = id;
		this._rewardId = 0;

		const { ctrl_icon, ctrl_state, txt_name, txt_desc, com_reward, txt_progress, txt_time1, txt_time2 } = this;
		const cfgAchieve = $cfgMgr.achievement.achievement[id];

		const locked = cfgAchieve.locked && !(cfgAchieve.segment_id ? $user.achievement.getSegmentAchievesAchieved(cfgAchieve.segment_id) : achieved);
		ctrl_icon.selectedIndex = locked ? 0 : cfgAchieve.rare;
		ctrl_state.selectedIndex = cfgAchieve.reward ? (!achieved ? 1 : (rewarded ? 4 : 2)) : (achieved ? 3 : 0);

		txt_name.text = locked ? $lang(3337) : cfgAchieve.langField(ECfgLangField.name);
		txt_desc.text = locked ? $lang(3338) : cfgAchieve.langField(ECfgLangField.desc);

		if (cfgAchieve.reward) {
			const item = $itemUtil.splitItems(cfgAchieve.reward)[0];
			com_reward.refreshItemIcon(item.item_id);
			this._rewardId = item.item_id;
		}

		if (ctrl_state.selectedIndex <= 1) {
			const cfgBaseTask = $cfgMgr.events.base_task[cfgAchieve.base_task];
			const txt = `${ counter }${ cfgBaseTask.target > 9999 ? "\n" : "" }/${ cfgBaseTask.target }`;
			txt_progress.text = txt;
		} else {
			txt_time1.text = $timeUtil.dateFormat1(achievedTime, ".");
			txt_time2.text = $timeUtil.dateFormat2(achievedTime);
		}
	}

	private onComRewardClick() {
		const rewardId = this._rewardId;
		if (!rewardId) return;
		this.openView<IUIItemDetailData>(EViewID.UIItemDetailView, { id: rewardId });
	}

	private onBtnGetRewardClick() {
		const achieveId = this._achieveId;
		if (!achieveId) return;
		$netMgr.requests.receiveAchievementReward({ achievement_id: achieveId });
	}
}
