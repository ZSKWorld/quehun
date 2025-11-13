import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { EUIObserverMsg, UIObserverView } from "../view/UIObserverView";

export interface IUIObserverData {

}

export class UIObserverMediator extends MediatorBase<UIObserverView, IUIObserverData> {

	override onAwake() {
		this.addEvent(EUIObserverMsg.OnComBackClick, this.onComBackClick);
	}

	private async onComBackClick() {
		this.closeSelf();
	}

	override onOpenAni() {
		return this.view.com_back.mediator.onOpenAni();
	}

	override onCloseAni() {
		return this.view.com_back.mediator.onCloseAni();
	}
}