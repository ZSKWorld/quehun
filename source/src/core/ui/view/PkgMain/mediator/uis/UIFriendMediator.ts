import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
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
	private _applyPlayerLoader = new PlayerInfoIncrementLoader<IResFriendApplyList_FriendApply>(new Laya.Handler(this, this.onTabChanged));

	override onAwake() {
		this.addEvent(EUIFriendMsg.OnComBackClick, this.onComBackClick);
		this.addEvent(EUIFriendMsg.OnBtnFindClick, this.onBtnFindClick);
		this.view.listApply.on(fgui.Events.SCROLL, this, this.onListApplyScroll);
		$uiUtil.setList(this.view.listApply, true, this, this.onListApplyRender);
		this._tabGroup.init(this.view.tabBtns, this, this.onTabChanged);
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
		this._applyPlayerLoader.intro = [...$userData.friend.applies];
	}

	override onDisable() {
		this._applyPlayerLoader.reset();
	}

	private onTabChanged(index: number) {
		index == null && (index = this._tabGroup.selectIndex);
		switch (index) {
			case 0: this.view.refreshFriends(); break;
			case 1:
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

	private onBtnFindClick() {
		const accoundId = this.view.findAccountId;
		// if (!accoundId || accoundId == $userData.account.account_id) return;
		$netMgr.requests.searchAccountByEid({ eid: accoundId }).then(res => Logger.error("search", accoundId, res));
	}

	private onListApplyRender(index: number, item: RenderFriendApplyView) {
		item.refresh(this._applyPlayerLoader.intro[index].apply_time, this._applyPlayerLoader.briefs[index]);
	}

	private onListApplyScroll() {
		const { contentHeight, viewHeight, posY } = this.view.listApply.scrollPane;
		// 触底检测：当前位置 + 视口高度 >= 内容高度 - 阈值
		if (contentHeight - posY - viewHeight <= Scroll_Threshold) {
			this._applyPlayerLoader.loadNext();
		}
	}
}