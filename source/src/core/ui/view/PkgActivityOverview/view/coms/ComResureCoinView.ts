import ComResureCoin from "../../../../ui/PkgActivityOverview/ComResureCoin";

export const enum EComResureCoinMsg {

}

export class ComResureCoinView extends ComResureCoin implements IOverviewView {
	readonly activityId: number;
	readonly activityName: string;

	override onCreate() {

	}

}
