import { BaseDO } from "./BaseDO";

interface IActivityData {
	exchange_records: IExchangeRecord[];
	task_progress_list: KeyMap<ITaskProgress>;
	accumulated_point_list: IActivityAccumulatedPointData[];
	rank_data_list: IActivityRankPointData[];
	flip_task_progress_list: KeyMap<ITaskProgress>;
	sign_in_data: IResAccountActivityData_ActivitySignInData[];
	richman_data: IResAccountActivityData_ActivityRichmanData[];
	period_task_progress_list: KeyMap<ITaskProgress>;
	random_task_progress_list: KeyMap<ITaskProgress>;
	chest_up_data: IResAccountActivityData_ChestUpData[];
	sns_data: IResAccountActivityData_ActivitySNSData;
	mine_data: IMineActivityData[];
	rpg_data: IRPGActivity[];
	arena_data: IActivityArenaData[];
	feed_data: IFeedActivityData[];
	segment_task_progress_list: KeyMap<ISegmentTaskProgress>;
	vote_records: IVoteData[];
	spot_data: IActivitySpotData[];
	friend_gift_data: IActivityFriendGiftData[];
	upgrade_data: IActivityUpgradeData[];
	gacha_data: IActivityGachaUpdateData[];
	simulation_data: IActivitySimulationData[];
	combining_data: IActivityCombiningLQData[];
	village_data: IActivityVillageData[];
	festival_data: IActivityFestivalData[];
	island_data: IActivityIslandData[];
	story_data: IActivityStoryData[];
	choose_up_data: IActivityChooseUpData[];
	progress_reward_data: IActivityProgressRewardData[];
	quest_crew_data: IActivityQuestCrewData[];
	shoot_data: IActivityShootData[];
	bingo_data: IActivityBingoData[];
	snowball_data: IActivitySnowballData[];
	marathon_data: IActivityMarathonData[];
	choose_group_up_data: IActivityChooseGroupData[];
	mmo_data: IActivityMMOData[];
}

class SevenDayDO implements DO.ISevenDayDO {
	private _totalRewards: number[];
	private _datas: ISheetData_Activity_TaskDisplay[][];
	get activityId() { return 230601; }
	get taskId() { return 23060122; }
	get finishedRewards() {
		if (!this._totalRewards) {
			this._totalRewards = $cfgMgr.activity.period_task[this.taskId].reward.split(",").map(v => v.split("-").first).map(Number);
		}
		return this._totalRewards;
	}
	get datas() {
		if (!this._datas) {
			this._datas = [[], [], [], [], [], [], []];
			const datas = $cfgMgr.activity.task_display[230601];
			for (const data of datas) {
				if (!data.task_serial_number) continue;
				this._datas[data.day - 1][data.task_serial_number - 1] = data;
			}
		}
		return this._datas;
	}
	get completed() {
		const taskInfo = $user.activity.getPeriodTaskInfo(this.taskId);
		return taskInfo && taskInfo.rewarded;
	}
}

export class ActivityDO extends BaseDO implements DO.IActivityDO {
	private _activityList: KeyMap<ProtoObject<IActivity>> = {};
	private _activityData: IActivityData = {
		exchange_records: [],
		task_progress_list: {},
		accumulated_point_list: [],
		rank_data_list: [],
		flip_task_progress_list: {},
		sign_in_data: [],
		richman_data: [],
		period_task_progress_list: {},
		random_task_progress_list: {},
		chest_up_data: [],
		sns_data: undefined,
		mine_data: [],
		rpg_data: [],
		arena_data: [],
		feed_data: [],
		segment_task_progress_list: {},
		vote_records: [],
		spot_data: [],
		friend_gift_data: [],
		upgrade_data: [],
		gacha_data: [],
		simulation_data: [],
		combining_data: [],
		village_data: [],
		festival_data: [],
		island_data: [],
		story_data: [],
		choose_up_data: [],
		progress_reward_data: [],
		quest_crew_data: [],
		shoot_data: [],
		bingo_data: [],
		snowball_data: [],
		marathon_data: [],
		choose_group_up_data: [],
		mmo_data: []
	};
	private _activityBuff: KeyMap<ProtoObject<IActivityBuffData>> = {};
	private _activityInterval: KeyMap<ProtoObject<IResFetchActivityInterval_ActivityInterval>> = {};

