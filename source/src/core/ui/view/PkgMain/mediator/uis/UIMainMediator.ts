import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UIMainView } from "../../view/uis/UIMainView";

export class UIMainMediator extends MediatorBase<UIMainView, IUIMainData> {

	override onAwake() {

	}

	override onEnable() {
		this.view.refreshPlayerInfo();
		this.refreshQiRi();
	}

	@InjectUserEvent(EUserEvent.OnActivityPeriodTaskProgressChanged)
	private refreshQiRi() {
		this.view.refreshQiRi(!$user.activity.sevenDay.completed);
	}
}