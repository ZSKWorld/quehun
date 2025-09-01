import { LocalData, LocalDataKey } from "../../../../common/LocalData";
import { NotifyConst } from "../../../../common/NotifyConst";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UILoginWaittingMsg, UILoginWaittingView } from "../view/UILoginWaittingView";

export interface UILoginWaittingData {
    account: string;
    password: string;
}

export class UILoginWaittingMediator extends MediatorBase<UILoginWaittingView, UILoginWaittingData> {

    override onAwake() {
        this.addEvent(UILoginWaittingMsg.OnBtnCloseClick, this.onBtnCloseClick);
    }

    override onEnable() {
        Laya.timer.once(1000, this, () => { netService.login(this.data); });
    }

    private onBtnCloseClick() {
        Laya.timer.clearAll(this);
        LocalData.set(LocalDataKey.AutoLogin, false);
        this.close();
        this.openView(ViewID.UILoginView);
    }

    @InterestNotify(NotifyConst.LoginSuccess)
    @InterestNotify(NotifyConst.LoginFail)
    private close() {
        this.closeSelf();
    }
}