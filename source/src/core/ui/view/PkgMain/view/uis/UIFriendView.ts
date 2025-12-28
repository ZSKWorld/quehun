import UIFriend from "../../../../ui/PkgMain/UIFriend";

export const enum EUIFriendMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIFriendView extends ExtensionClass<IView, UIFriend>(UIFriend) implements IView {
	get tabBtns() {
		return [this.btn_friendList, this.btn_friendApply, this.btn_searchFriend, this.btn_recentMatch];
	}

	override onCreate() {
		const { com_back, btn_friendList, btn_friendApply, btn_searchFriend, btn_recentMatch } = this;
		btn_friendList.mode = btn_friendApply.mode = btn_searchFriend.mode = btn_recentMatch.mode = fgui.ButtonMode.Radio;
		com_back.onBackClick(this, this.sendEvent, [EUIFriendMsg.OnComBackClick]);
	}

	refreshPage(index: number) {
		this.ctrl_type.selectedIndex = index;
	}

	onOpenAni() {
		return this.com_back.mediator.onOpenAni();
	}

	onCloseAni() {
		return this.com_back.mediator.onCloseAni();
	}
}
