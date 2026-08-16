import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { PlayerViewLoader } from "../../../../extention/PlayerViewLoader";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { EUIRankType } from "../../Definition";
import { RenderRankItemView } from "../../view/renders/RenderRankItemView";
import { UIRankView } from "../../view/uis/UIRankView";

const Scroll_Threshold = 150; // 触底检查阈值

export class UIRankMediator extends MediatorBase<UIRankView, IUIRankData> {
	private _tabGroup = new RadioGroup();

	// 使用 Record 管理不同类型的状态
	private _states: KeyMap<PlayerViewLoader<IResLevelLeaderboard_Item>> = {
		[EUIRankType.SiMa]: new PlayerViewLoader(new Laya.Handler(this, this.refreshCurrentView)),
		[EUIRankType.SanMa]: new PlayerViewLoader(new Laya.Handler(this, this.refreshCurrentView)),
	};

	private get selectType() {
		return this._tabGroup.selectIndex === 0 ? EUIRankType.SiMa : EUIRankType.SanMa;
	}

	override onAwake() {
		const { tabBtns, listRank } = this.view;
		listRank.on(fgui.Events.SCROLL, this, this.onListRankScroll);
		$uiUtil.setList(listRank, true, this, this.onListRankRender, this.onListRankItemClick);

		this._tabGroup.init(tabBtns, this, () => {
			this.refreshCurrentView();
			this.view.listRank.scrollPane.percY = 0;
		});
	}

	override onEnable() {
		this._tabGroup.selectIndex = 0;
		$netMgr.requests.fetchLevelLeaderboard({ type: EUIRankType.SiMa });
		$netMgr.requests.fetchLevelLeaderboard({ type: EUIRankType.SanMa });
	}

	override onDisable() {
		for (const key in this._states) {
			this._states[key as unknown as EUIRankType].reset();
		}
		this._tabGroup.clearSelection();
	}

	private onListRankRender(index: number, item: RenderRankItemView) {
		const state = this._states[this.selectType];
		item.refresh(index, this.selectType, state.briefs[index]);
	}

	private onListRankItemClick(_, e: any, index: number) {
		$logger.error("Click rank item:", index + 1);
	}

	private onListRankScroll() {
		const { contentHeight, viewHeight, posY } = this.view.listRank.scrollPane;
		// 触底检测：当前位置 + 视口高度 >= 内容高度 - 阈值
		if (contentHeight - posY - viewHeight <= Scroll_Threshold) {
			this._states[this.selectType].loadNext();
		}
	}

	@InjectNetEvent(ENetMessage.fetchLevelLeaderboard)
	private onFetchLevelLeaderboard(res: IResLevelLeaderboard, req: IReqLevelLeaderboard) {
		const state = this._states[req.type];
		state.intro = res.items;
		state.loadNext();
	}

	private refreshCurrentView() {
		const type = this.selectType;
		this.view.refreshView(type, this._states[type].briefs.length);
	}
}