declare namespace DO {
	interface SevenDayDO {
		get activityId(): number;
		get taskId(): number;
		get totalRewards(): number[];
		get datas(): ISheetData_Activity_TaskDisplay[][];
		get completed(): boolean;
	}

	interface IActivityDO {
		sevenDayDO: SevenDayDO;
		isRunning(activityId: number): boolean;
		getTaskInfo(taskId: number): ITaskProgress;
		getTaskList(activityId: number): ITaskProgress[];
		getPeriodTaskInfo(taskId: number): ITaskProgress;
		getPeriodTaskList(activity_id: number): ITaskProgress[];
		getRandomTaskInfo(taskId: number): ITaskProgress;
		getRandomTaskList(activity_id: number): ITaskProgress[];
	}
}