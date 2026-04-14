import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIMainMsg, UIMainView } from "../../view/uis/UIMainView";

export class UIMainMediator extends MediatorBase<UIMainView, IUIMainData> {

	override onAwake() {
		this.addEvent(EUIMainMsg.OnBtnObserverClick, this.onBtnObserverClick);
	}

	private onBtnObserverClick() {
		// this.openView(EViewID.UIObserverView, null, EViewOpenType.Hide);
		this.openView<IUIVideoData>(EViewID.UIVideoView, { skinId: 400305 });
	}
}