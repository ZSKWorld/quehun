import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { PlayerViewLoader } from "../../../../tool/PlayerViewLoader";
import { RenderFriendApplyView } from "../../view/renders/RenderFriendApplyView";
import { RenderFriendRecentView } from "../../view/renders/RenderFriendRecentView";
import { EUIFriendMsg, UIFriendView } from "../../view/uis/UIFriendView";

const Scroll_Threshold = 150; // 触底检查阈值

export class UIFriendMediator extends MediatorBase<UIFriendView, IUIFriendData> {
	private _tabGroup = new RadioGroup();
	private _applyPlayerLoader = new PlayerViewLoader<IResFriendApplyList_FriendApply>(new Laya.Handler(this, () => {
		const brifesLen = this._applyPlayerLoader.briefs.length;
		this.view.refreshApply(brifesLen);
	}));
	private _searchPlayerLoader = new PlayerViewLoader(new Laya.Handler(this, () => {
		this.view.refreshSearch(true, this._searchPlayerLoader.briefs[0]);
	}), 1);

	private _loadRecent = false;
	private _recentPlayerLoader = new PlayerViewLoader(new Laya.Handler(this, this.tryToRefresh, [3]));

	override onAwake() {
		this.addEvent(EUIFriendMsg.OnBtnCopyClick, this.onBtnCopyClick);
		this.addEvent(EUIFriendMsg.OnBtnFindClick, this.onBtnFindClick);
		this.view.listApply.on(fgui.Events.SCROLL, this, this.onListApplyScroll);
		this.view.listRecent.on(fgui.Events.SCROLL, this, this.onListRecentScroll);
		$uiUtil.setList(this.view.listApply, true, this, this.onListApplyRender);
		$uiUtil.setList(this.view.listRecent, true, this, this.onListRecentRender);
		this._tabGroup.init(this.view.tabBtns, this, this.onTabChanged, "#EAB65E", "#EAB65E");
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
	}

	override onDisable() {
		this._applyPlayerLoader.reset();
		this._searchPlayerLoader.reset();
		this._recentPlayerLoader.reset();
		this._loadRecent = false;
		$userData.friend.applied.clear();
		this._tabGroup.clearSelection();
	}

	private onTabChanged(index?: number) {
		index = index ?? this._tabGroup.selectIndex;
		switch (index) {
			case 0: this.view.refreshFriends(); break;
			case 1:
				this._applyPlayerLoader.intro = [...$userData.friend.applies];
				this._applyPlayerLoader.loadNext();
				const brifesLen = this._applyPlayerLoader.briefs.length;
				this.view.refreshApply(brifesLen);
				break;
			case 2: this.view.refreshSearch(false); break;
			case 3:
				if (!this._loadRecent) {
					this._loadRecent = true;
					$netMgr.requests.fetchRecentFriend();
					this.view.refreshRecent(true, 0);
				} else {
					this.view.refreshRecent(false, this._recentPlayerLoader.briefs.length);
				}
				break;
		}
	}

	private onBtnCopyClick() {
		try {
			const eid = $gameUtil.encodeAccountId($userData.account.account_id).toString();
			navigator.clipboard.writeText(eid)
				.then(() => $tipMgr.showTip($lang(2125)));
		} catch (error) {
			Logger.error("复制失败", error);
		}
	}

	private onBtnFindClick() {
		const accoundId = this.view.findAccountId;
		this._searchPlayerLoader.reset();
		if (!accoundId) return $confirmSma(2, $lang(3108));
		this.view.refreshSearch(false);
		$netMgr.requests.searchAccountByEid({ eid: accoundId });
	}

	private onListApplyScroll() {
		const { contentHeight, viewHeight, posY } = this.view.listApply.scrollPane;
		// 触底检测：当前位置 + 视口高度 >= 内容高度 - 阈值
		if (contentHeight - posY - viewHeight <= Scroll_Threshold) {
			this._applyPlayerLoader.loadNext();
		}
	}
	private onListApplyRender(index: number, item: RenderFriendApplyView) {
		const { intro, briefs } = this._applyPlayerLoader;
		item.refresh(intro[index].apply_time, briefs[index]);
	}

	private onListRecentScroll() {
		const { contentHeight, viewHeight, posY } = this.view.listRecent.scrollPane;
		// 触底检测：当前位置 + 视口高度 >= 内容高度 - 阈值
		if (contentHeight - posY - viewHeight <= Scroll_Threshold) {
			this._recentPlayerLoader.loadNext();
		}
	}
	private onListRecentRender(index: number, item: RenderFriendRecentView) {
		const { briefs } = this._recentPlayerLoader;
		item.refresh(briefs[index]);
	}

	@InterestMessage(ENetMessage.searchAccountByEid)
	private onSearchAccountByEid(res: IResSearchAccountbyEidLobby) {
		const accoundId = res.account_id;
		if (!accoundId || accoundId == $userData.account.account_id)
			return this.view.refreshSearch(true, null);
		this._searchPlayerLoader.intro = [{ account_id: accoundId }];
		this._searchPlayerLoader.loadNext();
	}

	@InterestUserEvent(EUserEvent.OnFriendsChanged, false, [0])
	@InterestUserEvent(EUserEvent.OnFriendMaxCountChanged, false, [0])
	@InterestUserEvent(EUserEvent.OnFriendApplyChanged, false, [1])
	private tryToRefresh(index: number) {
		if (index != this._tabGroup.selectIndex) return;
		this.onTabChanged();
	}

	@InterestMessage(ENetMessage.fetchRecentFriend)
	private onFetchRecentFriend(res: IResFetchrecentFriend) {
		this._recentPlayerLoader.intro = res.account_list.map(v => ({ account_id: v }));
		this._recentPlayerLoader.loadNext();
	}
}