import ComQingYun from "../../../../ui/PkgActivityOverview/ComQingYun";

export const enum EComQingYunMsg {

}

export class ComQingYunView extends ComQingYun implements IOverviewView {
	readonly activityId: number;
	readonly activityName: string;

	override onCreate() {

	}

	override onEnable() {
		const cfgBanner = $cfgMgr.activity.activity_banner[this.activityId];
		$dynamicResMgr.setLoader(this.loader_bg, $langRes(cfgBanner.banner_big));
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}
}
