import RenderOverviewTab from "../../../../ui/PkgActivityOverview/RenderOverviewTab";

export const enum ERenderOverviewTabMsg {

}

export class RenderOverviewTabView extends RenderOverviewTab {

	refresh(activityId: number, activityName: string) {
		this.title = activityName;
		const { banner_left, banner_left_icon } = $cfgMgr.activity.activity_banner[activityId];
		this.icon = $langRes(banner_left);
		this.loader_icon2.icon = $langRes(banner_left_icon);
	}

}
