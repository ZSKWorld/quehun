import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UILoginQueueView } from "../../view/uis/UILoginQueueView";

export class UILoginQueueMediator extends MediatorBase<UILoginQueueView, IUILoginQueueData> {
	private _time = 0;
	override onAwake() {

	}

	override onEnable() {
		this._time = 0;
		this.view.refresh();
	}

	override onUpdate() {
		this._time -= Laya.timer.delta;
		if (this._time < 0) {
			this._time = 10 * 1000;
			$netMgr.requests.fetchQueueInfo();
		}
	}

	@InjectNetEvent(ENetNotify.NotifyLoginQueueFinished)
	private onNotifyLoginQueueFinished(data: INotifyLoginQueueFinished) {
		this.closeSelf();
	}

	@InjectNetEvent(ENetMessage.fetchQueueInfo)
	private onFetchQueueInfo(res: IResFetchQueueInfo) {
		this.view.refresh(res);
	}
}