import UIFriendRoom from "../../../../ui/PkgMain/UIFriendRoom";

export const enum EUIFriendRoomMsg {
	OnComBackClick = "UIFriendRoom_OnComBackClick",
	OnBtnShareClick = "UIFriendRoom_OnBtnShareClick",
	OnBtnDecoClick = "UIFriendRoom_OnBtnDecoClick",
	OnBtnStartClick = "UIFriendRoom_OnBtnStartClick",
	OnBtnCancelClick = "UIFriendRoom_OnBtnCancelClick",
	OnBtnReadyClick = "UIFriendRoom_OnBtnReadyClick",
	OnBtnAddRobotClick = "UIFriendRoom_OnBtnAddRobotClick",
}

export class UIFriendRoomView extends UIFriendRoom {

	override onCreate() {
		const {
			com_back, btn_share, btn_rule, btn_yizhong, btn_deco, btn_start, btn_cancel, btn_ready,
			com_player0, com_player1, com_player2, com_player3
		} = this;
		com_back.onClick(this, this.event, [EUIFriendRoomMsg.OnComBackClick]);
		btn_share.onClick(this, this.event, [EUIFriendRoomMsg.OnBtnShareClick]);
		// btn_rule.onClick(this, this.event, [EUIFriendRoomMsg.OnBtnRuleClick]);
		btn_yizhong.onClick(this, this.openView, [EViewID.UIHelpView]);
		btn_deco.onClick(this, this.event, [EUIFriendRoomMsg.OnBtnDecoClick]);
		btn_start.onClick(this, this.event, [EUIFriendRoomMsg.OnBtnStartClick]);
		btn_cancel.onClick(this, this.event, [EUIFriendRoomMsg.OnBtnCancelClick]);
		btn_ready.onClick(this, this.event, [EUIFriendRoomMsg.OnBtnReadyClick]);
		com_player0.position = 0;
		com_player1.position = 1;
		com_player2.position = 2;
		com_player3.position = 3;
	}

	refresh(room: IRoom) {
		const {
			room_id, owner_id, mode, max_player_count, persons, ready_list, is_playing,
			public_live, pre_rule, robots, positions,
		} = room;
		const players = positions.map(v => persons.find(pv => pv.account_id == v) || robots.find(rv => rv.account_id == v) || null);
		const playerAccoundIds = players.map(v => (v ? v.account_id : 0));

		const { txt_name, com_player0, com_player1, com_player2, com_player3, btn_start, btn_cancel, btn_ready } = this;

		txt_name.text = $lang(3697) + room_id;
		const isOwner = $user.account.accountId == owner_id;
		const selfReady = ready_list.includes($user.account.accountId);
		const readyAll = ready_list.length == max_player_count;

		btn_start.visible = isOwner;
		btn_start.enabled = readyAll;

		btn_cancel.visible = !isOwner && selfReady;
		btn_ready.visible = !isOwner && !selfReady;

		com_player0.refresh(players[0], ready_list.includes(playerAccoundIds[0]), owner_id);
		com_player1.refresh(players[1], ready_list.includes(playerAccoundIds[1]), owner_id);
		com_player2.refresh(players[2], ready_list.includes(playerAccoundIds[2]), owner_id);
		com_player3.visible = max_player_count > 3;
		com_player3.visible && com_player3.refresh(players[3], ready_list.includes(playerAccoundIds[3]), owner_id);
	}

	override onOpenAni() {
		this.com_back.onOpenAni();
		return $uiUtil.playTrans(this.trans_show, false);
	}

	override onCloseAni() {
		this.com_back.onCloseAni();
		return $uiUtil.playTrans(this.trans_show, true);
	}
}
