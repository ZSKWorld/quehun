import RenderFriendFriend from "../../../../ui/PkgMain/RenderFriendFriend";


export class RenderFriendFriendView extends RenderFriendFriend {

	private _friendData: ProtoObject<IFriend>;

	override onCreate() {
		const { btn_look, btn_ob, btn_delete } = this;
		btn_look.onClick(this, this.onBtnLookClick);
		btn_ob.onClick(this, this.onBtnObClick);
		btn_delete.onClick(this, this.onBtnDeleteClick);
	}

	refresh(data: ProtoObject<IFriend>) {
		this._friendData = data;
		const {
			txt_offlineTime, com_head, com_title, label_name, com_level4, com_level3, btn_ob
		} = this;
		const { base, state } = data;

		const playingInfo = $gameUtil.getPlayerPlayingInfo(state);
		txt_offlineTime.color = playingInfo.color;
		txt_offlineTime.text = playingInfo.text;

		const gameUUID = state?.playing?.game_uuid;
		btn_ob.enabled = !!gameUUID;

		com_head.refresh(base.avatar_id, base.avatar_frame);
		com_title.refreshIcon(base.title);
		label_name.refresh(base);
		com_level4.refresh(base.level);
		com_level3.refresh(base.level3);
	}

	override onDisable() {
		this._friendData = null;
	}

	private onBtnLookClick() {
		const data = this._friendData;
		if (!data) return;
	}

	private onBtnObClick() {
		const data = this._friendData;
		if (!data) return;
	}

	private onBtnDeleteClick() {
		const data = this._friendData;
		if (!data) return;
		$confirmSma(3, $lang(2073, data.base.nickname)).then(v => {
			v && $netMgr.requests.removeFriend({ target_id: data.base.account_id });
		});
	}
}
