import RenderSevenDayItem from "../../../../ui/PkgMain/RenderSevenDayItem";

export class RenderSevenDayItemView extends ExtensionClass<IView, RenderSevenDayItem>(RenderSevenDayItem) implements IView {
	private _data: ISheetData_Activity_TaskDisplay;

	override onCreate() {
		const { btn_question, btn_goto, btn_getReward } = this;
		btn_question.onClick(this, this.onBtnQuestion);
		btn_goto.onClick(this, this.onBtnGoTo);
		btn_getReward.onClick(this, this.onBtnGetReward);
	}

	refresh(data: ISheetData_Activity_TaskDisplay) {
		this._data = data;
		if (!data) {
			this.visible = false;
			return;
		}
		const { ctrl_type, com_item, txt_desc, txt_progress } = this;
		const cfgPeriodTask = $cfgMgr.activity.period_task[data.period_task_id];
		const rewards = cfgPeriodTask.reward.split2Num("-");
		com_item.refresh(rewards[0], rewards[1]);
		const cfgBaseTask = $cfgMgr.events.base_task[cfgPeriodTask.base_task_id];
		txt_desc.text = $langCfg(cfgBaseTask, "desc");

		const taskInfo = $user.activity.getPeriodTaskInfo(data.period_task_id);
		if (taskInfo.rewarded) {
			ctrl_type.selectedIndex = 4;
		} else if (taskInfo.achieved) {
			ctrl_type.selectedIndex = 3;
		} else if (data.task_type == 1) {
			ctrl_type.selectedIndex = 0;
		} else if (cfgBaseTask.type == 81) {
			ctrl_type.selectedIndex = 1;
		} else {
			if (data.period_task_id == 23060115) {
				ctrl_type.selectedIndex = 1;
			} else if (data.period_task_id == 23060120) {
				ctrl_type.selectedIndex = 1;
			} else if (data.period_task_id == 23060114) {
				ctrl_type.selectedIndex = 1;
			} else {
				ctrl_type.selectedIndex = 2;
				txt_progress.text = `${ taskInfo.counter }/${ cfgBaseTask.target }`;
			}
		}
	}

	private onBtnQuestion() {

	}

	private onBtnGoTo() {

	}

	private onBtnGetReward() {

	}
}
