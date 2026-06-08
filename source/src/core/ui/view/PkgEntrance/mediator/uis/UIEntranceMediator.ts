import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { UIEntranceView } from "../../view/uis/UIEntranceView";

export class UIEntranceMediator extends MediatorBase<UIEntranceView, IUIEntranceData> {
	private _recordCnt = 0;

	override onEnable() {
		Laya.timer.once(this.view.transT0Duration, this, this.check2Login);
	}

	@InjectGlobalEvent(EGlobalEvent.LobbyConnected)
	private check2Login() {
		this._recordCnt++;
		if (this._recordCnt >= 2)
			$sceneMgr.enterScene(ESceneType.LoginScene);
	}
}