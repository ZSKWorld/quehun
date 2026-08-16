import ComAchieveStat from "../../../../ui/PkgAchievement/ComAchieveStat";

export const enum EComAchieveStatMsg {

}

export class ComAchieveStatView extends ComAchieveStat {

	override onEnable() {
		this.refresh();
		$facade.on(EUserEvent.OnAchievementChanged, this, this.refresh);
	}

	override onDisable() {
		$facade.offAllCaller(this);
	}

	private refresh() {
		const { gold, silver, copper, total } = $user.achievement.statisticsInfo;
		this.txt_gold.text = gold.toString();
		this.txt_silver.text = silver.toString();
		this.txt_copper.text = copper.toString();
		this.txt_total.text = `${ gold + silver + copper }/${ total }`;
	}
}
