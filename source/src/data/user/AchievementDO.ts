import { BaseDO } from "./BaseDO";

export class AchievementDO extends BaseDO implements DO.IAchievementDO {
	private _progressMap: Record<number, ProtoObject<IAchievementProgress>> = {};
	private _statisticsInfo: DO.IAchieveStatisticsInfo = {
		gold: 0,
		silver: 0,
		copper: 0,
		total: 0,
		groups: [],
		groupMap: {},
		segmentAchieves: {},
	};
	private _rewardedGroup: number[] = [];

	get statisticsInfo() { return this._statisticsInfo; }

	getProgress(id: number) {
		return this._progressMap[id];
	}

	getSegmentAchievesAchieved(segmentId: number) {
		const achieves = this._statisticsInfo.segmentAchieves[segmentId];
		if (!achieves || achieves.length == 0) return true;
		for (let i = 0, n = achieves.length; i < n; i++) {
			const pro = this.getProgress(achieves[i]);
			if (!pro || !pro.achieved) return false;
		}
		return true;
	}

	@InjectNetEvent(ENetMessage.fetchAchievement)
	private onFetchAchievement(res: IResAchievement) {
		const decodeRes = $decodeProtoData(res);
		this._progressMap = {};
		const progresses = decodeRes.progresses;
		for (let i = 0, n = progresses.length; i < n; i++) {
			const e = progresses[i];
			this._progressMap[e.id] = e;
		}
		this._rewardedGroup = decodeRes.rewarded_group;
		this.calculateInfo();
		this.dispatch(EUserEvent.OnAchievementChanged);
	}

	@InjectNetEvent(ENetNotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: INotifyAccountUpdate) {
		if (!data.update) return;
		if (!data.update.achievement) return;
		const { progresses, rewarded_group } = $decodeProtoData(data.update.achievement);
		rewarded_group && (this._rewardedGroup = rewarded_group);
		const newAchieves: number[] = [];
		const { _progressMap } = this;
		for (let i = 0, n = progresses.length; i < n; i++) {
			const e = progresses[i];
			if (e.achieved) {
				const cfgAchieve = $cfgMgr.achievement.achievement[e.id];
				if (!cfgAchieve || cfgAchieve.hidden || cfgAchieve.deprecated) continue;
				if (!_progressMap[e.id] || !_progressMap[e.id].achieved) {
					newAchieves.push(e.id);
				}
			}
			_progressMap[e.id] = e;
		}
		if (newAchieves.length) {
			this.dispatch(EUserEvent.OnNewAchievement, [newAchieves]);
		}
		this.calculateInfo();
		this.dispatch(EUserEvent.OnAchievementChanged);
	}

	private calculateInfo() {
		const { _statisticsInfo: info, _rewardedGroup } = this;
		info.gold = info.silver = info.copper = info.total = info.groups.length = 0;
		info.groupMap = {};
		info.segmentAchieves = {};
		const { groups, groupMap } = info;
		const groupCfgs = $cfgMgr.achievement.achievement_group.filter(v => !v.deprecated);
		groupCfgs.sort((a, b) => a.sort - b.sort);

		for (let i = 0; i < groupCfgs.length; i++) {
			const e = groupCfgs[i];
			groupMap[e.id] = {
				id: e.id,
				progress: 0,
				percentage: e.percentage > 0,
				haveReward: false,
				groupRewardState: -1,
				achieveCount: 0,
				achievements: [],
			};
			groups.push(groupMap[e.id]);
		}

		const segmentMap: Record<number, number> = {};
		$cfgMgr.achievement.achievement.forEach(v => {
			if (v.deprecated || v.hidden) return;
			info.total++;
			const group = groupMap[v.group_id];
			group.achieveCount++;
			const pro = this.getProgress(v.id);
			if (v.segment_id) {
				info.segmentAchieves[v.segment_id] = info.segmentAchieves[v.segment_id] || [];
				info.segmentAchieves[v.segment_id].push(v.id);
				if (pro && pro.achieved)
					group.achievements.push(v.id);
				else if (segmentMap[v.segment_id] == null) {
					segmentMap[v.segment_id] = v.id;
					group.achievements.push(v.id);
				} else
					return;
			} else
				group.achievements.push(v.id);
			if (pro && pro.achieved) {
				group.progress++;
				group.haveReward = group.haveReward || (!pro.rewarded && !!v.reward);
				if (v.rare == 3) info.gold++;
				else if (v.rare == 2) info.silver++;
				else if (v.rare == 1) info.copper++;
			}
		});

		for (const e of groups) {
			e.achievements.sort((a, b) => $cfgMgr.achievement.achievement[a].sort - $cfgMgr.achievement.achievement[b].sort);
			e.progress = $mathUtil.clamp01(e.progress / e.achieveCount);
			const cfgGroup = $cfgMgr.achievement.achievement_group[e.id];
			e.groupRewardState = e.percentage && !!cfgGroup.reward ? (e.progress >= 1 ? (_rewardedGroup.includes(e.id) ? ERewardState.Rewarded : ERewardState.CanReward) : ERewardState.CanNotReward) : ERewardState.NoReward;
			e.haveReward = e.haveReward || e.groupRewardState == ERewardState.CanReward;
		}
	}
}