import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIMainEvent } from "../../Definition";
import { UIMainView } from "../../view/uis/UIMainView";

export class UIMainMediator extends MediatorBase<UIMainView, IUIMainData> {

	override onAwake() {
		this.addEvent(EUIMainEvent.OnBtnObserverClick, this.onBtnObserverClick);
	}

	override onEnable() {
		this.view.refreshPlayerInfo();
		this.refreshQiRi();
	}

	private onBtnObserverClick() {
		// this.openView(EViewID.UIObserverView, null, EViewOpenType.Hide);
		this.openView<IUIVideoData>(EViewID.UIVideoView, { skinId: 400305 });
	}

	@InjectUserEvent(EUserEvent.OnActivityPeriodTaskProgressChanged)
	private refreshQiRi() {
		this.view.refreshQiRi(!$user.activity.sevenDayDO.completed);
	}
}