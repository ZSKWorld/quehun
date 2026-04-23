import { RDRegisterBase } from "./RDRegisterBase";

export class UISevenDayRDRegister extends RDRegisterBase {
	override get rdInfos(): IRDRegisterInfo[] {
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

	@InterestUserEvent(EUserEvent.OnActivityPeriodTaskProgressChanged)
	private checkSevenDay() {
		let triggered0 = false;
		let triggered1 = false;
		let triggered2 = false;
		let triggered3 = false;
		let triggered4 = false;
		let triggered5 = false;
		let triggered6 = false;

		const activity = $user.activity;
		activity.sevenDayDatas.forEach((v, i) => {
			if (v.some(vv => {
				const taskInfo = activity.getPeriodTaskInfo(vv.period_task_id);
				return taskInfo.achieved && !taskInfo.rewarded;
			})) {
				switch (i) {
					case 0: triggered0 = true; break;
					case 1: triggered1 = true; break;
					case 2: triggered2 = true; break;
					case 3: triggered3 = true; break;
					case 4: triggered4 = true; break;
					case 5: triggered5 = true; break;
					case 6: triggered6 = true; break;
				}
			}
		});
		this.setTriggered(ERDTriggerType.SevenDay0HaveReward, triggered0);
		this.setTriggered(ERDTriggerType.SevenDay1HaveReward, triggered1);
		this.setTriggered(ERDTriggerType.SevenDay2HaveReward, triggered2);
		this.setTriggered(ERDTriggerType.SevenDay3HaveReward, triggered3);
		this.setTriggered(ERDTriggerType.SevenDay4HaveReward, triggered4);
		this.setTriggered(ERDTriggerType.SevenDay5HaveReward, triggered5);
		this.setTriggered(ERDTriggerType.SevenDay6HaveReward, triggered6);
	}
}