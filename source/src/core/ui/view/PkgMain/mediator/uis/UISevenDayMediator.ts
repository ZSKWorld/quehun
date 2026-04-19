import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUISevenDayMsg, UISevenDayView } from "../../view/uis/UISevenDayView";

export interface IUISevenDayData {

}

const taskId = 23060122;
const activityId = 230601;

export class UISevenDayMediator extends MediatorBase<UISevenDayView, IUISevenDayData> {
	private _taskDatas: ISheetData_Activity_TaskDisplay[][] = [[], [], [], [], [], [], []];
	override onAwake() {
		this.addEvent(EUISevenDayMsg.OnTabSelectChanged, this.onTabSelectChanged);

		const datas = $cfgMgr.activity.task_display[activityId];
		for (const data of datas) {
			if (!data.task_serial_number) continue;
			this._taskDatas[data.day - 1][data.task_serial_number - 1] = data;
		}

		const rewardIds = $cfgMgr.activity.period_task[taskId].reward.split(",").map(v => v.split("-")[0]).map(Number);
		this.view.refreshRewards(rewardIds);

	}

	override onEnable() {
		this.view.refreshTab(0);
	}

	private onTabSelectChanged(index) {
		this.view.refreshTask(this._taskDatas[index]);
	}
}