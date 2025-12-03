import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../extention/RadioGroup";
import { EUIRankType } from "../define/MainDefine";
import { RenderRankItemView } from "../view/renders/RenderRankItemView";
import { EUIRankMsg, UIRankView } from "../view/UIRankView";

export interface IUIRankData {

}

export class UIRankMediator extends MediatorBase<UIRankView, IUIRankData> {
	private _tabGroup = new RadioGroup();
	private _leaderboard: { [key in EUIRankType]: IResLevelLeaderboard_Item[] } = {
		[EUIRankType.SiMa]: [],
		[EUIRankType.SanMa]: [],
	};
	private _accountBrief: { [key in EUIRankType]: IPlayerBaseView[] } = {
		[EUIRankType.SiMa]: [],
		[EUIRankType.SanMa]: [],
	};
	private _briefReqInfo: { [key in EUIRankType]: number } = {
		[EUIRankType.SiMa]: 0,
		[EUIRankType.SanMa]: 0,
	};
	private get selectType() { return this._tabGroup.selectIndex == 0 ? EUIRankType.SiMa : EUIRankType.SanMa; }

	override onAwake() {
		this.addEvent(EUIRankMsg.OnBtnCloseClick, this.onBtnCloseClick);
		this.addEvent(EUIRankMsg.OnListRankScroll, this.onListRankScroll);
		const { tabBtns, listRank } = this.view;
		$uiUtil.setList(listRank, true, this, this.onListLevelRender, this.onListRankItemClick);
		this._tabGroup.init(tabBtns, new Laya.Handler(this, () => {
			const { view, selectType, } = this;
			view.refreshView(selectType, this._accountBrief[selectType].length);
			view.listRank.scrollPane.percY = 0;
		}));
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
		$netMgr.requests.fetchLevelLeaderboard({ type: EUIRankType.SiMa });
		$netMgr.requests.fetchLevelLeaderboard({ type: EUIRankType.SanMa });
	}

	override onDisable() {
		const { _leaderboard, _accountBrief, _briefReqInfo } = this;
		_briefReqInfo[EUIRankType.SiMa] += _briefReqInfo[EUIRankType.SiMa] % 2 == 0 ? 2 : 1;
		_briefReqInfo[EUIRankType.SanMa] += _briefReqInfo[EUIRankType.SanMa] % 2 == 0 ? 2 : 1;
		_leaderboard[EUIRankType.SiMa].length = 0;
		_leaderboard[EUIRankType.SanMa].length = 0;
		_accountBrief[EUIRankType.SiMa].length = 0;
		_accountBrief[EUIRankType.SanMa].length = 0;
	}

	private onBtnCloseClick() {
		this.closeSelf();
	}

	private onListLevelRender(index: number, item: RenderRankItemView) {
		const type = this.selectType;
		item.refresh(index, type, this._accountBrief[type][index]);
	}

	private onListRankItemClick(index: number) {
		Logger.error("Click rank item:", index + 1);
	}

	private onListRankScroll() {
		const { contentHeight, viewHeight, posY } = this.view.listRank.scrollPane;
		if (contentHeight - posY - viewHeight <= 136) {
			this.fetchMultiAccountBrief(this.selectType);
		}
	}

	@InterestMessage(EMessageID.fetchLevelLeaderboard)
	private onFetchLevelLeaderboard(res: IResLevelLeaderboard, req: IReqLevelLeaderboard) {
		this._leaderboard[req.type] = res.items;
		this.fetchMultiAccountBrief(req.type);
	}

	private fetchMultiAccountBrief(type: EUIRankType) {
		if (this._briefReqInfo[type] % 2 != 0) return;
		this._briefReqInfo[type]++;
		const item = this._leaderboard[type];
		const info = this._accountBrief[type];
		const account_id_list: number[] = [];
		for (let i = info.length; i < item.length && i < info.length + 20; i++) {
			account_id_list.push(item[i].account_id);
		}
		if (account_id_list.length > 0) {
			$netMgr.requests.fetchMultiAccountBrief({ account_id_list, type, reqId: this._briefReqInfo[type] } as any);
		}
	}

	@InterestMessage(EMessageID.fetchMultiAccountBrief)
	private onFetchMultiAccountBrief(res: IResMultiAccountBrief, req: IReqMultiAccountId & { type: EUIRankType, reqId: number }) {
		if (this._briefReqInfo[req.type] != req.reqId) return;
		const { view, _accountBrief, _briefReqInfo, selectType } = this;
		_briefReqInfo[req.type]++;
		_accountBrief[req.type].push(...res.players);
		if (selectType == req.type)
			view.refreshView(selectType, _accountBrief[selectType].length)
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}