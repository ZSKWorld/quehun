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

	refresh(applyTime: number, data: ProtoObject<IPlayerBaseView>) {
		const {
			txt_offlineTime, com_head, com_title, com_name, com_level4, com_level3
		} = this;

		txt_offlineTime.text = $timeUtil.timeFormat5(applyTime);

		com_head.refresh(data.avatar_id, data.avatar_frame);
		com_title.refreshIcon(data.title);
		com_name.refresh(data);
		com_level4.refresh(data.level);
		com_level3.refresh(data.level3);
	}
}