	private _sevenDay = new SevenDayDO();
	get sevenDay() { return this._sevenDay; }

	isRunning(activityId: number) {
		if ($gameMgr.regionLimited) {
			if (activityId >= 231111 && activityId <= 231126 && activityId != 231123) {
				return false;
			}
		} else {
			if (activityId >= 231151 && activityId <= 231174)
				return false;
		}
		return !!this._activityList[activityId];
	}

	getTaskInfo(taskId: number) {
		return this._activityData.task_progress_list[taskId];
	}
	getTaskList(activityId: number) {
		const list: ITaskProgress[] = [];
		const taskList = this._activityData.task_progress_list;
		for (const id in taskList) {
			const e = taskList[id];
			const cfgTask = $cfgMgr.activity.task[e.id];
			if (cfgTask && cfgTask.activity_id == activityId) {
				list.push(e);
			}
		}
		return list;
	}

	getPeriodTaskInfo(taskId: number) {
		return this._activityData.period_task_progress_list[taskId];
	}
	getPeriodTaskList(activity_id: number) {
		const list: ITaskProgress[] = [];
		const taskList = this._activityData.period_task_progress_list;
		for (let id in taskList) {
			const e = taskList[id];
			const cfgTask = $cfgMgr.activity.period_task[id];
			if (cfgTask && cfgTask.activity_id === activity_id && !cfgTask.deprecated) {
				list.push(e);
			}
		}
		return list;
	}

	getRandomTaskInfo(taskId: number) {
		return this._activityData.random_task_progress_list[taskId];
	}
	getRandomTaskList(activity_id: number) {
		const list: ITaskProgress[] = [];
		const taskList = this._activityData.random_task_progress_list;
		for (let id in taskList) {
			const e = taskList[id];
			const cfgTasks = $cfgMgr.activity.random_task_pool[id];
			if (cfgTasks && cfgTasks.find(v => v.activity_id === activity_id)) {
				list.push(e);
			}
		}
		return list;
	}

	@InjectNetEvent(ENetMessage.fetchActivityList)
	private onFetchActivityList(res: IResActivityList) {
		this.onNotifyActivityChange({ new_activities: res.activities, end_activities: null });
	}

	@InjectNetEvent(ENetMessage.fetchAccountActivityData)
	private onFetchAccountActivityData(res: IResAccountActivityData) {
		this.updateActivityData($decodeProtoData(res));
	}

	@InjectNetEvent(ENetMessage.fetchActivityBuff)
	private onFetchActivityBuff(res: IResActivityBuff) {
		const activityBuff = this._activityBuff;
		$decodeProtoData(res.buff_list).forEach(v => {
			activityBuff[v.buff_id] = v;
		});
		this.dispatch(EUserEvent.OnActivityBuffChanged);
	}

	@InjectNetEvent(ENetMessage.fetchActivityInterval)
	private onFetchActivityInterval(res: IResFetchActivityInterval) {
		const activityInterval = this._activityInterval;
		$decodeProtoData(res.result).forEach(v => {
			activityInterval[v.activity_id] = v;
		});
		this.dispatch(EUserEvent.OnActivityIntervalChanged);
	}

