import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../extend/RadioGroup";
import { EUIRankType } from "../define/MainDefine";
import { ComRankItemView } from "../view/coms/ComRankItemView";
import { EUIRankMsg, UIRankView } from "../view/UIRankView";

export interface IUIRankData {

}

export class UIRankMediator extends MediatorBase<UIRankView, IUIRankData> {
	private _tabRadioGroup = new RadioGroup();
	private _rankItem: IResLevelLeaderboard_Item[] = [];
	private _rankInfo: IPlayerBaseView[] = [];
	private _itemReqInfo: { reqId: number, resId: number } = { reqId: 0, resId: 0 };
	private _infoReqInfo: { reqId: number, resId: number } = { reqId: 0, resId: 0 };
	private get selectType() { return this._tabRadioGroup.selectIndex == 0 ? EUIRankType.SiMa : EUIRankType.SanMa; }

	override onAwake() {
		this.addEvent(EUIRankMsg.OnBtnCloseClick, this.onBtnCloseClick);
		this.addEvent(EUIRankMsg.OnListLevelScroll, this.onListLevelScroll);
		const { btn_siMa, btn_sanMa, list_level } = this.view;
		$uiUtil.setList(list_level, true, this, this.onListLevelRender, this.onListLevelItemClick);
		this._tabRadioGroup.init([btn_siMa, btn_sanMa], Laya.Handler.create(this, this.refreshView, null, false));
	}

	override onEnable() {
		const { _tabRadioGroup, _itemReqInfo, _infoReqInfo } = this;
		_itemReqInfo.reqId = _itemReqInfo.resId = 0;
		_infoReqInfo.reqId = _infoReqInfo.resId = 0;
		_tabRadioGroup.selectIndex = 0;
		$netMgr.requests.fetchLevelLeaderboard({ type: EUIRankType.SiMa });
		// $netMgr.requests.fetchLevelLeaderboard({ type: ERankTab.SanMa });
	}

	private refreshView() {
		const { view, selectType, } = this;
		view.refreshView(selectType, this._rankInfo);
	}

	private onListLevelRender(index: number, item: ComRankItemView) {
		const type = this.selectType;
		item.refresh(index, type, this._rankInfo[type][index]);
	}

	private onListLevelItemClick(item: ComRankItemView) {

	}

	private onBtnCloseClick() {
		this.closeSelf();
	}

	private onListLevelScroll() {
		// const { contentHeight, viewHeight, posY } = this.view.list_level.scrollPane;
		// if (contentHeight - posY - viewHeight <= 136) {
		// }
		Logger.error(this.view.list_level.scrollPane.isBottomMost);
	}

	@InterestMessage(EMessageID.fetchLevelLeaderboard)
	private onFetchLevelLeaderboard(res: IResLevelLeaderboard, req: IReqLevelLeaderboard) {
		Logger.error("Leaderboard Data:", res);
		const account_id_list = res.items.map(v => v.account_id);
		$netMgr.requests.fetchMultiAccountBrief({ account_id_list });
	}

	@InterestMessage(EMessageID.fetchMultiAccountBrief)
	private onFetchMultiAccountBrief(res: IResMultiAccountBrief, req: IReqMultiAccountId) {
		Logger.error("FetchMultiAccount Data:", res);
		this._rankInfo[EUIRankType.SiMa] = res.players;
		this.refreshView();
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}