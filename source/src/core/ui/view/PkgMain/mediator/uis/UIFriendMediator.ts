import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUserEvent } from "../../../../../userData/UserDefine";
import { PlayerInfoIncrementLoader } from "../../../../extention/PlayerInfoIncrementLoader";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { RenderFriendApplyView } from "../../view/renders/RenderFriendApplyView";
import { EUIFriendMsg, UIFriendView } from "../../view/uis/UIFriendView";

export interface IUIFriendData {

}

const Page_Size = 20; // 每页请求数量
const Scroll_Threshold = 150; // 触底检查阈值

export class UIFriendMediator extends MediatorBase<UIFriendView, IUIFriendData> {
	private _tabGroup = new RadioGroup();
	private _applyPlayerLoader = new PlayerInfoIncrementLoader<IResFriendApplyList_FriendApply>(new Laya.Handler(this, () => {
		const brifesLen = this._applyPlayerLoader.briefs.length;
		this.view.refreshApply(brifesLen);
	}));
	private _searchPlayerLoader = new PlayerInfoIncrementLoader(new Laya.Handler(this, () => {
		this.view.refreshSearch(true, this._searchPlayerLoader.briefs[0]);
	}), 1);

	override onAwake() {
		this.addEvent(EUIFriendMsg.OnComBackClick, this.onComBackClick);
		this.addEvent(EUIFriendMsg.OnBtnCopyClick, this.onBtnCopyClick);
		this.addEvent(EUIFriendMsg.OnBtnFindClick, this.onBtnFindClick);
		this.view.listApply.on(fgui.Events.SCROLL, this, this.onListApplyScroll);
		$uiUtil.setList(this.view.listApply, true, this, this.onListApplyRender);
		this._tabGroup.init(this.view.tabBtns, this, this.onTabChanged);
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
	}

	override onDisable() {
		this._applyPlayerLoader.reset();
	}

	private onTabChanged(index?: number) {
		index == null && (index = this._tabGroup.selectIndex);
		switch (index) {
			case 0: this.view.refreshFriends(); break;
			case 1:
				this._applyPlayerLoader.intro = [...$userData.friend.applies];
				this._applyPlayerLoader.loadNext();
				const brifesLen = this._applyPlayerLoader.briefs.length;
				this.view.refreshApply(brifesLen);
				break;
			case 2: this.view.refreshSearch(false); break;
			case 3: this.view.refreshRecent(); break;
		}
	}

	private onComBackClick() {
		this.closeSelf();
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

	private onListApplyRender(index: number, item: RenderFriendApplyView) {
		const { intro, briefs } = this._applyPlayerLoader;
		item.refresh(intro[index].apply_time, briefs[index]);
	}

	private onListApplyScroll() {
		const { contentHeight, viewHeight, posY } = this.view.listApply.scrollPane;
		// 触底检测：当前位置 + 视口高度 >= 内容高度 - 阈值
		if (contentHeight - posY - viewHeight <= Scroll_Threshold) {
			this._applyPlayerLoader.loadNext();
		}
	}

	@InterestMessage(EMessageID.searchAccountByEid)
	private onSearchAccountByEid(res: IResSearchAccountbyEidLobby) {
		const accoundId = res.account_id;
		if (!accoundId || accoundId == $userData.account.account_id)
			return this.view.refreshSearch(true, null);
		this._searchPlayerLoader.intro = [{ account_id: accoundId }];
		this._searchPlayerLoader.loadNext();
	}

	@InterestNotify(EUserEvent.OnFriendsChanged, false, [0])
	@InterestNotify(EUserEvent.OnFriendMaxCountChanged, false, [0])
	@InterestNotify(EUserEvent.OnFriendApplyChanged, false, [1])
	private onFriendChanged(index: number) {
		if (index != this._tabGroup.selectIndex) return;
		this.onTabChanged();
	}
}