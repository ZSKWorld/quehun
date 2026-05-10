import RenderSevenDayItem from "../../../../ui/PkgMain/RenderSevenDayItem";
import { EUISevenDayEvent, EUISevenDayRenderClickEvent } from "../../Definition";

export class RenderSevenDayItemView extends ExtensionClass<IView, RenderSevenDayItem>(RenderSevenDayItem) implements IView {
	private _data: ISheetData_Activity_TaskDisplay;
	private _clickEventType: EUISevenDayRenderClickEvent;

	override onCreate() {
		const { btn_question, btn_jump, btn_getReward } = this;
		btn_question.onClick(this, this.onBtnClick);
		btn_jump.onClick(this, this.onBtnClick);
		btn_getReward.onClick(this, this.onBtnClick);
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
		txt_desc.text = cfgBaseTask.langField("desc");

		const taskInfo = $user.activity.getPeriodTaskInfo(data.period_task_id);
		//ctrl_type.selectedIndex 0:问答 1:前往 2:进度 3:领取 4:已领取
		if (taskInfo.rewarded) {
			ctrl_type.selectedIndex = 4;
		} else if (taskInfo.achieved) {
			ctrl_type.selectedIndex = 3;
			this._clickEventType = EUISevenDayRenderClickEvent.Reward;
		} else if (data.task_type == 1) {
			ctrl_type.selectedIndex = 0;
			this._clickEventType = EUISevenDayRenderClickEvent.Question;
		} else if (cfgBaseTask.type == 81) {
			ctrl_type.selectedIndex = 1;
			this._clickEventType = +cfgBaseTask.param[1] as EUISevenDayRenderClickEvent;
		} else {
			if (data.period_task_id == 23060115) {
				ctrl_type.selectedIndex = 1;
				this._clickEventType = EUISevenDayRenderClickEvent.JumpUICreateRoom;
			} else if (data.period_task_id == 23060120) {
				ctrl_type.selectedIndex = 1;
				this._clickEventType = EUISevenDayRenderClickEvent.JumpUILobby;
			} else if (data.period_task_id == 23060114) {
				ctrl_type.selectedIndex = 1;
				this._clickEventType = EUISevenDayRenderClickEvent.JumpUIBag;
			} else {
				ctrl_type.selectedIndex = 2;
				txt_progress.text = `${ taskInfo.counter }/${ cfgBaseTask.target }`;
			}
		}
	}

	private onBtnClick() {
		this.event(EUISevenDayEvent.OnTaskBtnClick, [this._clickEventType, this._data]);
	}
}
