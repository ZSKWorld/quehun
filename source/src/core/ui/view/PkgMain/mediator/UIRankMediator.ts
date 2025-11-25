import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../extention/RadioGroup";
import { EUIRankType } from "../define/MainDefine";
import { ComRankItemView } from "../view/coms/ComRankItemView";
import { EUIRankMsg, UIRankView } from "../view/UIRankView";

export interface IUIRankData {

}

export class UIRankMediator extends MediatorBase<UIRankView, IUIRankData> {
	private _tabRadioGroup = new RadioGroup();
	private _leaderboard: { [key in EUIRankType]: IResLevelLeaderboard_Item[] } = {
		[EUIRankType.SiMa]: [],
		[EUIRankType.SanMa]: []
	};
	private _accountBrief: { [key in EUIRankType]: IPlayerBaseView[] } = {
		[EUIRankType.SiMa]: [],
		[EUIRankType.SanMa]: []
	};
	private _briefReqInfo: { [key in EUIRankType]: number } = {
		[EUIRankType.SiMa]: 0,
		[EUIRankType.SanMa]: 0
	};
	private get selectType() { return this._tabRadioGroup.selectIndex == 0 ? EUIRankType.SiMa : EUIRankType.SanMa; }

	override onAwake() {
		this.addEvent(EUIRankMsg.OnBtnCloseClick, this.onBtnCloseClick);
		this.addEvent(EUIRankMsg.OnListLevelScroll, this.onListLevelScroll);
		const { btn_siMa, btn_sanMa, list_level } = this.view;
		$uiUtil.setList(list_level, true, this, this.onListLevelRender, this.onListLevelItemClick);
		this._tabRadioGroup.init([btn_siMa, btn_sanMa], Laya.Handler.create(this, () => {
			const { view, selectType, } = this;
			view.refreshView(selectType, this._accountBrief[selectType]);
			view.list_level.scrollPane.percY = 0;
		}, null, false));
	}

	override onEnable() {
		const { _tabRadioGroup } = this;
		_tabRadioGroup.selectIndex = 0;
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

	private onListLevelRender(index: number, item: ComRankItemView) {
		const type = this.selectType;
		item.refresh(index, type, this._accountBrief[type][index]);
	}

	private onListLevelItemClick(item: ComRankItemView) {
		const list_level = this.view.list_level;
		const index = list_level.childIndexToItemIndex(list_level.getChildIndex(item));
		Logger.error("Click rank item:", index + 1);
	}

	private onListLevelScroll() {
		const { contentHeight, viewHeight, posY } = this.view.list_level.scrollPane;
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
			view.refreshView(selectType, _accountBrief[selectType])
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}