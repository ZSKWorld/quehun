declare namespace DO {
	interface ISevenDayDO {
		get activityId(): number;
		get taskId(): number;
		get finishedRewards(): number[];
		get datas(): ISheetData_Activity_TaskDisplay[][];
		get completed(): boolean;
	}

	interface IActivityDO {
		get sevenDay(): ISevenDayDO;
		/** 轮换模式活动id */
		get intervalActivityId(): number;
		/** 轮换模式id */
		get intervalId(): number;
		/** 轮换剩余刷新时间 */
		get intervalRefreshTime(): number;
		isRunning(activityId: number): boolean;
		getTaskInfo(taskId: number): ITaskProgress;
		getTaskList(activityId: number): ITaskProgress[];
		getPeriodTaskInfo(taskId: number): ITaskProgress;
		getPeriodTaskList(activity_id: number): ITaskProgress[];
		getRandomTaskInfo(taskId: number): ITaskProgress;
		getRandomTaskList(activity_id: number): ITaskProgress[];
		getOpenedActivityIds(): number[];
	}
}