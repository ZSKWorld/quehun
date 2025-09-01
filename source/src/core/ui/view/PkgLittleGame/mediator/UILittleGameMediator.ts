import { SceneType } from "../../../../../scene/SceneDefine";
import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { UILittleGameMsg, UILittleGameView } from "../view/UILittleGameView";

export interface UILittleGameData {

}

export class UILittleGameMediator extends MediatorBase<UILittleGameView, UILittleGameData> {

	override onAwake() {
		this.addEvent(UILittleGameMsg.OnBtnBackClick, this.onBtnBackClick);
		this.addEvent(UILittleGameMsg.OnBtn2048Click, this.onBtn2048Click);
	}

	private onBtnBackClick() {
		sceneMgr.enterScene(SceneType.MainScene);
	}

	private onBtn2048Click() {
		this.openView(ViewID.UI2048View);
		this.closeSelf();
	}
}