import { Observer } from "../../../../mvc/provider/Observer";

interface IOverviewInfo {
	activityId: ID;
	name: string;
	viewClass: Class<IOverviewView> & { createInstance?(): IOverviewView; };
}

@Singleton
export class ActivityOverviewManager extends Observer {
	static readonly Inst: ActivityOverviewManager;

	private _overviewClasses: Map<ID, IOverviewInfo> = new Map();
	private _overviewViews: Map<ID, IOverviewView> = new Map();

	initActivityView(activityId: ID, nameOrId: string | number, view: Class<IOverviewView>) {
		if (!view) {
			$logger.warn("view is null");
			return;
		}
		if (this._overviewClasses.has(activityId)) {
			$logger.warn("activity overview has been initialized");
			return;
		}
		this._overviewClasses.set(activityId, {
			activityId: activityId,
			name: typeof nameOrId == "number" ? $lang(nameOrId) : nameOrId,
			viewClass: view
		});
	}

	getView(activityId: ID) {
		const info = this._overviewClasses.get(activityId);
		if (!info) return null;

		let view = this._overviewViews.get(activityId);
		if (!view) {
			view = info.viewClass.createInstance();
			view.activityId = activityId;
			view.activityName = info.name;
			this._overviewViews.set(activityId, view);
		}
		return view;
	}
}
