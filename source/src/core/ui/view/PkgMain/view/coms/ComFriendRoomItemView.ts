import ComFriendRoomItem from "../../../../ui/PkgMain/ComFriendRoomItem";

export class ComFriendRoomItemView extends ComFriendRoomItem {
	private _accountId: AccountID = 0;
	position: number = 0;

	override onCreate() {
		const { btn_inviteFriend, btn_addRobot, btn_kick } = this;
		btn_inviteFriend.onClick(this, this.onBntInviteFriendClick);
		btn_addRobot.onClick(this, this.onBntAddRobotClick);
		btn_kick.onClick(this, this.onBntKickClick);
	}

	refresh(isSiMa: boolean, data: IPlayerGameView, ready: boolean, ownerId: AccountID) {

		const isOwner = ownerId == data?.account_id;
		const isSelf = data?.account_id == $user.account.accountId;
		const isOwnerSelf = ownerId == $user.account.accountId;
		const havePlayer = data != null;

		this._accountId = havePlayer ? data.account_id : 0;

		const { img_owner, loader_bg, img_ready, img_nameBg, com_level, label_name, com_title, btn_kick, btn_inviteFriend, btn_addRobot } = this;

		img_owner.visible = isOwner;
		img_ready.visible = ready;
		img_nameBg.visible = havePlayer;
		com_level.visible = havePlayer;
		label_name.visible = havePlayer;
		com_title.visible = havePlayer;

		btn_kick.visible = isOwnerSelf && !isSelf && havePlayer;
		btn_inviteFriend.visible = !havePlayer && isOwnerSelf;
		btn_addRobot.visible = !havePlayer && isOwnerSelf;

		com_level.visible && com_level.refresh(isSiMa ? data.level : data.level3);
		label_name.visible && label_name.refresh(data);
		com_title.visible && com_title.refreshIcon(data.title);

		$dynamicResMgr.setLoader(loader_bg, isSelf ? ResPath.ETexturePath.PNG_Img_4035 : ResPath.ETexturePath.PNG_Img_4032);
	}

	private onBntInviteFriendClick() {

	}

	private onBntAddRobotClick() {
		!this._accountId && $netMgr.requests.addRoomRobot({ position: this.position });
	}

	private onBntKickClick() {
		this._accountId && $netMgr.requests.roomKickPlayer({ id: this._accountId });
	}

	protected override onEnable() {
		$dynamicResMgr.setLoader(this.loader_bound, ResPath.ETexturePath.PNG_Img_4034);
	}

	protected override onDisable() {
		$dynamicResMgr.clearLoaders(this.loader_bg, this.loader_bound);
	}
}
