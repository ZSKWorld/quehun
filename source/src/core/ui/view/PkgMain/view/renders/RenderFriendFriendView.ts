import RenderFriendFriend from "../../../../ui/PkgMain/RenderFriendFriend";


export class RenderFriendFriendView extends ExtensionClass<IView, RenderFriendFriend>(RenderFriendFriend) implements IView {

	override onCreate() {
		const { btn_look, btn_ob, btn_delete } = this;
		btn_look.onClick(this, this.onBtnLookClick);
		btn_ob.onClick(this, this.onBtnObClick);
		btn_delete.onClick(this, this.onBtnDeleteClick);
	}

	refresh(data: ProtoObject<IFriend>) {
		const {
			txt_offlineTime, com_head, com_title, com_name, com_level4, com_level3, btn_ob
		} = this;
		const { base, state } = data;

		const playingInfo = $gameUtil.getPlayerPlayingInfo(state);
		txt_offlineTime.color = playingInfo.color;
		txt_offlineTime.text = playingInfo.text;

		const gameUUID = state?.playing?.game_uuid;
		btn_ob.touchable = !!gameUUID;
		btn_ob.grayed = !gameUUID;

		com_head.refresh(base.avatar_id, base.avatar_frame);
		com_title.refreshIcon(base.title);
		com_name.refresh(base);
		com_level4.refresh(base.level);
		com_level3.refresh(base.level3);
	}

	private onBtnLookClick() {

	}

	private onBtnObClick() {

	}

	private onBtnDeleteClick() {

	}
}
