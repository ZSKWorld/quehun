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

	get use() { return this._use; }
	get views() { return this._views; }
	get curView() { return this._views.find(v => v.index == this._use); }

	getDefultViewId(type: EItemCommonType) {
		return DefaultViewIdMap[type] ?? 0;
	}

	@InterestMessage(ENetMessage.fetchAllCommonViews)
	private onFetchClientValue(res: IResAllcommonViews) {
		const decodeRes = $decodeProtoData(res);
		this._use = decodeRes.use;
		this._views = decodeRes.views;
		this.fillDefaultData();
	}

	/** 填充默认数据 */
	private fillDefaultData() {
		const slotIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 13];
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
				if (s) return;
				slots.push({
					slot: sid,
					item_id: this.getDefultViewId(sid),
					type: 0,
					item_id_list: [],
				});
			});
			slots.sort((a, b) => slotIds.indexOf(a.slot) - slotIds.indexOf(b.slot));
		}
		_views.sort((a, b) => a.index - b.index);
	}
} 