import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { PlayerInfoIncrementLoader } from "../../../../extention/PlayerInfoIncrementLoader";
import { RadioGroup } from "../../../../extention/RadioGroup";
import { EUIRankType } from "../../define/MainDefine";
import { RenderRankItemView } from "../../view/renders/RenderRankItemView";
import { EUIRankMsg, UIRankView } from "../../view/uis/UIRankView";

const Scroll_Threshold = 150; // 触底检查阈值

export class UIRankMediator extends MediatorBase<UIRankView, any> {
	private _tabGroup = new RadioGroup();

	// 使用 Record 管理不同类型的状态
	private _states: KeyMap<PlayerInfoIncrementLoader<IResLevelLeaderboard_Item>> = {
		[EUIRankType.SiMa]: new PlayerInfoIncrementLoader(new Laya.Handler(this, this.refreshCurrentView)),
		[EUIRankType.SanMa]: new PlayerInfoIncrementLoader(new Laya.Handler(this, this.refreshCurrentView)),
	};

	private get selectType() {
		return this._tabGroup.selectIndex === 0 ? EUIRankType.SiMa : EUIRankType.SanMa;
	}

	override onAwake() {
		this.addEvent(EUIRankMsg.OnBtnCloseClick, this.closeSelf);

		const { tabBtns, listRank } = this.view;
		listRank.on(fgui.Events.SCROLL, this, this.onListRankScroll);
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
			this._states[this.selectType].loadNext();
		}
	}

	@InterestMessage(EMessageID.fetchLevelLeaderboard)
	private onFetchLevelLeaderboard(res: IResLevelLeaderboard, req: IReqLevelLeaderboard) {
		const state = this._states[req.type];
		state.intro = res.items;
		state.loadNext();
	}

	private refreshCurrentView() {
		const type = this.selectType;
		this.view.refreshView(type, this._states[type].briefs.length);
	}

	override onOpenAni() { return $uiUtil.popAlphaIn(this.view); }
	override onCloseAni() { return $uiUtil.popAlphaOut(this.view); }
}