	@InjectNetEvent(ENetNotify.NotifyAccountUpdate)
	private onNotifyAccountUpdate(data: INotifyAccountUpdate) {
		if (!data.update) return;
		const {
			activity, activity_task, activity_flip_task, activity_period_task, activity_random_task,
			activity_segment_task
		} = $decodeProtoData(data.update);

		this.updateActivityData({
			exchange_records: null,
			task_progress_list: activity_task?.progresses,
			accumulated_point_list: null,
			rank_data_list: null,
			flip_task_progress_list: activity_flip_task?.progresses,
			sign_in_data: null,
			richman_data: null,
			period_task_progress_list: activity_period_task?.progresses,
			random_task_progress_list: activity_random_task?.progresses,
			chest_up_data: null,
			sns_data: null,
			mine_data: activity?.mine_data,
			rpg_data: activity?.rpg_data,
			arena_data: null,
			feed_data: activity?.feed_data,
			segment_task_progress_list: activity_segment_task?.progresses,
			vote_records: null,
			spot_data: activity?.spot_data,
			friend_gift_data: activity?.friend_gift_data,
			upgrade_data: activity?.upgrade_data,
			gacha_data: activity?.gacha_data,
			simulation_data: activity?.simulation_data,
			combining_data: activity?.combining_data,
			village_data: activity?.village_data,
			festival_data: activity?.festival_data,
			island_data: activity?.island_data,
			story_data: activity?.story_data,
			choose_up_data: activity?.choose_up_data,
			progress_reward_data: null,
			quest_crew_data: null, //activity?.quest_crew_data,
			shoot_data: activity?.shoot_data,
			bingo_data: activity?.bingo_data,
			snowball_data: null, //activity?.snowball_data,
			marathon_data: null,
			choose_group_up_data: activity?.choose_group_up_data,
			mmo_data: null, //activity?.mmo_data,
		} as ProtoObject<IResAccountActivityData>);
	}

	@InjectNetEvent(ENetNotify.NotifyActivityTaskUpdate)
	private onNotifyActivityTaskUpdate(data: INotifyActivityTaskUpdate) {
		this.updateActivityData({ task_progress_list: $decodeProtoData(data.progresses) });
	}

	@InjectNetEvent(ENetNotify.NotifyActivityPeriodTaskUpdate)
	private onNotifyActivityPeriodTaskUpdate(data: INotifyActivityPeriodTaskUpdate) {
		this.updateActivityData({ period_task_progress_list: $decodeProtoData(data.progresses) });
	}

	@InjectNetEvent(ENetNotify.NotifyAccountRandomTaskUpdate)
	private onNotifyAccountRandomTaskUpdate(data: INotifyAccountRandomTaskUpdate) {
		this.updateActivityData({ random_task_progress_list: $decodeProtoData(data.progresses) });
	}

	@InjectNetEvent(ENetNotify.NotifyActivitySegmentTaskUpdate)
	private onNotifyActivitySegmentTaskUpdate(data: INotifyActivitySegmentTaskUpdate) {
		this.updateActivityData({ segment_task_progress_list: $decodeProtoData(data.progresses) });
	}

	@InjectNetEvent(ENetNotify.NotifyActivityChange)
	private onNotifyActivityChange(data: INotifyActivityChange) {
		const activityList = this._activityList;
		const { new_activities, end_activities } = $decodeProtoData(data);
		if (new_activities && new_activities.length) {
			new_activities.forEach(v => {
				activityList[v.activity_id] = v;
			});
		}

		if (end_activities && end_activities.length) {
			end_activities.forEach(v => {
				delete activityList[v];
			});
		}

		const changed = (new_activities && new_activities.length > 0) || (end_activities && end_activities.length > 0);
		changed && this.dispatch(EUserEvent.OnActivityListChanged);
	}

