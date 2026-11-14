import { MediatorBase } from "../../../../../mvc/view/MediatorBase";
import { EUIObserverMsg, UIObserverView } from "../../view/uis/UIObserverView";

interface IObInfo {
	id: number;
	name0: string;
	name1: string;
	siMa: boolean;
}

interface IFetchLive extends IReqGameLiveList {
	fetchId: number;
}

export class UIObserverMediator extends MediatorBase<UIObserverView, IUIObserverData> {
	private _infos: IObInfo[][];
	private _modelIndex = 0;
	private _typeIndex = 0;
	private _onlyFriend = false;
	private _fetchId = 0;
	private _datas: IGameLiveHead[] = [];

	override onAwake() {
		this.addEvent(EUIObserverMsg.OnBtnOnlyFriendClick, this.onBtnOnlyFriendClick);
		this.addEvent(EUIObserverMsg.OnBtnRefreshClick, this.fetchGameLiveList);
		this.addEvent(EUIObserverMsg.OnObListItemClick, this.onObListItemClick);
		this.addEvent(EUIObserverMsg.OnCmbModelSelectedChanged, this.onCmbModelSelectedChanged);
		this.addEvent(EUIObserverMsg.OnCmbTypeSelectedChanged, this.onCmbTypeSelectedChanged);

		const datas: IObInfo[] = [];
		$cfgMgr.game_live.select_filters.forEach(v => {
			if (!v.open) return;
			const matchModeCfg = $cfgMgr.desktop.matchmode[v.mode_id];
			datas.push({
				id: v.id,
				name0: v.langField(ECfgLangField.name1),
				name1: v.langField(ECfgLangField.name2),
				siMa: !matchModeCfg || matchModeCfg.mode < 10,
			});
		});

		const infos = Object.values(Object.groupBy(datas, v => v.name0));
		infos.forEach(v => v.sort((a, b) => $cfgMgr.game_live.select_filters[a.id].mode_id - $cfgMgr.game_live.select_filters[b.id].mode_id));
		this._infos = infos;

		const modelItems = infos.map(v => v[0].name0);
		this.view.initCmbModel(modelItems, modelItems, this._modelIndex);
		const typeItems = infos[this._modelIndex].map(v => v.name1);
		this.view.initCmbType(typeItems, typeItems, this._typeIndex);
	}

	override onEnable() {
		this.fetchGameLiveList();
	}

	private onBtnOnlyFriendClick(onlyFriend: boolean) {
		this._onlyFriend = onlyFriend;
		this.fetchGameLiveList();
	}

	private onCmbModelSelectedChanged(index: number) {
		const { _infos, _modelIndex, _typeIndex } = this;
		// const lastName1 = _infos[_modelIndex][_typeIndex].name1;

		this._modelIndex = index;

		// const typeItems = _infos[index].map(v => v.name1);
		// const typeIndex = typeItems.indexOf(lastName1);
		// this._typeIndex = typeIndex == -1 ? 0 : typeIndex;
		// this.view.initCmbType(typeItems, typeItems, this._typeIndex);
		this.fetchGameLiveList();
	}

	private onCmbTypeSelectedChanged(index: number) {
		this._typeIndex = index;
		this.fetchGameLiveList();
	}

	private fetchGameLiveList() {
		const req: IFetchLive = {
			filter_id: this._infos[this._modelIndex][this._typeIndex].id,
			fetchId: ++this._fetchId,
		};
		$netMgr.requests.fetchGameLiveList(req);
	}

	@InjectNetEvent(ENetMessage.fetchGameLiveList)
	private onFetchGameLiveList(res: IResGameLiveList, req: IFetchLive) {
		if (req.fetchId != this._fetchId) return;
		const { _datas } = this;
		_datas.clear();

		const accoundId = $user.account.accountId;

		res.live_list.forEach(v => {
			let isSameZone = true;
			if ($gameMgr.clientType == EClientType.CHS) {
				isSameZone = v.players.every(pv => $gameUtil.isSameZone(pv.account_id, accoundId));
			}
			if (isSameZone)
				_datas.push(v);
		});
		this.refreshList();
	}

	private refreshList() {
		const { _onlyFriend, _infos, _modelIndex, _typeIndex, _datas, view } = this;
		const { name0, name1, siMa } = _infos[_modelIndex][_typeIndex];
		const data = _onlyFriend ? _datas.filter(v => v.players.some(pv => $user.friend.isFriend(pv.account_id))) : _datas;

		view.setListData(data, name0 + "·" + name1, siMa);
	}

	private onObListItemClick(data: IGameLiveHead, playerIndex:number) {
		$logger.error(playerIndex, data);
	}
}