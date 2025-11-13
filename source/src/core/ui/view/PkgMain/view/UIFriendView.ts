import UIFriend from "../../../ui/PkgMain/UIFriend";

export const enum EUIFriendMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIFriendView extends ExtensionClass<IView, UIFriend>(UIFriend) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.btn_back.onClick(this, this.sendEvent, [EUIFriendMsg.OnComBackClick]);
	}

}