	private updateActivityData(data: Partial<ProtoObject<IResAccountActivityData>>) {
		const activityData = this._activityData;
		if (data.exchange_records) {
			activityData.exchange_records = data.exchange_records;
		}
		if (data.task_progress_list) {
			data.task_progress_list.forEach(v => {
				activityData.task_progress_list[v.id] = v;
			});
			data.task_progress_list.length && this.dispatch(EUserEvent.OnActivityTaskProgressChanged);
		}
		if (data.accumulated_point_list) {
			activityData.accumulated_point_list = data.accumulated_point_list;
		}
		if (data.rank_data_list) {
			activityData.rank_data_list = data.rank_data_list;
		}
		if (data.flip_task_progress_list) {
			data.flip_task_progress_list.forEach(v => {
				activityData.flip_task_progress_list[v.id] = v;
			});
			data.flip_task_progress_list.length && this.dispatch(EUserEvent.OnActivityFlipTaskProgressChanged);
		}
		if (data.sign_in_data) {
			activityData.sign_in_data = data.sign_in_data;
		}
		if (data.richman_data) {
			activityData.richman_data = data.richman_data;
		}
		if (data.period_task_progress_list) {
			data.period_task_progress_list.forEach(v => {
				activityData.period_task_progress_list[v.id] = v;
			});
			data.period_task_progress_list.length && this.dispatch(EUserEvent.OnActivityPeriodTaskProgressChanged);
		}
		if (data.random_task_progress_list) {
			data.random_task_progress_list.forEach(v => {
				activityData.random_task_progress_list[v.id] = v;
			});
			data.random_task_progress_list.length && this.dispatch(EUserEvent.OnActivityRandomTaskProgressChanged);
		}
		if (data.chest_up_data) {
			activityData.chest_up_data = data.chest_up_data;
		}
		if (data.sns_data) {
			activityData.sns_data = data.sns_data;
		}
		if (data.mine_data) {
			activityData.mine_data = data.mine_data;
		}
		if (data.rpg_data) {
			activityData.rpg_data = data.rpg_data;
		}
		if (data.arena_data) {
			activityData.arena_data = data.arena_data;
		}
		if (data.feed_data) {
			activityData.feed_data = data.feed_data;
		}
		if (data.segment_task_progress_list) {
			data.segment_task_progress_list.forEach(v => {
				activityData.segment_task_progress_list[v.id] = v;
			});
			data.segment_task_progress_list.length && this.dispatch(EUserEvent.OnActivitySegmentTaskProgressChanged);
		}
		if (data.vote_records) {
			activityData.vote_records = data.vote_records;
		}
		if (data.spot_data) {
			activityData.spot_data = data.spot_data;
		}
		if (data.friend_gift_data) {
			activityData.friend_gift_data = data.friend_gift_data;
		}
		if (data.upgrade_data) {
			activityData.upgrade_data = data.upgrade_data;
		}
		if (data.gacha_data) {
			activityData.gacha_data = data.gacha_data;
		}
		if (data.simulation_data) {
			activityData.simulation_data = data.simulation_data;
		}
		if (data.combining_data) {
			activityData.combining_data = data.combining_data;
		}
		if (data.village_data) {
			activityData.village_data = data.village_data;
		}
		if (data.festival_data) {
			activityData.festival_data = data.festival_data;
		}
		if (data.island_data) {
			activityData.island_data = data.island_data;
		}
		if (data.story_data) {
			activityData.story_data = data.story_data;
		}
		if (data.choose_up_data) {
			activityData.choose_up_data = data.choose_up_data;
		}
		if (data.progress_reward_data) {
			activityData.progress_reward_data = data.progress_reward_data;
		}
		if (data.quest_crew_data) {
			activityData.quest_crew_data = data.quest_crew_data;
		}
		if (data.shoot_data) {
			activityData.shoot_data = data.shoot_data;
		}
		if (data.bingo_data) {
			activityData.bingo_data = data.bingo_data;
		}
		if (data.snowball_data) {
			activityData.snowball_data = data.snowball_data;
		}
		if (data.marathon_data) {
			activityData.marathon_data = data.marathon_data;
		}
		if (data.choose_group_up_data) {
			activityData.choose_group_up_data = data.choose_group_up_data;
		}
		if (data.mmo_data) {
			activityData.mmo_data = data.mmo_data;
		}
	}
}