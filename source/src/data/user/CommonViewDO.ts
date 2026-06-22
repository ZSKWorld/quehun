import { BaseDO } from "./BaseDO";

const DefaultViewIdMap: Record<EItemCommonType, number> = {
	[EItemCommonType.LiZhiBang]: 0,
	[EItemCommonType.HuPaiEffect]: 0,
	[EItemCommonType.LiZhiEffect]: 0,
	[EItemCommonType.HandStyle]: 0,
	[EItemCommonType.LiZhiMusic]: 0,
	[EItemCommonType.HeadFrame]: 305501,
	[EItemCommonType.TableCloth]: 305044,
	[EItemCommonType.MjpBack]: 305045,
	[EItemCommonType.DaTingBeiJing]: 307001,
	[EItemCommonType.BeiJingYinYue]: 0,
	[EItemCommonType.MingPaiZhiShi]: 0,
	[EItemCommonType.TimeLimitedTitle]: 0,
	[EItemCommonType.ChaHuaLoadingTu]: 0,
	[EItemCommonType.MjpFront]: 305725,
};

export class CommonViewDO extends BaseDO implements DO.ICommonViewDO {
	private _use: number = 0;
	private _views: ProtoObject<IResAllcommonViews_Views>[] = [];
	private _usingView: ProtoObject<IResAllcommonViews_Views>;
	private _curMjpBack: number;
	private _curMjpFront: number;
	private _curTableCloth: number;
	private _curLobbyBg: number;

	get use() { return this._use; }
	get views() { return this._views; }
	get usingView() { return this._usingView; }
	get curMjpBack() { return this._curMjpBack; }
	get curMjpFront() { return this._curMjpFront; }
	get curTableCloth() { return this._curTableCloth; }
	get curLobbyBg() { return this._curLobbyBg; }

	getDefultViewId(type: EItemCommonType) {
		return DefaultViewIdMap[type] ?? 0;
	}

	@InjectNetEvent(ENetMessage.fetchAllCommonViews)
	private onFetchClientValue(res: IResAllcommonViews) {
		const decodeRes = $decodeProtoData(res);
		this._use = decodeRes.use;
		this._views = decodeRes.views;
		this.fillDefaultData();
		this.refreshCurView();
		this.dispatch(EUserEvent.OnCommonViewChanged);
	}

	@InjectNetEvent(ENetMessage.useCommonView)
	private onUseCommonView(_, req: IReqUseCommonView) {
		this._use = req.index;
		this.refreshCurView();
		this.dispatch(EUserEvent.OnCommonViewChanged);
	}

	@InjectNetEvent(ENetMessage.saveCommonViews)
	private onSaveCommonViews(_, req: IReqSaveCommonViews) {
		const view = this._views.find(v => v.index == req.save_index);
		view.values = req.views.map(v => ({
			slot: v.slot,
			item_id: v.item_id,
			type: v.type,
			item_id_list: [...v.item_id_list],
		}));
		if (req.is_use) {
			this._use = req.save_index;
			this.refreshCurView();
		}
		this.dispatch(EUserEvent.OnCommonViewChanged);
	}

	/** 填充默认数据 */
	private fillDefaultData() {
		const slotIds = [0, 1, 2, 10, 3, 4, 5, 6, 7, 13, 8]; //按寮舍显示顺序
		const { _views } = this;
		for (let i = 0; i < 10; i++) {
			let view = _views.find(v => v.index == i);
			if (!view) {
				view = { index: i, name: String(i + 1), values: [], };
				_views.push(view);
			}

			const slots = view.values;
			slotIds.forEach(sid => {
				const s = slots.find(s => s.slot == sid);
				if (!s) {
					slots.push({
						slot: sid,
						item_id: this.getDefultViewId(sid),
						type: 0,
						item_id_list: [],
					});
				} else {
					if (s.item_id == 0)
						s.item_id = this.getDefultViewId(sid);
					s.item_id_list = s.item_id_list.map(id => id == 0 ? this.getDefultViewId(sid) : id);
				}
			});
			slots.sort((a, b) => slotIds.indexOf(a.slot) - slotIds.indexOf(b.slot));
		}
		_views.sort((a, b) => a.index - b.index);
	}

	private refreshCurView() {
		const view = this._views.find(v => v.index == this._use);

		const mjpBackSlot = view.values.find(v => v.slot == EItemCommonType.MjpBack);
		const mjpFrontSlot = view.values.find(v => v.slot == EItemCommonType.MjpFront);
		const tableClothSlot = view.values.find(v => v.slot == EItemCommonType.TableCloth);
		const lobbyBgSlot = view.values.find(v => v.slot == EItemCommonType.DaTingBeiJing);

		const mjpBack = mjpBackSlot ? (mjpBackSlot.type == 1 ? mjpBackSlot.item_id_list.random() : mjpBackSlot.item_id) : DefaultViewIdMap[EItemCommonType.MjpBack];
		const mjpFront = mjpFrontSlot ? (mjpFrontSlot.type == 1 ? mjpFrontSlot.item_id_list.random() : mjpFrontSlot.item_id) : DefaultViewIdMap[EItemCommonType.MjpFront];
		const tableCloth = tableClothSlot ? (tableClothSlot.type == 1 ? tableClothSlot.item_id_list.random() : tableClothSlot.item_id) : DefaultViewIdMap[EItemCommonType.TableCloth];
		const lobbyBg = lobbyBgSlot ? (lobbyBgSlot.type == 1 ? lobbyBgSlot.item_id_list.random() : lobbyBgSlot.item_id) : DefaultViewIdMap[EItemCommonType.DaTingBeiJing];

		if (mjpBack != this._curMjpBack) {
			this._curMjpBack = mjpBack;
			this.dispatch(EUserEvent.OnMjpBackUseChanged);
		}

		if (mjpFront != this._curMjpFront) {
			this._curMjpFront = mjpFront;
			this.dispatch(EUserEvent.OnMjpFrontUseChanged);
		}

		if (tableCloth != this._curTableCloth) {
			this._curTableCloth = tableCloth;
			this.dispatch(EUserEvent.OnTableClothUseChanged);
		}

		if (lobbyBg != this._curLobbyBg) {
			this._curLobbyBg = lobbyBg;
			this.dispatch(EUserEvent.OnLobbyBgChanged, lobbyBg);
		}

		if (view != this._usingView) {
			this._usingView = view;
			this.dispatch(EUserEvent.OnViewUseChanged);
		}
	}
} 