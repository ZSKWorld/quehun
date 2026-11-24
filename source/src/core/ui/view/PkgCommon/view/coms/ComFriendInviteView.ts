import ComFriendInvite from "../../../../ui/PkgCommon/ComFriendInvite";

export const enum EComFriendInviteMsg {
	OnBtnBannedClick = "ComFriendInvite_OnBtnBannedClick",
	OnBtnCancelClick = "ComFriendInvite_OnBtnCancelClick",
	OnBtnJoinClick = "ComFriendInvite_OnBtnJoinClick",
}

export class ComFriendInviteView extends ComFriendInvite {

	override onCreate() {
		const { btn_banned, btn_cancel, btn_join } = this;
		btn_banned.onClick(this, this.event, [EComFriendInviteMsg.OnBtnBannedClick]);
		btn_cancel.onClick(this, this.event, [EComFriendInviteMsg.OnBtnCancelClick]);
		btn_join.onClick(this, this.event, [EComFriendInviteMsg.OnBtnJoinClick]);
	}

	refresh(info: DO.IInviteInfo, sender: IPlayerBaseView) {
		this.txt_name.text = $uiUtil.getHidedName({ account_id: info.account_id, nickname: info.nickname, verified: sender.verified });
		this.txt_roomInfo.text = `${ $uiUtil.getRoomModeDesc(info.mode.mode) }:${ info.room_id }`;
	}

	refreshTime(lastSec: number) {
		this.txt_time.text = $timeUtil.timeFormat3(lastSec) + "后自动消失";
	}
}
