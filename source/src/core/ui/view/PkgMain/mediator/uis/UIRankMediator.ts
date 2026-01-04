import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { EUIRankType } from "../../define/MainDefine";
import { RenderRankItemView } from "../../view/renders/RenderRankItemView";
import { EUIRankMsg, UIRankView } from "../../view/uis/UIRankView";

/** 排行榜单项数据状态 */
class RankTypeState {
	leaderboard: IResLevelLeaderboard_Item[] = [];
	briefs: IPlayerBaseView[] = [];
	isLoading: boolean = false;
	lastReqId: number = 0;
	isAllLoaded: boolean = false;

	reset() {
		this.leaderboard.length = 0;
		this.briefs.length = 0;
		this.isLoading = false;
		this.lastReqId++;
		this.isAllLoaded = false;
	}
}

const Page_Size = 20; // 每页请求数量
const Scroll_Threshold = 150; // 触底检查阈值

export class UIRankMediator extends MediatorBase<UIRankView, any> {
	private _tabGroup = new RadioGroup();

	// 使用 Record 管理不同类型的状态
	private _states: Record<EUIRankType, RankTypeState> = {
		[EUIRankType.SiMa]: new RankTypeState(),
		[EUIRankType.SanMa]: new RankTypeState(),
	};

	private get selectType(): EUIRankType {
		return this._tabGroup.selectIndex === 0 ? EUIRankType.SiMa : EUIRankType.SanMa;
	}

	override onAwake() {
		this.addEvent(EUIRankMsg.OnBtnCloseClick, this.closeSelf);
		this.addEvent(EUIRankMsg.OnListRankScroll, this.onListRankScroll);

		const { tabBtns, listRank } = this.view;
		$uiUtil.setList(listRank, true, this, this.onListLevelRender, this.onListRankItemClick);

		this._tabGroup.init(tabBtns, new Laya.Handler(this, () => {
			this.refreshCurrentView();
			this.view.listRank.scrollPane.percY = 0;
		}));
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
	}

	private onListLevelRender(index: number, item: RenderRankItemView) {
		const state = this._states[this.selectType];
		item.refresh(index, this.selectType, state.briefs[index]);
	}

	private onListRankItemClick(_, e: any, index: number) {
		Logger.error("Click rank item:", index + 1);
	}

	private onListRankScroll() {
		const { contentHeight, viewHeight, posY } = this.view.listRank.scrollPane;
		// 触底检测：当前位置 + 视口高度 >= 内容高度 - 阈值
		if (contentHeight - posY - viewHeight <= Scroll_Threshold) {
			this.fetchBriefBatch(this.selectType);
		}
	}

	@InterestMessage(EMessageID.fetchLevelLeaderboard)
	private onFetchLevelLeaderboard(res: IResLevelLeaderboard, req: IReqLevelLeaderboard) {
		const state = this._states[req.type];
		state.leaderboard = res.items;
		this.fetchBriefBatch(req.type);
	}

	/** 请求玩家详细信息（分段） */
	private fetchBriefBatch(type: EUIRankType) {
		const state = this._states[type];

		// 如果正在加载、已全部加载完毕或基础数据为空，则返回
		if (state.isLoading || state.isAllLoaded || state.leaderboard.length === 0) return;

		const currentCount = state.briefs.length;
		const totalCount = state.leaderboard.length;

		if (currentCount >= totalCount) {
			state.isAllLoaded = true;
			return;
		}

		// 截取下一批需要请求的 ID
		const nextBatchIds = state.leaderboard
			.slice(currentCount, currentCount + Page_Size)
			.map(item => item.account_id);

		if (nextBatchIds.length > 0) {
			state.isLoading = true;
			state.lastReqId++;
			$netMgr.requests.fetchMultiAccountBrief({
				account_id_list: nextBatchIds,
				type: type,
				reqId: state.lastReqId // 透传 reqId 用于回调校验
			} as any);
		}
	}

	@InterestMessage(EMessageID.fetchMultiAccountBrief)
	private onFetchMultiAccountBrief(res: IResMultiAccountBrief, req: IReqMultiAccountId & { type: EUIRankType, reqId: number }) {
		const state = this._states[req.type];

		// 校验请求 ID，防止过期回调覆盖
		if (!state || state.lastReqId !== req.reqId) return;

		state.isLoading = false;
		state.briefs.push(...(res.players || []));

		// 如果返回数量少于请求数量，说明后端也没数据了
		if (!res.players || res.players.length < Page_Size) {
			state.isAllLoaded = true;
		}

		// 仅当当前选中的 Tab 是该类型时才刷新 UI
		if (this.selectType === req.type) {
			this.refreshCurrentView();
		}
	}

	private refreshCurrentView() {
		const type = this.selectType;
		this.view.refreshView(type, this._states[type].briefs.length);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}