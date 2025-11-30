import UIFriend from "../../../ui/PkgMain/UIFriend";

export const enum EUIFriendMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIFriendView extends ExtensionClass<IView, UIFriend>(UIFriend) implements IView {

	override onCreate() {
		const { com_back } = this;
		com_back.onBackClick(this, this.sendEvent, [EUIFriendMsg.OnComBackClick]);
	}

	onOpenAni() {
		return this.com_back.mediator.onOpenAni();
	}

	onCloseAni() {
		return this.com_back.mediator.onCloseAni();
	}
}
