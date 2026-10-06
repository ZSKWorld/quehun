import ComMatchRot from "../../../../ui/PkgActivityOverview/ComMatchRot";

export const enum EComMatchRotMsg {

}

export class ComMatchRotView extends ComMatchRot implements IOverviewView {
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
