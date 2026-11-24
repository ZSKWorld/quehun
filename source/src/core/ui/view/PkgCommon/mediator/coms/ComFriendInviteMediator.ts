import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { ComFriendInviteView, EComFriendInviteMsg } from "../../view/coms/ComFriendInviteView";

const enum EAnswerState {
	None,
	Banned,
	Cancel,
	Join,
}

export class ComFriendInviteMediator extends MediatorBase<ComFriendInviteView, { info: DO.IInviteInfo, sender: IPlayerBaseView; }> {
	private _state = EAnswerState.None;
	private _lastSec = 0;

	override onAwake() {
		this.addEvent(EComFriendInviteMsg.OnBtnBannedClick, this.onBtnBannedClick);
		this.addEvent(EComFriendInviteMsg.OnBtnCancelClick, this.onBtnCancelClick);
		this.addEvent(EComFriendInviteMsg.OnBtnJoinClick, this.onBtnJoinClick);
	}

	override onEnable() {
		this._lastSec = 3 * 60;
		this.view.touchable = true;
		this._state = EAnswerState.None;
		this.view.setXY((Laya.stage.width - this.view.width) / 2, -this.view.height);
		fgui.GTween.kill(this.view);
		this.view.tweenMoveY(0, 0.1);
		this.refreshLastTime();
		Laya.timer.loop(1000, this, this.refreshLastTime);
		this.view.refresh(this.data.info, this.data.sender);
	}

	private refreshLastTime() {
		this.view.refreshTime(this._lastSec);
		if (this._lastSec-- < 0) this.close();
	}

	protected override _onDisable() {
		if (this._state == EAnswerState.None)
			this._state = EAnswerState.Cancel;
		const accoundId = this.data.info.account_id;
		switch (this._state) {
			case EAnswerState.Banned: $user.friend.room.bannedInvite(accoundId); break;
			case EAnswerState.Cancel: $user.friend.room.cancelInvite(accoundId); break;
			case EAnswerState.Join: $user.friend.room.joinInvite(accoundId); break;
		}
	}

	private onBtnBannedClick() {
		this._state = EAnswerState.Banned;
		this.close();
	}

	private onBtnCancelClick() {
		this._state = EAnswerState.Cancel;
		this.close();
	}

	private onBtnJoinClick() {
		this._state = EAnswerState.Join;
		this.close();
	}

	override onDisable() {
		Laya.Pool.recover(EUIPoolKey.FriendInvite, this);
	}

	private close() {
		Laya.timer.clearAll(this);
		fgui.GTween.kill(this.view);
		this.view.touchable = false;
		this.view.tweenMoveY(-this.view.height, 0.1).onComplete(() => {
			this.view.removeFromParent();
		});
	}
}