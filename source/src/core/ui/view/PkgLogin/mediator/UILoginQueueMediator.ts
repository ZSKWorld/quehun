import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIUtil } from "../../../tool/UIUtil";
import { EUILoginQueueMsg, UILoginQueueView } from "../view/UILoginQueueView";

export interface IUILoginQueueData {

}

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
            $netMgr.requests.fetchQueueInfo({});
        }
    }

    private onBtnQuitClick() {
        this.closeSelf();
    }

    @InterestMessage(ENotify.NotifyLoginQueueFinished)
    private notifyLoginQueueFinished(res: INotifyLoginQueueFinished) {
        this.closeSelf();
    }

    @InterestMessage(EMessageID.fetchQueueInfo)
    private onFetchQueueInfo(res: IResFetchQueueInfo) {
        if (res.error) {
            this.closeSelf();
        } else {
            this.view.refresh(res);
        }
    }

    override onOpenAni() { return UIUtil.popAlphaIn(this.view); }
    override onCloseAni() { return UIUtil.popAlphaOut(this.view); }
}