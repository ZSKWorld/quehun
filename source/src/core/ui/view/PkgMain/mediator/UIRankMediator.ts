import { MediatorBase } from "../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../extend/RadioGroup";
import { EUIRankType } from "../event/MainDefine";
import { ComRankItemView } from "../view/coms/ComRankItemView";
import { EUIRankMsg, UIRankView } from "../view/UIRankView";

export interface IUIRankData {

}

export class UIRankMediator extends MediatorBase<UIRankView, IUIRankData> {
	private _tabRadioGroup = new RadioGroup();
	private _rankInfo: { [key in EUIRankType]: IPlayerBaseView[] } = {
		[EUIRankType.SiMa]: [],
		[EUIRankType.SanMa]: [],
	};
	private get selectType() { return this._tabRadioGroup.selectIndex == 0 ? EUIRankType.SiMa : EUIRankType.SanMa; }

	override onAwake() {
		this.addEvent(EUIRankMsg.OnBtnCloseClick, this.onBtnCloseClick);
		const { btn_siMa, btn_sanMa, list_level } = this.view;
		this._tabRadioGroup.init([btn_siMa, btn_sanMa], Laya.Handler.create(this, this.refreshView, null, false));
		$uiUtil.setList(list_level, true, this, this.onListLevelRender, this.onListLevelItemClick);
	}

	override onEnable() {
		this._tabRadioGroup.selectIndex = 0;
		$netMgr.requests.fetchLevelLeaderboard({ type: EUIRankType.SiMa });
		// $netMgr.requests.fetchLevelLeaderboard({ type: ERankTab.SanMa });
	}

	private onBtnCloseClick() {
		this.closeSelf();
	}

	private refreshView() {
		const type = this.selectType;
		this.view.refreshView(type, this._rankInfo[type]);
	}

	private onListLevelRender(index: number, item: ComRankItemView) {
		const type = this.selectType;
		item.refresh(index, type, this._rankInfo[type][index]);
	}

	private onListLevelItemClick(item: ComRankItemView) {

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