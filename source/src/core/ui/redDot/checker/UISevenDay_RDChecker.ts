import { Base_RDChecker } from "./Base_RDChecker";

export class UISevenDay_RDChecker extends Base_RDChecker {
	override get rdInfos(): IRDCheckInfo[] {
		return [
			[ERDName.SevenDay_Day0, ERDName.Main_SevenDay, "UIBottom.UISevenDayView.day0", [ERDTriggerType.SevenDay0HaveReward]],
			[ERDName.SevenDay_Day1, ERDName.Main_SevenDay, "UIBottom.UISevenDayView.day1", [ERDTriggerType.SevenDay1HaveReward]],
			[ERDName.SevenDay_Day2, ERDName.Main_SevenDay, "UIBottom.UISevenDayView.day2", [ERDTriggerType.SevenDay2HaveReward]],
			[ERDName.SevenDay_Day3, ERDName.Main_SevenDay, "UIBottom.UISevenDayView.day3", [ERDTriggerType.SevenDay3HaveReward]],
			[ERDName.SevenDay_Day4, ERDName.Main_SevenDay, "UIBottom.UISevenDayView.day4", [ERDTriggerType.SevenDay4HaveReward]],
			[ERDName.SevenDay_Day5, ERDName.Main_SevenDay, "UIBottom.UISevenDayView.day5", [ERDTriggerType.SevenDay5HaveReward]],
			[ERDName.SevenDay_Day6, ERDName.Main_SevenDay, "UIBottom.UISevenDayView.day6", [ERDTriggerType.SevenDay6HaveReward]],
		];
	}

	@InjectUserEvent(EUserEvent.OnActivityPeriodTaskProgressChanged)
	private checkSevenDay() {
		let checked0 = false;
		let checked1 = false;
		let checked2 = false;
		let checked3 = false;
		let checked4 = false;
		let checked5 = false;
		let checked6 = false;

		const activity = $user.activity;
		activity.sevenDayDO.datas.forEach((v, i) => {
			const haveReward = v.some(vv => {
				const taskInfo = activity.getPeriodTaskInfo(vv.period_task_id);
				return taskInfo.achieved && !taskInfo.rewarded;
			});
			if (haveReward) {
				switch (i) {
					case 0: checked0 = true; break;
					case 1: checked1 = true; break;
					case 2: checked2 = true; break;
					case 3: checked3 = true; break;
					case 4: checked4 = true; break;
					case 5: checked5 = true; break;
					case 6: checked6 = true; break;
				}
			}
		});
		this.setRDCheck(ERDTriggerType.SevenDay0HaveReward, checked0);
		this.setRDCheck(ERDTriggerType.SevenDay1HaveReward, checked1);
		this.setRDCheck(ERDTriggerType.SevenDay2HaveReward, checked2);
		this.setRDCheck(ERDTriggerType.SevenDay3HaveReward, checked3);
		this.setRDCheck(ERDTriggerType.SevenDay4HaveReward, checked4);
		this.setRDCheck(ERDTriggerType.SevenDay5HaveReward, checked5);
		this.setRDCheck(ERDTriggerType.SevenDay6HaveReward, checked6);
	}
}