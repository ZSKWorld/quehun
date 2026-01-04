import RenderFriendApply from "../../../../ui/PkgMain/RenderFriendApply";

export const enum ERenderFriendApplyMsg {
	OnBtnLookClick = "RenderFriendApply_OnBtnLookClick",
	OnBtnAgreeClick = "RenderFriendApply_OnBtnAgreeClick",
	OnBtnRejectClick = "RenderFriendApply_OnBtnRejectClick",
}

export class RenderFriendApplyView extends ExtensionClass<IView, RenderFriendApply>(RenderFriendApply) implements IView {

	override onCreate() {
		const { btn_look, btn_agree, btn_reject } = this;
		btn_look.onClick(this, this.sendEvent, [ERenderFriendApplyMsg.OnBtnLookClick]);
		btn_agree.onClick(this, this.sendEvent, [ERenderFriendApplyMsg.OnBtnAgreeClick]);
		btn_reject.onClick(this, this.sendEvent, [ERenderFriendApplyMsg.OnBtnRejectClick]);
	}

	refresh(data: ProtoObject<IResFriendApplyList_FriendApply>) {
		
		const {
			txt_offlineTime, com_head, com_title, com_name, com_level4, com_level3
		} = this;
		// const { base, state } = data;

		const playingInfo = $gameUtil.getPlayerPlayingInfo(state);
		txt_offlineTime.color = playingInfo.color;
		txt_offlineTime.text = playingInfo.text;

		com_head.refresh(base.avatar_id, base.avatar_frame);
		com_title.refreshIcon(base.title);
		com_name.refresh(base);
		com_level4.refresh(base.level);
		com_level3.refresh(base.level3);
	}
}
