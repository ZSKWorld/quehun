import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { EUIFriendMsg, UIFriendView } from "../view/UIFriendView";

export interface IUIFriendData {

}

export class UIFriendMediator extends MediatorBase<UIFriendView, IUIFriendData> {

	override onAwake() {
		this.addEvent(EUIFriendMsg.OnComBackClick, this.onComBackClick);
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