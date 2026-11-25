import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUICreateRoomMsg, UICreateRoomView } from "../../view/uis/UICreateRoomView";

export interface IUICreateRoomData {

}

export class UICreateRoomMediator extends MediatorBase<UICreateRoomView, IUICreateRoomData> {

	override onAwake() {
		this.addEvent(EUICreateRoomMsg.OnBtnRuleClick, this.onBtnRuleClick);
		this.addEvent(EUICreateRoomMsg.OnBtnCreateClick, this.onBtnCreateClick);
	}

	private onBtnRuleClick() {

	}

	private onBtnCreateClick() {
		// $netMgr.requests.createRoom
		this.openView(EViewID.UIFriendRoomView, null, EViewOpenType.Close);
	}

}