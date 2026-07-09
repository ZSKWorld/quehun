import ComAchieveStat from "../../../../ui/PkgAchievement/ComAchieveStat";

export const enum EComAchieveStatMsg {

}

export class ComAchieveStatView extends ExtendClass<IView, ComAchieveStat>(ComAchieveStat) implements IView {

	override onCreate() {

	}

	refresh(gold: number, silver: number, copper: number, total: number) {
		this.txt_gold.text = gold.toString();
		this.txt_silver.text = silver.toString();
		this.txt_copper.text = copper.toString();
		this.txt_total.text = `${ gold + silver + copper }/${ total }`;
	}
}
