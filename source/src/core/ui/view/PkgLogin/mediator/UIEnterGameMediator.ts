import { SceneType } from "../../../../../scene/SceneDefine";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UIEnterGameMsg, UIEnterGameView } from "../view/UIEnterGameView";

export interface UIEnterGameData {

}

export class UIEnterGameMediator extends MediatorBase<UIEnterGameView, UIEnterGameData> {

    override onAwake() {
        this.addEvent(UIEnterGameMsg.OnViewClick, this.onViewClick);
    }

    private onViewClick() {
        sceneMgr.enterScene(SceneType.MainScene);
    }
}