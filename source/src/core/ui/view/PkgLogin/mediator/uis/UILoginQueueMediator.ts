import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUILoginQueueMsg, UILoginQueueView } from "../../view/uis/UILoginQueueView";

export class UILoginQueueMediator extends MediatorBase<UILoginQueueView, IUILoginQueueData> {
	private _time = 0;
	override onAwake() {
		this.addEvent(EUILoginQueueMsg.OnBtnQuitClick, this.onBtnQuitClick);
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

	private onBtnQuitClick() {
		this.closeSelf();
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