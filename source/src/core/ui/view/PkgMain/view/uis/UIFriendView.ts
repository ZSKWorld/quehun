import UIFriend from "../../../../ui/PkgMain/UIFriend";
import { RenderFriendFriendView } from "../renders/RenderFriendFriendView";

export const enum EUIFriendMsg {
	OnComBackClick = "EUILiaoSheMsg_OnComBackClick",
	OnBtnCopyClick = "EUILiaoSheMsg_OnBtnCopyClick",
	OnBtnFindClick = "EUILiaoSheMsg_OnBtnFindClick",
}

export class UIFriendView extends ExtendClass<IView, UIFriend>(UIFriend) implements IView {
	get tabBtns() {
		return [this.btn_friendList, this.btn_friendApply, this.btn_searchFriend, this.btn_recentMatch];
	}

	get listApply() { return this.list_apply; }
	get listRecent() { return this.list_recent; }
	get findAccountId() { return +this.itxt_searchId.text; }

	override onCreate() {
		const {
			com_back, txt_myID, btn_friendList, btn_friendApply, btn_searchFriend, btn_recentMatch,
			list_friend, btn_copy, btn_find
		} = this;
		com_back.onBackClick(this, this.closeSelf);
		btn_copy.onClick(this, this.sendEvent, [EUIFriendMsg.OnBtnCopyClick]);
		btn_find.onClick(this, this.sendEvent, [EUIFriendMsg.OnBtnFindClick]);
		$uiUtil.setList(list_friend, true, this, this.onListFriendRender);

		txt_myID.text = $gameUtil.encodeAccountId($user.account.accountId).toString();
	}

	refreshFriends() {
		const { friends, friendMaxCount } = $user.friend;
		const { ctrl_type, txt_limit, list_friend, txt_empty } = this;
		txt_limit.text = $lang(2455) + friends.length + "/" + friendMaxCount;
		list_friend.scrollPane.percY = 0;
		list_friend.numItems = friends.length;
		txt_empty.visible = friends.length <= 0;
		txt_empty.visible && txt_empty.langText(2454);
		ctrl_type.selectedIndex = 0;
	}

	refreshApply(loadedCount: number) {
		const { ctrl_type, list_apply, txt_empty } = this;
		list_apply.numItems = loadedCount;
		txt_empty.visible = loadedCount <= 0;
		txt_empty.visible && txt_empty.langText(2458);
		ctrl_type.selectedIndex = 1;
	}

	refreshSearch(isSearch: boolean, searchPlayer?: IPlayerBaseView) {
		const { ctrl_type, com_searchPlayer, txt_empty } = this;
		com_searchPlayer.visible = !!(isSearch && searchPlayer);
		com_searchPlayer.visible && com_searchPlayer.refresh(searchPlayer);
		txt_empty.visible = isSearch && !searchPlayer;
		txt_empty.visible && txt_empty.langText(3679);
		ctrl_type.selectedIndex = 2;
	}

	refreshRecent(loading: boolean, loadedCount: number) {
		const { ctrl_type, list_recent, txt_empty } = this;
		list_recent.numItems = loadedCount;
		txt_empty.visible = !loading && loadedCount <= 0;
		txt_empty.visible && txt_empty.langText(3747);
		ctrl_type.selectedIndex = 3;
	}

	override onOpenAni() {
		$uiUtil.playTrans(this.trans_show, false);
		return this.com_back.onOpenAni();
	}

	override onCloseAni() {
		$uiUtil.playTrans(this.trans_show, true);
		return this.com_back.onCloseAni();
	}

	override onDisable() {
		const anis = [this.trans_show];
		anis.forEach(v => {
			v.playing && v.stop(true, true);
		});
	}

	private onListFriendRender(index: number, item: RenderFriendFriendView) {
		item.refresh($user.friend.friends[index]);
	}
}
