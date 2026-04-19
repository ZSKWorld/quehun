declare namespace DO {
	interface IActivityDO {
		isRunning(activityId: number): boolean;
		getTaskInfo(taskId: number): ITaskProgress;
		getTaskList(activityId: number): ITaskProgress[];
		getPeriodTaskInfo(taskId: number): ITaskProgress;
		getPeriodTaskList(activity_id: number): ITaskProgress[];
		getRandomTaskInfo(taskId: number): ITaskProgress;
		getRandomTaskList(activity_id: number): ITaskProgress[];
	}
}