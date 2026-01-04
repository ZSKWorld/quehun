import UIFriend from "../../../../ui/PkgMain/UIFriend";
import { RenderFriendApplyView } from "../renders/RenderFriendApplyView";
import { RenderFriendFriendView } from "../renders/RenderFriendFriendView";

export const enum EUIFriendMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
}

export class UIFriendView extends ExtensionClass<IView, UIFriend>(UIFriend) implements IView {
	get tabBtns() {
		return [this.btn_friendList, this.btn_friendApply, this.btn_searchFriend, this.btn_recentMatch];
	}
	
	get listApply() { return this.list_apply; }

	override onCreate() {
		const {
			com_back, btn_friendList, btn_friendApply, btn_searchFriend, btn_recentMatch,
			list_friend, list_apply
		} = this;
		btn_friendList.mode = btn_friendApply.mode = btn_searchFriend.mode = btn_recentMatch.mode = fgui.ButtonMode.Radio;
		com_back.onBackClick(this, this.sendEvent, [EUIFriendMsg.OnComBackClick]);
		$uiUtil.setList(list_friend, true, this, this.onListFriendRender);
	}

	refreshView() {
		const { account, friend } = $userData;
		const { txt_myID, txt_limit } = this;
		txt_myID.text = $lang(2459) + $gameUtil.encodeAccountId(account.account_id);
		txt_limit.text = $lang(2455) + friend.friends.length + "/" + friend.friendMaxCount;
	}

	refreshPage(index: number) {
		const { ctrl_type, txt_empty } = this;
		txt_empty.visible = false;
		switch (index) {
			case 0:
				const friendCount = $userData.friend.friends.length;
				this.list_friend.numItems = friendCount;
				txt_empty.visible = friendCount <= 0;
				txt_empty.visible && (txt_empty.langText(2454));
				break;
			case 1:
				const applyCount = $userData.friend.applies.length;
				this.list_apply.numItems = applyCount;
				txt_empty.visible = applyCount <= 0;
				txt_empty.visible && (txt_empty.langText(2458));
				break;
			case 2: break;
			case 3: break;
		}
		ctrl_type.selectedIndex = index;
	}

	onOpenAni() {
		$uiUtil.playTrans(this.trans_show, false);
		return this.com_back.mediator.onOpenAni();
	}

	onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.mediator.onCloseAni();
	}

	private onListFriendRender(index: number, item: RenderFriendFriendView) {
		item.refresh($userData.friend.friends[index]);
	}
}
