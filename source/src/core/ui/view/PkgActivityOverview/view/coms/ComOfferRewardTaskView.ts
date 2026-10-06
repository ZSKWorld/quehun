import ComOfferRewardTask from "../../../../ui/PkgActivityOverview/ComOfferRewardTask";

export const enum EComOfferRewardTaskMsg {

}

export class ComOfferRewardTaskView extends ComOfferRewardTask implements IOverviewView {
	readonly activityId: number;
	readonly activityName: string;

	override onCreate() {

	}

}
