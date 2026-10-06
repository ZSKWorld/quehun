import ComQuestionair from "../../../../ui/PkgActivityOverview/ComQuestionair";

export const enum EComQuestionairMsg {

}

export class ComQuestionairView extends ComQuestionair implements IOverviewView {
	readonly activityId: number;
	readonly activityName: string;

	override onCreate() {

	}

}
