import ComYueKa from "../../../../ui/PkgActivityOverview/ComYueKa";

export const enum EComYueKaMsg {

}

export class ComYueKaView extends ComYueKa implements IOverviewView {
	readonly activityId: number;
	readonly activityName: string;

	override onCreate() {

	}

	override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bg, $langRes("myres/yueka/bg_yueka.jpg"));
	}

	override onDisable() {
		$dynamicResMgr.clearLoader(this.loader_bg);
	}
}
