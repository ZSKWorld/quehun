import ComNiuDan from "../../../../ui/PkgActivityOverview/ComNiuDan";

export const enum EComNiuDanMsg {

}

export class ComNiuDanView extends ComNiuDan implements IOverviewView {
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
