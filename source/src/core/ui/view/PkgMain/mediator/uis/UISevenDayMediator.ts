import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUISevenDayEvent, EUISevenDayRenderClickEvent } from "../../Definition";
import { UISevenDayView } from "../../view/uis/UISevenDayView";

export interface IUISevenDayData {

}

const taskId = 23060122;

export class UISevenDayMediator extends MediatorBase<UISevenDayView, IUISevenDayData> {
	private _tabIndex: number = 0;
	private _totalRewards: number[];
	private _qaData: ISheetData_Activity_TaskDisplay;
	override onAwake() {
		this.addEvent(EUISevenDayEvent.OnTabSelectChanged, this.onTabSelectChanged);
		this.addEvent(EUISevenDayEvent.OnTaskBtnClick, this.onTaskBtnClick);
		this.addEvent(EUISevenDayEvent.OnQABtnCloseClick, this.showTask);
		this.addEvent(EUISevenDayEvent.OnQABtnSkipClick, this.showTask);
		this.addEvent(EUISevenDayEvent.OnQABtnAnswerClick, this.onQABtnAnswerClick);

		this._totalRewards = $cfgMgr.activity.period_task[taskId].reward.split(",").map(v => v.split("-")[0]).map(Number);
	}

	override onEnable() {
		this._tabIndex = 0;
		this.showTask();
	}

	override onDisable() {
		this._qaData = null;
	}

	private showTask() {
		this.view.setShowType(0);
		this.refreshTask();
		this.view.refreshRewards(this._totalRewards);
	}

	@InterestUserEvent(EUserEvent.OnActivityPeriodTaskProgressChanged)
	private refreshTask() {
		const finishDays = $user.activity.sevenDayDatas.map(v => {
			return v.every(vv => $user.activity.getPeriodTaskInfo(vv.period_task_id).rewarded);
		});
		this.view.refreshTask(this._tabIndex, finishDays);
	}

	private onTabSelectChanged(index) {
		this._tabIndex = index;
		this.view.refreshTaskItem($user.activity.sevenDayDatas[index]);
	}

	private onTaskBtnClick(event: EUISevenDayRenderClickEvent, data: ISheetData_Activity_TaskDisplay) {
		switch (event) {
			case EUISevenDayRenderClickEvent.Question:
				this._qaData = data;
				this.view.setShowType(1);
				this.view.refreshQuestion(data, -1, false);
				break;

			case EUISevenDayRenderClickEvent.Reward:
				$netMgr.requests.completePeriodActivityTask({ task_id: data.period_task_id });
				break;

			case EUISevenDayRenderClickEvent.JumpUIHelp:
				this.openView(EViewID.UIHelpView, null, EViewOpenType.Hide);
				break;

			case EUISevenDayRenderClickEvent.JumpUILiaoShe:
				this.openView(EViewID.UIHelpView, null, EViewOpenType.Hide);
				break;

			case EUISevenDayRenderClickEvent.JumpUIShop:
				this.openView(EViewID.UIShopView, null, EViewOpenType.Hide);
				break;

			case EUISevenDayRenderClickEvent.JumpUIPaiPu:
				this.openView(EViewID.UIPaipuView, null, EViewOpenType.Hide);
				break;

			case EUISevenDayRenderClickEvent.JumpUIObserver:
				this.openView(EViewID.UIObserverView, null, EViewOpenType.Hide);
				break;

			case EUISevenDayRenderClickEvent.JumpUIAchievement:
				this.openView(EViewID.UIAchievementView, null, EViewOpenType.Hide);
				break;

			case EUISevenDayRenderClickEvent.JumpUICreateRoom:
				// this.openView(EViewID.UIHelpView, null, EViewOpenType.Hide);
				break;

			case EUISevenDayRenderClickEvent.JumpUILobby:
				// this.openView(EViewID.UIHelpView, null, EViewOpenType.Hide);
				break;

			case EUISevenDayRenderClickEvent.JumpUIBag:
				this.openView(EViewID.UIBagView, null, EViewOpenType.Hide);
				break;

		}
	}

	private onQABtnAnswerClick(value: number) {
		const qaData = this._qaData;
		if (!qaData) return;
		let answer = qaData.answer;
		let correct = false;
		while (answer > 0) {
			if (answer % 10 == value + 1) {
				correct = true;
				break;
			}
			answer = Math.floor(answer / 10);
		}
		this.view.refreshQuestion(qaData, value, correct);
		if (correct) {
			const cfgPeriodTask = $cfgMgr.activity.period_task[qaData.period_task_id];
			const cfgBaseTask = $cfgMgr.events.base_task[cfgPeriodTask.base_task_id];
			$netMgr.requests.taskRequest({ params: cfgBaseTask.param.filter(v => !!v).map(Number) });
		}
	}
}