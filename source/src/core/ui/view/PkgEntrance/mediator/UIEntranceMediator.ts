import { ESceneType } from "../../../../../scene/SceneDefine";
import { ENotifyConst } from "../../../../common/NotifyConst";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIEntranceView } from "../view/UIEntranceView";

export interface IUIEntranceData {

}

export class UIEntranceMediator extends MediatorBase<UIEntranceView, IUIEntranceData> {
    private _recordCnt = 0;
    
    override onEnable() {
        Laya.timer.once(this.view.trans_t0.totalDuration * 1000, this, this.check2Login);
    }

    @InterestNotify(ENotifyConst.LobbyConnected)
    private check2Login() {
        this._recordCnt++;
        if (this._recordCnt >= 2)
            $sceneMgr.enterScene(ESceneType.LoginScene);
    }
}