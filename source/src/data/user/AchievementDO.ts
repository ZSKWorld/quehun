import { BaseDO } from "./BaseDO";

export class AchievementDO extends BaseDO implements DO.IAchievementDO {
	private _progressMap: Record<number, ProtoObject<IAchievementProgress>> = {};
	private _rewardedGroup: number[] = [];

	getProgress(id: number) {
		return this._progressMap[id];
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
		this.dispatch(EUserEvent.OnAchievementChanged);
	}
}