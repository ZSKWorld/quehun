import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIFriendRoomMsg, UIFriendRoomView } from "../../view/uis/UIFriendRoomView";

export interface IUIFriendRoomData {

}

export class UIFriendRoomMediator extends MediatorBase<UIFriendRoomView, IUIFriendRoomData> {

	private _duringLeave = false;

	override onAwake() {
		this.addEvent(EUIFriendRoomMsg.OnComBackClick, this.onComBackClick);
		this.addEvent(EUIFriendRoomMsg.OnBtnShareClick, this.onBtnShareClick);
		this.addEvent(EUIFriendRoomMsg.OnBtnRuleClick, this.onBtnRuleClick);
		this.addEvent(EUIFriendRoomMsg.OnBtnDecoClick, this.onBtnDecoClick);
		this.addEvent(EUIFriendRoomMsg.OnBtnStartClick, this.onBtnStartClick);
		this.addEvent(EUIFriendRoomMsg.OnBtnCancelClick, this.onBtnCancelClick);
		this.addEvent(EUIFriendRoomMsg.OnBtnReadyClick, this.onBtnReadyClick);
	}

	@InjectNetEvent(ENetNotify.NotifyRoomPlayerReady)
	@InjectNetEvent(ENetNotify.NotifyRoomPlayerUpdate)
	override onEnable() {
		this.view.refresh($user.friend.room.room);
	}

	private onComBackClick() {
		if ($user.friend.room.inRoom) {
			if (this._duringLeave) return;
			this._duringLeave = true;
			$netMgr.requests.leaveRoom().then(res => {
				this._duringLeave = false;
				if (res.error) return;
				this.closeSelf();
			});
		} else
			this.closeSelf();
	}

	private onBtnShareClick() {

	}

	private onBtnDecoClick() {

	}

	private onBtnStartClick() {

	}

	private onBtnRuleClick() {
		let ruleId = 0;
		const preRule = $user.friend.room.room.pre_rule;
		if (preRule == "liqi") {
			ruleId = $cfgMgr.desktop.friend_room[$user.friend.room.room.mode.mode < 10 ? 1 : 2].id;
		} else {
			const cfgMode = $user.friend.room.getOpenModes.find(v => v.pre_rule == preRule);
			if (!cfgMode) return;
			ruleId = cfgMode.id;
		}
		this.openView<IUIRoomRuleData>(EViewID.UIRoomRuleView, { targetId: ruleId });
	}

	private onBtnCancelClick() {
		$netMgr.requests.readyPlay({ ready: false });
	}

	private onBtnReadyClick() {
		$netMgr.requests.readyPlay({ ready: true });
	}

	@InjectNetEvent(ENetNotify.NotifyRoomKickOut)
	private onNotifyRoomKickOut() {
		this.closeSelf().then(() => $confirmSma(2, $lang(52)));
	}
}