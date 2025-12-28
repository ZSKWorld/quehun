import RenderFriendFriend from "../../../../ui/PkgMain/RenderFriendFriend";

export const enum ERenderFriendFriendMsg {
	OnBtnLookClick = "RenderFriendFriend_OnBtnLookClick",
	OnBtnObClick = "RenderFriendFriend_OnBtnObClick",
	OnBtnDeleteClick = "RenderFriendFriend_OnBtnDeleteClick",
}

export class RenderFriendFriendView extends ExtensionClass<IView, RenderFriendFriend>(RenderFriendFriend) implements IView {

	override onCreate() {
		const { btn_look, btn_ob, btn_delete } = this;
		btn_look.onClick(this, this.sendEvent, [ERenderFriendFriendMsg.OnBtnLookClick]);
		btn_ob.onClick(this, this.sendEvent, [ERenderFriendFriendMsg.OnBtnObClick]);
		btn_delete.onClick(this, this.sendEvent, [ERenderFriendFriendMsg.OnBtnDeleteClick]);
	}

}
