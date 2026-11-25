import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIJoinRoomMsg, UIJoinRoomView } from "../../view/uis/UIJoinRoomView";

export interface IUIJoinRoomData {

}

export class UIJoinRoomMediator extends MediatorBase<UIJoinRoomView, IUIJoinRoomData> {

	override onAwake() {
		this.addEvent(EUIJoinRoomMsg.OnBtnConfirmClick, this.onBtnConfirmClick);
	}

	private onBtnConfirmClick() {
		const roomId = this.view.inputRoomId;
		$user.friend.room.joinRoom(roomId || 0);
	}

}