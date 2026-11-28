import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUICreateRoomMsg, UICreateRoomView } from "../../view/uis/UICreateRoomView";

export interface IUICreateRoomData {

}

export class UICreateRoomMediator extends MediatorBase<UICreateRoomView, IUICreateRoomData> {
	private _lockReq = false;

	override onAwake() {
		this.addEvent(EUICreateRoomMsg.OnBtnCreateClick, this.onBtnCreateClick);
	}

	private onBtnCreateClick() {
		if (this._lockReq) return;
		this._lockReq = true;
		$netMgr.requests.createRoom(this.view.createData).then(res => {
			this._lockReq = false;
			if (res.error) return;
			this.openView(EViewID.UIFriendRoomView, null, EViewOpenType.Close);
		});
	}
}